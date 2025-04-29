import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';
import { Role } from '../enums/role.enum';

describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;

  const mockUser = {
    _id: '61c0ccf11d7bf83d153d7c06',
    firtName: 'Olawuwo',
    lastName: 'Abideen',
    email: 'abideenolawuwo@gmail.com',
    role:Role,
    phoneNumber:"+2348109983799"

  };

  let jwtToken = 'jwtToken';

  const mockAuthService = {
    signUp: jest.fn().mockResolvedValueOnce(jwtToken),
    login: jest.fn().mockResolvedValueOnce(jwtToken),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signUp', () => {
    it('should register a new user', async () => {
      const signUpDto = {
        firstName: 'Olawuwo',
        lastName: 'Abideen',
        email: 'abideenolawuwo@gmail.com',
        role: Role.Driver,
        phoneNumber:"+2348109983799",
        password:"",
        confirmPassword:""
        
      };

      const result = await authController.signUp(signUpDto);
      expect(authService.signUp).toHaveBeenCalled();
      expect(result).toEqual(jwtToken);
    });
  });

  describe('login', () => {
    it('should login user', async () => {
      const loginDto = {
        email: 'abideenolawuwo@gmail.com',
        password: 'Password1234@@',
      };

      const result = await authController.login(loginDto);
      expect(authService.login).toHaveBeenCalled();
      expect(result).toEqual(jwtToken);
    });
  });
});
