import { User } from "@/types/UserType";

export const FetchConnections = async () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  try {
    const response = await fetch(apiUrl as string);
    const data = await response.json();
    return data as User[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
