import ProjectStatusEnum from '../enums/ProjectStatusEnum';

export class CreateProjectDto {
  name!: string;

  status!: ProjectStatusEnum;
}
