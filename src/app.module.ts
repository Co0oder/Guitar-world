import { Module } from '@nestjs/common';
import 'dotenv/config';
import { ArticlesModule } from './articles/articles.module';
import { ArticlesController } from './articles/articles.controller'
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ArticlesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
   }),],
  controllers: [ArticlesController],
  providers: [AppService],
})
export class AppModule {}
