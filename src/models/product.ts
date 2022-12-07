import { Schema, model } from 'mongoose';
import { IProduct } from '../Interfaces/IProduct';
// import autopopulate from 'mongoose-autopopulate';

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type:Number, default: 0 },
    description: { type: String },
    // user:{ type: Schema.Types.ObjectId, ref: 'user',required: true, autopopulate: true}
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  { timestamps: true, versionKey: false }
);

//Autop
//productSchema.plugin(autopopulate)

const Product = model('product', productSchema);

export default Product;
