import React from "react";
import PropTypes from "prop-types";
import Split from "./Split";

SplitCharacters.propTypes = {
  // FIXME: Allow any valid elementType
  // @see https://github.com/facebook/prop-types/pull/211
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.string.isRequired
};

export default function SplitCharacters({ as = "span", children, ...props }) {
  return React.createElement(Split, { string: children }, substrings =>
    substrings.map(({ substring, key }) =>
      React.createElement(as, { ...props, key }, substring)
    )
  );
}
