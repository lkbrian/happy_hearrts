import {
  Box,
  Flex,
  Image,
  Text,
  Link,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo_white.png";

function Footer() {
  return (
    <Box
      bg="#023047"
      pt={{ base: "20px", md: "50px" }}
      px={{ base: "20px", md: "50px" }}
      w="100%"
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-around"
        align="center"
      >
        <Flex direction="column" align="center" mb={{ base: "20px", md: "0" }}>
          <Image src={logo} w="150px" alt="logo" />
          <Text fontSize="lg" color="#FFF" mt="10px" fontWeight="bold">
            Happy Hearts
          </Text>
        </Flex>

        <VStack spacing="20px" color="#FFF" align={'start'} textAlign="center" fontSize="sm">
          <Text fontSize="lg" fontWeight="bold">
            Get in Touch
          </Text>
          <Text>1234 Clinic Road, Wellness City, HC 56789</Text>
          <Text>Email: info@happyhearts.com</Text>
          <Text>Phone: (123) 456-7890</Text>
        </VStack>

        <VStack spacing="10px" align="start" color="#FFF">
          <Text fontSize="lg" fontWeight="bold">
            Quick Links
          </Text>
          <Link href="#">Home</Link>
          <Link href="#">About Us</Link>
          <Link href="#">Services</Link>
          <Link href="#">Contact</Link>
        </VStack>
        <VStack spacing="10px" align="Start" color="#FFF">
          <Text fontSize="lg" fontWeight="bold">
            Services
          </Text>
          <Link href="#">Consulatation</Link>
          <Link href="#">Appointment Sceduling</Link>
          <Link href="#">Patient Records</Link>
          <Link href="#">Diagnosis</Link>
        </VStack>
      </Flex>

      <Flex
        borderTop={"1px"}
        borderColor={"#E9F3FF"}
        align={"center"}
        justify="center"
        gap="20px"
        pt={{ base: "10px", md: "15px" }}
        color="#FFF"
      >
        {" "}
        <Text textAlign="center" fontSize="xs" color="#FFF">
          © {new Date().getFullYear()} Happy Hearts. All rights reserved.
        </Text>
        <Link href="https://facebook.com" isExternal>
          <Icon as={FaFacebook} boxSize="6" />
        </Link>
        <Link href="https://twitter.com" isExternal>
          <Icon as={FaTwitter} boxSize="6" />
        </Link>
        <Link href="https://instagram.com" isExternal>
          <Icon as={FaInstagram} boxSize="6" />
        </Link>
      </Flex>
    </Box>
  );
}

export default Footer;
