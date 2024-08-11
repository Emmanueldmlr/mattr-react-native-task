import { User } from "@/types/UserType";

export const shuffleConnections = (connections: User[]) => {
  for (let startPoint = connections.length - 1; startPoint > 0; startPoint--) {
    const randomIndex = Math.floor(Math.random() * (startPoint + 1));
    [connections[startPoint], connections[randomIndex]] = [
      connections[randomIndex],
      connections[startPoint],
    ];
  }
  return connections;
};
