import { Response } from 'express';
import { Error } from 'mongoose';
import * as StatusCodes from 'http-status-codes';
import { Logger } from './logger';
import { v1 } from 'uuid';
import { ErrorDto } from '@slagalica/data';

export function createError(
  message: string = null,
  extraProps: object = {}
): ErrorDto {
  return {
    error: message,
    ...extraProps
  };
}

export function errorHandler(res: Response) {
  return (error: Error) => {
    const reference = v1();
    Logger.logError(`[${reference}]!`, error);

    if (error.name === 'ValidationError') {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json(createError(error.message, { reference }));
    } else {
      Logger.logError('BREAK!', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createError());
    }
  };
}
