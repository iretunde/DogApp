import { View, Text, StyleSheet } from 'react-native';
import Logout from '@/components/Logout';

export default function Index() {
  return (
    <View style={styles.container}>
      <Logout></Logout>
      <Text style={styles.text}>Hi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6", 
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff", 
  },
});
