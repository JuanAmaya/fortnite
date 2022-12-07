import { Button } from "@chakra-ui/react";

const ButtonIcon = (props) => {
  return (
    <Button
      colorScheme={`${props.activeTab ? "blue" : "blackAlpha"}`}
      onClick={props.onClick}
    >
      {props.icon}
    </Button>
  );
};

export default ButtonIcon;
