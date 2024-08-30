import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBaby,
  FaSyringe,
  FaFileMedical,
  FaUser,
  FaUserShield,
} from "react-icons/fa";
import logo from "../assets/logo_white.png";
import Logout from "./Logout";

function Sidebar() {
  return (
    <Box
      color={"#FFF"}
      h={"100vh"}
      bg="#023047"
      w="250px"
      minW={'250px'}
      // pos="fixed"
      // top="0"
      // left="0"
      zIndex="1"
      display={"flex"}
      flexDir={"column"}
      justify={"space-between"}
    >
      {/* Logo and Clinic Name */}
      <Flex direction="column" align="center" mb={{ base: "20px", md: "0" }}>
        <Image src={logo} w="80px" alt="Clinic Logo" />
        <Text fontSize="lg" color="#FFF" mt="10px" fontWeight="bold">
          Happy Hearts
        </Text>
      </Flex>

      {/* Navigation Links */}
      <Stack mt={"30px"} letterSpacing={"1px"} spacing={4}>
        <NavLink
          className={"sidebar_link"}
          to={"/parents_portal/dashboard"}
        >
          <FaHome style={{ marginRight: "10px" }} />
          Dashboard
        </NavLink>
        <NavLink
          className={"sidebar_link"}
          to={"/parents_portal/prenatal"}
        >
          <FaBaby style={{ marginRight: "10px" }} />
          Pre-natal
        </NavLink>
        <NavLink
          className={"sidebar_link"}
          to={"/parents_portal/aninatal"}
        >
          <FaSyringe style={{ marginRight: "10px" }} />
          Anti-natal
        </NavLink>
        <NavLink
          className={"sidebar_link"}
          to={"/parents_portal/medications"}
        >
          <FaFileMedical style={{ marginRight: "10px" }} />
          Medications
        </NavLink>
        <NavLink
          className={"sidebar_link"}
          to={"/parents_portal/child_info"}
        >
          <FaUser style={{ marginRight: "10px" }} />
          Child Information
        </NavLink>
        <NavLink
          className={"sidebar_link"}
          to={"/parents_portal/personal_info"}
        >
          <FaUserShield style={{ marginRight: "10px" }} />
          Personal Information
        </NavLink>
      </Stack>

      {/* Logout Button */}
      <Box >
        <Logout />
      </Box>
    </Box>
  );
}

export default Sidebar;
