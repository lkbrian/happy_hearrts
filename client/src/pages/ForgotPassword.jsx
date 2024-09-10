import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Text,
  Input,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import forgot_img from "../assets/forgot.png";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const validation = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });
  const initialvalues = {
    email: "",
  };
  const handleSubmit = async (values, { setSubmitting,resetForm }) => {
    setLoading(true)
    try {
      const response = await fetch("api/forgot_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.msg || "reset link has been sent to your email", {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });
        console.log(data);
      } else {
        const errorData = await response.json();
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
      console.error("Erorror submitting form:", error);
    } finally {
      setSubmitting(false);
      setLoading(false)
      resetForm()
    }
  };
  return (
    <Flex
      h="100vh"
      px={{ base: "20px", md: "70px" }}
      w="100vw"
      align="center"
      justifyContent="center"
    >
      <Box
        shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
        outline={"none"}
        border={"none"}
        borderRadius="md"      
        bg="white"
        maxW={{ base: "100%", md: "600px" }}
        flex={{ base: 1, lg: 0.5 }}
        p={4}
        py={"30px"}
      >
        <Heading color={"#3670d3"} py={"20px"} textAlign={"center"}>
          Forgot Password
        </Heading>
        <Formik
          validationSchema={validation}
          initialValues={initialvalues}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.errors.touched}
                  >
                    <FormLabel>Email:</FormLabel>
                    <Input
                      {...field}
                      shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                      outline={"none"}
                      border={"none"}
                      mb={"20px"}
                    />
                    <FormErrorMessage>{form.errors.mail}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                w={"100%"}
                type="submit"
                bg="#101f3c"
                _hover={{ bg: "#3670d3" }}
                color="#fff"
                mb={'20px'}
              >
                {loading ? <Spinner /> : <Text>Submit</Text>}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        w="50%"
        flex={{ base: 1, lg: 0.5 }}
        display={{ base: "none", lg: "block" }}
      >
        <Image maxW={"100%"} objectFit={"contain"} src={forgot_img} />
      </Box>
    </Flex>
  );
}

export default ForgotPassword;
