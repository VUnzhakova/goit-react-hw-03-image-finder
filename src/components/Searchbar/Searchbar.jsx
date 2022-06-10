import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './searchbar.module.css';

class SearchbarForm extends Component {
  state = {
    search: '',
  };

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.search);
    this.reset();
  };

  reset() {
    this.setState({
      search: '',
    });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;

    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.button}>
            <span className={styles.label}>Search</span>
          </button>

          <input
            className={styles.input}
            type="text"
            value={search}
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }
}
export default SearchbarForm;

SearchbarForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
