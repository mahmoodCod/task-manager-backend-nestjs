import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  name: string;
}
