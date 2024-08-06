import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import React from "react";
import {
  FaHeartbeat,
  FaQuoteLeft,
  FaSyringe,
  FaUserMd
} from "react-icons/fa";
import Navbar from "../Components/Navbar";
import hospital from "../assets/doctors.png";
import Footer from "../Components/Footer";

function Splash() {
  return (
    <>
      <Navbar />
      <Box
        mt="70px"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-around"
        alignItems="center"
        py="40px"
      >
        {/* Hero Section */}
        <Flex
          flexDir="column"
          maxW={{ base: "100%", md: "50%" }}
          textAlign={{ base: "center", md: "left" }}
          mb={{ base: "20px", md: "0" }}
        >
          <Heading fontSize={{ base: "2xl", md: "4xl" }} mb="20px">
            Welcome to Happy Hearts
          </Heading>
          <Text
            fontSize={{ base: "md", md: "md" }}
            letterSpacing="1px"
            mb="20px"
            maxW={"700px"}
          >
            Where your journey through pregnancy and motherhood is supported
            with compassionate care and expert medical services. We understand
            that this is a special time in your life, and our dedicated team is
            here to ensure both you and your baby receive the best care
            possible. From prenatal check-ups to childbirth and beyond, we stand
            by you every step of the way. We also prioritize your child's health
            with timely and effective vaccinations, ensuring they start life
            strong and healthy. Your family's well-being is our top priority.
          </Text>
          <Text
            as={"sub"}
            fontSize="sm"
            fontStyle="italic"
            letterSpacing={"1px"}
            mt="10px"
            mb="30px"
          >
            Safe Pregnancy, Healthy Babies, Caring Hands.
          </Text>
          <Button
            colorScheme="blue"
            size="md"
            w={"200px"}
            bg="#3670D3"
            color="#fff"
          >
            Learn More
          </Button>
        </Flex>
        <Flex justifyContent="center">
          <Image
            w={{ base: "100%", md: "620px" }}
            src={hospital}
            alt="Hospital"
            borderRadius="md"
          />
        </Flex>
      </Box>

      {/* Features Section */}
      <Box bg="#E9F3FF" py="50px">
        <Heading textAlign="center" mb="40px">
          Our Key Features
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-around"
          alignItems="center"
        >
          <Flex
            flexDir="column"
            alignItems="center"
            textAlign="center"
            p="20px"
          >
            <Icon as={FaHeartbeat} w={12} h={12} color="#3670D3" mb="20px" />
            <Heading fontSize="xl" mb="10px">
              Comprehensive Care
            </Heading>
            <Text maxW="300px">
              From prenatal to postnatal care, our system manages every aspect
              of maternal and child health.
            </Text>
          </Flex>
          <Flex
            flexDir="column"
            alignItems="center"
            textAlign="center"
            p="20px"
          >
            <Icon as={FaSyringe} w={12} h={12} color="#3670D3" mb="20px" />
            <Heading fontSize="xl" mb="10px">
              Vaccination Tracking
            </Heading>
            <Text maxW="300px">
              Keep track of all necessary vaccinations for your child with
              timely reminders and updates.
            </Text>
          </Flex>
          <Flex
            flexDir="column"
            alignItems="center"
            textAlign="center"
            p="20px"
          >
            <Icon as={FaUserMd} w={12} h={12} color="#3670D3" mb="20px" />
            <Heading fontSize="xl" mb="10px">
              Expert Consultations
            </Heading>
            <Text maxW="300px">
              Access top medical professionals and get expert advice right from
              the comfort of your home.
            </Text>
          </Flex>
        </Flex>
      </Box>

      {/* Testimonials Section */}
      <Box bg="#F9FAFB" py="50px" px={{ base: "20px", md: "40px" }}>
        <Heading textAlign="center" mb="40px">
          What Our Patients Say
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="40px">
          <Box
            textAlign="center"
            p="20px"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
          >
            <Icon as={FaQuoteLeft} w={8} h={8} color="#3670D3" mb="20px" />
            <Text fontSize="md" mb="20px">
              "The care and attention we received at Happy Hearts was
              outstanding. We felt supported every step of the way."
            </Text>
            <Flex alignItems="center" justifyContent="center">
              <Avatar
                name="John Doe"
                src="https://bit.ly/dan-abramov"
                mr="10px"
              />
              <Text fontWeight="bold">John Doe</Text>
            </Flex>
          </Box>
          <Box
            textAlign="center"
            p="20px"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
          >
            <Icon as={FaQuoteLeft} w={8} h={8} color="#3670D3" mb="20px" />
            <Text fontSize="md" mb="20px">
              "The clinic's system made scheduling appointments a breeze. We
              highly recommend Happy Hearts!"
            </Text>
            <Flex alignItems="center" justifyContent="center">
              <Avatar
                name="Jane Smith"
                src="https://bit.ly/kent-c-dodds"
                mr="10px"
              />
              <Text fontWeight="bold">Jane Smith</Text>
            </Flex>
          </Box>
          <Box
            textAlign="center"
            p="20px"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
          >
            <Icon as={FaQuoteLeft} w={8} h={8} color="#3670D3" mb="20px" />
            <Text fontSize="md" mb="20px">
              "We appreciated the timely and effective care our child received.
              Thank you, Happy Hearts!"
            </Text>
            <Flex alignItems="center" justifyContent="center">
              <Avatar
                name="Sarah Lee"
                src="https://bit.ly/prosper-baba"
                mr="10px"
              />
              <Text fontWeight="bold">Sarah Lee</Text>
            </Flex>
          </Box>
        </SimpleGrid>
      </Box>

      {/* How It Works Section */}
      <Box py="50px" px={{ base: "20px", md: "40px" }} bg="#E9F3FF">
        <Heading textAlign="center" mb="40px">
          How It Works
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="40px">
          <Box textAlign="center" p="20px" borderWidth="1px" borderRadius="lg">
            <Heading fontSize="lg" mb="10px">
              1. Sign Up
            </Heading>
            <Text>Create an account to access all our services.</Text>
          </Box>
          <Box textAlign="center" p="20px" borderWidth="1px" borderRadius="lg">
            <Heading fontSize="lg" mb="10px">
              2. Schedule Appointments
            </Heading>
            <Text>
              Book appointments with ease using our intuitive platform.
            </Text>
          </Box>
          <Box textAlign="center" p="20px" borderWidth="1px" borderRadius="lg">
            <Heading fontSize="lg" mb="10px">
              3. Receive Care
            </Heading>
            <Text>
              Get the care you need from our experienced medical professionals.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
      <Footer />
    </>
  );
}

export default Splash;
