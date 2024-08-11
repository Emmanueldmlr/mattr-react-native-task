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
import { filterConnections, parseAgeRange, shuffleConnections, tagTopConnectionAsBestMatch } from "@/utils/connectionUtils";
import { calculateAgeFromDOB } from "@/utils/dateUtils";
import { ConnectionContextType } from "@/types/ConnectionContextTypes";

const ConnectionContext = createContext<ConnectionContextType>({
  connections: [],
  isLoading: false,
  refreshConnections: () => {},
  getConnection: () => undefined,
  toggleConnectionLike: () => undefined,
  applyFilters: () => {},
});

export const ConnectionProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [connections, setConnections] = useState<User[]>([]);
  const [allConnections, setAllConnections] = useState<User[]>([]);

  const getConnection = (id: number) => {
    return connections.find((connection) => connection.id === id);
  };

  const applyFilters = ({
    sortBy, ageRange, gender
  }: {
    sortBy: string;
    ageRange: string;
    gender: string;
  }) => {
    let filtered = filterConnections({
      connections: allConnections,
      sortBy,
      ageRange,
      gender,
    });
    setConnections(tagTopConnectionAsBestMatch(filtered));
  }

  const toggleConnectionLike = (id: number) => {
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
    if (allConnections.length) {
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
    if (allConnections.length > 0) {
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
