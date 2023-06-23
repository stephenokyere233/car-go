import { View,Text } from "react-native"
import { Feather } from "@expo/vector-icons";

const Footer=()=>{
    return (
      <View
        style={{
          height: 40,
          alignItems: "center",
          borderTopWidth: 1,
          padding: 10,
          flexDirection: "row",
          backgroundColor: "#F1EFE7",
          justifyContent:"space-between"
        }}
      >
        <Text style={{fontWeight:"bold"}}>&copy; Copyright 2023, All Rights Reserved</Text>
        <Feather name="github" size={24} color="black" />
      </View>
    );
}

export default Footer