import { checkSchema } from 'express-validator';

export const validateNewProductBody = checkSchema({
  year: {
    isInt: true,
    toInt: true
  },
});
