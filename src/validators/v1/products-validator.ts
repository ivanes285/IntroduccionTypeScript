import { checkSchema, Schema, ParamSchema } from 'express-validator';

const createProductSchema = (isStrict: boolean, prefix?:string): Schema => {
  const nameSchema: ParamSchema = {
    isString: true,
    rtrim: {
      options: ' ',
    },
    isLength: { options: { min: 4 } },
    errorMessage:
      'El nombre debe ser una cadena y contener al menos 4 caracteres',
  };

  const yearSchema: ParamSchema = {
    isInt: true,
    toInt: true,
    errorMessage: 'El año debe ser un numero entero y mayor a 2020',
    custom: {
      options: (value: number) => {
        return value > 2020;
      },
    },
  };

  const priceSchema: ParamSchema = {
    isNumeric: true,
    errorMessage: 'El precio debe ser un Número y mayor a 0',
    custom: {
      options: (value: number) => {
        return value > 0;
      },
    },
  };

  const descriptionSchema: ParamSchema = {
    isString: true,
    isLength: { options: { min: 15, max: 150 } },
    errorMessage: 'La description debe ser al menos 15 caracteres y maximo 150',
    optional: {
      options: {
        nullable: true,
      },
    },
  };
 if (!isStrict) {
  const optional= {options:{nullable: false}};
  nameSchema.optional =optional;
  yearSchema.optional =optional;
  priceSchema.optional = optional;
 }

if (prefix) {
  const result:Schema={}
   result[`${prefix}.name`]=nameSchema;
   result[`${prefix}.year`]=yearSchema;
   result[`${prefix}.price`]=priceSchema;
   return result;
}

  return {
    name: nameSchema,
    year: yearSchema,
    price: priceSchema,
    description: descriptionSchema
  };
};



export const validateNewProductBody = checkSchema(createProductSchema(true));


export const validateDelete = checkSchema({
  productId: {
    in: 'params', //le estamos diciendo que este productId viene como parametro
    isMongoId: true,
    errorMessage: 'El id es inválido',
  },
});

export const validateProductAndNotify = checkSchema({
  productId: {
    in: 'params', //le estamos diciendo que este productId viene como parametro
    isMongoId: true,
    errorMessage: 'El id es inválido',
  },

  client: {
    isEmail: true,
    in: 'body',
    errorMessage: 'Debe ser un email válido',
  },
  ...createProductSchema(false,'data')

});
