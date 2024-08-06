import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/t_logo.png"

function Navbar() {
  return (
    <Flex
      justify="space-between"
      width={"100%"}
      px={{ base: 4, md: 50 }}
      h={70}
      align={"center"}
      top={0}
      pos={"fixed"}
      zIndex={"2"}
      bg={"#fff"}
    >
      <Flex as="h4" size="md" fontWeight={"bold"} flexDir={'column'} align={'center'} >
        <Image src={logo} w={'50px'} alt="logo" />
        <Text color={'#2b3580'}>Happy Hearts</Text>
      </Flex>
      <Box display="flex" gap={4} mr={"50px"}>
        {/* <NavLink className="links" to="/">
          Home
        </NavLink>
        <NavLink className="links" to="/about">
          About
        </NavLink>
        <NavLink className="links" to="/contact">
          Contact
        </NavLink>
        <NavLink className="links" to="/services">
          Services
        </NavLink> */}
        <NavLink className={"login"} to={"/login"}>
          Login
        </NavLink>
        <NavLink className={"register"} to={"/register"}>
          Get Started
        </NavLink>
      </Box>
    </Flex>
  );
}

export default Navbar;
