import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

function PresentPregnancy({ data }) {
  return (
    <Box
      width={{ base: "100%", lg: "45%" }}
      minW={"400px"}
      shadow={" 0 2px 8px rgba(0, 0, 0, 0.1)"}
      bg={"#fff"}
      borderRadius={".5rem"}
    >      
        <Heading fontSize={"22px"} p={'18px'}>Present Pregnancy</Heading>      
      <Box p={4}>
        {data.map((pregnancy) => (
          <Box
            key={pregnancy.pp_id}
            mb={4}
            p={4}
            borderWidth={1}
            borderRadius="md"
            color={"#111"}
          >
            <Text>
              <strong>ID:</strong> {pregnancy.pp_id || Null}
            </Text>
            <Text>
              <strong>Date:</strong> {pregnancy.date}
            </Text>
            <Text>
              <strong>Weight:</strong> {pregnancy.weight_in_kg} kg
            </Text>
            <Text>
              <strong>Urinalysis:</strong> {pregnancy.urinalysis}
            </Text>
            <Text>
              <strong>Blood Pressure:</strong> {pregnancy.blood_pressure}
            </Text>
            <Text>
              <strong>Pollar:</strong> {pregnancy.pollar}
            </Text>
            <Text>
              <strong>Maturity in Weeks:</strong> {pregnancy.maturity_in_weeks}{" "}
              weeks
            </Text>
            <Text>
              <strong>Fundal Height:</strong> {pregnancy.fundal_height} cm
            </Text>
            <Text>
              <strong>Comments:</strong> {pregnancy.comments}
            </Text>
            <Text>
              <strong>Clinical Notes:</strong> {pregnancy.clinical_notes}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default PresentPregnancy;

