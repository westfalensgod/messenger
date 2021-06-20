import React, { useLayoutEffect, useState } from "react";
import { Platform, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Text, Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

import { auth } from "../firebase";

// types
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const handleSignUp = () => {
    setLoading(() => true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user?.updateProfile({
          displayName: name,
        });

        setLoading(() => false);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 48, color: "#35352B" }}>
        Create an account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full name"
          textContentType="name"
          value={name}
          onChangeText={setName}
        />
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
          secureTextEntry
          onSubmitEditing={handleSignUp}
        />
      </View>
      <Button
        buttonStyle={{ backgroundColor: "#EC6C2B" }}
        containerStyle={styles.button}
        raised
        title="Register"
        onPress={handleSignUp}
      />
      {loading && (
        <Text style={{ marginTop: 8, marginBottom: 8 }}>Loading...</Text>
      )}
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 12,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 12,
  },
});
