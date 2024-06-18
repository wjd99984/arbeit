import { Box, Center, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar.jsx";
import { Footer } from "../component/Footer.jsx";
import { Profile } from "../component/Profile.jsx";
import { useContext } from "react";
import { LoginContext } from "../component/LoginProvider.jsx";

export function Home() {
  const account = useContext(LoginContext);

  return (
    <Box>
      <Navbar />
      <Flex>
        <Center width={"1050px"} margin={"auto"}>
          <Outlet />
        </Center>
        {account.isLoggedIn() && (
          <Center
            bg={"white"}
            border={"2px solid #E9E9E9"}
            position={"fixed"}
            right={"150px"}
            w={"200px"}
            h={"300px"}
            borderRadius={"10px"}
            display={{ base: "none", "2xl": "flex" }}
          >
            <Profile />
          </Center>
        )}
      </Flex>
      <Footer />
    </Box>
  );
}

export default Home;
