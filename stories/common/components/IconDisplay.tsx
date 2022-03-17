import React, { useState } from 'react';
import clsx from 'clsx';

import IconBox from './IconBox';
import styles from './IconDisplay.module.css';

interface IconData {
  name?: string;
  disabled?: boolean;
  tags?: string[];
}

interface IconDisplayProps {
  data: IconData[];
}

const IconDisplay: React.FC<IconDisplayProps> = (props) => {
  const [filterElements, setFilter] = useState([]);

  const updateSearch = (searchText) => {
    const lowerCasedAndTrimmedSearch = searchText.toLowerCase().trim();
    const splitIntoSearchArray = lowerCasedAndTrimmedSearch.split(' ');
    setFilter(splitIntoSearchArray);
  };

  // We show the icon if each filterElement is matched by the icon's name or one
  // if its tags
  const filterIcon = (icon: IconData) =>
    filterElements.every(
      (searchToken) =>
        icon.name.toLowerCase().includes(searchToken) ||
        (icon.tags && icon.tags.some((t) => t.toLowerCase().includes(searchToken)))
    );

  return (
    <div className={styles.iconDisplay}>
      <div className={styles.iconPlacementContainer}>
        <input
          className={clsx(styles.iconSearchBar, {
            [styles.filled]: filterElements.length > 0 && filterElements[0],
          })}
          type="text"
          placeholder="Search for icons"
          onChange={(event) => updateSearch(event.target.value)}
          onFocus={(event) => event.target.select()}
        />
        <span className={clsx('pyreneIcon-search', styles.searchIcon)} />
      </div>
      <div className="iconGrid">
        {props.data.filter(filterIcon).map((icon) => (
          <IconBox key={icon.name} name={icon.name} disabled={icon.disabled} />
        ))}
      </div>
    </div>
  );
};

IconDisplay.displayName = 'IconDisplay';
export default IconDisplay;
