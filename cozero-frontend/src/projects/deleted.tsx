import { Stack } from "@chakra-ui/react";
import AuthenticatedView from "../../layouts/AuthenticatedView";
import InactiveProjectsList from "../../components/projects/DeletedProjectsList";

const InactiveProjectPage = () => (
  <AuthenticatedView>
    <Stack spacing={8}>
      <InactiveProjectsList />
    </Stack>
  </AuthenticatedView>
);

export default InactiveProjectPage;
