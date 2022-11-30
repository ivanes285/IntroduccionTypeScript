import { ObjectId } from "mongoose";
import {IUser} from '../Interfaces/IUser';


export interface IProduct {
  name: string;
  year: number;
  price?: number; 
  description?: string; 
  user: ObjectId | IUser
  
  
}
