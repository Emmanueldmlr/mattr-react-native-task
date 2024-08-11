import { User } from "./UserType";

export type ConnectionContextType = {
  connections: User[];
  isLoading: boolean;
  refreshConnections: () => void;
  getConnection: (id: number) => User | undefined;
  toggleConnectionLike: (id: number) => void;
  applyFilters: (filters: {
    sortBy: string;
    ageRange: string;
    gender: string;
  }) => void;
};