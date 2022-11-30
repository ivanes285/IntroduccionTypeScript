import {Router} from 'express';
import * as productsController from '../../controllers/v1/products-controller';
const router = Router();


router.get('', productsController.getProducts);
router.post('/create', productsController.createProduct);
router.get('/:productId', productsController.getProductById);
router.put('/:productId', productsController.updateProduct);
router.patch('/:productId', productsController.partialUpdateProduct);
router.delete('/:productId', productsController.deleteProductById);
router.post('/:productId/notify-client', productsController.updateProductAndNotify);

export default router;
