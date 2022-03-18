import React from "react";
import { Box, Actionsheet, useDisclose, Text, Center } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
function Create() {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Center safeArea>
      <Actionsheet isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text fontSize={16}>Create</Text>
          </Box>
          <Actionsheet.Item
            startIcon={<MaterialIcons name="file-upload" size={30} />}
          >
            Upload a Photo
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={<MaterialIcons name="photo-camera" size={30} />}
          >
            Take a Photo
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={onClose}
            startIcon={<MaterialIcons name="close" size={30} />}
          >
            Cancel
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}

export default Create;
