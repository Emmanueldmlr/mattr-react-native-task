import UserView from '@/components/user';
import { View } from '@gluestack-ui/themed';

const Profile = () => {
  return (
    <View flex={1}>
      <UserView showFavIcon={false} user={{}} />
    </View>
  );
}

export default Profile;