import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import Logout from "../Components/Logout";

function ProviderPortal() {
  return (
    <Flex justify={"space-between"} w={"60%"} mt={"100px"}>
      <Heading>Providers Dashboard</Heading>

      <Box bg={"#111"} w={"200px"} h={"120px"} pos={'relative'}>
        <Logout />
      </Box>
    </Flex>
  );
}

export default ProviderPortal;
