import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { translate } from "../utils/language.utils";

export const SignInButton = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <Flex
      id="signin"
      onClick={() => (user ? signOut() : navigate("/sign-in"))}
      gap={4}
      cursor="pointer"
    >
      <Text>{translate(user ? "SIGN_OUT" : "SIGN_IN")}</Text>
      <Avatar name={user?.email} size="sm" />
    </Flex>
  );
};