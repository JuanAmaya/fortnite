import { Heading, Image, Box, Icon, Flex } from "@chakra-ui/react";
import Link from "next/link";
import SkinText from "./SkinText";
import { UilEstate } from "@iconscout/react-unicons";

const skinInfo = (props) => {
  let bg = "#B3B3B3";

  switch (props.rarity) {
    case "uncommon":
      bg = "#84C173";
      break;

    case "rare":
      bg = "#82BFDC";
      break;

    case "epic":
      bg = "#BD7BF5 ";
      break;

    case "legendary":
      bg = "#E0661C";
      break;

    case "dark":
      bg = " #CF6FBD ";
      break;

    case "frozen":
      bg = "#B2DFFF";
      break;

    case "lava":
      bg = "#C1687B";
      break;

    case "shadow":
      bg = "#6A6A6A";
      break;

    case "slurp":
      bg = "#73D4F2 ";
      break;

    case "dc":
      bg = " #2D6290 ";
      break;

    case "marvel":
      bg = " #AB0000 ";
      break;

    case "starwars":
      bg = " #00064E ";
      break;

    case "icon":
      bg = "#3F9EBE ";
      break;

    case "gaminglegends":
      bg = "#312B7B ";
      break;
  }

  return (
    <Box position="relative" overflow="hidden" minH="100vh">
      <Heading
        color={bg}
        whiteSpace="nowrap"
        fontSize="25vw"
        display="flex"
        justifyContent="center"
        overflow="hidden"
        position={["static", "static", "static", "absolute"]}
        textTransform="uppercase"
        top="-7rem"
        userSelect="none"
      >
        {props.name}
      </Heading>
      <Flex flexDirection="column">
        <Box position={["static", "static", "static", "absolute"]}>
          <Image
            src={props.img}
            alt={props.name}
            w={["100vw", "600px", "700px", "100vh"]}
            marginInline="auto"
            userSelect="none"
          />
        </Box>
        <Box
          position={["static", "static", "static", "absolute"]}
          left="30rem"
          top="15rem"
          padding="1rem"
          marginX={["1rem", "2rem", "3rem", "0"]}
          bg="blackAlpha.400"
          borderRadius="10px"
          marginRight={["1rem", "2rem", "3rem", "2rem"]}
        >
          <SkinText title="Description" text={props.description} />
          <SkinText title="Rarity" text={props.rarity} />
          <SkinText title="Introduction" text={props.introduction} />
        </Box>
      </Flex>
      <Link href="/">
        <Box
          position="absolute"
          fontSize="2rem"
          bottom="1rem"
          left={["50%", "50%", "50%", "5%"]}
          marginLeft="-50px"
          bg="blackAlpha.500"
          padding=".5rem 1rem"
          borderRadius="5px"
          transition=".3s ease"
          _hover={{ bg: "purple.600" }}
        >
          <Icon as={UilEstate} color="gray.300" />
        </Box>
      </Link>
      <Box paddingBottom="7rem" />
    </Box>
  );
};

export default skinInfo;
