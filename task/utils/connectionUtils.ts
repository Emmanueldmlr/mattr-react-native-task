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

export const parseAgeRange = (range: string) => {
  if (range == "40+") return { min: 40, max: 150 };
  const [min, max] = range.split(" - ").map(Number);
  return { min, max };
};

export const tagTopConnectionAsBestMatch = (connections: User[]) => {
  // Flagging the best match
  if (connections.length > 0) {
    connections[0].bestMatch = true; // Mark the first element as the best match
  }

  // reset the bestMatch flag for all other connections
  connections.forEach((user, index) => {
    if (index > 0) user.bestMatch = false;
  });

  return connections;
};
