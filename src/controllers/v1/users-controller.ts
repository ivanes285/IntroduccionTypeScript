import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from '../../models/user';
import Product from '../../models/product';
import bcrypt from 'bcrypt';
import { IUser } from '../../Interfaces/IUser';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.find().select({ password: 0 });
  res.send(users);
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    if (!Types.ObjectId.isValid(userId)) {
      throw { code: 400, message: 'ID inválido' };
    }
    const user = await User.findById(userId).select({ password: 0 });

    if (user) {
      res.send(user);
    } else {
      throw { code: 500, message: 'No se ha encontrado al usuario con ese ID' };
    }
  } catch (e) {
    res.status(e.code).send(e.message);
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName, avatar }: IUser = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw {
        code: 409,
        message: 'El usuario con el email que proporcionaste ya existe',
      };
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashPassword,
      firstName,
      lastName,
      avatar,
    });
    await newUser.save();
    res.status(200).send({ message: 'Usuario registrado correctamente!' });
  } catch (e) {
    res.status(e.code).send(e.message);
  }
};

const deletedById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.userId;
    if (!Types.ObjectId.isValid(id)) {
      throw { code: 400, message: 'ID inválido' };
    }
    const user = await User.findById(id);
    if (!user) {
      throw { code: 400, message: 'No se ha encontrado al usuario con ese ID' };
    }

    const userDeleted = await User.findByIdAndDelete(id);
    if (userDeleted) {
      await Product.deleteMany({ user: id });
      res.status(200).send('Usuario y productos eliminados');
    }
  } catch (e) {
    res.status(e.code).send(e.message);
  }
};

export { getUsers, getUserById, createUser, deletedById };
