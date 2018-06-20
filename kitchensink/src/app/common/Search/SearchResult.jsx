import React from 'react';
import PropTypes from 'prop-types';

import './searchResult.css';

const SearchResult = props => (
  <div styleName={'searchResult'}>
    {props.title && <div styleName={'title'}>
      {props.title}
    </div>}

    <div styleName={'description'} dangerouslySetInnerHTML={{__html: props.description.replace(RegExp(props.searchInput, 'g'), s => `<span class="highlighted">${s}</span>`) }} />
  </div>
);


SearchResult.displayName = 'SearchResult';

SearchResult.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  searchInput: PropTypes.string,
};

SearchResult.defaultProps = {
  title: '',
  description: '',
  searchInput: '',
};

export default SearchResult;