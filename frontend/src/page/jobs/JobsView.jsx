import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { JobsViewDetails } from "./jobsview_component/JobsViewDetail.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../provider/LoginProvider.jsx";
import { JobConditions } from "./jobsview_component/JobConditions.jsx";
import { JobDetail } from "./jobsview_component/JobDetail.jsx";
import { JobLocation } from "./jobsview_component/JobLocation.jsx";
import { JobContact } from "./jobsview_component/JobContact.jsx";
import { CompanyInfo } from "./jobsview_component/CompanyInfo.jsx";
import { JobReview } from "./jobsview_component/JobReview.jsx";
import { JobRequirements } from "./jobsview_component/JobRequirements.jsx";

export function JobsView() {
  const account = useContext(LoginContext);
  const { id } = useParams();
  const [jobs, setJobs] = useState(null);
  const [jobsCond, setJobsCond] = useState(null);
  const [storeMap, setStoreMap] = useState({});
  const [images, setImages] = useState([]);
  const [boss, setBoss] = useState({});
  const [src, setSrc] = useState("/public/alba_connector_store_logo.png");

  const toast = useToast();

  function myToast(text, status) {
    toast({
      description: <Box whiteSpace="pre-line">{text}</Box>,
      status: status,
      position: "top",
      duration: "700",
    });
  }
  const navigate = useNavigate();

  // Read
  useEffect(() => {
    axios
      .get(`/api/jobs/${id}`)
      .then((res) => {
        setJobs(res.data.jobs);
        setJobsCond(res.data.jobsCondition);
        setImages(res.data.images);
        setStoreMap(res.data.storeMap);
        setBoss(res.data.boss);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          myToast("해당 게시물이 존재하지 않습니다", "error");
          navigate("/jobs/list");
        }
      });
  }, [id]);

  useEffect(() => {
    if (storeMap && Array.isArray(storeMap.images)) {
      // images 배열의 각 항목을 순회하며 src 값을 출력
      storeMap.images.forEach((image) => {
        setSrc(image.src);
      });
    }
  }, [storeMap]);

  function handleRemoveBtn() {
    axios.delete(`/api/jobs/${id}`).then(() => navigate("/jobs/list"));
  }

  function handleApplyBtn() {
    const jobsId = new URLSearchParams();
    jobsId.append("jobsId", id);
    axios
      .post("/api/apply-validate", jobsId)
      .then(() => navigate(`/jobs/${id}/apply`))
      .catch((err) => alert(err.response.data));
  }

  // 스피너
  if (jobs === null && jobsCond === null) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Center flexDirection="column" p={5} bg="#f7f9fc">
      <Stack spacing={6}>
        <JobDetail jobs={jobs} jobsCond={jobsCond} src={src} />
        <Divider />
        <JobRequirements job={jobs} jobsCond={jobsCond} id={id} />
        <Divider />
        <JobLocation storeMap={storeMap} />
        <Divider />
        <JobConditions job={jobs} jobsCond={jobsCond} />
        <Divider />
        <JobsViewDetails
          job={jobs}
          jobsCond={jobsCond}
          images={images}
          storeMap={storeMap}
          src={src}
        />
        <Divider />
        <JobContact boss={boss} storeMap={storeMap} />
        <Divider />
        <CompanyInfo
          job={jobs}
          jobsCond={jobsCond}
          storeMap={storeMap}
          boss={boss}
          src={src}
        />
        <Divider />
        <JobReview />
      </Stack>
      {account.isAlba() && (
        <Flex w={"100%"} gap={5} my={"40px"}>
          <Button
            onClick={() => navigate("/jobs/list")}
            w={"50%"}
            colorScheme={"green"}
          >
            목록
          </Button>
          <Button onClick={handleApplyBtn} w={"50%"} colorScheme={"blue"}>
            지원하기
          </Button>
        </Flex>
      )}

      {account.isBoss() && (
        <Flex w={"100%"} gap={2} my={"40px"}>
          <Button
            onClick={() => navigate(`/jobs/${id}/edit`)}
            w={"50%"}
            colorScheme={"blue"}
            variant={"outline"}
          >
            수정
          </Button>
          <Button
            onClick={handleRemoveBtn}
            w={"50%"}
            colorScheme={"red"}
            variant={"outline"}
          >
            삭제
          </Button>
        </Flex>
      )}
    </Center>
  );
}

export default JobsView;