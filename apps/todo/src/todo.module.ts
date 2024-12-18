import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PrismaService } from './prisma.service';
import { BullModule } from '@nestjs/bull';
import { UPDATE_QUEUE } from './constants';
import { UpdateStatusProcessor } from './update-status.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: UPDATE_QUEUE,
    }),
  ],
  providers: [PrismaService, TodoService, UpdateStatusProcessor], // Добавляем PrismaService здесь
  controllers: [TodoController],
  exports: [TodoService],
})
export class TodoModule {}
