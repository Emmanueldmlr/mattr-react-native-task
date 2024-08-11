import { User } from "@/types/UserType";

export const FetchConnections = async () => {
    try {
        const response = await fetch(
          "https://ad5fd43ff3494e53ae90dfd8c03a23f9.api.mockbin.io/"
        );
        const data = await response.json();
        return data as User[];
    } catch (error) {
        console.log(error);
        return [];
    }
}