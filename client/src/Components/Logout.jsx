import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { CgLogOut } from "react-icons/cg";

function Logout() {
  const navigate = useNavigate();

  const handlClick = async () => {
    const token = localStorage.getItem("authToken");
    const response = await fetch("/api/logout", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    try {
      if (response.ok) {
        const data = await response.json();
        toast.success(data.msg || "Logout succesful", {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });
        console.log(data);
        localStorage.clear();
        navigate("/");
      } else {
        const errorData = await response.json();
        if (errorData.msg == "Token has expired") {
          navigate("/login");
        }
        toast.error(errorData.msg || "An error occurred", {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });
        throw new Error(errorData.msg || "An error occurred");

      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box
      position={"fixed"}
      onClick={handlClick}
      w={"auto"}
      display={"flex"}
      color="#3670D3"
      bg={'#fff'}
      bottom={0}
      m={4}
      p={2}
      borderRadius={'.4rem'}
      gap={"6px"}
      cursor={"pointer"}
      alignItems={"center"}
      shadow={" 0 2px 8px rgba(0, 0, 0, 0.4)"}
    >
      <CgLogOut size={"20px"} />
      <Text>Logout</Text>
    </Box>
  );
}

export default Logout;
