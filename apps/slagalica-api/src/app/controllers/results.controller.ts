import {
  getTopSingleplayerResults,
  getAllUserMultiplayerGameResults
} from '@slagalica-api/models';
import { errorHandler } from '@slagalica-api/util';
import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';

const ResultsController = Router();

ResultsController.get('/single', (req, res) => {
  getTopSingleplayerResults()
    .then(results => res.status(StatusCodes.OK).json({ results }))
    .catch(errorHandler(res));
});

ResultsController.get('/multi', (req, res) => {
  getAllUserMultiplayerGameResults(req.user.id)
    .then(results => res.status(StatusCodes.OK).json({ results }))
    .catch(errorHandler(res));
});

export { ResultsController };
