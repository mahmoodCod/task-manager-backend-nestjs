/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsString } from 'class-validator';
import ProjectStatusEnum from '../enums/ProjectStatusEnum';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsEnum(ProjectStatusEnum)
  status: ProjectStatusEnum;
}
