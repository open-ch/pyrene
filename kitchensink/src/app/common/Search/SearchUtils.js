export default class SearchUtils {

  // Helper function for matching
  static normalise(string) {
    return string.toLowerCase().trim();
  }

  static normaliseLink(string) {
    return string.replace(/\s/g, '');
  }

  // Gets the relevant matches from a searched string
  static getMatches(searchInput, components) {
    const normalisedSearchInput = this.normalise(searchInput);
    return (components.map((component) => {
      const componentDescription = (typeof component.__docgenInfo === 'undefined') ? '' : component.__docgenInfo.description; // eslint-disable-line no-underscore-dangle
      return { [component.displayName]: componentDescription };
    })
      .filter(component => (this.normalise(Object.keys(component)[0]).includes(normalisedSearchInput) || this.normalise(Object.values(component)[0]).includes(normalisedSearchInput))));
  }

}

SearchUtils.displayName = 'SearchUtils';
