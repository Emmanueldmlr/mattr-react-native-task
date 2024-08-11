import { User } from "@/types/UserType";
import { calculateAgeFromDOB } from "./dateUtils";

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


export const filterConnections = ( {
  connections,
  sortBy,
  ageRange,
  gender
}: {
  connections: User[];
  sortBy: string;
  ageRange: string;
  gender: string;
}) => {
  let filtered = [...connections];
  if (gender) {
    filtered = filtered.filter(
      (conn) => conn.gender.toLocaleLowerCase() === gender.toLocaleLowerCase()
    );
  }

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
  return filtered;
}
