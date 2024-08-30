import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import * as Yup from "yup";
import reset_img from "../assets/reset.png";

function ResetPassword() {
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [showpass, setShowpass] = useState(false);
  const handleShowpass = () => setShowpass(!showpass);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const navigate = useNavigate();

  const validation = Yup.object({
    account_type: Yup.string().required("Account type is needed"),
    new_password: Yup.string()
      .required("New password is required")
      .min(8, "Should be atleast 8 characters long"),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .min(8, "Should be atleast 8 characters long"),
  });
  const initialvalues = {
    account_type: "",
    new_password: "",
    confirm_password: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { account_type, new_password, confirm_password } = values;
    setLoading(true);
    try {
      const response = await fetch("api/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account_type,
          token,
          new_password,
          confirm_password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.msg || "Password reset was succesfull", {
          position: "top-right",
          autoClose: 6000,
          style: {
            borderRadius: "10px",
            background: "#101f3c",
            color: "#fff",
          },
        });
        console.log(data);
        navigate("/login");
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
      console.error("Error during password reset:", error);
    } finally {
      setSubmitting(false);
      setLoading(false);
      resetForm();
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
        minH="500px"
        borderRadius="md"
        boxShadow="md"
        bg="white"
        shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
        outline={"none"}
        border={"none"}
        maxW={{ base: "100%", md: "600px" }}
        flex={{ base: 1, lg: 0.5 }}
        p={4}
      >
        <Heading color={"#3670d3"} py={"20px"} textAlign={"center"}>
          Reset Password
        </Heading>

        <Formik
          validationSchema={validation}
          initialValues={initialvalues}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={8} px={"20px"}>
                <Field name="account_type">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.account_type && form.touched.account_type
                      }
                    >
                      <FormLabel mb={"12px"}>Account type:</FormLabel>

                      <RadioGroup
                        {...field}
                        w={"100%"}
                        onChange={(value) =>
                          form.setFieldValue("account_type", value)
                        }
                        value={field.value}
                      >
                        <Flex mt={2} justify="space-between" wrap="wrap">
                          <Radio
                            shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                            outline={"none"}
                            border={"none"}
                            size={{ base: "md", md: "lg" }}
                            value="parent"
                          >
                            Parent
                          </Radio>
                          <Radio
                            shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                            outline={"none"}
                            border={"none"}
                            size={{ base: "md", md: "lg" }}
                            colorScheme="green"
                            value="provider"
                          >
                            Provider
                          </Radio>
                          <Radio
                            shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                            outline={"none"}
                            border={"none"}
                            size={{ base: "md", md: "lg" }}
                            colorScheme="red"
                            value="user"
                          >
                            User
                          </Radio>
                        </Flex>
                      </RadioGroup>
                      <FormErrorMessage>
                        {form.errors.account_type}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="new_password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.new_password && form.touched.new_password
                      }
                    >
                      <FormLabel>New password:</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                          outline={"none"}
                          border={"none"}
                          type={show ? "text" : "password"}
                        />
                        <InputRightElement>
                          <Box cursor={"pointer"} onClick={handleClick}>
                            {show ? <ViewIcon /> : <ViewOffIcon />}
                          </Box>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.new_password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="confirm_password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.confirm_password &&
                        form.touched.confirm_password
                      }
                    >
                      <FormLabel>Confirm password:</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                          outline={"none"}
                          border={"none"}
                          type={showpass ? "text" : "password"}
                        />
                        <InputRightElement>
                          <Box cursor={"pointer"} onClick={handleShowpass}>
                            {showpass ? <ViewIcon /> : <ViewOffIcon />}
                          </Box>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.confirm_password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  w={"100%"}
                  type="submit"
                  bg="#101f3c"
                  _hover={{ bg: "#3670d3" }}
                  color="#fff"
                >
                  {loading ? <Spinner /> : <Text>Reset password</Text>}
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        w="50%"
        flex={{ base: 1, lg: 0.5 }}
        display={{ base: "none", lg: "block" }}
      >
        <Image maxW={"100%"} objectFit={"contain"} src={reset_img} />
      </Box>
    </Flex>
  );
}

export default ResetPassword;
