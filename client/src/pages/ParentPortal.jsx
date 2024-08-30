import { Flex } from "@chakra-ui/react";
import React from "react";
import Logout from "../Components/Logout";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";

function ParentPortal() {
  return (
    <Flex pos={"relative"} bg={"#EDEFF8"}h={'100vh'} overflow={'hidden'} flexDir={"row"}>
      <Sidebar />
      <Dashboard />
    </Flex>
  );
}

export default ParentPortal;
