import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { STATUS } from './todo.entity';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  todo: string;

  @IsEnum(STATUS)
  completed: STATUS;

  @IsOptional()
  @IsString()
  dueDate?: string;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  todo?: string;

  @IsOptional()
  @IsEnum(STATUS)
  completed?: STATUS;

  @IsOptional()
  @IsString()
  dueDate?: string;
}
