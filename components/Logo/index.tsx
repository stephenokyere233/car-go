import { View,Image } from "react-native"

const Logo=()=>{
    return (
      <View>
        <Image style={{width:200, height:50}} source={{ uri: "./assets/logo.svg" }}  />
      </View>
    );
}

export default Logo