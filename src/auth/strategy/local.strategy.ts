import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly userservice: UserService,
  ) {
    super(
      {
        usernameField: "email",
        passwordField: " password"
      }

    );
  }
  async validate(email: string, password: string): Promise<User> {
    const user = await this.userservice.userGetbyEmail(email);

    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('invalid password');
    }
    return user;

  }
}