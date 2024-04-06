import { UsersService } from './users.service';
import { Controller, Body, Post, Get, Param, ParseIntPipe, Delete, Put, Patch } from '@nestjs/common';
import {CreateUserDto} from './dto/createUser.dto'
import {User} from './user.entity'
import { DeleteResult } from 'typeorm';
import {updateUserDto} from './dto/update-user.dto'
import {createProfileDto} from './dto/createProfile.dto'

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers()
    }

    @Post()
    createUser(@Body() newUser: CreateUserDto) { 
        return this.userService.createUser(newUser);
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id:number) {
        return this.userService.getUser(id)
    }

    @Delete(':id')
    deleteUser(@Param('id',ParseIntPipe ) id: number){
        return this.userService.deleteUser(id)
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: updateUserDto) { 
        return this.userService.updateUser(id, user)
    }

    @Post(':id/profile')
    createProfile(@Param('id', ParseIntPipe) id: number, @Body() user: createProfileDto){
        return this.userService.createProfile(id, user)
    }
}
