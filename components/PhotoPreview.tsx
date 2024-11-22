import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';

type Props = {
  photo: any;
  handleRetakePhoto: () => void;
  handleSavePhoto?: () => void;
};

export default function PhotoPreview({ photo, handleRetakePhoto, handleSavePhoto }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} style={styles.preview} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
          <AntDesign name="close" size={44} color="black" />
        </TouchableOpacity>
        {handleSavePhoto && (
          <TouchableOpacity style={styles.button} onPress={handleSavePhoto}>
            <AntDesign name="check" size={44} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
  },
});