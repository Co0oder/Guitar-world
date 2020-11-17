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
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly ArticlesService: ArticlesService) {}

  @Get()
  @Render('index')
  async getArticles(@Query('page') page = 1) {
    const data = await this.ArticlesService.getArticles(page);
    console.log(page);
    return { data };
  }

  @Get('/:id')
  @Render('article')
  async getOneArticles(@Param('id') id: number) {
    const article = await this.ArticlesService.getOneArticle(id);
    return { article };
  }

  @Post()
  addNewArticle(@Body() article: Article) {
    this.ArticlesService.createArticle(article);
    return article;
  }

  @Delete('/:id')
  deleteOneArticle(@Param('id') id: number) {
    this.ArticlesService.deleteOneArticle(id);
    return 'OK';
  }
}
