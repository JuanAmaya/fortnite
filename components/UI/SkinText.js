import { Flex, Text } from "@chakra-ui/react";


const SkinText = (props) => {
  return (
    <div>
      <Flex justifyContent='space-between'>
        <Text color="gray.600" fontSize="2xl">
          {props.title}
        </Text>
        {props.likeButton}
      </Flex>
      <Text color="gray.300" fontSize="3xl" textTransform="capitalize">
        {props.text}
      </Text>
    </div>
  );
};

export default SkinText;
