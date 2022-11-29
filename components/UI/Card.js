import { Box, Text, Image, Flex } from "@chakra-ui/react";

// const titleVariants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.8,
//   },
//   visible: {
//     opacity: 1,
//     scale: 1,
//   },
// };

// const imageVariants = {
//   hidden: {
//     x: -200,
//   },
//   visible: {
//     x: 0,
//   },
// };

const Card = (props) => {
  let bg = "radial-gradient(50% 50% at 50% 50%, #B3B3B3 0%, #5A5C5F 100%)";
  switch (props.rarity) {
    case "uncommon":
      bg = "radial-gradient(50% 50% at 50% 50%, #84C173 0%, #458932 100%)";
      break;

    case "rare":
      bg = "radial-gradient(50% 50% at 50% 50%, #82BFDC 0%, #1C698D 100%)";
      break;

    case "epic":
      bg = "radial-gradient(50% 50% at 50% 50%, #BD7BF5 0%, #5F3B7D 100%)";
      break;

    case "legendary":
      bg = "radial-gradient(50% 50% at 50% 50%, #E0661C 0%, #9A4D1E 100%)";
      break;

    case "dark":
      bg = "radial-gradient(50% 50% at 50% 50%, #CF6FBD 0%, #7A1367 100%)";
      break;

    case "frozen":
      bg = "radial-gradient(50% 50% at 50% 50%, #B2DFFF 0%, #3B8BC5 100%)";
      break;

    case "lava":
      bg = "radial-gradient(50% 50% at 50% 50%, #C1687B 0%, #991B36 100%)";
      break;

    case "shadow":
      bg = "radial-gradient(50% 50% at 50% 50%, #6A6A6A 0%, #2A2727 100%)";
      break;

    case "slurp":
      bg = "radial-gradient(50% 50% at 50% 50%, #73D4F2 0%, #137796 100%)";
      break;

    case "dc":
      bg = "radial-gradient(50% 50% at 50% 50%, #2D6290 0%, #273C4E 100%)";
      break;

    case "marvel":
      bg = "radial-gradient(50% 50% at 50% 50%, #AB0000 0%, #7C1C1C 100%)";
      break;

    case "starwars":
      bg = "radial-gradient(50% 50% at 50% 50%, #0A1833 0%, #040A14 100%)";
      break;

    case "icon":
      bg = "radial-gradient(50% 50% at 50% 50%, #3F9EBE 0%, #375E6B 100%)";
      break;

    case "gaminglegends":
      bg = "radial-gradient(50% 50% at 50% 50%, #312B7B 0%, #220828 100%)";
      break;
  }

  return (
    <Box
      bg={bg}
      w="9rem"
      h="12rem"
      borderRadius="lg"
      boxShadow="lg"
      overflow="hidden"
      className="skinCard"
    >
      <Flex alignItems="center" flexDirection="column">
        <Text as="b" color="gray.200" fontSize="xl" textAlign="center">
          {props.name}
        </Text>
        <Text color="gray.200" fontSize="lg" textTransform="capitalize">
          {props.rarity}
        </Text>
      </Flex>
      <Image
        src={props.img}
        alt={props.name}
        className="skinImg"
        borderBottomRadius="lg"
      />
    </Box>
  );
};

export default Card;
