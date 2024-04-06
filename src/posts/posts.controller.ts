import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import {PostsService} from './posts.service'
import {Posts} from './posts.entity'
import {createPost} from './dto/createPost.dto'


@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    getPosts(): Promise<Posts[]> {
        return this.postsService.getPosts();
    }

    @Post()
    createPost(@Body() newPost: createPost) {
        return this.postsService.createPost(newPost);
    }

}
