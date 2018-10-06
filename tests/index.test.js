import * as index from "../index";
import Split from "../Split";
import SplitCharacters from "../SplitCharacters";
import SplitWords from "../SplitWords";

test("exports Split", async () => {
  expect(index.Split).toBe(Split);
});

test("exports SplitCharacters", async () => {
  expect(index.SplitCharacters).toBe(SplitCharacters);
});

test("exports SplitWords", async () => {
  expect(index.SplitWords).toBe(SplitWords);
});
