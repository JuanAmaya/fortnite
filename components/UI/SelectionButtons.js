import { Flex, propNames } from "@chakra-ui/react";
import { UilUser, UilBackpack, UilShovel } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ButtonIcon from "./ButtonIcon";

const selectionVariants = {
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

const SelectionButtons = (props) => {
  const [skinsTab, setSkinsTab] = useState(true);
  const [backpacksTab, setBackpacksTab] = useState(false);
  const [pickaxesTab, setPickaxesTab] = useState(false);

  const skinsTabHandler = () => {
    setSkinsTab(true);
    setBackpacksTab(false);
    setPickaxesTab(false);
  };

  const backpackTabHandler = () => {
    setBackpacksTab(true);
    setSkinsTab(false);
    setPickaxesTab(false);
  };

  const pickaxeTabHandler = () => {
    setPickaxesTab(true);
    setSkinsTab(false);
    setBackpacksTab(false);
  };

  useEffect(() => {
    props.onItemTab({ skinsTab, backpacksTab, pickaxesTab });
  }, [skinsTab, backpacksTab, pickaxesTab]);

  return (
    <Flex
      as={motion.div}
      gap=".5rem"
      variants={selectionVariants}
      initial="hidden"
      animate="visible"
      flexDirection="horizontal"
    >
      <ButtonIcon
        icon={<UilUser />}
        activeTab={skinsTab}
        onClick={skinsTabHandler}
      />
      <ButtonIcon
        icon={<UilBackpack />}
        activeTab={backpacksTab}
        onClick={backpackTabHandler}
      />
      <ButtonIcon
        icon={<UilShovel />}
        activeTab={pickaxesTab}
        onClick={pickaxeTabHandler}
      />
    </Flex>
  );
};

export default SelectionButtons;
