import { Box } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Splash from "./pages/Splash";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ParentPortal from "./pages/ParentPortal";
import Prenatal from "./Components/Prenatal";
import AdminPortal from "./pages/AdminPortal";
import ProviderPortal from "./pages/ProviderPortal";

function App() {
  return (
    <Box>
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/admin_portal/dashboard" element={<AdminPortal />} />
          <Route path="/providers_portal/dashboard" element={<ProviderPortal />} />
          <Route path="/parents_portal/dashboard" element={<ParentPortal />} />
          <Route path="/parents_portal/prenatal" element={<Prenatal />} />
        </Routes>
        <Toaster />
      </Router>
    </Box>
  );
}

export default App;
