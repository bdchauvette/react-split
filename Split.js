import PropTypes from "prop-types";
import split from "lodash.split";

Split.propTypes = {
  string: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  separator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(RegExp)
  ])
};

export default function Split({ string, children, separator = "" }) {
  // String.prototype.split splits text by UTF-16 codeunit, which breaks
  // surrogate pairs, and can lead to unexpected results.
  // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split#Syntax
  let substrings = split(string, separator);

  return children(
    substrings.map((substring, index) => ({
      substring,
      key: `${substring}-${index}`
    }))
  );
}
