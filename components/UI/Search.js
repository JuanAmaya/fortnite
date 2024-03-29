import { useRef, useState } from "react";
import {
  Input,
  Box,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
} from "@chakra-ui/react";
import { UilSearch, UilHeart, UilEstate } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const searchVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.4,
    },
  },
};

const Search = (props) => {
  const skinNameInputRef = useRef();
  const [favoriteComponent, setFavoriteComponent] = useState(true);

  const searchSkinHandler = (event) => {
    event.preventDefault();

    const enteredSkin = skinNameInputRef.current.value;

    // if (enteredSkin.trim().length === 0) {
    //   console.log("No tiene nada");
    //   return;
    // }
    console.log(enteredSkin);
    props.onSkinSearch(enteredSkin);
  };

  const favoriteComponentHandler = () => {
    setFavoriteComponent(!favoriteComponent);
    props.onFavoriteComponent(favoriteComponent);
  };

  return (
    <Flex
      as={motion.form}
      mt="2rem"
      onSubmit={searchSkinHandler}
      variants={searchVariants}
      initial="hidden"
      animate="visible"
      flexDirection="horizontal"
      gap="1rem"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <UilSearch color="white" />
        </InputLeftElement>
        <Input
          placeholder="Search..."
          type="search"
          variant="flushed"
          color="gray.200"
          maxW="17rem"
          marginLeft=".5rem"
          focusBorderColor="blue.400"
          ref={skinNameInputRef}
          onChange={searchSkinHandler}
        />
      </InputGroup>
      <Button
        leftIcon={favoriteComponent ? <UilHeart /> : <UilEstate />}
        colorScheme={favoriteComponent ? "red" : "blue"}
        onClick={favoriteComponentHandler}
      >
        {favoriteComponent ? "Favs" : "Home"}
      </Button>
    </Flex>
  );
};

export default Search;
