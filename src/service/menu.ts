import { Types } from 'mongoose';
import { ServiceError, toServiceError } from '@src/dto/service';
import { Menu, MenuModel } from '@src/model/menu';
import { ERRORS } from '@src/constant';
import logger from '@src/logger';

export interface IMenuService {
  createMenu(menu: Menu): Promise<Types.ObjectId | ServiceError>;
  getMenus(): Promise<Menu[] | ServiceError>;
  getMenuByID(id: string): Promise<Menu | ServiceError>;
  deleteMenuByID(id: string): Promise<Types.ObjectId | ServiceError>;
  updateMenuByID(id: string, menu: Menu): Promise<Types.ObjectId | ServiceError>;
}

class MenuService implements IMenuService {
  createMenu = async (menu: Menu): Promise<Types.ObjectId | ServiceError> => {
    logger.info(`creating new menu ${menu}`);
    try {
      const newMenu = await MenuModel.create(menu);
      logger.info(`menu unit created ${newMenu._id}`);
      return newMenu._id;
    } catch (error: unknown) {
      logger.error(`menu creation failed: ${error}`);
      return toServiceError(error);
    }
  };

  getMenus = async (): Promise<Menu[] | ServiceError> => {
    try {
      logger.info(`quering menus`);
      return await MenuModel.find();
    } catch (error: unknown) {
      logger.error(`menus query failed`);
      return toServiceError(error);
    }
  };

  getMenuByID = async (id: string): Promise<Menu | ServiceError> => {
    try {
      logger.info(`quering menu by id ${id}`);
      const menu = await MenuModel.findById(id);
      if (!menu) {
        logger.info(`menu id: ${id} not found`);
        return toServiceError(ERRORS.NOT_FOUND);
      }
      return menu;
    } catch (error: unknown) {
      logger.error(`menu id: ${id} query failed`);
      return toServiceError(error);
    }
  };

  deleteMenuByID = async (id: string): Promise<Types.ObjectId | ServiceError> => {
    try {
      logger.info(`deleting menu by id ${id}`);
      const deletedMenu = await MenuModel.findByIdAndDelete(id);
      if (!deletedMenu) {
        logger.info(`could not delete, menu id: ${id} not found`);
        return toServiceError(ERRORS.NOT_FOUND);
      }
      return deletedMenu._id;
    } catch (error: unknown) {
      logger.error(`menu id: ${id} deletion failed`);
      return toServiceError(error);
    }
  };

  updateMenuByID = async (id: string, menu: Menu): Promise<Types.ObjectId | ServiceError> => {
    try {
      logger.info(`updating menu id: ${id}, ${menu}`);
      const updatedMenu = await MenuModel.findByIdAndUpdate(id, menu);
      if (!updatedMenu) {
        logger.info(`could not update, menu id ${id} not found`);
        return toServiceError(ERRORS.NOT_FOUND);
      }
      return updatedMenu._id;
    } catch (error: unknown) {
      logger.error(`menu id: ${id}, ${menu} update failed`);
      return toServiceError(error);
    }
  };
}

export { MenuService };