import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PassportModule } from '@nestjs/passport';
import { User } from '../auth/schemas/user.schema';
import {Type} from'./schemas/vehicle.schema'

import { Category } from './schemas/book.schema';




describe('VehicleController', () => {
  let vehicleService: VehicleService;
  let vehicleController: VehicleController;

  const mockBook = {
    _id: '61c0ccf11d7bf83d153d7c06',
    user: '61c0ccf11d7bf83d153d7c06',
    title: 'New Book',
    description: 'Book Description',
    author: 'Author',
    price: 100,
    category: Category.FANTASY,
  };

  const mockUser = {
    _id: '61c0ccf11d7bf83d153d7c06',
    name: 'Ghulam',
    email: 'ghulam1@gmail.com',
  };

  const mockBookService = {
    findAll: jest.fn().mockResolvedValueOnce([mockBook]),
    create: jest.fn(),
    findById: jest.fn().mockResolvedValueOnce(mockBook),
    updateById: jest.fn(),
    deleteById: jest.fn().mockResolvedValueOnce({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [VehicleController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
    vehicleController = module.get<VehicleController>(VehicleController);
  });

  it('should be defined', () => {
    expect(vehicleController).toBeDefined();
  });

  describe('getAllBooks', () => {
    it('should get all books', async () => {
      const result = await vehicleController.getAllBooks({
        page: '1',
        keyword: 'test',
      });

      expect(bookService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockBook]);
    });
  });

  describe('createBook', () => {
    it('should create a new book', async () => {
      const newBook = {
        title: 'New Book',
        description: 'Book Description',
        author: 'Author',
        price: 100,
        category: Category.FANTASY,
      };

      mockBookService.create = jest.fn().mockResolvedValueOnce(mockBook);

      const result = await vehicleController.createBook(
        newBook as CreateBookDto,
        mockUser as User,
      );

      expect(bookService.create).toHaveBeenCalled();
      expect(result).toEqual(mockBook);
    });
  });

  describe('getBookById', () => {
    it('should get a book by ID', async () => {
      const result = await vehicleController.getBook(mockBook._id);

      expect(bookService.findById).toHaveBeenCalled();
      expect(result).toEqual(mockBook);
    });
  });

  describe('updateBook', () => {
    it('should update book by its ID', async () => {
      const updatedBook = { ...mockBook, title: 'Updated name' };
      const book = { title: 'Updated name' };

      mockBookService.updateById = jest.fn().mockResolvedValueOnce(updatedBook);

      const result = await vehicleController.updateBook(
        mockBook._id,
        book as UpdateBookDto,
      );

      expect(bookService.updateById).toHaveBeenCalled();
      expect(result).toEqual(updatedBook);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book by ID', async () => {
      const result = await vehicleController.deleteBook(mockBook._id);

      expect(bookService.deleteById).toHaveBeenCalled();
      expect(result).toEqual({ deleted: true });
    });
  });
});
