import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
// types
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, "Chat">;
type ChatScreenRouteProp = RouteProp<RootStackParamList, "Chat">;

type Props = {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
};

const ChatScreen = ({ navigation, route }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.chatName,
      headerBackTitleVisible: false,
    });
  }, [navigation]);
  return (
    <View>
      <Text>yoooo</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
