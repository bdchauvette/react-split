import React from "react";
import PropTypes from "prop-types";
import Split from "./Split";

const WORD_SEPARATOR = /\s+/;

SplitWords.propTypes = {
  // FIXME: Allow any valid elementType
  // @see https://github.com/facebook/prop-types/pull/211
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.string.isRequired
};

export default function SplitWords({ as = "span", children, ...props }) {
  return React.createElement(
    Split,
    { string: children, separator: WORD_SEPARATOR },
    substrings =>
      substrings.map(({ substring, key }, index) =>
        React.createElement(
          as,
          { ...props, key },
          index < substrings.length - 1 ? `${substring} ` : substring
        )
      )
  );
}
