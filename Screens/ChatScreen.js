import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import { auth, db } from "../firebase";
const ChatScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.chatName,
      headerTitle: () => (
        <>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar
              rounded
              size="medium"
              source={{
                uri:
                  messages?.[0]?.data.photoURL ||
                  "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
              }}
            />
            <Text
              style={{
                fontWeight: "bold",
                color: "#fff",
                marginLeft: 15,
                fontSize: 25,
              }}
            >
              {route.params.chatName}
            </Text>
          </View>
        </>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return unsubscribe;
  }, [route]);
  const [input, setInput] = useState();
  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <KeyboardAvoidingView
        behavior={Platform.OD === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages?.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver}>
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position="absolute"
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -15,
                      }}
                      rounded
                      bottom={-15}
                      left={-15}
                      size={25}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Send a ketchup message"
                style={styles.textinput}
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#c20000" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textinput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ececec",
    padding: 10,
    color: "gray",
    borderRadius: 30,
  },
  receiverText: { color: "white", fontSize: 15 },
  senderText: {
    color: "white",
    fontSize: 15,
  },
  senderName: {
    left: -5,
    paddingRight: 10,
    fontSize: 10,
    color: "#707070",
  },
  receiver: {
    padding: 15,
    backgroundColor: "#707070",
    alignSelf: "flex-end",
    borderRadius: 10,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#c20000",
    alignSelf: "flex-start",
    borderRadius: 10,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
});
