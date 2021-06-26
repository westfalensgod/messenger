import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

// types
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { db } from "../firebase";

type AddChatScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddChat"
>;

type Props = {
  navigation: AddChatScreenNavigationProp;
};

const AddChatScreen = ({ navigation }: Props) => {
  const [input, setInput] = useState("");

  const handleCreateChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => navigation.goBack())
      .catch((error) => alert(error.message));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create a new Chat",
      headerBackTitle: "Home",
    });
  }, []);
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={handleCreateChat}
        leftIcon={<Icon name="wechat" size={24} color="#35352B" />}
      />
      <Button style={{}} title="Create new Chat" onPress={handleCreateChat} />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {},
});
