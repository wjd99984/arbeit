import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/board/list`).then((res) => setBoardList(res.data));
  }, []);

  return (
    <Box>
      <Box>
        <Heading>게시판</Heading>
      </Box>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>제목</Th>
              <Th>본문</Th>
              <Th>사진</Th>
              <Th>
                <FontAwesomeIcon icon={faUserPen} />
              </Th>
              <Th>작성일시</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr
                _hover={{
                  baColor: "blue.200",
                }}
                cursor={"pointer"}
                onClick={() => navigate(`/board/${board.id}`)}
                key={board.id}
              >
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>{board.content}</Td>
                <Td>{board.files}</Td>
                <Td>{board.memberName}</Td>
                <Td>{board.inserted}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
