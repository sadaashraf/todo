import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  generateToken(user: User): {
    success: boolean;
    message: string;
    token: string;
    user: { id: number; firstName: string; lastName: string; email: string; role: string }
  } {

    const payload =
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      id: user.id

    };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    }
  }
}