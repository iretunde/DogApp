import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = {
  label: string;
  theme?: "primary";
  onPress?: () => void;
  disabled?: boolean;
};

export default function Button({ label, onPress, theme, disabled }: Props) {
  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { 
            borderWidth: 4, 
            borderColor: disabled ? "#cccccc" : "#ffd33d", 
            borderRadius: 18 
          },
        ]}
      >
        <Pressable
          style={[
            styles.button, 
            { backgroundColor: disabled ? "#cccccc" : "#fff" }
          ]}
          onPress={onPress}
          disabled={disabled}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color={disabled ? "#666666" : "#25292e"}
            style={styles.buttonIcon}
          />
          <Text style={[
            styles.buttonLabel, 
            { color: disabled ? "#666666" : "#25292e" }
          ]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={[
          styles.button,
          disabled && styles.buttonDisabled
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[
          styles.buttonLabel,
          disabled && styles.buttonLabelDisabled
        ]}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#000",
  },
  buttonDisabled: {
    backgroundColor: "#666666",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
  buttonLabelDisabled: {
    color: "#cccccc",
  },
});