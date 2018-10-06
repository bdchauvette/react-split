import React, { Fragment } from "react";
import { render } from "react-testing-library";
import SplitWords from "../SplitWords";

test("wraps each word in a <span> by default", () => {
  const { container } = render(<SplitWords>howdy, friend!</SplitWords>);
  expect(container).toMatchInlineSnapshot(`
<div>
  <span>
    howdy, 
  </span>
  <span>
    friend!
  </span>
</div>
`);
});

test("adds a single space to all non-final word segments", () => {
  const { container } = render(
    <SplitWords>howdy, friend! how are you?</SplitWords>
  );
  expect(container.textContent).toEqual("howdy, friend! how are you?");
});

test("can use DOM element as wrapper", () => {
  const { container } = render(<SplitWords as="p">howdy, friend!</SplitWords>);
  expect(container).toMatchInlineSnapshot(`
<div>
  <p>
    howdy, 
  </p>
  <p>
    friend!
  </p>
</div>
`);
});

test("can use custom Component as wrapper", () => {
  // eslint-disable-next-line react/prop-types
  let TestComponent = ({ children }) => <strong>{children}</strong>;
  const { container } = render(
    <SplitWords as={TestComponent}>howdy, friend</SplitWords>
  );
  expect(container).toMatchInlineSnapshot(`
<div>
  <strong>
    howdy, 
  </strong>
  <strong>
    friend
  </strong>
</div>
`);
});

test("can use React.Fragment as wrapper", () => {
  // eslint-disable-next-line react/prop-types
  const { container } = render(
    <SplitWords as={Fragment}>howdy, friend!</SplitWords>
  );
  expect(container).toMatchInlineSnapshot(`
<div>
  howdy, 
  friend!
</div>
`);
});

test("preserves surrogate pairs", () => {
  const { container } = render(<SplitWords>𝕙𝕠𝕨𝕕𝕪, 𝕗𝕣𝕚𝕖𝕟𝕕</SplitWords>);
  expect(container).toMatchInlineSnapshot(`
<div>
  <span>
    𝕙𝕠𝕨𝕕𝕪, 
  </span>
  <span>
    𝕗𝕣𝕚𝕖𝕟𝕕
  </span>
</div>
`);
});
