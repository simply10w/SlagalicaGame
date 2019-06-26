import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';
import { UserModel } from '../models';
import { Logger } from '../util';

const UsersController = Router();

UsersController.get('/', async (req, res) => {
  UserModel.find()
    .then(users =>
      res.status(StatusCodes.OK).json({
        users
      })
    )
    .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }));
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
    .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }));
});

UsersController.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await UserModel.findOne({
      userName
    });
    if (user) {
      const okay = await user.comparePassword(password);
      okay
        ? res.status(StatusCodes.OK).json({ message: 'Logged in.' })
        : res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: 'Username or password invalid. ' });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User does not exist' });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

UsersController.post('/register', async (req, res) => {
  try {
    const user = new UserModel(req.body.user);
    const createdUser = await user.save();
    res.status(StatusCodes.OK).json({
      user: createdUser
    });
  } catch (error) {
    Logger.logError(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      error
    });
  }
});

export { UsersController };
