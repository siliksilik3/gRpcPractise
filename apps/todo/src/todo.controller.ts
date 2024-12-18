import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { GrpcMethod } from '@nestjs/microservices';
import { PostTodoDTO, Todo, Todos } from 'proto/todo';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // Возвращаем объект с полем "todos", который является массивом
  @GrpcMethod('TodoService', 'GetTodos')
  async getTodos(): Promise<Todos> {
    const todos = await this.todoService.getTodos();
    return { Todos: todos }; // Используем "Todos" как имя поля в объекте
  }

  @GrpcMethod('TodoService', 'PostTodo')
  async postTodo(postTodoDTO: PostTodoDTO): Promise<Todo> {
    return this.todoService.postTodo(postTodoDTO); // Возвращаем объект Todo
  }

  @Post()
  async updateStatus(@Param('id', ParseIntPipe) id: number) {
    return await this.todoService.updateStatus(id);
  }
}
