import React from "react";
import {
  Button,
  Image,
  Text,
  VStack,
  Stack,
  Box,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();        
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("jobId");

  console.log(jobId);
  const handleNavigate = () => {
    navigate(`/Apply?jobId=${jobId}`);
  };

  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");
  return (
    <Box>
      <VStack h="100vh" justifyContent={"center"}>
        <Heading textTransform={"uppercase"}>Order Successfull</Heading>
        <Text>Reference No. {referenceNum}</Text>
        <Button colorScheme='green'
          onClick={
            handleNavigate
          }
        >
          Continue Searching Job
        </Button>
      </VStack>
    </Box>
  );
};

export { PaymentSuccess };
