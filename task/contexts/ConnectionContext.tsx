import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { User } from "@/types/UserType";
import { FetchConnections } from "@/services/ConnectionService";
import { CONNECTION_LIMIT } from "@/constants/ConnectionData";
import { shuffleConnections } from "@/utils/connectionUtils";
import { calculateAgeFromDOB } from "@/utils/dateUtils";

const ConnectionContext = createContext<{
  connections: User[] | null;
  isLoading: boolean;
  refreshConnections: () => void;
  getConnection: (id: number) => User | undefined;
  toggleConnectionLike: (id: number) => void;
  applyFilters: (filters: {
    sortBy: string;
    ageRange: string;
    gender: string;
  }) => void;

}>({
  connections: null,
  isLoading: false,
  refreshConnections: () => {},
  getConnection: () => undefined,
  toggleConnectionLike: () => undefined,
  applyFilters: () => {},
});

export const ConnectionProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [connections, setConnections] = useState<User[] | null>(null);
  const [allConnections, setAllConnections] = useState<User[] | null>(null);

  const getConnection = (id: number) => {
    return connections?.find((connection) => connection.id === id);
  };

  const applyFilters = ({
    sortBy, ageRange, gender
  }: {
    sortBy: string;
    ageRange: string;
    gender: string;
  }) => {
    // Apply filters here
    let filtered = connections;

    if (!filtered) return;

    if (gender) {
      filtered = filtered.filter(
        (conn) => conn.gender.toLocaleLowerCase() === gender.toLocaleLowerCase()
      );
    }

    const parseAgeRange = (range: string) => {
      if (range == "40+") return { min: 40, max: 150 };
      const [min, max] = range.split(" - ").map(Number);
      return { min, max };
    };

    if (ageRange) {
      const { min, max } = parseAgeRange(ageRange);

      filtered = filtered.filter((conn) => {
        const age = calculateAgeFromDOB(conn.dob);
        return age >= min && age <= max;
      });
    }

    filtered.sort((a, b) => {
      if (sortBy === "Score") {
        return b.score - a.score;
      } else {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }
    });

    // Flagging the best match
    if (filtered.length > 0) {
      filtered[0].bestMatch = true; // Mark the first element as the best match
    }

    // Optionally, reset the bestMatch flag for all other connections
    filtered.forEach((user, index) => {
      if (index > 0) user.bestMatch = false;
    });

    setConnections(filtered);
  }

  const toggleConnectionLike = (id: number) => {
    if (!connections) return;
    const updatedConnections = connections.map((connection) => {
      if (connection.id === id) {
        return { ...connection, isLiked: !connection.isLiked };
      }
      return connection;
    });
    setConnections(updatedConnections);
  };

  const getConnections = useCallback(async () => {
    //check if all connections are already fetched
    if (allConnections?.length) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await FetchConnections();
      setAllConnections(response); // Store all fetched connections
      setConnections(
        shuffleConnections([...response]).slice(0, CONNECTION_LIMIT)
      ); // Shuffle and take connection limit
    } catch (error) {
      console.error("Failed to fetch connections:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshConnections = useCallback(() => {
    if (allConnections?.length) {
      setIsLoading(true);
      setConnections(
        shuffleConnections([...allConnections]).slice(0, CONNECTION_LIMIT)
      ); // If already fetched connections, shuffle and pick connection limit
      setIsLoading(false);
    } else {
      // If no connections are fetched, fetch them
      getConnections();
    }
  }, []);

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <ConnectionContext.Provider
      value={{
        connections,
        isLoading,
        refreshConnections,
        getConnection,
        toggleConnectionLike,
        applyFilters,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );

};

export const useConnections = () => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error(
      "Connection Context must be used within a ConnectionProvider"
    );
  }
  return context;
};

export default ConnectionContext;
