import { GameOfTheDayModel, createGameOfTheDay } from '@slagalica-api/models';
import { errorHandler } from '@slagalica-api/util';
import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';

const GameOfTheDayController = Router();

/**
 * Create game of the day
 */
GameOfTheDayController.post('/', (req, res) => {
  const game = req.body.game;
  createGameOfTheDay(game)
    .then(saved => res.status(StatusCodes.CREATED).json({ game: saved }))
    .catch(errorHandler(res));
});

export { GameOfTheDayController };
