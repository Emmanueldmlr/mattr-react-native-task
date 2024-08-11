import { shuffleConnections } from "@/utils/connectionUtils";
import { TEST_DATA } from "../constants/TestData";

describe("shuffleConnections", () => {
  it("should return an array of the same length as the input array", () => {
    const shuffled = shuffleConnections([...TEST_DATA]);
    expect(shuffled.length).toBe(TEST_DATA.length);
  });

  it("should contain the same elements as the input array", () => {
 const shuffled = shuffleConnections([...TEST_DATA]);
    expect(shuffled).toEqual(expect.arrayContaining(TEST_DATA));
  });

  it("should not return the same array order for most cases", () => {
    const shuffled = shuffleConnections([...TEST_DATA]);
    const shuffledAgain = shuffleConnections([...TEST_DATA]);
    expect(shuffled).not.toEqual(shuffledAgain);
  });
});
