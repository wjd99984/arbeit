import React, { useContext } from "react";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../provider/LoginProvider.jsx"; // 개별 메뉴 링크 컴포넌트

// 개별 메뉴 링크 컴포넌트
const NavLink = ({ href, children }) => (
  <Link href={href} fontSize="lg" color="black">
    {children}
  </Link>
);

// 공통 버튼 컴포넌트
const NavbarButton = ({ children, onClick }) => (
  <Button
    variant="outline"
    bg={"#FFD863"}
    ml={2}
    fontSize="12px"
    w={"90px"}
    lineHeight={"40px"}
    _hover={{ bg: "#FEF18B" }}
    fontFamily={"SBAggroB"}
    onClick={onClick}
  >
    {children}
  </Button>
);

// 작은 링크 컴포넌트
const SmallLink = ({ href, children }) => (
  <Link href={href} fontSize="sm" color="black">
    {children}
  </Link>
);

// Navbar 컴포넌트
const Navbar = () => {
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  // 권한 별 접근
  const checkAuth = (albaValue, bossValue, adminValue) => {
    switch (true) {
      case account.isAlba():
        return albaValue;
      case account.isBoss():
        return bossValue;
      case account.isAdmin():
        return adminValue;
    }
  };

  return (
    <Box
      minW={"1100px"}
      bg="white"
      borderBottom="3px solid #eaeaea"
      height="110px"
      mb={"70px"}
    >
      <Box bg={"white"} h={"3px"} mb={"40px"} />
      <Center minWidth={"1000px"} mx={{ base: "0px", xl: "200px" }} mt={"40px"}>
        <HStack w={"1100px"} spacing={7}>
          <Box width="150px" height="50px" mr={"25px"} mt={"5px"}>
            <Image
              src="/public/alba_connector_logo.png"
              cursor={"pointer"}
              transition="transform 0.3s ease-in-out"
              _hover={{
                transform: "scale(0.95)",
              }}
              onClick={() => navigate("/")}
            />
          </Box>
          <Flex w={"100%"}>
            <HStack spacing={10} fontWeight={"600"}>
              <NavLink href="/jobs/list">알바 채용공고</NavLink>
              <NavLink href="/board/list">질문 게시판</NavLink>
              <NavLink href="/faq">자주 묻는 질문(FAQ)</NavLink>
            </HStack>
            <Spacer />
            <Center gap={5}>
              {account.isLoggedIn() || (
                <SmallLink href="/login">로그인</SmallLink>
              )}
              {account.isLoggedIn() || (
                <SmallLink href="/signup">회원가입</SmallLink>
              )}
              {account.isLoggedIn() && (
                <Box
                  fontSize="15px"
                  color="black"
                  fontWeight={"600"}
                  cursor={"pointer"}
                  onClick={() => navigate(`/member/${account.id}`)}
                >
                  <Badge
                    colorScheme={checkAuth("orange", "red", "blue")}
                    mr={2}
                  >
                    {checkAuth("알바", "기업", "어드민")}
                  </Badge>
                  {account.name} 님
                </Box>
              )}
              {account.isLoggedIn() && (
                <Box
                  fontSize="sm"
                  color="black"
                  cursor={"pointer"}
                  _hover={{
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    account.logout();
                    navigate("/");
                  }}
                >
                  로그아웃
                </Box>
              )}
              <Flex>
                {account.isAlba() && (
                  <NavbarButton
                    onClick={() => {
                      navigate("/resume/list");
                    }}
                  >
                    이력서 관리
                  </NavbarButton>
                )}
                {account.isAlba() && (
                  <NavbarButton
                    onClick={() => {
                      navigate("/resume/register");
                    }}
                  >
                    이력서 등록
                  </NavbarButton>
                )}
                {account.isBoss() && (
                  <NavbarButton onClick={() => navigate("/jobs/register")}>
                    공고 등록
                  </NavbarButton>
                )}
                {account.isBoss() && (
                  <NavbarButton onClick={() => navigate("/store/register")}>
                    사업장 등록
                  </NavbarButton>
                )}
              </Flex>
            </Center>
          </Flex>
        </HStack>
      </Center>
    </Box>
  );
};

export default Navbar;
