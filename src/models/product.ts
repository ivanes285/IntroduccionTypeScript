import { Schema, model } from 'mongoose';
import { IProduct } from '../Interfaces/IProduct';
// import autopopulate from 'mongoose-autopopulate';


const productSchema = new Schema<IProduct>(
  {
    name: { type: 'string', required: true,unique: true},
    year: { type: 'number',required: true},
    price: { type: 'number', default: 0},
    description: { type: 'string',required: false},
    // user:{ type: Schema.Types.ObjectId, ref: 'user',required: true, autopopulate: true}
    user:{ type: Schema.Types.ObjectId, ref: 'user',required: true}

  },
  { timestamps: true, versionKey: false }
);

//Autop
//productSchema.plugin(autopopulate)


const Product = model('product',productSchema);

export default Product;