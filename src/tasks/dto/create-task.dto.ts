import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import TaskStatusEnum from '../enums/TaskStatusEnum';

export class CreateTaskDto {
  @IsString({ message: 'Title is required' })
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @IsString({ message: 'Description is required' })
  @MinLength(15)
  @MaxLength(250)
  @IsOptional()
  description: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status: TaskStatusEnum;

  @IsNotEmpty({ message: 'ProjectId is required' })
  projectId: number;
}
