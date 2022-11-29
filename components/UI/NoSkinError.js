import { UilFrown } from "@iconscout/react-unicons";
import { Box, Text, Center, propNames } from "@chakra-ui/react";

const NoSkinError = (props) => {
  return (
    <Center mt="100">
      <Box color="gray.200">
        <Box display="flex" justifyContent="center">
          {props.iconError}
        </Box>
        <Text textAlign="center" fontSize="2rem">
          {props.textError}
        </Text>
      </Box>
    </Center>
  );
};

export default NoSkinError;
