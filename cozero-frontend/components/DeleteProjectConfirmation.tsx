import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { translate } from "../utils/language.utils";

interface Props {
  header: string;
  text: string;
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
}

export default function SimpleConfirmationAlert({
  header,
  text,
  isOpen,
  onClose,
  onAction,
}: Props) {
  const cancelRef = React.useRef(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{text}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {translate("NO")}
            </Button>
            <Button colorScheme="red" ml={3} onClick={onAction}>
              {translate("YES")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
