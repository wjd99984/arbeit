import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../component/Navbar.jsx";

export function Home() {
  return (
    <Box>
      <Box>
        <Navbar />
        <Box w={"1050px"} m={"auto"}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
