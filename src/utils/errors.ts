import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ERRORS } from '@src/constant';
import { toControllerErrorResponse } from '@src/dto/controller';
import { ServiceError } from '@src/dto/service';

export const handleServiceErrorInController = (serviceErr: ServiceError, response: Response) => {
  const errors = toControllerErrorResponse(serviceErr);
  if (serviceErr.msg === ERRORS.NOT_FOUND) {
    return response.status(409).json({ errors });
  }
  return response.status(500).json({ errors });
};

export const toSuccessReplyCode = () => {
  return { reply_code: 0 };
};

export const validate = (validations: ValidationChain[]) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(request)));

    const errors = validationResult(request);
    if (errors.isEmpty()) {
      return next();
    }
    return response.status(400).json({ errors: errors.array() });
  };
};