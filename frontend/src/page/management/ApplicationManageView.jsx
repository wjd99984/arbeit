import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spacer,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { ContractModal } from "./ContractModal.jsx";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../provider/LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

const styles = {
  text: {
    borderBottom: "1px solid #B0B5BD",
    fontSize: "18px",
    fontWeight: "800",
    lineHeight: "40px",
    h: "40px",
    px: "10px",
  },
  info: {
    fontSize: "15px",
    fontWeight: "800",
    lineHeight: "30px",
    h: "30px",
    px: "10px",
  },
};

export function ApplicationManageView() {
  const { jobsId, albaId } = useParams();
  const [application, setApplication] = useState({});
  const [post, setPost] = useState(false);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get("/api/only-boss")
      .then(() => {
        axios
          .get(`/api/jobsId/${jobsId}/application-manage/detail/${albaId}`)
          .then((res) => {
            setApplication(res.data);
          });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
        if (err.response.status === 403) {
          navigate("/");
        }
      });
  }, [jobsId, post, reload]);

  // 합격 여부 문자열 변환 함수
  const isPassedToString = (decision) => {
    switch (decision) {
      case true:
        return "합격";
      case false:
        return "불합격";
      default:
        return "미정";
    }
  };

  const btnStyles = (color) => ({
    bgColor: "white",
    color: color,
    border: `2px solid ${color}`,
    _hover: { bgColor: color, color: "white" },
  });

  function handleAccept() {
    setApplication({ ...application, albaId, jobsId });
    onOpen(); // 계약 모달 열기
  }
  function handleRejectBtn() {
    const confirm = window.confirm("불합격 시키시겠습니까?");
    if (confirm) {
      axios
        .put(`/api/jobsId/${jobsId}/application-manage/reject/${albaId}`)
        .then(() => {
          alert("불합격 처리되었습니다.");
          setPost(!post);
        })
        .catch((err) => {
          alert(err.response.data);
        })
        .finally(() => {
          setReload(!reload);
        });
    }
  }

  return (
    <>
      {account.isBoss() && (
        <Box w="800px" height={"700px"}>
          <Helmet>
            <title>지원서 - 알바커넥터</title>
          </Helmet>
          <Heading p={1} fontFamily={"SBAggroB"}>
            지원서
          </Heading>
          <Box my={"20px"} h={"50px"} lineHeight={"50px"}>
            * 지원서를 확인하시고 합격, 불합격 처리를 해주세요.
          </Box>

          <Box>
            <Box borderTop={"1px solid #B0B5BD"} h={"150px"} py={"20px"}>
              <Flex {...styles.info} mb={"10px"}>
                <Box fontFamily={"SBAggroB"} fontSize={"20px"} mr={"10px"}>
                  지원자 : {application.name}
                </Box>
                <Spacer />
                <Flex fontSize={"sm"}>
                  <Box mr={"10px"} color={"#505050"}>
                    지원 공고 확인하기 <FontAwesomeIcon icon={faChevronRight} />
                  </Box>
                  <Link href={`/jobs/${jobsId}`}>{application.jobsTitle}</Link>
                </Flex>
              </Flex>

              <Box {...styles.info}>연락처 : {application.phone}</Box>
              <Box {...styles.info}>이메일 : {application.email}</Box>
              <Flex {...styles.info}>
                <Box mr={"10px"}>이력서 : </Box>
                <Tooltip label="이력서 확인하기" placement="top">
                  <Link
                    color={"orange"}
                    fontSize={"16px"}
                    href={`/resume/${application.resumeId}`}
                    isExternal
                  >
                    <FontAwesomeIcon icon={faFileExport} />
                  </Link>
                </Tooltip>
              </Flex>
            </Box>
            <Box
              mt={"20px"}
              border={"1px solid #E0E0E0"}
              borderRadius={"10px"}
              p={"10px"}
            >
              <Box
                {...styles.text}
                fontSize={"17px"}
                color={"#505050"}
                w={"100px"}
                border={"0px"}
              >
                지원메시지
              </Box>
              <Box {...styles.info} whiteSpace={"break-spaces"} h={"200px"}>
                {application.comment}
              </Box>
            </Box>
            <Flex my={"20px"} fontWeight={"700"}>
              <Spacer />
              <Box color={"#505050"}>처리상태</Box>
              <Box
                ml={"20px"}
                color={
                  application.isPassed !== undefined
                    ? application.isPassed
                      ? "blue.600"
                      : "red.500"
                    : "gray.600"
                }
              >
                {isPassedToString(application.isPassed)}
              </Box>
            </Flex>
            <Flex gap={1}>
              <Button
                {...btnStyles("gray")}
                color={"gray.500"}
                size={"sm"}
                onClick={() => navigate("/application-manage/list")}
              >
                목록으로
              </Button>
              <Spacer />
              <Button
                onClick={handleAccept}
                // onClick={onOpen}

                {...btnStyles("royalblue")}
                size={"sm"}
              >
                합격
              </Button>
              <Button
                onClick={handleRejectBtn}
                {...btnStyles("orangered")}
                size={"sm"}
              >
                불합격
              </Button>
            </Flex>
          </Box>
          <ContractModal
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onClose}
            application={application}
            reload={reload}
            setReload={setReload}
          />
        </Box>
      )}
    </>
  );
}
