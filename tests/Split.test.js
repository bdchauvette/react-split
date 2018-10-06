import React from "react";
import { render } from "react-testing-library";
import Split from "../Split";

test("splits using empty string by default", () => {
  let children = jest.fn().mockReturnValue(null);
  render(<Split string="howdy">{children}</Split>);
  expect(children).toHaveBeenCalledWith([
    { substring: "h", key: "h-0" },
    { substring: "o", key: "o-1" },
    { substring: "w", key: "w-2" },
    { substring: "d", key: "d-3" },
    { substring: "y", key: "y-4" }
  ]);
});

test("creates keys by combining substring and index", () => {
  let children = jest.fn().mockReturnValue(null);
  render(<Split string="foo bar baz">{children}</Split>);
  expect(children).toHaveBeenCalledWith([
    { substring: "f", key: "f-0" },
    { substring: "o", key: "o-1" },
    { substring: "o", key: "o-2" },
    { substring: " ", key: " -3" },
    { substring: "b", key: "b-4" },
    { substring: "a", key: "a-5" },
    { substring: "r", key: "r-6" },
    { substring: " ", key: " -7" },
    { substring: "b", key: "b-8" },
    { substring: "a", key: "a-9" },
    { substring: "z", key: "z-10" }
  ]);
});

test("preserves surrogate pairs when splitting by an empty string", () => {
  let children = jest.fn().mockReturnValue(null);
  render(<Split string="⚛️✂️">{children}</Split>);
  expect(children).toHaveBeenCalledWith([
    { substring: "⚛️", key: "⚛️-0" },
    { substring: "✂️", key: "✂️-1" }
  ]);
});

test("can split using a custom string separator", () => {
  let children = jest.fn().mockReturnValue(null);
  render(
    <Split string="howdy, friend!" separator=" ">
      {children}
    </Split>
  );
  expect(children).toHaveBeenCalledWith([
    { substring: "howdy,", key: "howdy,-0" },
    { substring: "friend!", key: "friend!-1" }
  ]);
});

test("can split using a custom RegExp separator", () => {
  let children = jest.fn().mockReturnValue(null);
  render(
    <Split string="foo bar    baz" separator={/\s+/}>
      {children}
    </Split>
  );
  expect(children).toHaveBeenCalledWith([
    { substring: "foo", key: "foo-0" },
    { substring: "bar", key: "bar-1" },
    { substring: "baz", key: "baz-2" }
  ]);
});
