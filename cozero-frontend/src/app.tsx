import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../configs/theme";
import Layout from "../layouts/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from ".";
import ProjectsList from "../components/projects/ProjectsList";
import LoginPage from "./login";
import CreateProjectPage from "./projects/create";
import { ProjectViewPage } from "./projects/view";
import { Auth, AuthContext, AuthContextType } from "../context/auth";
import { useMemo, useState } from "react";
import { ProjectsContext } from "../context/projects";
import InactiveProjectPage from "./projects/deleted";
import UnauthenticatedView from "../layouts/UnauthenticatedView";

function App() {
  const [authContext, setAuthContext] = useState<Auth>();

  const authContextValue: AuthContextType = {
    authContext,
    setAuthContext,
  };
  const [projectsContext, setProjectsContext] = useState<string>();

  const projectsContextValue = useMemo(
    () => ({ projectsContext, setProjectsContext }),
    [projectsContext]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <ProjectsContext.Provider value={projectsContextValue}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/sign-up"
                  element={
                    <UnauthenticatedView to="/">
                      <LoginPage isSignUp={true} />
                    </UnauthenticatedView>
                  }
                />
                <Route
                  path="/sign-in"
                  element={
                    <UnauthenticatedView to="/">
                      <LoginPage isSignUp={false} />
                    </UnauthenticatedView>
                  }
                />
                <Route
                  path="/projects/create"
                  element={<CreateProjectPage />}
                />
                <Route
                  path="/projects/deleted"
                  element={<InactiveProjectPage />}
                />
                <Route
                  path="/projects/:id/edit"
                  element={<CreateProjectPage />}
                />
                <Route path="/projects" element={<ProjectsList />} />
                <Route path="/projects/:id" element={<ProjectViewPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ChakraProvider>
      </ProjectsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
