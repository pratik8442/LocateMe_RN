import * as Location from "expo-location";
import React, { useState } from "react";
import ShowImage from "../components/ShowImage";

//check if the city has the access and change the image accordingly
const LoadAccessEmoji = (props) => {
  if (props.accessStatteValue === true) {
    return (
      <ShowImage
        iconName="earth-sharp"
        iconColor="#2ec1ac"
        accessStmt="Access granted"
      />
    );
  } else if (props.accessStatteValue === false) {
    return (
      <ShowImage
        iconName="md-cloud-offline"
        iconColor="#ee6f57"
        accessStmt="Access denied"
      />
    );
  } else {
    return (
      <ShowImage
        iconName="md-earth-sharp"
        iconColor="#7e8a97"
        accessStmt="let's check for your access"
      />
    );
  }
};

export default LoadAccessEmoji;
