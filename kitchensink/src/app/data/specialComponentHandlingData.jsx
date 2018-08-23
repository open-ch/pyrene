/** This file is to be used to supply the kitchensink with information about special requirements for some components
 * Keywords:
 *    needsTrigger -> adds a button that displays the component only when clicked
 *    notInSearch -> removes component from the search
 */
const specialComponentHandlingData = {
  modal: {
    needsTrigger: true,
  },
  withFormLogic: {
    notInSearch: true,
  }
};

export default specialComponentHandlingData;