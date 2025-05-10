import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}

bootstrap()
  .then(() => {
    console.log('Application started on port', PORT);
  })
  .catch((err) => {
    console.error('Error starting the application:', err);
    process.exit(1);
  });
