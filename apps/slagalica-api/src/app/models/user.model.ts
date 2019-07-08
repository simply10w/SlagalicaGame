import { isStrongPassword } from '@slagalica/common';
import { Omit, User, UserGender, UserType } from '@slagalica/data';
import { compare, genSalt, hash } from 'bcrypt';
import { UploadedFile } from 'express-fileupload';
import * as fs from 'fs';
import moment from 'moment';
import { Document, Error, model, Model, Schema } from 'mongoose';
import * as path from 'path';
import * as uniqueFilename from 'unique-filename';
import { promisify } from 'util';

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required.']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: [true, 'Email must be unique'],
      trim: true,
      dropDups: true
    },
    occupation: String,
    userName: {
      type: String,
      required: [true, 'Username is required.'],
      unique: [true, 'Username must be unique'],
      trim: true,
      dropDups: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    type: {
      type: String,
      required: [true, 'Type required.'],
      default: UserType.Igrac,
      enum: [UserType.Admin, UserType.Supervizor, UserType.Igrac]
    },
    gender: {
      type: String,
      required: true,
      enum: [UserGender.Female, UserGender.Male]
    },
    dateOfBirth: {
      type: String,
      required: true
    },
    /**
     * image will be stored in some cloud storage
     */
    profileImgUrl: {
      type: String,
      get: (url: string) => {
        const STORAGE_BUCKET = `http://localhost:3333/public`;
        return `${STORAGE_BUCKET}/${url}`;
      }
    },
    updated_at: { type: Date, default: Date.now },
    accepted: {
      type: Boolean,
      default: false
    },
    created_at: { type: Date, default: Date.now }
  },
  { toJSON: { getters: true }, toObject: { getters: true } }
);

interface IUserDocument extends Omit<User, '_id'>, Document {}

interface IUser extends IUserDocument {
  storeProfileImage(file: UploadedFile): string;
  comparePassword(password: string): Promise<boolean>;
  accept(decision: boolean): Promise<this>;
}

interface IUserModel extends Model<IUser> {
  getAllPendingPlayers(): Promise<IUser[]>;
  getAllAcceptedPlayers(): Promise<IUser[]>;
  authenticate(credentials: {
    userName: string;
    password: string;
  }): Promise<IUser>;
}

/**
 * Hooks
 */

UserSchema.pre('save', function(this: IUser, next) {
  const user = this;

  this.updated_at = moment().format();

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  if (!isStrongPassword(user.password)) {
    const error = new Error.ValidationError();
    error.message = 'Password is not strong enough';
    return next(error);
  }

  const SALT_ROUNDS = 10;
  // generate a salt
  genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) return next(err);
    hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

class UserImpl {
  static getAllPendingPlayers(this: IUserModel): Promise<IUser[]> {
    return this.find({ accepted: false })
      .where('type', UserType.Igrac)
      .exec();
  }

  static getAllAcceptedPlayers(this: IUserModel): Promise<IUser[]> {
    return this.find({ accepted: true })
      .where('type', UserType.Igrac)
      .exec();
  }

  static async authenticate(
    this: IUserModel,
    credentials: { userName: string; password: string }
  ): Promise<IUser> {
    const { userName, password } = credentials;
    const user = await this.findOne({ userName, accepted: true });

    if (!user) {
      const error = new Error.ValidationError();
      error.message = `User does not exist`;
      throw error;
    }

    const isCorrectPassword = await user.comparePassword(password);

    if (!isCorrectPassword) {
      const error = new Error.ValidationError();
      error.message = `Incorrect password.`;
      throw error;
    }

    return user;
  }

  comparePassword(this: IUser, candidatePassword: string) {
    return new Promise<boolean>((resolve, reject) => {
      compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return reject(err);
        resolve(isMatch);
      });
    });
  }

  toJSON(this: IUser) {
    const userObj = this.toObject();
    delete userObj.password;
    delete userObj.__v;
    return userObj;
  }

  storeProfileImage(this: IUser, file: UploadedFile) {
    const UPLOAD_PATH = path.resolve(
      process.cwd(),
      'dist',
      'apps',
      'slagalica-api',
      'assets',
      'public'
    );
    const newFileName = uniqueFilename('', '') + '-' + file.name;
    const where = path.resolve(UPLOAD_PATH, newFileName);
    try {
      fs.writeFileSync(where, file.data);
      this.profileImgUrl = newFileName;
    } catch (err) {
      throw err;
    }
  }

  accept(this: IUser, decision: boolean) {
    if (this.accepted) {
      return Promise.reject('User is already accepted.');
    }
    this.accepted = decision;
    return decision ? this.save() : this.remove();
  }
}

UserSchema.loadClass(UserImpl);
export const UserModel = model('users', UserSchema) as IUserModel;
