import { Box } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Splash from "./pages/Splash";
import Register from "./pages/Register";

function App() {
  return (
    <Box>
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/register" element={<Register />} />
  
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
