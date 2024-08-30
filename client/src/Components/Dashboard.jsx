import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Grid, GridItem } from "@chakra-ui/react";

function Dashboard() {
  const [date, setDate] = useState(new Date());
  return (
    <Box
      pos={"absolute"}
      w="calc(100% - 250px)"
      py={"20px"}
      px={"20px"}
      ml={"200px"}
      left={"50px"}
      bg={"#EDEFF8"}
      h={"100vh"}
      overflowY={"auto"}
    >
      <Flex
        justify={"space-between"}
        py={"8px"}
        borderRadius={".5rem"}
        align={"center"}
        bg={"#fff"}
        px={"10px"}
      >
        <Text mt={"10px"}>
          Welcome back,
          <Heading fontSize={"20px"}>Rachel Mwangi</Heading>
        </Text>
        <Box bg={"#3670d3"} borderRadius={"50%"} h={"50px"} w={"50px"} />
      </Flex>
      <Flex mt={"30px"} gap={"50px"} alignItems={'flex-start'}>
        {/* Main Content Section */}
        <Flex flexBasis="80%" gap={"10px"} flexWrap={"wrap"}>
          <Grid
            w="100%"
            templateRows={{ base: "repeat(6, 1fr)", md: "repeat(3, 1fr)" }}
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(6, 1fr)" }}
            gap={"20px"}
            rowGap={"50px"}
            columnGap={"40px"}
            minW={"800px"}
          >
            <GridItem
              rowSpan={1}
              borderRadius={".7rem"}
              colSpan={2}
              bg="lavenderpurple"
              color={"#fff"}
              py={"3px"}
              px={"10px"}
              shadow={" 0 2px 8px rgba(0, 0, 0, 0.1)"}
              borderLeft={"8px"}
              borderColor={"lavenderpurple"}
            >
              <Heading size={"md"} mb={"10px"}>
                Children
              </Heading>
              <Text>Emerson Wambugu</Text>
              <Text>2 years 3 weeks</Text>
              <Text>Vaccination status: Pending</Text>
            </GridItem>

            <GridItem
              colSpan={2}
              rowSpan={1}
              borderRadius={".7rem"}
              bg="hospitalgreen"
              py={"3px"}
              px={"10px"}
              shadow={" 0 2px 8px rgba(0, 0, 0, 0.1)"}
              color={"#fff"}
            >
              <Heading size={"md"} mb={"10px"}>
                Upcoming Appointments
              </Heading>
              <Text>Emerson Wambugu</Text>
              <Text>2 years 3 weeks</Text>
              <Text>Vaccination status: Pending</Text>
            </GridItem>

            <GridItem
              colSpan={2}
              color="#fff"
              py={"3px"}
              px={"10px"}
              borderRadius={".7rem"}
              shadow={" 0 2px 8px rgba(0, 0, 0, 0.1)"}
              bg={"happyblue"}
            >
              <Heading size={"md"} mb={"10px"}>
                Present Pregnancy
              </Heading>
              <Text>Emerson Wambugu</Text>
              <Text>2 years 3 weeks</Text>
              <Text>Vaccination status: Pending</Text>
            </GridItem>

            <GridItem
              colSpan={3}
              rowSpan={2}
              bg="#fff"
              py={"3px"}
              px={"10px"}
              shadow={" 0 2px 8px rgba(0, 0, 0, 0.1)"}
            >
              <Heading size={"md"} mb={"10px"}>
                Vaccination records
              </Heading>
              <Text>Emerson Wambugu</Text>
              <Text>2 years 3 weeks</Text>
              <Text>Vaccination status: Pending</Text>
            </GridItem>
            <GridItem
              rowSpan={2}
              borderRadius={".7rem"}
              colSpan={3}
              bg="#fff"
              py={"3px"}
              px={"10px"}
              shadow={" 0 2px 8px rgba(0, 0, 0, 0.1)"}
            >
              <Heading size={"md"} mb={"10px"}>
                Payment records
              </Heading>
              <Text>Emerson Wambugu</Text>
              <Text>2 years 3 weeks</Text>
              <Text>Vaccination status: Pending</Text>
            </GridItem>
          </Grid>
        </Flex>

        {/* Calendar Section */}
        <Box
          flexBasis="20%"
          display={"flex"}
          flexDir={"column"}
          shadow={" 0 2px 8px rgba(0, 0, 0, 0.1)"}
          borderRadius={".7rem"}
          p={"20px"}
          bg={"#fff"}
          flexGrow={0}
          alignSelf="flex-start"
        >
          <Heading color={"#111"} py={"8px"} fontSize={"20px"} mb={"10px"}>
            Date
          </Heading>
          <Box>
            <Calendar
              onChange={setDate}
              value={date}
              formatShortWeekday={(locale, date) =>
                date.toLocaleDateString(locale, { weekday: "narrow" })
              }
              nextLabel={null}
              prevLabel={null}
            />
            <Heading color={"#111"}  fontSize={"20px"} mt={'6px'}>
              Doctors appointment
            </Heading>
            <Box
              bg={"#fff"}
              mt={"10px"}
              py={"14px"}
              px={"7px"}
              borderRadius={".7rem"}
              shadow={" 0 2px 8px rgba(0, 0, 0, 0.1)"}
            >
              <Text></Text>
              <Text>Child Vaccination</Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Dashboard;
