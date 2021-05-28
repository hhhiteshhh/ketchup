import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomListItem from "../Components/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Ketchup",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              auth.signOut().then(() => {
                navigation.replace("SignIn to Ketchup");
              });
            }}
          >
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
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
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate("AddChat");
            }}
          >
            <SimpleLineIcons name="pencil" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        {chats?.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scroll: {
    height: "100%",
  },
});
