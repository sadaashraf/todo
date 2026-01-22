import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;


}
