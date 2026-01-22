import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport/dist/auth.guard";
import { AuthService } from "./auth.service";
import { loginDto } from "./auth.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req, @Body() loginDto: loginDto) {
    return this.authService.generateToken(req.user);
  }
}