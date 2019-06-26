import { Schema, model, Document } from 'mongoose';
import { User as BaseUser, UserType, UserGender } from '@slagalica/data';
import { genSalt, hash, compare } from 'bcrypt';
import { Logger } from '../util';

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
  /**
   * bcrpyt this
   */
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
  /**
   * administrator
   * supervizor,
   * igrac
   */
  type: {
    type: String,
    required: [true, 'Type required.'],
    enum: [UserType.Admin, UserType.Supervizor, UserType.Igrac]
  },
  /**
   * Type this to a set of values
   */
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
  updated: { type: Date, default: Date.now }
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

class UserMethods {
  static isValidGender(gender: string) {
    return new Set([UserGender.Female, UserGender.Male]).has(gender as any);
  }

  static isValidType(type: string) {
    return new Set([UserType.Admin, UserType.Supervizor, UserType.Igrac]).has(
      type as any
    );
  }

  comparePassword(this: User, candidatePassword: string) {
    return new Promise<boolean>((resolve, reject) => {
      compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return reject(err);
        resolve(isMatch);
      });
    });
  }
}
type User = BaseUser & Document & UserMethods;
type UserConfig = { [key in keyof BaseUser]: any };

UserSchema.loadClass(UserMethods);

export const UserModel = model<User>('users', UserSchema);
