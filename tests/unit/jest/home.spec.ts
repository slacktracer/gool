import { y } from "src/home/services/something";

describe("some test about home", () => {
  it("should test something", () => {
    // Arrange
    const expectedResult = "yay";

    // Act
    const result = y();

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
