import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { User } from '../../auth/schemas/user.schema';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    profile: jest.fn(),
    updateProfile: jest.fn(),
    changePassword: jest.fn(),
  };

  const mockUser = {
    _id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    password: 'hashedPassword',
    phoneNumber: '+234555555555',
    address: '123 Test St',
    images: [],
    resetToken: '',
    role: 'user',
  } as unknown as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return the user profile', async () => {
      mockUserService.profile.mockResolvedValue(mockUser);
      const result = await controller.getProfile(mockUser);
      expect(result).toEqual(mockUser);
      expect(mockUserService.profile).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('updateProfile', () => {
    it('should update and return the user profile', async () => {
      const updateDto: UpdateUserDto = {
        firstName: 'Updated',
        lastName: 'User',
        phoneNumber: '+234000000000',
        address: 'New Address',
        images: 'newImage.jpg',
      };

      const updatedUser = {
        ...mockUser,
        ...updateDto,
      };

      mockUserService.updateProfile.mockResolvedValue(updatedUser);

      const result = await controller.updateProfile(updateDto, mockUser);
      expect(result).toEqual(updatedUser);
      expect(mockUserService.updateProfile).toHaveBeenCalledWith(updateDto, mockUser);
    });
  });

  describe('changePassword', () => {
    const changePasswordDto: ChangePasswordDto = {
      currentPassword: 'OldPassword123!',
      password: 'NewPassword123!',
      confirmPassword: 'NewPassword123!',
    };

    it('should change the password successfully', async () => {
      mockUserService.changePassword.mockResolvedValue({
        message: 'Password changed successfully',
      });

      const result = await controller.changePassword(mockUser, changePasswordDto);
      expect(result).toEqual({ message: 'Password changed successfully' });
      expect(mockUserService.changePassword).toHaveBeenCalledWith(mockUser, changePasswordDto);
    });

    it('should throw error when passwords do not match', async () => {
      const invalidDto = {
        ...changePasswordDto,
        confirmPassword: 'WrongPassword!',
      };

      mockUserService.changePassword.mockRejectedValue(
        new Error('Passwords do not match'),
      );

      await expect(
        controller.changePassword(mockUser, invalidDto),
      ).rejects.toThrowError('Passwords do not match');
    });

    it('should throw error for incorrect current password', async () => {
      mockUserService.changePassword.mockRejectedValue(
        new Error('Current password is incorrect'),
      );

      await expect(
        controller.changePassword(mockUser, changePasswordDto),
      ).rejects.toThrowError('Current password is incorrect');
    });
  });
});
