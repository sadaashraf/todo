import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Like, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { todo } from 'node:test';

@Injectable()

export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(title: string, userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User is not found");
    }

    const todo = this.todoRepository.create({
      title,
      completed: false,
      user,
    });

    return await this.todoRepository.save(todo);
  }


  async findAll(search?: string) {
    const query = await this.todoRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.user', 'user')
    // .where('todo.completed = :completed', { completed: false });

    if (search) {
      query.andWhere({ title: Like(`%${search}%`), completed: false });
    }

    return query.getMany();
  }

  findAlltrue() {
    return this.todoRepository.find({
      relations: ['user'], where: { completed: true }
    });
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }


  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    Object.assign(todo, updateTodoDto);
    return await this.todoRepository.save(todo);
  }

  async remove(id: number) {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!todo) {
      throw new NotFoundException('Todo  not found');
    }

    return await this.todoRepository.delete(id);
  }

  async markComplete(id: number) {
    const result = await this.todoRepository.update(id, {
      completed: true,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Todo not found');
    }

    return { message: 'Todo marked as completed' };
  }

}
