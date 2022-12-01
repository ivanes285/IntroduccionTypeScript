import {Router} from 'express';
import * as productsController from '../../controllers/v1/products-controller';
import { checkAuth } from '../../Middlewares/auth-middleware';
const router = Router();


router.get('',checkAuth, productsController.getProducts);
router.post('/create',checkAuth, productsController.createProduct);
router.get('/:productId',checkAuth, productsController.getProductById);
router.put('/:productId',checkAuth, productsController.updateProduct);
router.patch('/:productId',checkAuth, productsController.partialUpdateProduct);
router.delete('/:productId',checkAuth, productsController.deleteProductById);
router.post('/:productId/notify-client',checkAuth, productsController.updateProductAndNotify);

export default router;
