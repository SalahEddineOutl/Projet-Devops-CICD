function add(a, b) {
    return a + b;
  }
  
  test("unit: add works", () => {
    expect(add(1, 2)).toBe(3);
  });
  