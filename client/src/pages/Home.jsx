import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import UserList from "../components/UserList";
import { Box } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [activeSection, setActiveSection] = useState("Users");
  return (
    <Box display={"flex"}>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div style={{ flex: 1, padding: "20px" }}>
        {activeSection === "Dashboard" && <h1>Dashboard Content</h1>}
        {activeSection === "Users" && <UserList />}
        {activeSection === "Projects" && <h1>Projects Content</h1>}
        {activeSection === "Settings" && <h1>Settings Content</h1>}
      </div>
    </Box>
  );
};

export default Home;
