import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log('App started on port 3010');
  await app.listen(3010);
}
bootstrap();
