import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';
import { Logger } from '../util';
import { WordModel } from '../models';

const WordsController = Router();

/**
 * Get all words
 */
WordsController.get('/', (req, res) => {
  WordModel.find()
    .then(words => res.status(StatusCodes.OK).json({ words }))
    .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }));
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
    .catch(error => res.status(StatusCodes.BAD_REQUEST).json({ error }));
});

export { WordsController };
