import React, { useEffect, useMemo, useState } from "react";
//import MasonryList from "@react-native-seoul/masonry-list";
import { Box, Stack, FlatList, Image, Text } from "native-base";
import Feed from "./Feed";
import axios from "axios";
import serverUrl from "../util/serverUrl";
const data = [
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
  {
    id: "id127",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Rivet Emerly Media Console",
  },
  {
    id: "id128",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Drew Barrymore Flower Home Accent Chair",
  },
  {
    id: "id129",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Ecobirdy Charlie Chair",
  },
  {
    id: "id130",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*",
    text: "Hailey Sofa",
  },
  {
    id: "id131",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*",
    text: "Farmhouse Dining Table",
  },
  {
    id: "id132",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Evelyn Coffee Table",
  },
  {
    id: "id133",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Slope Nomad Leather Sofa",
  },
  {
    id: "id134",
    imgURL:
      "https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg",
    text: "Chair and Table",
  },
];

const Masonry = ({ navigation }) => {
  const [allfeeds, setAllFeeds] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(async () => {
    await axios
      .get(`${serverUrl}/feeds`)
      .then((res) => {
        //console.log(res.data);
        setAllFeeds(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true)
    await axios.get(`${serverUrl}/feeds`)
      .then(res => {
        setAllFeeds(res.data)
      })
      .catch(err => console.log(err))
      .finally(setRefreshing(false))
  }
  return (
    <FlatList
      keyExtrator={(item) => item.id}
      data={allfeeds}
      renderItem={({ item }) => (
        <Feed uri={item.imageSrc} feedId={item.id} navigation={navigation} />
      )}
      ListFooterComponent={
        <Box
          w="100%"
          h={200}
          alignItems="center"
          justifyContent="flex-start"
          my={10}
        >
          <Text textAlign="center" fontSize={20}>
            No More!!
          </Text>
        </Box>
      }
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
};

export default Masonry;
