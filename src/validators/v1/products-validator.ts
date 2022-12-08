import { checkSchema } from 'express-validator';

export const validateNewProductBody = checkSchema({
  name: {
    isString: true,
    rtrim: {
      options: ' ',
    },
    isLength: { options: { min: 4 } },
    errorMessage: 'El nombre debe ser una cadena y contener al menos 4 caracteres',
  },
  year: {
    isInt: true,
    toInt: true,
    errorMessage: 'El año debe ser un numero entero y mayor a 2020',
    custom:{
    options:(value: number) => {
      return value > 2020;
    },
    }
  },
  price: {
    isNumeric: true,
    errorMessage: 'El precio debe ser un Número y mayor a 0',
    custom: {
      options: (value: number) => {
        return value > 0;
      },
    },
  },
});
