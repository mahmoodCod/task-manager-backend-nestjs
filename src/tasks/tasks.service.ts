import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import TaskStatusEnum from './enums/TaskStatusEnum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const { projectId, ...taskData } = createTaskDto;

      const project = await this.projectRepository.findOneBy({ id: projectId });

      if (!project) {
        throw new NotFoundException('Project not found !!');
      }
      const createTask = this.taskRepository.create({
        ...taskData,
        project,
      });

      return await this.taskRepository.save(createTask);
    } catch (error) {
      throw new BadRequestException('Error created project!!');
    }
  }

  async findAll(status?: TaskStatusEnum, limit: number = 10, page: number = 1) {
    const query = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project');

    if (status) {
      query.where('tasks.status = :status', { status });
    }

    query.skip((page - 1) * limit).take(limit);

    return await query.getMany();
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['project'],
    });

    if (!task) {
      throw new NotFoundException(`Task ${id} not found !!`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const updateTask = await this.taskRepository.findOneBy({ id });

    if (!updateTask) {
      throw new NotFoundException(`Task ${id} not found !!`);
    }

    await this.taskRepository.update(id, updateTaskDto);

    return this.taskRepository.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
