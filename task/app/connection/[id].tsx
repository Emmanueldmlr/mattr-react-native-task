import {
  View,
} from "@gluestack-ui/themed";
import React, { useEffect } from "react"
import UserView from "@/components/user";
import { useConnections } from "@/contexts/ConnectionContext";
import { User } from "@/types/UserType";
import LoadingStateComponent from "@/components/LoadingStateComponent";
import EmptyStateComponent from "@/components/EmptyStateComponent";
import { useLocalSearchParams } from "expo-router";



const ConnectionScreen = () => {
  const {getConnection} = useConnections()
  const [loading, setLoading] = React.useState(true)
  const [connection, setConnection] = React.useState<User | undefined | null>()
  const {id} = useLocalSearchParams();

  useEffect(() => {
    const connection = getConnection(parseInt(id as string))
    setConnection(connection)
    setLoading(false)
  }
  , [id])
  if (loading) {
    <LoadingStateComponent message="Loading user data..." />
  }
  if (!connection) {
    <EmptyStateComponent message="No user found" />
  }
  return (
    <View flex={1}>
      <UserView showFavIcon={true}
        user={connection}
        isDataLoading={loading}
       />
    </View>
  );
};

export default ConnectionScreen;
