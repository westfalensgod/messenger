import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
// import Avatar from "boring-avatars";

type Props = {
  id: string;
  chatName: string;
  enterChat: (id: string, chatName: string) => void;
};

const CustomListItem = ({ id, chatName, enterChat }: Props) => {
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
          test
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
