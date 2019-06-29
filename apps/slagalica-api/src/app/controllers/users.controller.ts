import { UserModel } from '@slagalica-api/models';
import { errorHandler, createError } from '@slagalica-api/util';
import { Router } from 'express';
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

export { UsersController };
