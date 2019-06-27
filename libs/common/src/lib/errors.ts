import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDto } from '@slagalica/data';
import { isString } from 'lodash';
import * as StatusCodes from 'http-status-codes';

export function getErrorMessage(response: any): string {
  if (response instanceof HttpErrorResponse) {
    const message = (response.error as ErrorDto).error;
    if (message) return message;

    switch (response.status) {
      case StatusCodes.BAD_REQUEST:
        return 'Bad Request';
      default:
        return 'Something went wrong.';
    }
  } else if (isString(response)) {
    return response;
  } else {
    return 'Something went wrong.';
  }
}
