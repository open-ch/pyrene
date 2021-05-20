import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import IconBox from '../IconBox/IconBox';
import styles from './iconDisplay.css';

export default class IconDisplay extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filterElements: [],
    };
  }

  updateSearch = (searchText) => {
    const lowerCasedAndTrimmedSearch = searchText.toLowerCase().trim();
    const splitIntoSearchArray = lowerCasedAndTrimmedSearch.split(' ');
    this.setState(() => ({
      filterElements: splitIntoSearchArray,
    }));
  };

  filterIcon = (icon) => {
    let matchCounter = 0;
    this.state.filterElements.forEach((searchToken) => {
      if ((icon.tags.filter((e) => e.toLowerCase().indexOf(searchToken) > -1).length !== 0) || (icon.name.toLowerCase().includes(searchToken))) {
        matchCounter += 1;
      }
    });
    return matchCounter === this.state.filterElements.length;
  };

  displaySearchResults = () => {
    const filteredData = this.props.data.filter((icon) => this.filterIcon(icon));

    return filteredData.map((icon) => <IconBox name={icon.name} key={icon.name} disabled={icon.disabled} />);
  };

  render() {
    return (
      <div className={styles.iconDisplay}>
        <div className={styles.iconPlacementContainer}>
          <input
            className={clsx(styles.iconSearchBar, { [styles.filled]: this.state.filterElements[0] !== '' && this.state.filterElements.length > 0 })}
            type="text"
            placeholder="Search for icons"
            onChange={(event) => this.updateSearch(event.target.value)}
            onFocus={(event) => event.target.select()}
          />
          <span className={clsx('pyreneIcon-search', styles.searchIcon)} />
        </div>
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
