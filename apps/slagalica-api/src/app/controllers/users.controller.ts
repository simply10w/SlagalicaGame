import { UserModel } from '@slagalica-api/models';
import { errorHandler, createError } from '@slagalica-api/util';
import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import * as StatusCodes from 'http-status-codes';

const UsersController = Router();

UsersController.get('/', async (req, res) => {
  UserModel.find()
    .then(users =>
      res.status(StatusCodes.OK).json({
        users
      })
    )
    .catch(errorHandler(res));
});

UsersController.get('/accepted', async (req, res) => {
  UserModel.getAllAcceptedPlayers()
    .then(users =>
      res.status(StatusCodes.OK).json({
        users
      })
    )
    .catch(errorHandler(res));
});

UsersController.get('/pending', async (req, res) => {
  UserModel.getAllPendingPlayers()
    .then(users =>
      res.status(StatusCodes.OK).json({
        users
      })
    )
    .catch(errorHandler(res));
});

UsersController.get('/:id', async (req, res) => {
  const id = req.params.id;

  UserModel.findOne({ _id: id })
    .then(user => {
      if (user) {
        res.status(StatusCodes.OK).json({
          user
        });
      } else {
        res.status(StatusCodes.NOT_FOUND).json();
      }
    })
    .catch(errorHandler(res));
});

UsersController.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await UserModel.authenticate({ userName, password });
    user
      ? res.status(StatusCodes.OK).json({ user })
      : res
          .status(StatusCodes.UNAUTHORIZED)
          .json(createError('Username or password invalid.'));
  } catch (error) {
    errorHandler(res)(error);
  }
});

UsersController.post('/register', async (req, res) => {
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

UsersController.put('/:id/accept', async (req, res) => {
  const id = req.params.id;
  const decision = req.query.decision;

  let user = await UserModel.findById(id);
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(createError('User does not exist. '));
  }

  try {
    user = await user.accept(decision);
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    errorHandler(res)(error);
  }
});

UsersController.put('/reset-password', async (req, res) => {
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

export { UsersController };
