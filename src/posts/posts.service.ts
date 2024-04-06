import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Posts } from './posts.entity';
import { Repository } from 'typeorm';
import { createPost } from './dto/createPost.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    private userService: UsersService,
  ) {}

  async createPost(post: createPost) {
    const foundUser = await this.userService.getUser(post.authorId);

    if (!foundUser) {
      return new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  getPosts() {
    return this.postsRepository.find({
      relations: ['author']
    });
  }
}
