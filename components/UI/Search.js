import { useRef } from "react";
import {
  IconButton,
  Input,
  Center,
  Box,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { UilSearch } from "@iconscout/react-unicons";
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

  return (
    <Box
      as={motion.form}
      mt="2rem"
      onSubmit={searchSkinHandler}
      variants={searchVariants}
      initial="hidden"
      animate="visible"
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
    </Box>
  );
};

export default Search;
