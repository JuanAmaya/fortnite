import { Text } from "@chakra-ui/react";

const SkinText = (props) => {
  return (
    <div>
      <Text color="gray.600" fontSize="2xl">
        {props.title}
      </Text>
      <Text color="gray.300" fontSize="3xl" textTransform="capitalize">
        {props.text}
      </Text>
    </div>
  );
};

export default SkinText;
