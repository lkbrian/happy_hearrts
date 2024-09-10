import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Sidebar from "./Sidebar";
import { AddIcon } from "@chakra-ui/icons";
import PresentPregnancy from "./PresentPregnacy";
import Delivery from "./Delivery";
import DischargeSummary from "./DischargeSummary";

function Prenatal() {
    const presentPregnancyData = [
      {
        pp_id: 1,
        date: "2024-08-10",
        weight_in_kg: 70,
        urinalysis: "Normal",
        blood_pressure: "120/80",
        pollar: "Absent",
        maturity_in_weeks: 30,
        fundal_height: 32,
        comments: "No complications observed",
        clinical_notes: "Follow-up in two weeks.",
      }]

    const deliveryData = [
      {
        delivery_id: 1,
        mode_of_delivery: "Normal Vaginal Delivery",
        date: "2024-08-15",
        duration_of_labour: "6 hours",
        hours: 6,
        condition_of_mother: "Stable",
        condition_of_baby: "Healthy",
        birth_weight_at_birth: "3.5 kg",
        gender: "Male",
        vitamin_A: "Given",
      }
    ];

    const dischargeSummaryData = [
      {
        discharge_id: 1,
        adimission_date: "2024-08-14",
        discharge_date: "2024-08-16",
        discharge_dignosis: "Postpartum recovery",
        procedure: "Normal postpartum care",
      },
      {
        discharge_id: 2,
        adimission_date: "2024-07-24",
        discharge_date: "2024-07-27",
        discharge_dignosis: "Post C-section care",
        procedure: "Cesarean Section",
      },
    ];

  return (
    <Flex h={"100px"}>
      <Sidebar />

      <Box
        className="prenatal scrollbar"
        pos={"absolute"}
        w="calc(100% - 250px)"
        ml={"200px"}
        left={"50px"}
        h={"100vh"}
        overflow={"auto"}
        bg={"#EDEFF8"}
        pt={"20px"}
      >
        <Flex
          m={"10px"}
          mt={"30px"}
          flexWrap={"wrap"}
          align={"stretch"}
          alignItems={{ base: "flex-start", lg: "stretch" }}
          gap={"20px"}
          p={"10px"}
        >
          <PresentPregnancy data={presentPregnancyData} />
          <Delivery data={deliveryData} />
          <DischargeSummary data={dischargeSummaryData} />
        </Flex>
      </Box>
    </Flex>
  );
}

export default Prenatal;
