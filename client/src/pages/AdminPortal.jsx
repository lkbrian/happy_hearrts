import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import Logout from '../Components/Logout';

function AdminPortal() {
  return (
    <Flex justify={"space-between"} w={"60%"} mt={"100px"}>
      <Heading>Admin Dashboard</Heading>
      <Logout />
    </Flex>
  );
}

export default AdminPortal