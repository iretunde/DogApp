import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  imageUri: string;
  onEditPress: () => void;
};

export default function ProfilePicture({ imageUri, onEditPress }: Props) {
  return (
    <View style={styles.container}>
      {/* <View style={styles.imageContainer}> */}
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        contentFit="cover"
      />
      {/* </View> */}
      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <AntDesign name="edit" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 100,
    height: 100,
    // borderWidth: 2,
  },
  // imageContainer: {
  //   position: "relative",
  //   width: 100,
  //   height: 100,
  //   borderWidth: 2,
  //   borderColor: "#F00",
  //   borderRadius: 50,
  // },
  image: {
    width: 100,
    height: 100,
    resizeMode: "stretch",
    borderRadius: 50,
  },
  editButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
