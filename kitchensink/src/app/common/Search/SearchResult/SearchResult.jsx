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
        redirectPath: SearchUtils.normalise(this.props.title.replace(/\s/g,'')),
        redirect: true,
      }));
    }
  };

  render() {
    return (
      <div styleName={'searchResult'} onClick={this.handleClick}>
        {this.props.title && <div styleName={'title'}>
          {this.props.title}
        </div>
        }
        <div styleName={'description'} dangerouslySetInnerHTML={{__html: this.props.description.replace(RegExp(this.props.searchInput, 'gi'), s => `<span class="highlighted">${s}</span>`)}}/>

        {this.state.redirect && <Redirect to={`/${this.state.redirectPath}`} push />}
      </div>
    );
  }
}

SearchResult.displayName = 'SearchResult';

SearchResult.propTypes = {
  description: PropTypes.string,
  searchInput: PropTypes.string,
  title: PropTypes.string,
};

SearchResult.defaultProps = {
  title: '',
  description: '',
  searchInput: '',
};

