import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Input, Image, Text } from "react-native-elements";
import { auth } from "../firebase";
import logo from "../images/logo.png";
import logo_Text from "../images/logo_Text.png";
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((e) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.Container}>
      <Text h3 style={{ color: "#c20000" }}>
        Create a Ketchup account
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Image
          source={logo}
          style={{ width: 200, height: 150 }}
          resizeMode="contain"
        />
        <Image
          source={logo_Text}
          style={{ width: 200, height: 200, marginTop: -70 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
          inputStyle={{ color: "#c20000" }}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          inputStyle={{ color: "#c20000" }}
        />

        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          inputStyle={{ color: "#c20000" }}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
          inputStyle={{ color: "#c20000" }}
        />
      </View>
      <Button
        raised
        title="Register"
        containerStyle={styles.button}
        onPress={register}
        buttonStyle={styles.buttonStyle}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  inputContainer: {
    width: 300,
  },
  button: { width: 200, marginTop: 10, color: "#c20000" },
  buttonStyle: { backgroundColor: "#c20000" },
});
