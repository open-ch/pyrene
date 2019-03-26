import specialComponentHandlingData from '../../data/specialComponentHandlingData';

export default class SearchUtils {

  // Helper function for matching
  static normalise(string) {
    return string.toLowerCase().trim();
  }

  // Get's the relevant matches from a searched string
  static getMatches(searchInput, componentLibrary) {
    const normalisedSearchInput = this.normalise(searchInput);
    return (Object.values(componentLibrary)
      .filter(component => (specialComponentHandlingData[component.displayName.toLowerCase().replace(/\s/g, '')] ? !specialComponentHandlingData[component.displayName.toLowerCase().replace(/\s/g, '')].noComponentPage : true))
      .map((component) => {
        const componentDescription = (typeof component.__docgenInfo === 'undefined') ? '' : component.__docgenInfo.description; // eslint-disable-line no-underscore-dangle
        return { [component.displayName]: componentDescription };
      })
      .filter(component => (this.normalise(Object.keys(component)[0]).includes(normalisedSearchInput) || this.normalise(Object.values(component)[0]).includes(normalisedSearchInput))));
  }

}

SearchUtils.displayName = 'SearchUtils';
