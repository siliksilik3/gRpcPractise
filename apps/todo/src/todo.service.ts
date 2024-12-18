import { Injectable } from '@nestjs/common';
import { PostTodoDTO } from 'proto/todo';
import { PrismaService } from './prisma.service';
import { InjectQueue } from '@nestjs/bull';
import { UPDATE_QUEUE } from './constants';
import { Queue } from 'bull';

@Injectable()
export class TodoService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue(UPDATE_QUEUE) private readonly updateQueue: Queue,
  ) {} // Внедрение PrismaService

  async getTodos() {
    return this.prisma.toDo.findMany(); // Используем Prisma для получения всех задач
  }

  async postTodo(postTodoDTO: PostTodoDTO) {
    return this.prisma.toDo.create({
      data: {
        description: postTodoDTO.description,
        isDone: postTodoDTO.isDone,
      },
    }); // Создание новой задачи в базе данных
  }
  async updateStatus(id: number) {
    console.log('HELLO');
    const found = await this.prisma.toDo.findUnique({
      where: {
        id: id,
      },
    });
    const newStatus = !found.isDone;
    await this.prisma.toDo.update({
      where: {
        id: id,
      },
      data: {
        isDone: newStatus,
      },
    });
    if (newStatus) {
      await this.updateQueue.add('updateStatus', { id }, { delay: 1000 });
    }
  }
}
