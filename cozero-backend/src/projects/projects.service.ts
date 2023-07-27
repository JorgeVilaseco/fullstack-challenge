import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Not, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectsRepository.save(createProjectDto);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find({
      withDeleted: false,
    });
  }

  async findOne(id: number) {
    return await this.projectsRepository.findOneBy({ id });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectsRepository.update({ id }, updateProjectDto);
  }

  async remove(id: number) {
    return this.projectsRepository.softDelete(id);
  }

  async searchByTitleDesc(
    text: string,
    page: number,
    pageSize: number,
  ): Promise<Project[]> {
    return this.projectsRepository.find({
      where: [{ name: Like(`%${text}%`) }, { description: Like(`%${text}%`) }],
      skip: page * pageSize,
      take: pageSize,
      withDeleted: false,
    });
  }

  async getInactiveProjects(
    owner: string,
    page: number,
    pageSize: number,
  ): Promise<Project[]> {
    return this.projectsRepository.find({
      where: {
        owner: owner,
        deletedAt: Not(IsNull()),
      },
      skip: page * pageSize,
      take: pageSize,
      withDeleted: true,
    });
  }
}
