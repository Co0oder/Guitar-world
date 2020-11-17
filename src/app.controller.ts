import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Render,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Article } from './entities/article.entity';

@Controller('articles')
export class AppController {
  constructor(private readonly AppService: AppService) {}

  @Get()
  @Render('index')
  async getArticles(@Query('page') page = 1) {
    const data = await this.AppService.getArticles(page);
    console.log(page);
    return { data };
  }

  @Get('/:id')
  @Render('article')
  async getOneArticles(@Param('id') id: number) {
    const article = await this.AppService.getOneArticle(id);
    return { article };
  }

  @Post()
  addNewArticle(@Body() article: Article) {
    this.AppService.createArticle(article);
    return article;
  }

  @Delete('/:id')
  deleteOneArticle(@Param('id') id: number) {
    this.AppService.deleteOneArticle(id);
    return 'OK';
  }
}
