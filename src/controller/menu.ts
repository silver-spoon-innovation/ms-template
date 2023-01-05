import { Request, Response } from 'express';
import { IMenuService } from '@src/service/menu';
import { ServiceError } from '@src/dto/service';
import { handleServiceErrorInController, toSuccessReplyCode } from '@src/utils/errors';

class MenuController {
  menuService: IMenuService;
  
  constructor(menuService: IMenuService) {
    this.menuService = menuService;
  }
  
  getMenus = async (_: Request, response: Response) => {
    const res = await this.menuService.getMenus();
    if (res instanceof ServiceError) {
      return handleServiceErrorInController(res, response);
    }
    return response.status(200).json({ menus: res });
  };
  
  createMenu = async (request: Request, response: Response) => {
    const res = await this.menuService.createMenu(request.body);
    if (res instanceof ServiceError) {
      return handleServiceErrorInController(res, response);
    }
    return response.status(200).json(res);
  };
  
  getMenuById = async (request: Request, response: Response) => {
    const res = await this.menuService.getMenuByID(request.params._id);
    if (res instanceof ServiceError) {
      return handleServiceErrorInController(res, response);
    }
    return response.status(200).json(res);
  };
  
  updateMenuById = async (request: Request, response: Response) => {
    const res = await this.menuService.updateMenuByID(request.params._id, request.body);
    if (res instanceof ServiceError) {
      return handleServiceErrorInController(res, response);
    }
    return response.status(200).json(toSuccessReplyCode());
  };
  
  deleteMenuById = async (request: Request, response: Response) => {
    const res = await this.menuService.deleteMenuByID(request.params._id);
    if (res instanceof ServiceError) {
      return handleServiceErrorInController(res, response);
    }
    return response.status(200).json(toSuccessReplyCode());
  };
}
  
  export default MenuController;