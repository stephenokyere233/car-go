import { FC } from "react";
import { TouchableOpacity, Text } from "react-native";

const Button: FC<{
  label?: string;
  color?: string;
  icon?: any;
  props?: any;
  width?: string | number;
  style?: any;
  onPress?: () => void;
}> = ({ label, color, icon, width, style, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        ...style,
        backgroundColor: color ? color : "black",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        width: width ? width : "100%",
        flexDirection:"row",
       justifyContent:"center"
      }}
      onPress={onPress}
    >
      <Text>{icon}</Text>
      <Text style={{ color: "white", textTransform: "uppercase" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
