import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onClicked }) => {
  return (
    <button type="button" className="button-Load-more" onClick={onClicked}>
      Loading more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClicked: PropTypes.func.isRequired,
};
