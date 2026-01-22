import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { roleGuard } from 'src/auth/strategy/role.Guad';
import { ApiSecurity } from '@nestjs/swagger/dist/decorators/api-security.decorator';

@Controller('user')

export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiSecurity('JWT_Auth')
  @Get()
  @UseGuards(new roleGuard('admin'))
  findAll(@Req() req) {
    // console.log(req.user);
    return this.userService.findAll();
  }
  @ApiSecurity('JWT_Auth')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    // console.log(req.user);
    return this.userService.findOne(+id);
  }

  @ApiSecurity('JWT_Auth')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiSecurity('JWT_Auth')
  @Delete(':id')
  @UseGuards(new roleGuard('admin'))
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiSecurity('JWT_Auth')
  @Patch(':id/make-admin')
  makeAdmin(@Param('id') id: string) {
    return this.userService.makeAdmin(+id);
  }
}
