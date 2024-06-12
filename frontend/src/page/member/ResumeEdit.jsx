import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../component/LoginProvider.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

export function ResumeEdit() {
  const { id } = useParams();
  const [resume, setResume] = useState({});
  const [errors, setErrors] = useState({});
  const account = useContext(LoginContext);

  useEffect(() => {
    axios.get(`/api/resume/${id}`).then((res) => {
      setResume(res.data);
    });
  }, []);

  function handleRookieBtn(prop) {
    setResume({ ...resume, isRookie: prop });
  }

  const handleInputChange = (prop) => (e) => {
    setResume({ ...resume, [prop]: e.target.value });
  };

  function handleSaveBtn() {
    axios
      .put(`/api/resume/${id}`, resume)
      .then()
      .catch((err) => {
        setErrors(err.response.data);
      });
  }

  return (
    <Box>
      <Box>
        <Heading>이력서 수정</Heading>
      </Box>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input
          defaultValue={resume.title}
          onChange={handleInputChange("title")}
        />
        {errors && <FormHelperText>{errors.content}</FormHelperText>}
        <Flex>
          <Button
            colorScheme={resume.isRookie === 0 ? "blue" : "gray"}
            onClick={() => handleRookieBtn(0)}
          >
            신입
          </Button>
          <Button
            colorScheme={resume.isRookie === 1 ? "blue" : "gray"}
            onClick={() => handleRookieBtn(1)}
          >
            경력
          </Button>
        </Flex>
        <FormLabel>자기 소개</FormLabel>
        <Textarea
          placeholder={"자기소개를 써주세요."}
          defaultValue={resume.content}
          onChange={handleInputChange("content")}
        />
        {errors && <FormHelperText>{errors.content}</FormHelperText>}
        <Button onClick={handleSaveBtn}>저장</Button>
      </FormControl>
    </Box>
  );
}
