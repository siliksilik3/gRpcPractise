import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PostTodoDTO } from 'proto/todo';

@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  postTodo(@Body() postTodoDTO: PostTodoDTO) {
    return this.appService.postTodo(postTodoDTO);
  }

  @Get()
  getTodos() {
    return this.appService.getTodos();
  }
  @Post('update/:id')
  updateStatus(@Param('id', ParseIntPipe) id: number) {
    return this.appService.updateSatus(id);
  }
}
