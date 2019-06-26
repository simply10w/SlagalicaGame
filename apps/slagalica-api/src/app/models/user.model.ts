import { Schema, model, Document } from 'mongoose';
import { User as BaseUser, UserType, UserGender } from '@slagalica/data';
import { genSalt, hash, compare } from 'bcrypt';
import { UploadedFile } from 'express-fileupload';
import * as fs from 'fs';
import * as path from 'path';
import * as uniqueFilename from 'unique-filename';
import { Logger } from '../util';
import { promisify } from 'util';

const UserSchema = new Schema<User>(<UserConfig>{
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
    unique: [true, 'Email must be unique']
  },
  occupation: String,
  userName: {
    type: String,
    required: [true, 'Username is required.'],
    unique: [true, 'Username must be unique']
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
  profileImgUrl: String,
  updated: { type: Date, default: Date.now },
  accepted: {
    type: Boolean,
    default: false
  }
});

/**
 * Hooks
 */

UserSchema.pre('save', function(this: User, next) {
  const SALT_ROUNDS = 10;
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

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

const STORAGE_BUCKET = path.resolve(
  process.cwd(),
  'apps',
  'slagalica-api',
  'src',
  'assets',
  'public'
);

class UserMethods {
  comparePassword(this: User, candidatePassword: string) {
    return new Promise<boolean>((resolve, reject) => {
      compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return reject(err);
        resolve(isMatch);
      });
    });
  }

  toJSON(this: User) {
    const userObj = this.toObject();
    delete userObj.password;
    delete userObj.__v;
    return userObj;
  }

  async storeProfileImage(this: User, file: UploadedFile) {
    const newFileName = uniqueFilename('', '') + '-' + file.name;
    const where = path.resolve(STORAGE_BUCKET, newFileName);
    await promisify(fs.writeFile)(where, file.data);
    this.set('profileImgUrl', newFileName);
    return where;
  }
}
type User = BaseUser & Document & UserMethods;
type UserConfig = { [key in keyof BaseUser]: any };
UserSchema.loadClass(UserMethods);

export const UserModel = model<User>('users', UserSchema);
