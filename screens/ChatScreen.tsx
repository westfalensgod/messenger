import React, { useState, useLayoutEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import {
  Platform,
  StyleSheet,
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import { db, auth } from "../firebase";

// types
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { Doc } from "./HomeScreen";

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, "Chat">;
type ChatScreenRouteProp = RouteProp<RootStackParamList, "Chat">;

type Props = {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
};

const ChatScreen = ({ navigation, route }: Props) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Doc[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.chatName,
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  }, [route]);

  const handleSendMessage = () => {
    Keyboard.dismiss();

    if (input) {
      db.collection("chats").doc(route.params.id).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        text: input,
        displayName: auth.currentUser?.displayName,
        email: auth.currentUser?.email,
      });

      setInput("");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView>
              {messages.map((msg) =>
                msg.data.email === auth.currentUser?.email ? (
                  <View key={msg.id} style={styles.receiver}>
                    <Avatar
                      containerStyle={styles.receiverAvatar}
                      rounded
                      source={{
                        uri: "https://avatars.githubusercontent.com/u/24266984?v=4",
                      }}
                    />
                    <Text style={styles.textReceiver}>{msg.data.text}</Text>
                  </View>
                ) : (
                  <View key={msg.id} style={styles.sender}>
                    <Avatar
                      containerStyle={styles.senderAvatar}
                      rounded
                      source={{
                        uri: "https://avatars.githubusercontent.com/u/24266984?v=4",
                      }}
                    />
                    <Text style={styles.textSender}>{msg.data.text}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Enter your message"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={handleSendMessage}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={handleSendMessage} activeOpacity={0.5}>
                <Icon name="paper-plane" size={24} color="#35352B" />
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
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 16,
    backgroundColor: "#ECECEC",
    padding: 12,
    color: "grey",
    borderRadius: 32,
  },
  textReceiver: {
    color: "#FFFFFF",
  },
  receiverAvatar: {
    position: "absolute",
    right: -14,
    bottom: -10,
  },
  receiver: {
    padding: 16,
    backgroundColor: "#ec6c2b",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 16,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  textSender: {
    color: "#35352b",
  },
  senderAvatar: {
    position: "absolute",
    left: -14,
    bottom: -10,
  },
  sender: {
    padding: 16,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 16,
    maxWidth: "80%",
    position: "relative",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
});
