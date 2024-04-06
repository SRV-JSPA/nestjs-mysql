
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {Posts} from './posts.entity'
import {UsersModule} from 'src/users/users.module'


@Module({
  imports: [TypeOrmModule.forFeature([Posts]), UsersModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
