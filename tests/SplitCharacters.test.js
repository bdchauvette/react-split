import React, { Fragment } from "react";
import { render } from "react-testing-library";
import SplitCharacters from "../SplitCharacters";

test("wraps each character in a <span> by default", () => {
  const { container } = render(<SplitCharacters>howdy</SplitCharacters>);
  expect(container).toMatchInlineSnapshot(`
<div>
  <span>
    h
  </span>
  <span>
    o
  </span>
  <span>
    w
  </span>
  <span>
    d
  </span>
  <span>
    y
  </span>
</div>
`);
});

test("can use DOM element as wrapper", () => {
  const { container } = render(<SplitCharacters as="p">howdy</SplitCharacters>);
  expect(container).toMatchInlineSnapshot(`
<div>
  <p>
    h
  </p>
  <p>
    o
  </p>
  <p>
    w
  </p>
  <p>
    d
  </p>
  <p>
    y
  </p>
</div>
`);
});

test("can use custom Component as wrapper", () => {
  // eslint-disable-next-line react/prop-types
  let TestComponent = ({ children }) => <strong>{children}</strong>;
  const { container } = render(
    <SplitCharacters as={TestComponent}>howdy</SplitCharacters>
  );
  expect(container).toMatchInlineSnapshot(`
<div>
  <strong>
    h
  </strong>
  <strong>
    o
  </strong>
  <strong>
    w
  </strong>
  <strong>
    d
  </strong>
  <strong>
    y
  </strong>
</div>
`);
});

test("can use React.Fragment as wrapper", () => {
  // eslint-disable-next-line react/prop-types
  const { container } = render(
    <SplitCharacters as={Fragment}>howdy</SplitCharacters>
  );
  expect(container).toMatchInlineSnapshot(`
<div>
  h
  o
  w
  d
  y
</div>
`);
});

test("preserves surrogate pairs", () => {
  const { container } = render(<SplitCharacters>𝟘𝟙𝟚𝟛</SplitCharacters>);
  expect(container).toMatchInlineSnapshot(`
<div>
  <span>
    𝟘
  </span>
  <span>
    𝟙
  </span>
  <span>
    𝟚
  </span>
  <span>
    𝟛
  </span>
</div>
`);
});
