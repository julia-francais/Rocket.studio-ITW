import {
  getCarb,
  convertStringToArrayOfNumbers,
  getSumFromArray,
  getTotalCarbPerModule,
  convertPosition,
  checkIntersections,
  checkPositions,
  manhattanDistance,
  getClosestIntersection,
} from "./index";

describe("getCarb", () => {
  it("should calculate the right amount of carb", () => {
    expect(getCarb(12)).toEqual(2);
    expect(getCarb(14)).toEqual(2);
    expect(getCarb(1969)).toEqual(654);
    expect(getCarb(100756)).toEqual(33583);
  });
});

describe("convertStringToArrayOfNumbers", () => {
  it("returns an array", () => {
    const result = convertStringToArrayOfNumbers("88623 101095 149899");
    expect(Array.isArray(result)).toBe(true);
  });
  it("should return an array of number", () => {
    expect(convertStringToArrayOfNumbers("88623 101095 149899")).toEqual([
      88623,
      101095,
      149899,
    ]);
  });
});

describe("getSumFromArray", () => {
  it("calls the provided callback", () => {
    const mockCallback = jest.fn();
    getSumFromArray([88623, 101095, 149899], mockCallback);
    expect(mockCallback).toHaveBeenCalled();
  });
  it("should return the right value", () => {
    expect(getSumFromArray([88623, 101095, 149899], getCarb)).toEqual(113199);
  });
});

describe("getTotalCarbPerModule", () => {
  it("should return the right result", () => {
    expect(getTotalCarbPerModule(14)).toEqual(2);
    expect(getTotalCarbPerModule(1969)).toEqual(966);
    expect(getTotalCarbPerModule(100756)).toEqual(50346);
  });
});

describe("convertPosition", () => {
  it("returns an array", () => {
    const result = convertPosition("D8,H5,G5,B3");
    expect(Array.isArray(result)).toBe(true);
  });
  it("should convert a string into an array of objects with x and y positions", () => {
    expect(convertPosition("D8,H5,G5,B3")).toEqual([
      { x: 0, y: 0 },
      { x: 8, y: 0 },
      { x: 8, y: 5 },
      { x: 3, y: 5 },
      { x: 3, y: 2 },
    ]);
  });
});

describe("checkIntersections", () => {
  it("should return an object with the x and y coordinates of the intersection", () => {
    expect(
      checkIntersections(
        { x: 8, y: 5 },
        { x: 3, y: 5 },
        { x: 6, y: 7 },
        { x: 6, y: 3 }
      )
    ).toEqual({ x: 6, y: 5 });
  });
});

let f1 = [
  { x: 0, y: 0 },
  { x: 8, y: 0 },
  { x: 8, y: 5 },
  { x: 3, y: 5 },
  { x: 3, y: 2 },
];
let f2 = [
  { x: 0, y: 0 },
  { x: 0, y: 7 },
  { x: 6, y: 7 },
  { x: 6, y: 3 },
  { x: 2, y: 3 },
];

describe("checkPositions", () => {
  it("should return an array of objects containing positions of intersections", () => {
    expect(checkPositions(f1, f2)).toEqual([
      { x: 0, y: 0 },
      { x: 6, y: 5 },
      { x: 3, y: 3 },
    ]);
  });
});

describe("getClosestIntersection", () => {
  it("should return the closest intersection or min value of manhattan distance ", () => {
    expect(
      getClosestIntersection([
        { x: 6, y: 5 },
        { x: 3, y: 3 },
      ])
    ).toEqual(6);
  });
});
