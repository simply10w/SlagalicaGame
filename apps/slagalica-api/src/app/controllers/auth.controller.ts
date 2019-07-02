import { UserModel } from '@slagalica-api/models';
import { createTokenForUser } from '@slagalica-api/shared/token';
import { createError, errorHandler } from '@slagalica-api/util';
import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import * as StatusCodes from 'http-status-codes';

const AuthController = Router();

AuthController.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await UserModel.authenticate({ userName, password });
    if (user) {
      const token = createTokenForUser(user);
      res.status(StatusCodes.OK).json({ user, token });
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json(createError('Username or password invalid.'));
    }
  } catch (error) {
    errorHandler(res)(error);
  }
});

AuthController.post('/register', async (req, res) => {
  const file: UploadedFile = req.files
    ? (req.files.profileImage as UploadedFile)
    : null;
  const user = JSON.parse(req.body.user);

  try {
    const model = new UserModel(user);
    await model.validate();
    if (file) await model.storeProfileImage(file);
    const createdUser = await model.save();
    res.status(StatusCodes.OK).json({
      user: createdUser
    });
  } catch (error) {
    errorHandler(res)(error);
  }
});

AuthController.put('/reset-password', async (req, res) => {
  const { userName, currentPassword, newPassword } = req.body;

  try {
    let user = await UserModel.findOne({ userName });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(createError('User does not exist.'));
    }

    const correctPassword = await user.comparePassword(currentPassword);
    if (!correctPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(createError('Wrong password.'));
    }

    user.password = newPassword;
    user = await user.save();
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    errorHandler(res)(error);
  }
});

export { AuthController };
