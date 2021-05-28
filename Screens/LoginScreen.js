import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import {
  Button, I
  nput, Image, ThemeProvider
} from "react-native-elements";
import { auth } from "../firebase";
import logo from "../images/logo.png";
import logo_Text from "../images/logo_Text.png";

const theme = {
  Button: {
    titleStyle: {
      color: "#c20000",
    },
  },
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);
  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((e) => alert(e));
  };
  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.Container}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <Image
          source={logo}
          style={{ width: 200, height: 150 }}
          resizeMode="contain"
        />
        <Image
          source={logo_Text}
          style={{ width: 200, height: 200, marginTop: -80 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
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
          style={{ borderWidth: 0 }}
          onSubmitEditing={signIn}
          inputStyle={{ color: "#c20000" }}
        />
      </View>

      <Button
        title="SignIn"
        containerStyle={styles.button}
        onPress={signIn}
        buttonStyle={styles.buttonStyle}
      />
      <ThemeProvider theme={theme}>
        <Button
          title="SignUp"
          containerStyle={styles.button}
          type="outline"
          buttonStyle={{
            borderColor: "#c20000",
            titleStyle: {
              color: "red",
            },
          }}
          onPress={() => navigation.navigate("SignUp to Ketchup")}
        />
      </ThemeProvider>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  button: { width: 200, marginTop: 10, color: "#c20000", marginBottom: 10 },
  buttonStyle: { backgroundColor: "#c20000" },
});
