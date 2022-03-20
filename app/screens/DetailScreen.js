import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  Stack,
  Pressable,
  FlatList,
  Input,
  Button,
  KeyboardAvoidingView,
} from "native-base";
import Topbar from "../components/Topbar";
import Comment from "../components/Comment";
import { Platform, Keyboard } from "react-native";
import nextId from "react-id-generator";
const comments = [
  {
    id: "id123",
    imgURL:
      "https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg",
    text: "Pioneer LHS Chaise Lounger in Grey Colour",
  },
  {
    id: "id124",
    imgURL:
      "https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red",
    text: "Precedant Furniture",
  },
  {
    id: "id125",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg",
    text: "Leverette Upholstered Platform Bed",
  },
  {
    id: "id126",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*",
    text: "Briget Accent Table",
  },
];
function DetailScreen({ route, navigation }) {
  const [data, setData] = useState(comments)
  const [text, setText] = useState('')
  const renderItem = (item) => {
    //console.log(item);
    return (
      <Comment
        uri={item.item.imgURL}
        comment={item.item.text}
        navigation={navigation}
      />
    );
  };
  const { uri } = route.params;
  const prof_pic =
    "https://firebasestorage.googleapis.com/v0/b/smart-med-aba54.appspot.com/o/doge.jpg?alt=media&token=a297f8f7-185f-4b90-9d5d-151982bc1541";

  const Detail = () => {
    return (
      <Stack direction="column" my={2}>
        <Box flexDir="row" alignItems="center" justifyContent="center" my={2}>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Image
              src={prof_pic}
              borderRadius={50}
              size="xs"
              mx={2}
              alt="pro_pic"
            />
          </Pressable>
          <Text>The Doogge</Text>
        </Box>
        <Box shadow="5">
          <Image
            src={uri}
            w={300}
            h={300}
            mx="auto"
            my={1}
            alt="image"
            borderRadius={10}
          />
        </Box>
        <Box my={2}>
          <Text fontSize={25} mx={7}>
            Example Title
          </Text>
        </Box>
        <Box my={2}>
          <Text mx={7}>#Tag</Text>
        </Box>
      </Stack>
    );
  };

  const handlePress = () => {
    Keyboard.dismiss()
    const comment = {
      id: nextId('comment'),
      imgURL: prof_pic,
      text: text
    }
    setData([...data,comment])
    setText('')
  }
  return (
    <>
      <Topbar />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={Detail}
      />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          bottom={0}
          mx={3}
          h={60}
          my={3}
        >
          <Box mx={1}>
            <Input
              type="text"
              variant="rounded"
              placeholder="Please give your kind comment here"
              w={230}
              value={text}
              onChangeText={text => setText(text)}
            />
          </Box>
          <Box mx={1}>
            <Button borderRadius={10} onPress={handlePress}>Send</Button>
          </Box>
        </Stack>
      </KeyboardAvoidingView>
    </>
  );
}

export default DetailScreen;
