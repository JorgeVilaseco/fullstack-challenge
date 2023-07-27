import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SkipAuth } from '@Decorator/skipAuth.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('create')
  create(@Body() project: CreateProjectDto, @Req() req) {
    project.owner = req.user.email;
    return this.projectsService.create(project);
  }

  @SkipAuth()
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @SkipAuth()
  @Get('/search')
  search(
    @Query('queryParam') text: string,
    @Query('page') page = 0,
    @Query('pageSize') pageSize = 10,
  ) {
    return this.projectsService.searchByTitleDesc(text, page, pageSize);
  }

  @Get('inactive')
  getInactives(
    @Query('page') page = 0,
    @Query('pageSize') pageSize = 10,
    @Req() req,
  ) {
    return this.projectsService.getInactiveProjects(
      req.user.email,
      page,
      pageSize,
    );
  }

  @SkipAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
