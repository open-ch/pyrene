import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import './searchResult.css';
import SearchUtils from '../SearchUtils';

export default class SearchResult extends React.Component {

  state = {
    redirect: false,
    redirectPath: '',
  };

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
      <div styleName="searchResult" onClick={this.handleClick}>
        {this.props.title && (
          <div styleName="title">
            {this.props.title}
          </div>
        )
        }
        <div styleName="description"
          dangerouslySetInnerHTML={{ __html: this.props.description.replace(RegExp(this.props.searchInput, 'gi'), s => `<span class="highlighted">${s}</span>`) }} // eslint-disable-line react/no-danger
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
  category: '',
  title: '',
  description: '',
  searchInput: '',
};
