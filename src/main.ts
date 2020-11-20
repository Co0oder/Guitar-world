import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(`${__dirname}/../public`);
  app.setBaseViewsDir(`${__dirname}/../views/templates`);
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT || '80');
}
bootstrap();
