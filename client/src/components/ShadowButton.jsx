import React from 'react';
import PropTypes from 'prop-types';

import './ShadowButton.scss';

const ShadowButton = ({ onClick, text, ...otherProps }) => (
  <span className="shadow-btn-container">
    <button className="shadow-btn btn btn-outline-dark" onClick={onClick} {...otherProps}>
      {text}
    </button>
  </span>
);

ShadowButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.node,
};

ShadowButton.defaultProps = {
  onClick: () => {},
  text: null,
};

export default ShadowButton;
