import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { localStrategy } from "./strategy/local.strategy";
import { AuthController } from "./auth.controller";

@Module({
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
  providers: [localStrategy],
})
export class AuthModule { }