import UserView from "@/components/user";
import useAuth from "@/hooks/useAuth";
import { View } from "@gluestack-ui/themed";

const Profile = () => {
  const { user, loading } = useAuth();
  return (
    <View flex={1}>
      <UserView isDataLoading={loading} showFavIcon={false} user={user} />
    </View>
  );
};

export default Profile;
