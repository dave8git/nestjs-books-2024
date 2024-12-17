import { BadRequestException, Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) { }

  @Get('/')
  getAll() {
    return this.booksService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const book = await this.booksService.getById(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  // @Post('/')
  // create(@Body() bookData: CreateBookDTO) {
  //   return this.booksService.create(bookData);
  // }

  @Post('/')
  async create(@Body() bookData: CreateBookDTO) {
    const { title, price, rating, authorId } = bookData;
  
    // Sprawdź, czy podane `authorId` istnieje
    const authorExists = await this.booksService.getById(authorId);
  
    if (!authorExists) {
      throw new BadRequestException('Author with the given id does not exist');
    }
  
    try {
      return await this.booksService.create({
        title,
        price,
        rating,
        authorId,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Obsłuż unikalne naruszenie ograniczenia (np. tytuł zajęty)
        throw new ConflictException('Title is already taken');
      }
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() bookData: UpdateBookDTO,
  ) {
    if (!(await this.booksService.getById(id)))
      throw new NotFoundException('book not found');

    await this.booksService.updateById(id, bookData);
    return { success: true };
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.booksService.getById(id)))
      throw new NotFoundException('Book not found');
    await this.booksService.deleteById(id);
    return { success: true };
  }
}
