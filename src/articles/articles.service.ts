import {Injectable} from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm'
import { Article } from './entities/article.entity'
import { Repository } from 'typeorm'
@Injectable()
export class ArticlesService{

    constructor(
        @InjectRepository(Article)
        private ArticleEntity: Repository<Article>
    ) {}

    async getArticles(){
        const articles = await this.ArticleEntity.find({select: ['title'] })
        return articles;
    }

    async getOneArticle(id: number){
        const articles = await this.ArticleEntity.find({select : ['id','title'], where : {id}});
        return articles;
    }

    createArticle(article: Article){
        this.ArticleEntity.save(article);
    }

    deleteOneArticle(id: number){
        this.ArticleEntity.delete(id);
    }
}