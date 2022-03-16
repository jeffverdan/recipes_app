import React from 'react';
import PropTypes from 'prop-types';

export default function Title({ title, img }) {
  return (
    <div>
      <img
        className="w-100"
        src={ img }
        data-testid="recipe-photo"
        alt="Food"
      />
      <h1 data-testid="recipe-title">{ title }</h1>
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
}.isRequired;
