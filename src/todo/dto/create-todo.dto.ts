import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  userId: number;
}
