import {Router} from 'express';
import * as usersController from '../../controllers/v1/users-controller';

const router = Router();

router.get('', usersController.getUsers);
router.post('/create', usersController.createUser);
router.get('/:userId', usersController.getUserById);
router.delete('/:userId', usersController.deletedById);


export default router;