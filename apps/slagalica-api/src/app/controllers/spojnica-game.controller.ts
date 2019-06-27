import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';
import { Logger, errorHandler } from '@slagalica-api/util';
import { SpojnicaGameModel } from '@slagalica-api/models';

const SpojnicaGameController = Router();

/**
 * Get all spojnica games
 */
SpojnicaGameController.get('/', (req, res) => {
  SpojnicaGameModel.find()
    .then(spojnicaGames => res.status(StatusCodes.OK).json({ spojnicaGames }))
    .catch(errorHandler(res));
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
    .catch(errorHandler(res));
});

export { SpojnicaGameController };
