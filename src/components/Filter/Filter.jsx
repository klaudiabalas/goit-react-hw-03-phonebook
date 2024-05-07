import PropTypes from 'prop-types';
import React from 'react';
import css from './Filter.module.css';

export class Filter extends React.Component {
  render() {
    const { filter, addFilter } = this.props;
    return (
      <div>
        <input
          type="text"
          name="filter"
          className={css.input_filter}
          value={filter}
          onChange={addFilter}
          placeholder="Enter name"
        />
      </div>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  addFilter: PropTypes.func.isRequired,
};
