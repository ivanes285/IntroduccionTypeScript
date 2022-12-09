import { Router} from 'express';
import * as productsController from '../../controllers/v1/products-controller';
import { checkAuth } from '../../Middlewares/auth-middleware';
import { handleRequestErrors } from '../../Middlewares/validator-middleware';
import { validateDelete, validateNewProductBody,validateProductAndNotify } from '../../validators/v1/products-validator';
const router = Router();


router.get('', checkAuth, productsController.getProducts);
router.post('/create',checkAuth,validateNewProductBody, handleRequestErrors,productsController.createProduct);
router.get('/:productId', checkAuth, productsController.getProductById);
router.put('/:productId', checkAuth, productsController.updateProduct);
router.patch('/:productId', checkAuth, productsController.partialUpdateProduct);
router.delete('/:productId', checkAuth,validateDelete,handleRequestErrors, productsController.deleteProductById);
router.post('/:productId/notify-client',checkAuth,validateProductAndNotify,handleRequestErrors,productsController.updateProductAndNotify);


export default router;
