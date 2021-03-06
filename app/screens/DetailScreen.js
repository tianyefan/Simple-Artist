import React, { useEffect, useState } from "react";
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
import axios from "axios";
import serverUrl from "../util/serverUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
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
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [feed, setFeed] = useState({});
  const renderItem = (item) => {
    //console.log(item);
    return (
      <Comment
        uri={item.item.commenter}
        comment={item.item.comment}
        navigation={navigation}
      />
    );
  };
  const { uri, feedId } = route.params;
  const prof_pic =
    "https://firebasestorage.googleapis.com/v0/b/smart-med-aba54.appspot.com/o/doge.jpg?alt=media&token=a297f8f7-185f-4b90-9d5d-151982bc1541";

  useEffect(async () => {
    //make get reques to get Feed object via id
    await axios
      .get(`${serverUrl}/feeds/${feedId}`)
      .then((res) => {
        setFeed(res.data);
        setData(res.data.comments);
      })
      .catch((err) => console.log(err));
  }, []);

  const Detail = () => {
    return (
      <Stack direction="column" my={2}>
        <Box flexDir="row" alignItems="center" justifyContent="center" my={2}>
          <Image
            src={feed.profile_pic}
            borderRadius={50}
            size="xs"
            mx={2}
            alt="pro_pic"
          />
          <Text>{feed.author}</Text>
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
            {feed.imageName}
          </Text>
        </Box>
        <Box my={2}>
          <Text mx={7}>{`#${feed.tag}`}</Text>
        </Box>
      </Stack>
    );
  };

  const handlePress = async () => {
    // make post request to create Comment,
    // make put request to update responding Feed
    // after updating feed, setData with new comment
    // get user from AsyncStorage
    Keyboard.dismiss();
    const Comment = {};
    const commentId = uuid.v4();
    const Feed = {};
    await AsyncStorage.getItem("user")
      .then(async (res) => {
        Comment.commenter = JSON.parse(res).profile_pic;
        Comment.id = commentId;
        Comment.comment = text;
        Comment.forWhich = feedId;
        await axios
          .post(`${serverUrl}/comments/${commentId}`, JSON.stringify(Comment))
          .then(async (res) => {
            //console.log(res.data);
            const newcomment = res.data;
            // get feed
            // update feed
            await axios
              .get(`${serverUrl}/feeds/${feedId}`)
              .then(async (res) => {
                Feed.author = res.data.author;
                Feed.profile_pic = res.data.profile_pic;
                Feed.id = res.data.id;
                Feed.imageSrc = res.data.imageSrc;
                Feed.tag = res.data.tag;
                Feed.imageName = res.data.imageName;
                Feed.comments = [...res.data.comments, newcomment];
                Feed.savedBy = res.data.savedBy;
                await axios
                  .put(`${serverUrl}/feeds/${feedId}`, JSON.stringify(Feed))
                  .then((res) => {
                    //console.log(res.data);
                    setData(res.data.comments);
                    setText("");
                  })
                  .catch((err) => console.log(err));
              });
          });
      })
      .catch((err) => console.log(err));
    // const comment = {
    //   id: nextId("comment"),
    //   imgURL: prof_pic,
    //   text: text,
    // };
    // setData([...data, comment]);
    // setText("");
  };
  return (
    <>
      <Topbar />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={Detail}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
              placeholder="Write your kind comment here"
              w={230}
              value={text}
              onChangeText={(text) => setText(text)}
            />
          </Box>
          <Box mx={1}>
            <Button borderRadius={10} onPress={handlePress}>
              Send
            </Button>
          </Box>
        </Stack>
      </KeyboardAvoidingView>
    </>
  );
}

export default DetailScreen;
