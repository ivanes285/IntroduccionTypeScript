import { Request, Response } from 'express';
import Product from '../../models/product';
import User from '../../models/user';
import { Types } from 'mongoose';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {user}= req.body;

    if (!Types.ObjectId.isValid(user)) {
      throw { code: 400, message: 'ID de usuario inválido' };
    }
    const userFind= await User.findById(user)
    if(userFind){
      const product = new Product({ ...req.body });
      await product.save();
      res.status(200).send({ message: 'Producto creado exitosamente !!' });
    }else{
      throw { code: 400, message: 'El usuario NO existe' };
    }
    
  } catch (error) {
    res.status(error.code).send(error.message);
  }
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemsPerPage: number = 10;
    const page: number = parseInt(req.query.page as string);
    if (!page) {
      throw { code: 400, message: 'Especifique la página' };
    }
    const start = (page - 1) * itemsPerPage;
    const total: number = await Product.count();
    const products = await Product.find().skip(start).limit(itemsPerPage).populate({path:'user',select:{password:0}});
    if (products) {
      res.status(200).send({
        page: page,
        per_page: itemsPerPage,
        total: total,
        total_pages: Math.ceil(total / itemsPerPage),
        data: products,
      });
    } else {
      throw { code: 400, message: 'Error al mostrar los productos!!' };
    }
  } catch (error) {
    res.status(error.code).send(error.message);
  }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.productId;
    if (!Types.ObjectId.isValid(id)) {
      throw { code: 400, message: 'ID inválido' };
    }
    // const product = await Product.findById(id).populate('user'); // ? Populate normal, sin embargo necesitamos ocultar la contraseña
    const product = await Product.findById(id).populate({
    path:"user",
    select:{ password:0}
    });
    res.status(200).send(product);
  } catch (error) {
    res.status(error.code).send(error.message);
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.productId;
    if (!Types.ObjectId.isValid(id)) {
      throw { code: 400, message: 'ID inválido' };
    }
    const { name, year, price, description, user } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      year,
      price,
      description,
      user,
    });
    const product = await Product.findById(id);
    if (updatedProduct) {
      res.status(200).send({ data: product });
    }
  } catch (error) {
    res.status(error.code).send(error.message);
  }
};

const partialUpdateProduct = async (req: Request,res: Response ): Promise<void> => {
  try {
    const id = req.params.productId;
    const { name, year, price, description, user } = req.body;
    const product = await Product.findById(id);
    if (product) {
      product.name = name || product.name;
      product.year = year || product.year;
      product.price = price || product.price;
      product.description = description || product.description;
      product.user = user || product.user;
      await product.save();
      res.status(200).send(product);
    }
  } catch (error) {
    res.status(204).send('Error al actualizar el producto');
  }
};

const deleteProductById = async ( req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.productId;
    if (!Types.ObjectId.isValid(id)) {
      throw { code: 400, message: 'ID inválido' };
    }
    const productExist = await Product.findById(id);
    if (productExist) {
      const productDelete = await Product.findByIdAndDelete(id);
      if (productDelete) {
        res.status(200).send('Producto eliminado correctamente');
      }
    } else {
      throw { code: 500, message: 'El producto no existe' };
    }
  } catch (e) {
    res.status(e.code).send(e.message);
  }
};

const updateProductAndNotify = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.productId;
    const {client,data}= req.body;
    if (!Types.ObjectId.isValid(id)) {
      throw { code: 400, message: 'ID inválido' };
    }
    const { name, year, price, description, user } = data;
    const product = await Product.findById(id);
    if (product) {
      product.name = name || product.name;
      product.year = year || product.year;
      product.price = price || product.price;
      product.description = description || product.description;
      product.user = user || product.user;
      await product.save();
      res.status(200).send({data:product,message:`Email enviado al cliente ${client}`});
    }

  } catch (e) {
    res.status(e.code).send(e.message);
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  partialUpdateProduct,
  deleteProductById,
  updateProductAndNotify
};
