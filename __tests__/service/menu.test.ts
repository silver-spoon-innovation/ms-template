import { Types } from 'mongoose';
import { connectDatabase, closeDatabase, clearDatabase } from '@mock/db';
import { Menu, MenuModel } from '@src/model/menu';
import { MenuService, IMenuService } from '@src/service/menu';
import { ServiceError } from '@src/dto/service';
import { ERRORS } from '@src/constant';

let menuService: IMenuService;
const mockMenu: Menu = {
  name: 'Salmon Salad',
  description: 'Spicy salmon salad',
  retails: [{
    price: 99,
    size: 'regular',
    cost: 30
  }]
};

async function mockInsertMenu() {
  const res = await MenuModel.create(mockMenu);
  return res._id;
}

beforeAll(async () => {
  await connectDatabase();
  menuService = new MenuService();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('createMenu()', () => {
  it('can create a menu successfully', async () => {
    /*
      AAA
      Arrange = prepare data for your class/functions
      Act = call your function
      Asssert = Check whether your function returns what you expect
    */
    // Arrange
    const menu: Menu = {
      name: 'Salmon Salad',
      description: 'Spicy salmon salad',
      retails: [{
        price: 99,
        size: 'regular',
        cost: 30
      }]
    };
    // Act
    const res = await menuService.createUnit(menu);
    // Assert
    expect(res).toBeInstanceOf(Types.ObjectId);
  });
});

describe('getMenus()', () => {
  it('should correctly queries menus', async () => {
    await mockInsertMenu();
    const res = await menuService.getMenus();
    expect(res).toHaveLength(1);
  });
});

describe('getMenuById()', () => {
  it('should correctly query menu by id', async () => {
    const _id = await mockInsertMenu(); // arrange
    const res = await menuService.getMenuByID(_id.toString()); // act
    expect(res).toBeInstanceOf(MenuModel); // assert
    expect((res as Menu).name).toEqual(mockMenu.name);
  });
  it('should return not found error when id does not exist', async () => {
    const res = await menuService.getMenuByID(new Types.ObjectId().toString());
    expect(res).toBeInstanceOf(ServiceError);
    expect((res as ServiceError).msg).toMatch(ERRORS.NOT_FOUND);
  });
});

describe('deleteMenuById()', () => {
  it('should return not found error when id does not exist', async () => {
    const res = await menuService.deleteMenuByID(new Types.ObjectId().toString());
    expect(res).toBeInstanceOf(ServiceError);
    expect((res as ServiceError).msg).toMatch(ERRORS.NOT_FOUND);
  });

  it('should delete unit successfully', async () => {
    const _id = await mockInsertMenu();
    const res = await menuService.deleteMenuByID(_id.toString());
    const queryRes = await MenuModel.findById({ _id });
    expect(queryRes).toBeNull();
    expect(res).toBeInstanceOf(Types.ObjectId);
  });
});


