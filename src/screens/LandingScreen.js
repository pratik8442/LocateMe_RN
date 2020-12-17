import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import Button from "../components/Button";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import {
  apiCallLink,
  waitingForLocationString,
  errorMsgLocation,
} from "../constants/AllConstant";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LoadAccessEmoji from "../constants/LoadAccessEmoji";

const LandingScreen = () => {
  const [apiCityData, setApiCityData] = useState([]);
  const [location, setLocation] = useState(null);
  const [locationText, setLocationText] = useState(waitingForLocationString);
  const [gpsPermission, setGPSPermission] = useState(true);
  const [gpsOn, setGPSOn] = useState();
  const [accessState, setAccessState] = useState();
  const [locationCity, setLocationCity] = useState();

  useEffect(() => {
    getGPSPermission();
    gpsOnPopupAndFetchLocation();
    getDataFromApiAsync();
  }, []);

  //this function will fetch current location and also handle gps permission
  const getGPSPermission = async () => {
    //gpsOnPopup();
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setGPSPermission(false);
    } else {
      setGPSPermission(true);
      gpsOnPopupAndFetchLocation();
    }
  };
  const gpsOnPopupAndFetchLocation = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(async (data) => {
        console.log(data);
        if (data === "enabled" || data === "already-enabled") {
          let location = await Location.getLastKnownPositionAsync({});
          const place = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          //extracting city from current location
          if (place !== null) {
            place.find((p) => {
              setLocationText("Your current location is: \n" + p.city);
              setLocationCity(p.city);
            });
          }
        }
      })
      .catch((err) => {});
  };
  // fetching data from api
  const getDataFromApiAsync = async () => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        let cityTextResponse = request.responseText;
        //spliting the citys and putting in an array
        let cityArray = cityTextResponse.split(";");
        setApiCityData(cityArray);
      } else {
        console.warn("error");
      }
    };
    request.open("GET", apiCallLink);
    request.send();
  };
  //check if the current city matches with api citys
  const checkIfCurrentCityIsCorrect = () => {
    if (locationCity !== null) {
      for (let i = 0; i <= apiCityData.length - 1; i++) {
        if (apiCityData[i].trim() === locationCity) {
          setAccessState(true);
          return;
        } else {
          setAccessState(false);
        }
      }
    } else {
      showAlret();
    }
  };
  //alert view code
  const showAlret = () => {
    Alert.alert(
      "Please wait",
      "We are still trying to locate your city",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };
  // render the UI code
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.textView}>
        {gpsPermission ? (
          <Text style={styles.textStyle}>{locationText}</Text>
        ) : (
          <Text style={styles.textErrorStyle}>{errorMsgLocation}</Text>
        )}
      </View>
      <LoadAccessEmoji accessStatteValue={accessState} />
      <View style={styles.insideView}>
        <Button
          title="Check the access"
          buttonColor="#fa9579"
          iconName="cloud-outline"
          myOnPress={checkIfCurrentCityIsCorrect}
        />
        <Button
          title="Locate me again"
          buttonColor="#94b4a4"
          iconName="location-outline"
          myOnPress={gpsOnPopupAndFetchLocation}
        />
      </View>
    </SafeAreaView>
  );
};
//style sheet code
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
  },
  insideView: {
    alignItems: "center",
    alignContent: "center",
  },
  textView: {
    alignSelf: "center",
    flexDirection: "column",
    marginBottom: hp(12),
  },
  textStyle: {
    textAlign: "center",
    color: "#394867",
    fontSize: 15,
    fontWeight: "400",
  },
  textErrorStyle: {
    textAlign: "center",
    color: "#ee6f57",
    fontSize: 14,
    fontWeight: "400",
  },
  spinnerTextStyle: {
    fontWeight: "300",
  },
});

export default LandingScreen;
