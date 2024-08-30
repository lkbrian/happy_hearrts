import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

function Delivery({ data }) {
  return (
    <Box
      width={{ base: "100%", lg: "45%" }}
      minW={"400px"}
      shadow={" 0 2px 8px rgba(0, 0, 0, 0.1)"}
      bg={"#fff"}
      borderRadius={".5rem"}
    >
      <Heading fontSize={"22px"} p={'18px'}>Deliveries</Heading>

      <Box p={4}>
        {data.map((delivery) => (
          <Box
            key={delivery.delivery_id}
            mb={4}
            p={4}
            borderWidth={1}
            borderRadius="md"
          >
            <Text>
              <strong>Delivery ID:</strong> {delivery.delivery_id}
            </Text>
            <Text>
              <strong>Mode of Delivery:</strong> {delivery.mode_of_delivery}
            </Text>
            <Text>
              <strong>Date:</strong> {delivery.date}
            </Text>
            <Text>
              <strong>Duration of Labour:</strong> {delivery.duration_of_labour}
            </Text>
            <Text>
              <strong>Hours:</strong> {delivery.hours} hrs
            </Text>
            <Text>
              <strong>Condition of Mother:</strong>{" "}
              {delivery.condition_of_mother}
            </Text>
            <Text>
              <strong>Condition of Baby:</strong> {delivery.condition_of_baby}
            </Text>
            <Text>
              <strong>Birth Weight:</strong> {delivery.birth_weight_at_birth}
            </Text>
            <Text>
              <strong>Gender:</strong> {delivery.gender}
            </Text>
            <Text>
              <strong>Vitamin A:</strong> {delivery.vitamin_A || "N/A"}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Delivery;
