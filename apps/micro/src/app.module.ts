import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TodoModule } from 'apps/todo/src/todo.module';

@Module({
  imports: [
    TodoModule,
    ClientsModule.register([
      // register GRPC
      {
        name: 'todo',
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, '../todo.proto'),
          package: 'todo',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
