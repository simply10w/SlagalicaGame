import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';
import { AsocijacijaGameModel } from '@slagalica-api/models';
import { errorHandler } from '@slagalica-api/util';

const AsocijacijaGameController = Router();

/**
 * Get all asocijacija games
 */
AsocijacijaGameController.get('/', (req, res) => {
  AsocijacijaGameModel.find()
    .then(asocijacijaGames =>
      res.status(StatusCodes.OK).json({ asocijacijaGames })
    )
    .catch(errorHandler(res));
});

/**
 * Create a asocijacija game
 */
AsocijacijaGameController.post('/', (req, res) => {
  const game = req.body.game;
  const model = new AsocijacijaGameModel(game);
  model
    .save()
    .then(saved => res.status(StatusCodes.CREATED).json({ game: saved }))
    .catch(errorHandler(res));
});

export { AsocijacijaGameController };
