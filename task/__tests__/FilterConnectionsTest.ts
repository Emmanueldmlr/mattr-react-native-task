import { TEST_DATA } from "@/constants/TestData";
import { User } from "@/types/UserType";
import { filterConnections } from "@/utils/connectionUtils";

describe("filterConnections", () => {

  it("filters by gender correctly", () => {
    const result = filterConnections({
      connections: TEST_DATA,
      sortBy: "Score",
      ageRange: "",
      gender: "Female",
    });
    expect(result.length).toBe(2);
    expect(result.map((user: User) => user.first_name)).toEqual([
      "Christine",
      "Buck",
    ]);
  });

  it("filters by age range correctly", () => {
    const result = filterConnections({
      connections: TEST_DATA,
      sortBy: "Score",
      ageRange: "30-35",
      gender: "",
    });
    expect(result.length).toBe(0);
    expect(result.map((user) => user.first_name)).toEqual([]);
  });

  it("sorts by creation date", () => {
    const result = filterConnections({
      connections: TEST_DATA,
      sortBy: "Date",
      ageRange: "",
      gender: "",
    });
    expect(result.map((user) => user.first_name)).toEqual([
      "Destin",
      "Buck",
      "Evelyn",
      "Maci",
      "Santino",
      "Christine",
    ]);
  });

  it("sorts by score descending", () => {
    const result = filterConnections({
      connections: TEST_DATA,
      sortBy: "Score",
      ageRange: "",
      gender: "",
    });
    expect(result.map((user) => user.first_name)).toEqual([
      "Destin",
      "Santino",
      "Evelyn",
      "Maci",
      "Christine",
      "Buck",
    ]);
  });

  it("handles no filters applied", () => {
    const result = filterConnections({
      connections: TEST_DATA,
      sortBy: "",
      ageRange: "",
      gender: "",
    });
    expect(result.length).toBe(6);
  });
});
