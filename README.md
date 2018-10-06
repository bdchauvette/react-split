# @squib/react-split

> Text splitting components for React

---

## Installation

```sh
npm install @squib/react-split
```

or

```sh
yarn add @squib/react-split
```

## Usage

```javascript
import { Split, SplitCharacters, SplitWords } from "@squib/react-split";
```

or:

```javascript
import Split from "@squib/react-split/Split";
import SplitCharacters from "@squib/react-split/SplitCharacters";
import SplitWords from "@squib/react-split/SplitWords";
```

### `<Split>`

The `<Split>` component is a low level component that gives you full control
over how to render the individual substrings.

The component uses the function-as-child-component render prop pattern, which
means that instead of passing React elements as children, `<Split>` expects
its only child to be a function with the signature:

```typescript
interface Substring {
  substring: string;
  key: string;
}

(substrings: Substring[]) => ReactElement;
```

If you are not familiar with this pattern, the following sections will give
some examples of how it can be used.

For more information on the render prop pattern itself, see [the React
documentation on the topic][render_props].

[render_props]: https://reactjs.org/docs/render-props.html#using-props-other-than-render

#### Basic usage

By default, `<Split>` will split the input string using an empty string.

```jsx
<Split string="foo">
  {substrings =>
    substrings.map(({ substring, key }) => <span key={key}>{substring}</span>)
  }
</Split>

// <span>f</span>
// <span>o</span>
// <span>o</span>
```

Note that unlike `String.prototype.split`, `<Split>` will preserve surrogate
pairs:

```javascript
"⚛️✂".split("");️

// -> [ '⚛', '️', '✂', '️' ] ☹️
```

```javascript
<Split string="⚛️✂">
  {substrings =>
    substrings.map(({ substring, key }) => <span key={key}>{substring}</span>)
  }
</Split>

// <span>⚛️</span>
// <span>✂️</span>
```

#### Custom Separator

You can specify a custom separator using the `separator` prop. Like
`String.prototype.separator`, you can use either a string or `RegExp`.

```jsx
<Split string="Howdy, friend!" separator=" ">
  {substrings =>
    substrings.map(({ substring, key }) => <span key={key}>{substring}</span>)
  }
</Split>

// <span>Howdy,</span>
// <span>friend!</span>
```

```jsx
<Split string="Howdy,     friend!" separator={/\s+/}>
  {substrings =>
    substrings.map(({ substring, key }) => <span key={key}>{substring}</span>)
  }
</Split>

// <span>Howdy,</span>
// <span>friend!</span>
```

#### Animation

One of the benefits of using the render prop pattern is that it makes it easy
to animate the individual substrings.

For example, using [`react-css-stagger`][], you can easily make the
substrings have a staggered fade-in animation:

[`react-css-stagger`]: https://www.npmjs.com/package/react-css-stagger

```jsx
<Split string="Howdy!">
  {substrings => (
    <Stagger transition="fadeIn" delay={150}>
      {substrings.map(({ substring, key }) => (
        <span key={key}>{substring}</span>
      ))}
    </Stagger>
  )}
</Split>
```

```css
.fadeIn-enter {
  opacity: 0;
  transition: 0.3s ease-in-out all;
}

.fadeIn-enter.fadeIn-enter-active {
  opacity: 1;
}
```

---

### `<SplitCharacters>`

The `<SplitCharacters>` component takes a string as `children`, and splits them
into separate elements.

```jsx
<SplitCharacters>foo</SplitCharacters>

// <span>f</span>
// <span>o</span>
// <span>o</span>
```

`<SplitCharacters>` uses `<Split>` under the hood, so it handles surrogate pairs
correctly:

```javascript
<SplitCharacters>⚛️✂️</SplitCharacters>

// <span>⚛️</span>
// <span>✂️</span>
```

You can customize the wrapper element using the `as` prop:

```jsx
<SplitCharacters as="p">foo</SplitCharacters>

// <p>f</p>
// <p>o</p>
// <p>o</p>
```

All other props will be forwarded to each wrapped element:

```jsx
<SplitCharacters as="p" className="fancy">
  foo
</SplitCharacters>

// <p class="fancy">f</p>
// <p class="fancy">o</p>
// <p class="fancy">o</p>
```

---

### `<SplitWords>`

The `<SplitWords>` component takes a string as `children`, and splits them
by whitespace:

```jsx
<SplitWords>Howdy, friend!</SplitCharacters>

// <span>Howdy, </span>
// <span>friend!</span>
```

Note that whitespace between words is collapsed to a single whitespace.

```jsx
<SplitWords>
  Howdy, friend!

  How are you?
</SplitCharacters>

// <span>Howdy, </span>
// <span>friend! </span>
// <span>How </span>
// <span>are </span>
// <span>you?</span>
```

You can customize the wrapper element using the `as` prop:

```jsx
<SplitWords as="p">Howdy, friend!</SplitWords>

// <p>Howdy, </p>
// <p>friend!</p>
```

All other props will be forwarded to each wrapped element:

```jsx
<SplitWords as="p" className="fancy">
  Howdy, friend!
</SplitWords>

// <p class="fancy">Howdy, </p>
// <p class="fancy">friend!</p>
```

---

## ![But why?](https://media.giphy.com/media/1M9fmo1WAFVK0/giphy.gif)

```jsx
<div>
  {"y tho 🙍🏽‍♂️".split("").map(char => (
    <span>{char}</span>
  ))}
</div>

// Warning: Each child in an array or iterator should have a unique "key" prop.
```

```jsx
<div>
  {"y tho 🙍🏽‍♂️".split("").map((char, index) => (
    <span key={index}>{char}</span>
  ))}
</div>

// react/no-array-index-key
// https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/no-array-index-key.md
```

```jsx
<div>
  {"y tho 🙍🏽‍♂️".split("").map((char, index) => (
    // let's hope this text is never dynamic...
    // eslint-disable-next-line react/no-array-index-key
    <span key={index}>{char}</span>
  ))}
</div>

// <span>y</span>
// <span> </span>
// <span>t</span>
// <span>h</span>
// <span>o</span>
// <span> </span>
// <span>�</span>
// <span>�</span>
// <span>�</span>
// <span>�</span>
// <span>‍</span>
// <span>♂</span>
// <span>️</span>
```

```jsx
<div>
  {[..."y tho 🙍🏽‍♂️"].map((char, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <span key={index}>{char}</span>
  ))}
</div>

// <span>y</span>
// <span> </span>
// <span>t</span>
// <span>h</span>
// <span>o</span>
// <span>🙍</span>
// <span>🏽</span>
// <span>‍</span>
// <span>♂</span>
// <span>️</span>
```

:face_with_head_bandage:

#### vs.

```jsx
import { SplitCharacters } from "@squib/react-split";

<SplitCharacters>y tho 🙍🏽‍♂️</SplitCharacters>;

// <span>y</span>
// <span> </span>
// <span>t</span>
// <span>h</span>
// <span>o</span>
// <span> </span>
// <span>🙍🏽‍♂️</span>
```

## :raised_hand_with_fingers_splayed: :microphone:

---

## License

[0BSD](https://tldrlegal.com/license/bsd-0-clause-license) &ndash; See [`LICENSE`](LICENSE) for details.
