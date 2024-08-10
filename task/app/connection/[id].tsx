import {
  View,
} from "@gluestack-ui/themed";
import React from "react"
import UserView from "@/components/user";



const ConnectionScreen = () => {
  return (
    <View flex={1}>
      <UserView showFavIcon={true}
        user={{}}
       />
    </View>
  );
};

export default ConnectionScreen;
