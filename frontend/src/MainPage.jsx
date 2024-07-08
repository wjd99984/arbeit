import { Box, Center, Flex, Image } from "@chakra-ui/react";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./provider/LoginProvider.jsx"; // 중복 스타일을 객체로 정의
import "/index.css";
import { Helmet } from "react-helmet";

// 중복 스타일을 객체로 정의
const buttonStyle = {
  w: "25%",
  h: "250px",
  borderRadius: "10px",
  fontFamily: "SBAggroB",
  cursor: "pointer",
};

const needStyle = {
  h: "40px",
  width: "100%",
  fontSize: "15px",
  fontFamily: "SBAggroB",
};

const categoryMenu = {
  h: "250px",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "all 0.3s ease-in-out",
  _hover: {
    mt: "-10px",
  },
};

function MainPage() {
  const [hoveredBox, setHoveredBox] = useState(null);
  const account = useContext(LoginContext);
  const navigate = useNavigate();

  const handleMouseEnter = (box) => {
    setHoveredBox(box);
  };

  const handleMouseLeave = () => {
    setHoveredBox(null);
  };

  return (
    <Box w={"100%"} h={"1200px"}>
      <Helmet>
        <title>알바를 구할 땐 알바커넥터</title>
      </Helmet>
      {account.isAlba() && (
        <Flex w={"100%"}>
          <Box
            w={"600px"}
            height={"120px"}
            borderRadius={"10px"}
            bg={"#3396FE"}
            color={"white"}
            fontFamily={"SBAggroB"}
            pt={"25px"}
            pl={"50px"}
            cursor={"pointer"}
            onMouseEnter={() => handleMouseEnter("box1")}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate("/resume/register")}
          >
            <Flex>
              <Box mr={"110px"}>
                <Box mb={"5px"}>알바 채용을 위한 첫 걸음</Box>
                <Box fontSize={"30px"}>이력서 등록하러가기 !</Box>
              </Box>
              <Center>
                <Image
                  src={
                    hoveredBox === "box1"
                      ? "/write-export.gif"
                      : "/write-export.png"
                  }
                  height={"95px"}
                />
              </Center>
            </Flex>
          </Box>
          <Box
            w={"150px"}
            border={"2px solid #E0E0E0"}
            borderRadius={"10px"}
            cursor={"pointer"}
            onClick={() => navigate("/resume/list")}
            onMouseEnter={() => handleMouseEnter("box2")}
            onMouseLeave={handleMouseLeave}
            transition={"transform 0.3s ease-in-out"}
            _hover={{ transform: "scale(0.98)" }}
            ml={"10px"}
          >
            <Center {...needStyle} as="div">
              <Box mx={3}>나의 이력서</Box>
              <FontAwesomeIcon icon={faRightToBracket} color={"gray"} />
            </Center>
            <Center>
              <Image
                src={
                  hoveredBox === "box2"
                    ? "/scan-export.gif"
                    : "/scan-export.png"
                }
                height={"75px"}
              />
            </Center>
          </Box>
          <Box
            border={"2px solid #E0E0E0"}
            w={"300px"}
            ml={"10px"}
            borderRadius={"10px"}
            pt={"10px"}
            pl={"20px"}
          >
            <Box fontWeight={"800"} mb={"10px"}>
              궁금한 점이 있어요!
            </Box>
            <Box fontSize={"13px"}>
              <Flex>
                <Box color={"#3396FE"} mr={"5px"}>
                  질문
                </Box>
                <Box cursor={"pointer"} onClick={() => navigate("/faq")}>
                  이력서를 등록하려면 어떻게 해야하나요?
                </Box>
              </Flex>
              <Flex>
                <Box color={"#3396FE"} mr={"5px"}>
                  질문
                </Box>
                <Box cursor={"pointer"} onClick={() => navigate("/faq")}>
                  제가 봤던 공고를 다시 보고 싶어요.
                </Box>
              </Flex>
              <Flex>
                <Box color={"#3396FE"} mr={"5px"}>
                  질문
                </Box>
                <Box cursor={"pointer"} onClick={() => navigate("/faq")}>
                  회원 수정은 어떻게 하나요?
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      )}
      {/*사장 쪽*/}
      {account.isBoss() && (
        <Flex h={"120px"}>
          <Box
            w={"600px"}
            height={"120px"}
            borderRadius={"10px"}
            bg={"#3396FE"}
            color={"white"}
            fontFamily={"SBAggroB"}
            pt={"25px"}
            pl={"50px"}
            cursor={"pointer"}
            onMouseEnter={() => handleMouseEnter("box1")}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate("/jobs/register")}
          >
            <Flex>
              <Box mr={"110px"}>
                <Box mb={"5px"}>알바 채용을 편리하게 !</Box>
                <Box fontSize={"30px"}>공고 등록하러가기</Box>
              </Box>
              <Center>
                <Image
                  src={
                    hoveredBox === "box1"
                      ? "/write-export.gif"
                      : "/write-export.png"
                  }
                  height={"95px"}
                />
              </Center>
            </Flex>
          </Box>
          <Flex>
            <Box
              ml={"5px"}
              w={"130px"}
              border={"2px solid #CCD4E0"}
              borderRadius={"10px"}
              onMouseEnter={() => handleMouseEnter("box2")}
              onMouseLeave={handleMouseLeave}
              cursor={"pointer"}
              onClick={() => navigate("/store/list")}
            >
              <Center {...needStyle} as="div">
                <Box mr={"5px"}>나의 사업장</Box>
                <FontAwesomeIcon icon={faRightToBracket} color={"gray"} />
              </Center>
              <Box>
                <Image
                  src={
                    hoveredBox === "box2"
                      ? "/com-export.gif"
                      : "/com-export.png"
                  }
                  height={"75px"}
                />
              </Box>
            </Box>
          </Flex>
          <Flex>
            <Box
              ml={"5px"}
              w={"310px"}
              border={"2px solid #CCD4E0"}
              borderRadius={"10px"}
              onMouseEnter={() => handleMouseEnter("box3")}
              onMouseLeave={handleMouseLeave}
              cursor={"pointer"}
              onClick={() => navigate("/application-manage/list")}
            >
              <Center {...needStyle} as="div">
                <Box mr={"10px"}>알바생들의 지원 확인하기 </Box>
                <FontAwesomeIcon icon={faRightToBracket} color={"gray"} />
              </Center>
              <Box ml={"80px"}>
                <Image
                  src={
                    hoveredBox === "box3"
                      ? "/papers-export.gif"
                      : "/papers-export.png"
                  }
                  height={"75px"}
                />
              </Box>
            </Box>
          </Flex>
        </Flex>
      )}
      {!account.isLoggedIn() && (
        <Flex h={"120px"}>
          <Box
            mr={"5px"}
            w={"150px"}
            border={"2px solid #CCD4E0"}
            borderRadius={"10px"}
            cursor={"pointer"}
            onClick={() => navigate("/login")}
          >
            <Center {...needStyle} as="div">
              <Box mr={"5px"}>로그인</Box>
              <FontAwesomeIcon icon={faRightToBracket} color={"gray"} />
            </Center>
            <Center mt={"10px"}>
              <Image src={"/public/lock.png"} height={"55px"} />
            </Center>
          </Box>
          <Box
            mr={"5px"}
            w={"300px"}
            border={"2px solid #CCD4E0"}
            borderRadius={"10px"}
            cursor={"pointer"}
            onClick={() => navigate("/jobs/list")}
          >
            <Center {...needStyle} as="div">
              <Box mr={"5px"}>알바공고 보러가기</Box>
              <FontAwesomeIcon icon={faRightToBracket} color={"gray"} />
            </Center>
            <Center>
              <Image src={"/public/mainPage-notLogin2.png"} height={"75px"} />
            </Center>
          </Box>
          <Flex>
            <Box
              w={"600px"}
              height={"120px"}
              borderRadius={"10px"}
              bg={"#60C231"}
              color={"white"}
              fontFamily={"SBAggroB"}
              pt={"25px"}
              pl={"50px"}
              cursor={"pointer"}
              onMouseEnter={() => handleMouseEnter("box1")}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate("/signup")}
            >
              <Flex>
                <Box w={"600px"}>
                  <Box mb={"5px"}>알바 커넥터가 처음이신가요?</Box>
                  <Flex fontSize={"30px"} gap={2}>
                    <Box>알바커넥터 회원가입 하기</Box>
                    <Box mt={"5px"}>
                      <FontAwesomeIcon
                        icon={faRightToBracket}
                        color={"white"}
                      />
                    </Box>
                  </Flex>
                </Box>
                <Center mt={"-10px"}>
                  <Image
                    src={"/public/mainPage-notLogin.png"}
                    height={"110px"}
                  />
                </Center>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      )}
      <Box
        fontSize={"30px"}
        fontWeight={"700"}
        fontFamily={"SBAggroB"}
        mt={"40px"}
        mb={"20px"}
        borderTop={"3px solid #E0E0E0"}
        pt={"30px"}
      >
        알바 채용공고
      </Box>
      <Box>
        <Flex w={"100%"} h={"320px"} gap={3}>
          <Box
            {...buttonStyle}
            onClick={() =>
              navigate(
                "/jobs/list?type=all&keyword=&page=1&filterType=직종&filterDetail=생산",
              )
            }
          >
            <Center
              {...categoryMenu}
              backgroundImage="url('public/industry.jpg')"
            />
            <Center mt={"15px"}>생산업</Center>
          </Box>
          <Box
            {...buttonStyle}
            onClick={() =>
              navigate(
                "/jobs/list?type=all&keyword=&page=1&filterType=직종&filterDetail=미용",
              )
            }
          >
            <Box>
              <Center
                {...categoryMenu}
                backgroundImage="url('public/haircut.jpg')"
              />
            </Box>
            <Center mt={"15px"}>미용</Center>
          </Box>
          <Box
            {...buttonStyle}
            onClick={() =>
              navigate(
                "/jobs/list?type=all&keyword=&page=1&filterType=직종&filterDetail=사무업무",
              )
            }
          >
            <Box>
              <Center
                {...categoryMenu}
                backgroundImage="url('public/office.jpg')"
              />
            </Box>
            <Center mt={"15px"}>사무업무</Center>
          </Box>
          <Box
            {...buttonStyle}
            onClick={() =>
              navigate(
                "/jobs/list?type=all&keyword=&page=1&filterType=직종&filterDetail=카페",
              )
            }
          >
            <Box>
              <Center
                {...categoryMenu}
                backgroundImage="url('public/cafe.jpg')"
              />
            </Box>
            <Center mt={"15px"}>카페</Center>
          </Box>
        </Flex>
        <Flex w={"100%"} h={"320px"} gap={4}>
          <Box
            {...buttonStyle}
            onClick={() =>
              navigate(
                "/jobs/list?type=all&keyword=&page=1&filterType=직종&filterDetail=편의점",
              )
            }
          >
            <Box>
              <Center
                {...categoryMenu}
                backgroundImage="url('public/market.jpg')"
              />
            </Box>
            <Center mt={"15px"}>편의점</Center>
          </Box>
          <Box
            {...buttonStyle}
            onClick={() =>
              navigate(
                "/jobs/list?type=all&keyword=&page=1&filterType=직종&filterDetail=술집",
              )
            }
          >
            <Box>
              <Center
                {...categoryMenu}
                backgroundImage="url('public/beer.jpg')"
              />
            </Box>
            <Center mt={"15px"}>술집</Center>
          </Box>
          <Box
            {...buttonStyle}
            onClick={() =>
              navigate(
                "/jobs/list?type=all&keyword=&page=1&filterType=직종&filterDetail=영화관",
              )
            }
          >
            <Box>
              <Center
                {...categoryMenu}
                backgroundImage="url('public/movie.jpg')"
              />
            </Box>
            <Center mt={"15px"}>영화관</Center>
          </Box>
          <Box
            {...buttonStyle}
            onClick={() =>
              navigate(
                "/jobs/list?type=all&keyword=&page=1&filterType=직종&filterDetail=놀이공원",
              )
            }
          >
            <Box>
              <Center
                {...categoryMenu}
                backgroundImage="url('public/themapark.jpg')"
              />
            </Box>
            <Center mt={"15px"}>놀이공원</Center>
          </Box>
        </Flex>
        <Flex w={"100%"} h={"250px"} gap={3}>
          <Box
            {...buttonStyle}
            onClick={() =>
              navigate(
                "/jobs/list?type=all&keyword=&page=1&filterType=직종&filterDetail=배달",
              )
            }
          >
            <Box>
              <Center
                {...categoryMenu}
                backgroundImage="url('public/delivery.jpg')"
              />
            </Box>
            <Center mt={"15px"}>배달</Center>
          </Box>
          <Box
            {...buttonStyle}
            onClick={() =>
              navigate(
                "/jobs/list?type=all&keyword=&page=1&filterType=직종&filterDetail=요식업",
              )
            }
          >
            <Box>
              <Center
                {...categoryMenu}
                backgroundImage="url('public/food.jpg')"
              />
            </Box>
            <Center mt={"15px"}>요식업</Center>
          </Box>
          <Box
            {...buttonStyle}
            onClick={() =>
              navigate(
                "/jobs/list?type=all&keyword=&page=1&filterType=직종&filterDetail=유통",
              )
            }
          >
            <Box>
              <Center
                {...categoryMenu}
                backgroundImage="url('public/circulation.jpg')"
              />
            </Box>
            <Center mt={"15px"}>유통</Center>
          </Box>
          <Box
            {...buttonStyle}
            onClick={() =>
              navigate(
                "/jobs/list?type=all&keyword=&page=1&filterType=직종&filterDetail=기타",
              )
            }
          >
            <Box>
              <Center
                {...categoryMenu}
                backgroundImage="url('public/etc.jpg')"
              />
            </Box>
            <Center mt={"15px"}>기타</Center>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default MainPage;
