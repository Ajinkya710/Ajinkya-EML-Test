import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { STATUS } from './todo.entity'; // Importing the enum

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  todo: string;

  @IsEnum(STATUS) // Ensures only 0 or 1 values
  completed: STATUS;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional() // Optional dueDate, but should be a valid date string
  @IsString()
  dueDate?: string;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  todo?: string;

  @IsOptional()
  @IsEnum(STATUS) // Ensures only 0 or 1 values for completed
  completed?: STATUS;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  dueDate?: string;
}
