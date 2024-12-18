import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TodoService } from 'apps/todo/src/todo.service';
import { PostTodoDTO, TODO_SERVICE_NAME, TodoServiceClient } from 'proto/todo';

@Injectable()
export class AppService implements OnModuleInit {
  private todoServiceClient: TodoServiceClient; // from proto todo.ts service!
  constructor(
    @Inject('todo')
    private clienGrpc: ClientGrpc /* inject clientGrpc to use that*/,
    private toDoService: TodoService,
  ) {}

  onModuleInit() {
    this.todoServiceClient =
      this.clienGrpc.getService<TodoServiceClient>(TODO_SERVICE_NAME); // now we can call methods from proto. They are local now
  }

  postTodo(postTodoDTO: PostTodoDTO) {
    return this.todoServiceClient.postTodo(postTodoDTO);
  }

  getTodos() {
    return this.todoServiceClient.getTodos({});
  }
  updateSatus(id: number) {
    return this.toDoService.updateStatus(id);
  }
}
