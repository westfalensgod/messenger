import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from "firebase";

// import Avatar from "boring-avatars";
import { db, auth } from "../firebase";

import { Doc } from "../screens/HomeScreen";

type Props = {
  id: string;
  chatName: string;
  enterChat: (id: string, chatName: string) => void;
};

type Message = {
  timestamp: {
    [key: string]: number;
  };
  text: string;
  displayName: string;
  email: string;
};

const CustomListItem = ({ id, chatName, enterChat }: Props) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setChatMessages(
          snapshot.docs.map((doc: firebase.firestore.DocumentData) =>
            doc.data()
          )
        )
      );

    return unsubscribe;
  }, []);
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      {/* @TODO: adapt boring avatars library for RN projects */}
      <Avatar
        rounded
        source={{ uri: "https://avatars.githubusercontent.com/u/24266984?v=4" }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={2} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.text}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
