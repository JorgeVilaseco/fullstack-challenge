import {Flex, Stack, Text, useToast} from "@chakra-ui/react";
import React, {useCallback, useContext, useEffect, useState,} from "react";
import {ProjectsEmptyState} from "./ProjectsEmptyState";
import {Project} from "../../interfaces/project.interface";
import ProjectsService from "../../services/ProjectsService";
import {translate} from "../../utils/language.utils";
import ProjectItem from "./ProjectItem";
import {useNavigate} from "react-router";
import {ProjectsContext} from "../../context/projects";

//TODO: Move lazy loading to independent hook
export default function ProjectsList() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const { projectsContext } = useContext(ProjectsContext);
  const navigate = useNavigate();
  const toast = useToast();

  const fetchProjects = useCallback(async (query?: string, page?: number) => {
    let projects: Project[];
    if (query) {
      projects = (await ProjectsService.fetchProjectsBy(query, page, 15)) || [];
      if (projects.length !== 0) {
        if (page) {
          setProjectList((prevProjects) => [...prevProjects, ...projects]);
        } else {
          setProjectList(projects);
        }
        window.addEventListener("scroll", onScroll);
      }
    } else {
      projects = (await ProjectsService.fetchProjects()) || [];
      if (projects.length !== 0) setProjectList(projects);
    }
    setIsLoading(false);
  }, []);
  const onScroll = () => {
    const listContainer = document.getElementById("project-list");
    if (!listContainer) return;
    const { scrollY } = window;
    const isNearBottom = scrollY >= listContainer.clientHeight * 0.8;

    if (isNearBottom) {
      console.log("Reached bottom");
      setPage((prevState) => prevState + 1);
      window.removeEventListener("scroll", onScroll);
    }
  };
  useEffect(() => {
    setPage(0);
  }, [projectsContext]);

  useEffect(() => {
    fetchProjects(projectsContext, page);
  }, [page, projectsContext]);

  useEffect(() => {
    console.log();
    window.addEventListener("scroll", onScroll);
    // Clean-up
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onDelete = async (projectId: string) => {
    const deletedProject = await ProjectsService.deleteProject(projectId);

    toast({
      title: translate(
        deletedProject ? "PROJECT_DELETED" : "PROJECTED_DELETE_ERROR"
      ),
      description: translate(
        deletedProject
          ? "PROJECT_DELETED_DESCRIPTION"
          : "PROJECT_DELETE_ERROR_DESCRIPTION"
      ),
      status: deletedProject ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });

    if (deletedProject) {
      setProjectList(projectList.filter((project) => project.id !== projectId));
    }
  };

  if (projectList.length === 0 && !isLoading) {
    return <ProjectsEmptyState />;
  }

  return (
    <Stack id="project-list" spacing={8}>
      {projectList?.map((project) => (
        <ProjectItem key={project.id} project={project} onDelete={onDelete} />
      ))}
      <Flex gap={2} justifyContent="center">
        <Text>{translate("PROJECTS_FOOTER_CTA")}</Text>
        <Text
          onClick={() => navigate(`/projects/create`)}
          cursor="pointer"
          fontWeight="bold"
          color="green.500"
          textAlign="center"
        >
          {translate("PROJECTS_FOOTER_CTA_BUTTON")}
        </Text>
      </Flex>
    </Stack>
  );
}
