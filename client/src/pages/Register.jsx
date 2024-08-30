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
  Stack,
  Text,
  Spinner
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast'; 
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import family_img from "../assets/family.png";

// Define the Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  national_id: Yup.string().required("National ID is required"),
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must be digits only"),
  gender: Yup.string()
    .oneOf(["Male", "Female"], "Invalid gender")
    .required("Gender is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  passport: Yup.string().optional(), // Adjust if you have specific requirements for passport
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    national_id: "",
    phone_number: "",
    gender: "",
    password: "",
    passport: "",
  };

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

const handleSubmit = async (values, { setSubmitting,resetForm }) => {    
  setLoading(true)
  try {
    const response = await fetch("/api/parents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    console.log("Response status:", response.status); // Log response status

    if (response.ok) {
      const data = await response.json();
      console.log("Response data:", data);
      toast.success(data.msg || "Success!", {
        position: "top-right",
        autoClose: 6000,
      });
    } else {
      const errorData = await response.json();
      toast.error(errorData.msg || "An error occurred", {
        position: "top-right",
        autoClose: 6000,
      });
      throw new Error(errorData.msg || "An error occurred");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
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
        minH="500px"
        borderRadius="md"
        shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
        bg="white"
        // borderWidth={1}
        maxW={{ base: "100%", md: "600px" }}
        flex={{ base: 1, lg: 0.5 }}
        p={4}
      >
        <Heading color="#3670d3" py="20px" textAlign={"center"}>
          Sign up
        </Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema} // Add validation schema here
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={3} px="20px">
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    ><FormLabel>Fullname</FormLabel>
                      <Input
                        {...field}
                        shadow="0 1px 5px rgba(0, 0, 0, 0.15)"
                        outline={"none"}
                        border={"none"}
                        type="text"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel>Email </FormLabel>
                      <Input
                        {...field}
                        shadow="0 1px 5px rgba(0, 0, 0, 0.15)"
                        outline={"none"}
                        border={"none"}
                        type="email"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
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
                      <FormLabel>National ID</FormLabel>
                      <Input
                        {...field}
                        shadow="0 1px 5px rgba(0, 0, 0, 0.15)"
                        outline={"none"}
                        border={"none"}
                        type="text"
                      />
                      <FormErrorMessage>
                        {form.errors.national_id}
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
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        {...field}
                        type="text"
                        shadow="0 1px 5px rgba(0, 0, 0, 0.15)"
                        outline={"none"}
                        border={"none"}
                      />
                      <FormErrorMessage>
                        {form.errors.phone_number}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="gender">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.gender && form.touched.gender}
                    >
                      <FormLabel>Gender</FormLabel>
                      <RadioGroup
                        {...field}
                        onChange={(value) =>
                          form.setFieldValue("gender", value)
                        }
                        value={field.value}
                      >
                        <Stack direction="row">
                          <Radio
                            shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                            outline={"none"}
                            border={"none"}
                            value="Male"
                          >
                            Male
                          </Radio>
                          <Radio
                            shadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                            outline={"none"}
                            border={"none"}
                            value="Female"
                          >
                            Female
                          </Radio>
                        </Stack>
                      </RadioGroup>
                      <FormErrorMessage>{form.errors.gender}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          shadow="0 1px 5px rgba(0, 0, 0, 0.15)"
                          outline={"none"}
                          border={"none"}
                          type={show ? "text" : "password"}
                        />
                        <InputRightElement width="4.5rem">
                          <Box h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? <ViewOffIcon /> : <ViewIcon />}
                          </Box>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.password}
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
                  w="100%"
                  type="submit"
                  bg="#101f3c"
                  _hover={{ bg: "#3670d3" }}
                  color="#fff"
                  mt="8px"
                  isLoading={isSubmitting}
                >
                  {loading ? <Spinner /> : <Text>Sign up</Text>}
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
        <Image maxW="100%" objectFit={"contain"} src={family_img} />
      </Box>
    </Flex>
  );
};

export default Register;
