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
                <Route path="/projects" element={<ProjectsList />} />
                <Route
                  path="/sign-up"
                  element={<LoginPage isSignUp={true} />}
                />
                <Route
                  path="/sign-in"
                  element={<LoginPage isSignUp={false} />}
                />
                <Route
                  path="/projects/create"
                  element={<CreateProjectPage />}
                />
                <Route path="/projects/:id" element={<ProjectViewPage />} />
                <Route
                  path="/projects/:id/edit"
                  element={<CreateProjectPage />}
                />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ChakraProvider>
      </ProjectsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
