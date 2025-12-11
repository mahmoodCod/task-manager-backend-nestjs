import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import ProjectStatusEnum from './enums/ProjectStatusEnum';
import { Response } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Res() res: Response,
  ) {
    const createProject = await this.projectsService.create(createProjectDto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: createProject,
      message: 'Projects created successfully :))',
    });
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('status') status?: ProjectStatusEnum,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const projects = await this.projectsService.findAll(status, limit, page);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: projects,
      message: 'Projects all successfully :))',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const getProject = await this.projectsService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: getProject,
      message: 'Projects get successfully :))',
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Res() res: Response,
  ) {
    const updateProject = await this.projectsService.update(
      +id,
      updateProjectDto,
    );
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: updateProject,
      message: 'Projects updated successfully :))',
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
