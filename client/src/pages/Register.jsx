import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { React, useState } from "react";
import family_img from "../assets/family.png";
import { parent_validation } from "../Schema";
import { Link } from "react-router-dom";

function Register() {
  const initialValues = {
    name: "",
    email: "",
    national_id: "",
    phone_number: "",
    gender: "Female",
    password: "",
    passport: "",
  };
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Form submitted");
    console.log("Form values:", values);
    try {
      const response = await fetch("/api/parents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("Response status:", response.status); // Log response status

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Flex
      h={"100vh"}
      px={"70px"}
      w={"100vw"}
      align={"center"}
      justifyContent={"center"}
    >
      <Box minH={"500px"} w="50%">
        <Heading color={"#3670d3"} py={"20px"}>
          Sign up
        </Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={parent_validation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Stack spacing={8} px={"20px"}>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <Input
                        errorBorderColor="gray.400"
                        focusBorderColor={"#37b0d3"}
                        placeholder="Full Name"
                        _placeholder={{ color: "gray.400" }}
                        {...field}
                        type="text"
                        id="name"
                      />
                      <FormErrorMessage color="crimson">
                        {form.errors.name &&
                          form.touched.name &&
                          form.errors.name}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <Input
                        errorBorderColor="gray.400"
                        focusBorderColor={"#37b0d3"}
                        placeholder="Email address"
                        _placeholder={{ color: "gray.400" }}
                        {...field}
                        type="email"
                        id="email"
                      />
                      <FormErrorMessage color={"crimson"}>
                        {form.errors.email &&
                          form.touched.email &&
                          form.errors.email}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="national_id">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.national_id && form.touched.national_id
                      }
                    >
                      <Input
                        errorBorderColor="gray.400"
                        focusBorderColor="#3670d3"
                        placeholder="National ID"
                        _placeholder={{ color: "gray.400" }}
                        {...field}
                        type="number"
                        id="national_id"
                      />
                      <FormErrorMessage color={"crimson"}>
                        {form.errors.national_id &&
                          form.touched.national_id &&
                          form.errors.national_id}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="phone_number">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.phone_number && form.touched.phone_number
                      }
                    >
                      <Input
                        errorBorderColor="gray.400"
                        focusBorderColor="#3670d3"
                        placeholder="Phone number"
                        type="text"
                        id="phone_number"
                        {...field}
                        _placeholder={"gray.400"}
                      />
                      <FormErrorMessage color={"crimson"}>
                        {form.errors.phone_number &&
                          form.touched.phone_number &&
                          form.errors.phone_number}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="gender">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.gender && form.touched.gender}
                    >
                      <RadioGroup
                        {...field}
                        onChange={(value) =>
                          form.setFieldValue("gender", value)
                        }
                        value={field.value}
                      >
                        <Stack direction={"row"}>
                          <Radio value={"Male"}>Male</Radio>
                          <Radio value={"Female"}>Female</Radio>
                        </Stack>
                      </RadioGroup>

                      <FormErrorMessage>
                        {form.errors.gender &&
                          form.touched.gender &&
                          form.errors.gender}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <InputGroup>
                        <Input
                          errorBorderColor="gray.400"
                          focusBorderColor={"#3670d3"}
                          placeholder="password"
                          _placeholder={{ color: "gray.400" }}
                          {...field}
                          type={show ? "text" : "password"}
                          id="password"
                        />
                        <InputRightElement width="4.5rem">
                          <Box h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? <ViewOffIcon /> : <ViewIcon />}
                          </Box>
                        </InputRightElement>
                      </InputGroup>

                      <FormErrorMessage color="crimson">
                        {form.errors.password &&
                          form.touched.password &&
                          form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Text>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="login-link text-[#fa510f] underline"
                  >
                    Login
                  </Link>
                </Text>

                <Button
                  w={"100%"}
                  type="submit"
                  bg={"#101f3c"}
                  _hover={{ bg: "#3670d3" }}
                  color={"#fff"}
                  mt={"8px"}
                  isLoading={isSubmitting}
                >
                  Signup
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
      <Box w={"50%"}>
        <Image maxW={"800px"} src={family_img} />
      </Box>
    </Flex>
  );
}

export default Register;
