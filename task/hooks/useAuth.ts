import { USER_PROFILE_DATA } from "@/constants/UserProfileData";
import { User } from "@/types/UserType";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate fetching user data
    const fetchUser = async () => {
      try {
        const userData = USER_PROFILE_DATA
        setUser(userData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return {
    user,
    loading,
  };
};

export default useAuth;
