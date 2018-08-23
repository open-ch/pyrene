/** This file is to be used to supply the kitchensink with information about special requirements for some components
 * Keywords:
 *    needsTrigger -> adds a button that displays the component only when clicked
 *    noComponentPage -> removes component from the search and does not create a component page
 */
const specialComponentHandlingData = {
  modal: {
    needsTrigger: true,
  },
  withformlogic: {
    noComponentPage: true,
  },
};

export default specialComponentHandlingData;