import express from 'express';
import MenuController from '@src/controller/menu';
import { MenuService } from '@src/service/menu';
import { MenuValidator } from '@src/validator/menu';

const newMenuController = new MenuController(new MenuService());
const newMenuValidator = new MenuValidator();

const { createMenu, getMenus, getMenuById, updateMenuById, deleteMenuById } =
  newMenuController;

const { validateMenuInput } = newMenuValidator;

const router = express.Router();

router.route('/').post(validateMenuInput, createMenu);

router.route('/menus').get(getMenus);

router.route('/:_id').get(getMenuById).patch(validateMenuInput, updateMenuById).delete(deleteMenuById);

export default router;