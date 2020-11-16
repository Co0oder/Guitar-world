import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body
} from '@nestjs/common'
import { ArticlesService } from './articles.service'
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticlesController{

    constructor(private readonly ArticlesService: ArticlesService) {}

    @Get()
    getArticles(){
        return this.ArticlesService.getArticles();
    }

    @Get('/:id')
    getOneArticles(@Param('id') id: number){
        return this.ArticlesService.getOneArticle(id);
    }

    @Post()
    addNewArticle(@Body() article : Article){
        this.ArticlesService.createArticle(article);
        return article;
        
    }

    @Delete('/:id')
    deleteOneArticle(@Param('id') id: number){
        this.ArticlesService.deleteOneArticle(id);
        return 'OK'
    }

}