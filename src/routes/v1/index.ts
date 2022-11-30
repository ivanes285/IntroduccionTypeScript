import {Application} from 'express';
import userRouter from './user-router';
import productRouter from './product-router';


const RoutesV1 = (app:Application):void => {
  app.use('/api/v1/users',userRouter);
  app.use('/api/v1/products',productRouter);
};


export default RoutesV1;