import { Router, Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import * as productsController from '../../controllers/v1/products-controller';
import { checkAuth } from '../../Middlewares/auth-middleware';
import { validateNewProductBody } from '../../validators/v1/products-validator';
const router = Router();

router.get('', checkAuth, productsController.getProducts);

router.post('/create',checkAuth,validateNewProductBody,
//Other Midleware que permite 
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
       res.status(400).send(errors.array());
    }
  },
  productsController.createProduct
);



router.get('/:productId', checkAuth, productsController.getProductById);
router.put('/:productId', checkAuth, productsController.updateProduct);
router.patch('/:productId', checkAuth, productsController.partialUpdateProduct);
router.delete('/:productId', checkAuth, productsController.deleteProductById);
router.post(
  '/:productId/notify-client',
  checkAuth,
  productsController.updateProductAndNotify
);

export default router;
