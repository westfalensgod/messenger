import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {};

  return (
    <View>
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
          autoFocus
        />
        <Input
          placeholder="Password"
          textContentType="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Button
        containerStyle={styles.button}
        onPress={handleSignIn}
        title="Login"
      />
      <Button containerStyle={styles.button} title="Sign Up" type="outline" />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {},
  button: {},
});
