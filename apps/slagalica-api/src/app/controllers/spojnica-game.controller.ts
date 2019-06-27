import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';
import { Logger } from '../util';
import { SpojnicaGameModel } from '../models';

const SpojnicaGameController = Router();

/**
 * Get all spojnica games
 */
SpojnicaGameController.get('/', (req, res) => {
  SpojnicaGameModel.find()
    .then(spojnicaGames => res.status(StatusCodes.OK).json({ spojnicaGames }))
    .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }));
});

/**
 * Create a spojnica game
 */
SpojnicaGameController.post('/', (req, res) => {
  const game = req.body.game;
  const model = new SpojnicaGameModel(game);
  model
    .save()
    .then(saved => res.status(StatusCodes.CREATED).json({ game: saved }))
    .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }));
});

export { SpojnicaGameController };
