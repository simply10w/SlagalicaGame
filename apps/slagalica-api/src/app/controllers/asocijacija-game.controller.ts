import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';
import { AsocijacijaGameModel } from '../models';

const AsocijacijaGameController = Router();

/**
 * Get all asocijacija games
 */
AsocijacijaGameController.get('/', (req, res) => {
  AsocijacijaGameModel.find()
    .then(asocijacijaGames =>
      res.status(StatusCodes.OK).json({ asocijacijaGames })
    )
    .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }));
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
    .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }));
});

export { AsocijacijaGameController };
