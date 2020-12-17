import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

//handle images and color for access success or denied state
const ShowImage = (props) => {
  return (
    <View style={styles.parentStyleView}>
      <Ionicons name={props.iconName} size={35} color={props.iconColor} />
      <Text style={styles.headerTextStyle}>{props.accessStmt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 15,
    color: "#394867",
    marginTop: 5,
  },

  parentStyleView: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShowImage;
