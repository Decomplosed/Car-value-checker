import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

describe('UsersController', () => {
  let controller: UsersController;
  let mockedUsersService: Partial<UsersService>;
  let mockedAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockedUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'asdf',
        });
      },
      findByEmail: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'asdf' }]);
      },
      // remove: () => {},
      // update: () => {},
    };
    mockedAuthService = {
      // signup: () => {},
      // signin: () => {},
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockedUsersService,
        },
        { provide: AuthService, useValue: mockedAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });
});
