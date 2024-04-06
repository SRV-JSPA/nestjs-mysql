import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/update-user.dto';
import { createProfileDto } from './dto/createProfile.dto';
import {Profile} from './profile.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>
  ) {}

  async createUser(user: CreateUserDto) {
    const foundUser = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (foundUser) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!foundUser) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return foundUser;
  }

  async deleteUser(id: number) {
    const deleteUser =  await this.userRepository.delete(id);

    if(deleteUser.affected === 0){
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return deleteUser;
  }

  async updateUser(id: number, user: updateUserDto) {
    const userFound = await this.userRepository.findOne({
        where: {
            id: id
        }
    })

    if(!userFound) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = Object.assign(userFound, user)

    return this.userRepository.save(updatedUser);
  }

  async createProfile(id: number, user: createProfileDto){
    const userFound = await this.userRepository.findOne({
      where: {
        id: id
      }
    })

    if(!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newProfile = this.profileRepository.create(user);
    const savedProfile = await this.profileRepository.save(newProfile);
    console.log(savedProfile)
    userFound.profile = savedProfile

    return this.userRepository.save(userFound);
  }
}
