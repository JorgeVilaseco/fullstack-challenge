import {
  CreateProjectDto,
  DeleteProjectResult,
  Project,
  UpdateProjectDto,
  UpdateProjectResult,
} from "../interfaces/project.interface";
import HTTPService from "./HTTPService";
import LocalStorageService from "./LocalStorageService";

class ProjectsService {
  public async fetchProjects(): Promise<Project[] | undefined> {
    try {
      const projects = await HTTPService.get<Project[]>(`projects`);

      return this.sortProjects(projects);
    } catch (e) {
      console.log("Error fetching projects", e);
      return Promise.resolve([]);
    }
  }

  public async fetchProjectsBy(
    queryParam: string,
    page = 0,
    pageSize = 10
  ): Promise<Project[] | undefined> {
    try {
      const projects = await HTTPService.get<Project[]>(
        `projects/search?queryParam=${queryParam}&page=${page}&pageSize=${pageSize}`
      );

      return this.sortProjects(projects);
    } catch (e) {
      console.log("Error fetching projects by ", queryParam, e);
      return Promise.resolve([]);
    }
  }

  public async fetchInactiveProjects(
    page = 0,
    pageSize = 10
  ): Promise<Project[] | undefined> {
    try {
      const jwtToken = LocalStorageService.getJwtToken();

      const projects = await HTTPService.get<Project[]>(
        `projects/inactive?page=${page}&pageSize=${pageSize}`,
        jwtToken
      );
      return this.sortProjects(projects);
    } catch (e) {
      console.log("Error fetching inactive projects", e);
      return Promise.resolve([]);
    }
  }

  public async fetchProjectById(id: string): Promise<Project | undefined> {
    try {
      return HTTPService.get<Project>(`projects/${id}`);
    } catch (e) {
      console.log("Error fetching projects by id", e);
      return Promise.resolve(undefined);
    }
  }

  public async updateProject(
    updatedProject: UpdateProjectDto
  ): Promise<UpdateProjectResult | undefined> {
    try {
      const jwtToken = LocalStorageService.getJwtToken();
      return HTTPService.put(
        `projects/${updatedProject.id}`,
        updatedProject,
        jwtToken
      );
    } catch (e) {
      console.log("Error updating project", e);
    }
  }

  public async createProject(
    createProjectDto: CreateProjectDto
  ): Promise<Project | undefined> {
    try {
      const jwtToken = LocalStorageService.getJwtToken();
      return HTTPService.post<Project>(
        `projects/create`,
        createProjectDto,
        jwtToken
      );
    } catch (e) {
      console.log("Error creating project", e);
    }
  }

  public async deleteProject(
    id: string
  ): Promise<DeleteProjectResult | undefined> {
    try {
      const jwtToken = LocalStorageService.getJwtToken();
      return HTTPService.delete(`projects/${id}`, jwtToken);
    } catch (e) {
      console.log("Error deleting project", e);
    }
  }

  public sortProjects = (projects: Project[] | undefined) => {
    return projects?.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  public async reinstateProject(
    id: number
  ): Promise<DeleteProjectResult | undefined> {
    try {
      const jwtToken = LocalStorageService.getJwtToken();
      return HTTPService.put<DeleteProjectResult>(
        `projects/reinstate/${id}`,
        {},
        jwtToken
      );
    } catch (e) {
      console.log("Error reinstating project", e);
    }
  }
}

export default new ProjectsService();
