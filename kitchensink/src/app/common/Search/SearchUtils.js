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
    return (components.map((component) => ({
      name: component.name,
      displayName: component.displayName ? component.displayName : component.name,
      description: component.__docgenInfo ? component.__docgenInfo.description : '', // eslint-disable-line no-underscore-dangle
    }))
      .filter((component) => (this.normalise(component.displayName).includes(normalisedSearchInput) || this.normalise(component.description).includes(normalisedSearchInput))));

  }

}

SearchUtils.displayName = 'SearchUtils';
