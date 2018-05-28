import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconBox from '../IconBox/IconBox';
import './iconDisplay.css';

export default class IconDisplay extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      filterElements: []
    }
  }

  updateSearch = (searchText) => {
    const lowerCasedAndTrimmedSearch = searchText.toLowerCase().trim();
    const splitIntoSearchArray = lowerCasedAndTrimmedSearch.split(' ');
    this.setState(() => ({
        filterElements: splitIntoSearchArray
    }));
  };

  filterIcon = (icon) => {
    let matchCounter = 0;
    this.state.filterElements.forEach(searchToken => {
      if ((icon.tags.filter(e => e.toLowerCase().indexOf(searchToken) > -1).length !== 0) || (icon.name.toLowerCase().includes(searchToken))){
        matchCounter += 1;
      }
    });
    return matchCounter === this.state.filterElements.length;
  };

  padArrayToSize = (array, size) => {
    const slicedArray = array.slice(0, size+1);
    while (slicedArray.length < size) {
      slicedArray.push({disabled: true})
    }
    return slicedArray;
  };

  displaySearchResults = () => {
    const filteredData = this.props.data.filter((icon) => {
        return this.filterIcon(icon);
    });

    const paddedData = this.padArrayToSize(filteredData, 48);
    return paddedData.map(icon => <IconBox name={icon.name} key={icon.name} disabled={icon.disabled}/>);
  };

  render() {
    return (
      <div styleName={'iconDisplay'}>
        <input
          styleName={classNames('iconSearchBar', {filled: this.state.filterElements[0] !== '' && this.state.filterElements.length > 0})}
          type={'text'}
          placeholder={'Search for icons'}
          onChange={(event) => this.updateSearch(event.target.value)}
          onFocus={(event) => event.target.select()}
        />
        <div className="iconGrid">
          {this.displaySearchResults()}
        </div>
      </div>
    );
  }

}

IconDisplay.displayName = 'IconDisplay';

IconDisplay.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

IconDisplay.defaultProps = {

};

