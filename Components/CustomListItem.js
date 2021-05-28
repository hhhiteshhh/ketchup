import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChatMessages(snapshot.docs.map((doc) => doc.data()));
      });
    return unsubscribe;
  }, []);
  return (
    <TouchableOpacity onPress={() => enterChat(id, chatName)}>
      <View
        key={id}
        style={{
          backgroundColor: "#000",
          width: "100%",
          margin: 0,
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          rounded
          size="medium"
          source={{
            uri:
              chatMessages?.[0]?.photoURL ||
              "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
          }}
        />

        <ListItem.Content>
          <ListItem.Title
            style={{
              fontWeight: "bold",
              color: "#c20000",
              marginLeft: 15,
              fontSize: 20,
            }}
          >
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ color: "#707070", marginLeft: 15, fontSize: 15 }}
          >
            {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
          </ListItem.Subtitle>
        </ListItem.Content>
      </View>
    </TouchableOpacity>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#000",
  },
});
