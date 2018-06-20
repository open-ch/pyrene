import React from 'react';

export default class SearchUtils {

  // Helper function for matching
  static normalise(string) {
    return string.toLowerCase().trim();
  };

  // Get's the relevant matches from a searched string
  static getMatches(searchInput, componentLibrary) {
    return (Object.values(componentLibrary).map(component => ({[component.displayName]: component.__docgenInfo.description}))
      .filter(component => (this.normalise(Object.keys(component)[0]).includes(searchInput) || this.normalise(Object.values(component)[0]).includes(searchInput)))
      .map(result => <React.Fragment>{Object.keys(result)[0]} => {Object.values(result)[0]}<br/></React.Fragment>));
  };

}

SearchUtils.displayName = 'SearchUtils';