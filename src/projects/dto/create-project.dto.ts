/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import ProjectStatusEnum from '../enums/ProjectStatusEnum';

export class CreateProjectDto {
  @IsString({ message: 'Name is required' })
  @MinLength(3)
  @MaxLength(15)
  name: string;

  @IsEnum(ProjectStatusEnum)
  status: ProjectStatusEnum;
}
