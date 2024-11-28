import { StyleSheet, View, Pressable, Text, ViewStyle, StyleProp } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = {
  label: string;
  theme?: "primary";
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Button({ label, onPress, theme, disabled, style }: Props) {
  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          style, // Allow additional style to be passed in
        ]}
      >
        <Pressable
          style={[
            styles.button,
            { 
              backgroundColor: disabled ? "#cccccc" : "#fff", 
              borderWidth: 4,  // Border applied to the button itself, not container
              borderColor: disabled ? "#cccccc" : "#ffd33d",
            }
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
    width: 320, // Width of the button container (maintained)
    height: 68, // Height of the button container (maintained)
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18, // Matches the button's border radius
    padding: 3, // Space inside the container for better visual balance
  },
  button: {
    borderRadius: 18, // Matches the container's border radius
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#000", // Default background color
  },
  buttonDisabled: {
    backgroundColor: "#666666", // Disabled button color
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff", // Text color
    fontSize: 16,
  },
  buttonLabelDisabled: {
    color: "#cccccc", // Disabled text color
  },
});
