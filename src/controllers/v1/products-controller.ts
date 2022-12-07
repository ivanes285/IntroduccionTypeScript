import { Request, Response } from 'express';
import Product from '../../models/product';
import { Types } from 'mongoose';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.session; //viene del id del token con el que se logiaron
    if (!Types.ObjectId.isValid(id)) {
      throw { code: 400, message: 'ID de usuario inválido' };
    }
    const { name, year, price, description } = req.body;
    console.log('req.body', req.body);
    const product = new Product({ name, year, price, description, user: id });
    await product.save();
    res.status(200).send({ message: 'Producto creado exitosamente !!' });
  } catch (error) {
    res.status(error.code).send(error.message);
  }
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.session;
    const itemsPerPage: number = 10;
    const page: number = parseInt(req.query.page as string);
    if (!page) {
      throw { code: 400, message: 'Especifique la página' };
    }
    const start = (page - 1) * itemsPerPage;
    const total: number = await Product.count({user:id});//solo contara los productos del usuario login
    const products = await Product.find({ user: id })
      .skip(start)
      .limit(itemsPerPage)
      .populate({ path: 'user', select: { password: 0 } });
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
    const { id } = req.session;
    const idProduct = req.params.productId;
    if (!Types.ObjectId.isValid(idProduct)) {
      throw { code: 400, message: 'ID inválido' };
    }
    // const product = await Product.findById(id).populate('user'); // ? Populate normal, sin embargo necesitamos ocultar la contraseña
    const product = await Product.findOne({user:id,_id:idProduct}).populate({
      path: 'user',
      select: { password: 0 },
    });

    res.status(200).send(product);
  } catch (error) {
    res.status(error.code).send(error.message);
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const idProduct = req.params.productId;
    if (!Types.ObjectId.isValid(idProduct)) {
      throw { code: 400, message: 'ID inválido' };
    }
    const {id}= req.session;
    const { name, year, price, description } = req.body;
    const updatedProduct = await Product.findOneAndUpdate({_id:idProduct, user:id}, {
      name,
      year,
      price,
      description
    });
    const product = await Product.findById(idProduct);
    if (updatedProduct) {
      res.status(200).send({ data: product });
    }
  } catch (error) {
    res.status(error.code).send(error.message);
  }
};

const partialUpdateProduct = async (req: Request,res: Response): Promise<void> => {
  try {
    const idProduct = req.params.productId;
    if (!Types.ObjectId.isValid(idProduct)) {
      throw { code: 400, message: 'ID inválido' };
    }
    const {id}=req.session
    const { name, year, price, description } = req.body;
    const product = await Product.findOne({_id:idProduct, user:id});
    if (product) {
      product.name = name || product.name;
      product.year = year || product.year;
      product.price = price || product.price;
      product.description = description || product.description;
      await product.save();
      res.status(200).send(product);
    }
  } catch (e) {
    res.status(e.code).send(e.message);
  }
};

const deleteProductById = async (req: Request,res: Response): Promise<void> => {
  try {
    const idProduct = req.params.productId;
    const {id}=req.session;
    if (!Types.ObjectId.isValid(idProduct)) {
      throw { code: 400, message: 'ID inválido' };
    }
    const productExist = await Product.findOne({_id:idProduct,user:id});
    if (productExist) {
      const productDelete = await Product.findByIdAndDelete(idProduct);
      if (productDelete) {
        res.status(200).send('Producto eliminado correctamente');
      }
    } else {
      throw { code: 500, message: 'Este usuario no puede borrar este elemento' };
    }
  } catch (e) {
    res.status(e.code).send(e.message);
  }
};

const updateProductAndNotify = async (req: Request,res: Response): Promise<void> => {
  try {
    const idProduct = req.params.productId;
    const {id}=req.session
    const { client, data } = req.body;
    const { name, year, price, description } = data;
    const product = await Product.findOne({_id:idProduct,user:id});
    if (product) {
      product.name = name || product.name;
      product.year = year || product.year;
      product.price = price || product.price;
      product.description = description || product.description;

      await product.save();
      res.status(200).send({ data: product, message: `Email enviado al cliente ${client}` });
    }else{
      throw { code: 500, message: 'Este usuario no puede borrar este elemento' };
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
  updateProductAndNotify,
};
