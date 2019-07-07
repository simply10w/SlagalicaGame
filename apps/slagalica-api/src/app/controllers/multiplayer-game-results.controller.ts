import { getAllMultiplayerGameResults } from '@slagalica-api/models';
import { errorHandler } from '@slagalica-api/util';
import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';

const MultiplayerGameResultsController = Router();

/**
 * Get all games
 */
MultiplayerGameResultsController.get('/', (req, res) => {
  getAllMultiplayerGameResults()
    .then(games => res.status(StatusCodes.OK).json({ games }))
    .catch(errorHandler(res));
});

export { MultiplayerGameResultsController };
