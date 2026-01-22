import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "First name is required" })
  @MinLength(2, { message: "First name must be at least 2 characters" })
  @MaxLength(30, { message: "First name is too long" })
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "Last name is required" })
  @MinLength(2, { message: "Last name must be at least 2 characters" })
  @MaxLength(30, { message: "Last name is too long" })
  lastName: string;

  @ApiProperty()
  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters" })
  // @Matches(/\S+@\S+\.\S+/, { message: 'Invalid Email' })
  password: string;
}
