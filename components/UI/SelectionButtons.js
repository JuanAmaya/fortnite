import { Flex } from "@chakra-ui/react";
import { UilUser, UilBackpack, UilShovel } from "@iconscout/react-unicons";
import { useState } from "react";
import ButtonIcon from "./ButtonIcon";

const SelectionButtons = () => {
  const [skinsTab, setSkinsTab] = useState(true);
  const [backpacksTab, setBackpacksTab] = useState(false);
  const [pickaxeTab, setPickaxeTab] = useState(false);

  const skinsTabHandler = () => {};

  return (
    <Flex gap=".5rem">
      <ButtonIcon icon={<UilUser />} />
      <ButtonIcon icon={<UilBackpack />} />
      <ButtonIcon icon={<UilShovel />} />
    </Flex>
  );
};

export default SelectionButtons;
