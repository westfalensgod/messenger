import React, { useLayoutEffect, useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";

import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";

// types
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type Doc = {
  id: string;
  data: firebase.firestore.DocumentData;
};

const HomeScreen = ({ navigation }: Props) => {
  const [chats, setChats] = useState<Doc[]>([]);

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setChats(docs);
    });

    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => navigation.replace("Login"))
      .catch((error) => alert(error.message));
  };

  const handleAddChat = () => {
    navigation.navigate("AddChat");
  };

  const handleEnterChat = (id: string, chatName: string): void => {
    navigation.navigate("Chat", { id, chatName });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Messenger App",
      headerStyle: { backgroundColor: "#E7E9C4" },
      headerTitleStyle: { color: "#35352B" },
      headerTintColor: "#35352B",
      headerLeft: () => (
        <View style={{ marginLeft: 16 }}>
          <TouchableOpacity onPress={handleSignOut} activeOpacity={0.5}>
            <Avatar
              rounded
              source={{
                uri:
                  auth?.currentUser?.photoURL ||
                  "https://avatars.githubusercontent.com/u/24266984?v=4",
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
            marginRight: 16,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="#35352B" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddChat} activeOpacity={0.5}>
            <AntDesign name="edit" size={24} color="#35352B" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data }) => (
          <CustomListItem
            enterChat={handleEnterChat}
            key={id}
            id={id}
            chatName={data.chatName}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
