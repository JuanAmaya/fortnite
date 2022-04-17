import { UilFrown } from "@iconscout/react-unicons";
import { Box, Text, Center } from "@chakra-ui/react";

const NoSkinError = () => {
  return (
    <Center mt="100">
      <Box color="gray.200">
        <Box display="flex" justifyContent="center">
          <UilFrown width="3rem" height="3rem" />
        </Box>
        <Text textAlign="center" fontSize="2rem">
          No Skins Found
        </Text>
      </Box>
    </Center>
  );
};

export default NoSkinError;
