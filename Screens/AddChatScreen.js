import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../firebase";
const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
    });
  }, [navigation]);

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((e) => alert(e));
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        type="text"
        value={input}
        onChangeText={(text) => setInput(text)}
        style={{ borderWidth: 0 }}
        inputStyle={{ color: "#fff" }}
        leftIcon={<FontAwesome name="wechat" size={24} color="#c20000" />}
        onSubmitEditing={createChat}
      />
      <Button
        disabled={!input}
        onPress={createChat}
        title="Create new Chat"
        containerStyle={styles.button}
        buttonStyle={styles.buttonStyle}
      />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  button: { width: 200, marginTop: 10, color: "#c20000", marginBottom: 10 },
  buttonStyle: { backgroundColor: "#c20000" },
});
