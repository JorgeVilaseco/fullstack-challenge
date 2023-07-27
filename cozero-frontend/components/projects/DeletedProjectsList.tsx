import { Flex, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { ProjectsEmptyState } from "./ProjectsEmptyState";
import { Project } from "../../interfaces/project.interface";
import ProjectsService from "../../services/ProjectsService";
import { translate } from "../../utils/language.utils";
import ProjectItem from "./ProjectItem";
import { useNavigate } from "react-router";

export default function InactiveProjectsList() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();
  const toast = useToast();

  const fetchProjects = useCallback(async () => {
    const projects = await ProjectsService.fetchInactiveProjects(page, 15);
    if (projects && projects?.length !== 0) {
      setProjectList(projects);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const onReinstate = async (projectId: string) => {
    const reinstatedProject = await ProjectsService.reinstateProject(projectId);

    toast({
      title: translate(
        reinstatedProject ? "PROJECT_REINSTATED" : "PROJECTED_REINSTATED_ERROR"
      ),
      description: translate(
        reinstatedProject
          ? "PROJECT_REINSTATED_DESCRIPTION"
          : "PROJECT_REINSTATED_ERROR_DESCRIPTION"
      ),
      status: reinstatedProject ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });

    if (reinstatedProject) {
      setProjectList(projectList.filter((project) => project.id !== projectId));
    }
  };

  if (projectList.length === 0 && !isLoading) {
    return <ProjectsEmptyState />;
  }

  return (
    <Stack spacing={8}>
      {projectList?.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          onReinstate={onReinstate}
        />
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
