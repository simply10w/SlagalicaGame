import { WordModel } from '@slagalica-api/models';
import { errorHandler } from '@slagalica-api/util';
import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';

const WordsController = Router();

/**
 * Get all words
 */
WordsController.get('/', (req, res) => {
  WordModel.find()
    .then(words => res.status(StatusCodes.OK).json({ words }))
    .catch(errorHandler(res));
});

/**
 * Create a word
 */
WordsController.post('/', (req, res) => {
  const word = req.body.word;
  const wordModel = new WordModel({
    word
  });
  wordModel
    .save()
    .then(saved => res.status(StatusCodes.CREATED).json({ word: saved }))
    .catch(errorHandler(res));
});

export { WordsController };
