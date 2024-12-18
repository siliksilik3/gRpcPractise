import { NestFactory } from '@nestjs/core';
import { TodoModule } from './todo.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TodoModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../todo.proto'), // watch at dist folder!!!
        package: 'todo', // our proto package name
      },
    },
  );
  await app.listen();
}
bootstrap();
