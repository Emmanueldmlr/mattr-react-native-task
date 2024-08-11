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

const ConnectionContext = createContext<{
  connections: User[] | null;
  isLoading: boolean;
  refreshConnections: () => void;
  getConnection: (id: number) => User | undefined;
}>({ connections: null, isLoading: false, refreshConnections: () => {}, getConnection: () => undefined });

export const ConnectionProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [connections, setConnections] = useState<User[] | null>(null);
  const [allConnections, setAllConnections] = useState<User[] | null>(null);

  const getConnection = (id: number) => {
    return connections?.find((connection) => connection.id === id);
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
      value={{ connections, isLoading, refreshConnections, getConnection: (id: number) => getConnection(id) }}
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
