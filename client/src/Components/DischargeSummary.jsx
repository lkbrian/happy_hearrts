import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

function DischargeSummary({ data }) {
  return (
    <Box
      width={{ base: "100%", lg: "45%" }}
      minW={"400px"}
      shadow={" 0 2px 8px rgba(0, 0, 0, 0.1)"}
      bg={"#fff"}
      borderRadius={".5rem"}
    >
      <Heading fontSize={"22px"} p={'18px'}>Discharge Summary</Heading>
      <Box p={4}>
        {data.map((summary) => (
          <Box
            key={summary.discharge_id}
            mb={4}
            p={4}
            borderWidth={1}
            borderRadius="md"
          >
            <Text>
              <strong>Discharge ID:</strong> {summary.discharge_id}
            </Text>
            <Text>
              <strong>Admission Date:</strong> {summary.adimission_date}
            </Text>
            <Text>
              <strong>Discharge Date:</strong> {summary.discharge_date}
            </Text>
            <Text>
              <strong>Diagnosis:</strong> {summary.discharge_dignosis}
            </Text>
            <Text>
              <strong>Procedure:</strong> {summary.procedure || "N/A"}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default DischargeSummary;
