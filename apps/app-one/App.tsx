import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { StyleSheet } from "@example/theme";
import { Button, Text } from "@example/ui";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button onPress={() => alert("Button Pressed!")}>Press Me</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
}));
