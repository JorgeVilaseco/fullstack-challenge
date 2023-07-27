import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import Menu from "../components/menu/Menu";
import { SignInButton } from "../components/SignInButton";
import { translate } from "../utils/language.utils";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import React, { useContext, useState } from "react";
import { KeyboardKeys, onKeyPressed } from "../utils/key.utils";
import { ProjectsContext } from "../context/projects";

export default function Header() {
  const navigate = useNavigate();
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { setProjectsContext } = useContext(ProjectsContext);

  const doSearch = (data?: string) => {
    data ??= searchQuery;
    setProjectsContext(data);
    navigate("/projects");
  };
  const closeSearch = () => {
    setIsSearchActive(false);
    setSearchQuery("");
    doSearch("");
  };

  const inputStyle = {
    width: "initial",
    opacity: isSearchActive ? 1 : 0,
    transition: ".5s opacity ease",
    cursor: "pointer",
  };

  return (
    <header>
      <Flex justifyContent="space-between" p={8}>
        <Menu />
        <Flex alignItems="center" gap={3} w={"fit-content"}>
          <InputGroup size="md" style={inputStyle}>
            <Input
              id="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={($event) => setSearchQuery($event.target.value)}
              onKeyUp={(e) => {
                onKeyPressed(e, KeyboardKeys.ENTER, doSearch);
                onKeyPressed(e, KeyboardKeys.ESCAPE, closeSearch);
              }}
            />
            <InputRightElement>
              <CloseIcon boxSize={4} onClick={closeSearch} />
            </InputRightElement>
          </InputGroup>
          <SearchIcon
            id="search-btn"
            boxSize={6}
            onClick={() => {
              if (isSearchActive) doSearch();
              setIsSearchActive(true);
            }}
            style={{ cursor: "pointer" }}
          />
          <Button
            variant="outline"
            id="new-project"
            leftIcon={<AiOutlinePlus />}
            onClick={() => {
              navigate("/projects/create");
            }}
          >
            {translate("NEW_PROJECT")}
          </Button>
          <SignInButton />
        </Flex>
      </Flex>
    </header>
  );
}
