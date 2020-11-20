import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Article)
    private ArticleEntity: Repository<Article>,
  ) {}

  async getArticles(page: number) {
    const limit = 3;
    const amountOfArticles = await this.ArticleEntity.count();
    const pages = Math.ceil(amountOfArticles / limit);
    const articles = await this.ArticleEntity.find({
      select: ['id', 'title', 'image'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      articles,
      pages,
      page,
    };
  }

  async getOneArticle(id: number) {
    const articles = await this.ArticleEntity.findOne(id, {
      select: ['title', 'content'],
    });
    return articles;
  }

  createArticle(article: Article) {
    this.ArticleEntity.save(article);
  }

  async deleteOneArticle(id: number) {
    const article = await this.ArticleEntity.findOne(id);
    this.ArticleEntity.remove(article);
  }

  async deleteAllArticles() {
    const articles = await this.ArticleEntity.find();
    this.ArticleEntity.remove(articles);
  }
}
