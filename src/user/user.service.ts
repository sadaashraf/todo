import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private userRepository: Repository<User>
  ) { }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    if (!user) { throw new NotFoundException('user not created') }
    return this.userRepository.save(user);
  }
  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found')
    }
    return user;
  }

  userGetbyEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) { throw new NotFoundException('user not found') }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }


  remove(id: number) {
    const user = this.userRepository.findOneBy({ id });
    if (!user) { throw new NotFoundException('user not found') }
    return this.userRepository.delete(id);
  }
}
