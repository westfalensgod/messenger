import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

// types
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) navigation.replace("Home");
    });

    return unsubscribe;
  }, []);

  const handleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(true);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="light" />

      <Image
        source={{
          uri: "https://avatars.githubusercontent.com/u/24266984?v=4",
        }}
        style={{
          width: 200,
          height: 200,
          marginTop: 16,
          marginLeft: "auto",
          marginBottom: 16,
          marginRight: "auto",
        }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          textContentType="password"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleLogIn}
          secureTextEntry
        />
      </View>
      <Button
        buttonStyle={{ backgroundColor: "#EC6C2B" }}
        containerStyle={styles.button}
        style={{ backgroundColor: "#EC6C2B" }}
        onPress={handleLogIn}
        title="Login"
      />
      <Button
        titleStyle={{ color: "#EC6C2B" }}
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
        title="Sign Up"
        type="outline"
      />
      {loading && (
        <Text style={{ marginTop: 8, marginBottom: 8 }}>Loading...</Text>
      )}
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 12,
  },
});
