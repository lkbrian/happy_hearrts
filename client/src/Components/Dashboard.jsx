import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParentStore } from "../utils/store";
import _ from "lodash";


function Dashboard() {
  const parent = useParentStore((state)=>(state.parent))
const child = _.get(parent, "children[0]", {}); 
const present_pregnacy = _.get(parent,"present_pregnacy[parent.present_pregnacy.length - 1]",{});
const vaccination_records = _.get(parent, "vaccination_records", []);
const payments = _.get(parent, "payments", []).slice(-4);
const appointments = _.get(parent, "appointments", []);

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
        <Box mt={"10px"}>
          <Text>Welcome back,</Text>
          <Heading fontSize={"20px"}>{parent.name}</Heading>
        </Box>
        <Box bg={"#3670d3"} borderRadius={"50%"} h={"50px"} w={"50px"} />
      </Flex>
      <Flex mt={"30px"} gap={"50px"} alignItems={"flex-start"}>
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
              <Heading size={"md"} py={"4px"} mb={"1px"}>
                Child
              </Heading>
              <Text fontWeight={"bold"}>Name:{child.fullname}</Text>
              <Text>Certificate No: {child.certificate_No}</Text>
              <Text>Age: {child.age}</Text>
              <Text>
                Dateof Birth:{" "}
                {new Date(child.date_of_birth).toLocaleDateString()}
              </Text>
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
              <Heading size={"md"} py={"4px"} mb={"1px"}>
                Present Pregnancy
              </Heading>
              <Flex gap={"3px"}>
                <Text>Maturity:</Text>
                <Text>{present_pregnacy.maturity_in_weeks} weeks</Text>
              </Flex>
              <Flex gap={"3px"}>
                <Text>Fundal height:</Text>
                <Text>{present_pregnacy.fundal_height}</Text>
              </Flex>
              <Flex gap={"3px"}>
                <Text>Blood pressure:</Text>
                <Text>{present_pregnacy.blood_pressure}</Text>
              </Flex>
              <Flex gap={"3px"}>
                <Text>Clinical notes:</Text>
                <Text>{present_pregnacy.clinical_notes}</Text>
              </Flex>
            </GridItem>

            {/* Vaccination Records */}
            <GridItem
              colSpan={3}
              rowSpan={2}
              bg="#fff"
              py={"3px"}
              px={"10px"}
              shadow={" 0 2px 8px rgba(0, 0, 0, 0.1)"}
            >
              <Heading size={"md"} py={"4px"} mb={"10px"}>
                Vaccination records
              </Heading>
              {vaccination_records.length > 0 ? (
                <Table variant="unstyled" size="sm">
                  <Thead bg={"happyblue"} color={"#fff"}>
                    <Tr>
                      <Th>Child</Th>
                      <Th>Provider</Th>
                      <Th>Vaccine</Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {vaccination_records.map((record) => (
                      <Tr key={record.record_id}>
                        <Td>{record.info.child}</Td>
                        <Td>{record.info.provider}</Td>
                        <Td>{record.info.vaccine}</Td>
                        <Td>
                          {new Date(record.timestamp).toLocaleDateString()}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Text>No vaccination records available</Text>
              )}
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
              <Heading size={"md"} py={"4px"} mb={"10px"}>
                Payment records
              </Heading>
              {payments.length > 0 ? (
                <Table variant="unstyled" size="md">
                  <Thead bg={"happyblue"} color={"#fff"}>
                    <Tr>
                      <Th>Payment ID</Th>
                      <Th>Amount</Th>
                      <Th>Method</Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody _even={{ bg: "#EDEFF8" }}>
                    {payments.map((payment) => (
                      <Tr key={payment.payment_id}>
                        <Td>{payment.payment_id}</Td>
                        <Td>{payment.amount}</Td>
                        <Td>{payment.payment_method}</Td>
                        <Td>
                          {new Date(payment.timestamp).toLocaleDateString()}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Text>No payments records available</Text>
              )}
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
            <Heading color={"#111"} fontSize={"20px"} mt={"6px"}>
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
