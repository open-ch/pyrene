import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styles from './searchResult.css';
import SearchUtils from '../SearchUtils';

export default class SearchResult extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      redirectPath: '',
    };
  }

  handleClick = () => {
    if (this.props.title) {
      this.setState(() => ({
        redirectPath: `${SearchUtils.normaliseLink(this.props.category)}/${SearchUtils.normaliseLink(this.props.title)}`,
        redirect: true,
      }));
    }
  };

  render() {
    return (
      <div className={styles.searchResult} onClick={this.handleClick}>
        {this.props.title && (
          <div className={styles.title}>
            {this.props.title}
          </div>
        )}
        <div className={styles.description}
          dangerouslySetInnerHTML={{ __html: this.props.description.replace(RegExp(this.props.searchInput, 'gi'), (s) => `<span class="highlighted">${s}</span>`) }} // eslint-disable-line react/no-danger
        />

        {this.state.redirect && <Redirect to={`/${this.state.redirectPath}`} push />}
      </div>
    );
  }

}

SearchResult.displayName = 'SearchResult';

SearchResult.propTypes = {
  category: PropTypes.string,
  description: PropTypes.string,
  searchInput: PropTypes.string,
  title: PropTypes.string,
};

SearchResult.defaultProps = {
  category: 'Other',
  title: '',
  description: '',
  searchInput: '',
};
