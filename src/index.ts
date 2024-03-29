import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import apiV1 from './routes/v1';
const app: Application = express();



//Middlewares
const optionsCors: cors.CorsOptions = {
  origin: ['*'],
  optionsSuccessStatus: 200
};



dotenv.config();
const PORT:string = process.env.PORT!;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(optionsCors));



//RUTAS
apiV1(app);



//DATABASE
import './db/connection';



//SERVER
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});


