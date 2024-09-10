import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import Logout from "../Components/Logout";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import { useEffect, useState } from "react";
import { useParentStore } from "../utils/store";

function ParentPortal() {
  const id = localStorage.getItem("id");
  const parent = useParentStore((state) => state.parent);
  const setParent = useParentStore((state) => state.setParent);

  const [loading, setLoading ] = useState(true);
  const url = `/api/parents/${id}`;

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);
        const data = await res.json();
        setParent(data);
          
        setLoading(false);

        console.log(data)
      } catch (error) {
        console.error("Error fetching parent: ", error);
      }
    };
    getData();
  }, [url]);

  return (
    <Flex
      pos={"relative"}
      bg={"#EDEFF8"}
      h={"100vh"}
      overflow={"hidden"}
      flexDir={"row"}
    >
      <Sidebar />
      {loading ? (
        <Box display={'flex'} flexDir={'column'} w={"100%"} justifyContent={"center"} alignItems={"center"}>
          <Spinner size={'lg'}/>
          <Text>Please wait loading data</Text>
        </Box>
      ) : (
        <Dashboard />
      )}
    </Flex>
  );
}

export default ParentPortal;
