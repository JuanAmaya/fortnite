import { propNames, useDisclosure } from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const ModalError = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={onOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#1a1b1c">
          <ModalHeader color="gray.200">Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody color="gray.200">
            <p>{propNames.errorMessage}</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" onClick={refreshPage}>
              Refresh
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalError;
