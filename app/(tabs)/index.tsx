import { StyleSheet, Text, View } from "react-native";
import DilemmaContainer from "../../components/DilemmaContainer/DilemmaContainer";
import VotingOptionsContainer from "../../components/DilemmaContainer/VotingOptionsContainer";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <DilemmaContainer>
        <VotingOptionsContainer />
      </DilemmaContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});