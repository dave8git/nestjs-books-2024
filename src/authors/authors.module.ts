import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { PrismaModule } from 'src/prisma/prisma.module';
//import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [PrismaModule],
})
export class AuthorsModule {}
