import { body } from 'express-validator';
import { validate } from '@src/utils/errors';

export class MenuValidator {
  validateMenuInput = validate([
    body('name').trim().notEmpty().withMessage('name is required'),
    body('description')
      .if(body('description').notEmpty())
      .isLength({ min: 8, max: 100 })
      .withMessage('description should be at least 8 and no more than 100 chars long'),
    body('retails.*.price')
      .isNumeric()
      .withMessage('price must be a number')
      .notEmpty()
      .withMessage('price is required'),
    body('retails.*.size').notEmpty().withMessage('size is required'),
    body('retails.*.cost').isNumeric().withMessage('cost must be a number').notEmpty().withMessage('cost is required'),
  ]);
}