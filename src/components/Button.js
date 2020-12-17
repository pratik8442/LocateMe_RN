import React from "react";
import * as Haptics from "expo-haptics";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

//handle custome button 
const Button = (props) => {
  return (
    <TouchableOpacity
      style={[styles.roundButton, { backgroundColor: props.buttonColor }]}
      onPress={() => {
        Haptics.impactAsync("medium");
        return props.myOnPress();
      }}
    >
      <Ionicons name={props.iconName} size={24} color="black" />
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    padding: 3,
    marginTop: hp(5),
    borderRadius: 10,
    width: wp("33%"),
    height: hp("8%"),

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "black",
    shadowRadius: 4.84,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    elevation: 6,
  },
});

export default Button;
