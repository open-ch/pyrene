/**
 * Specify props and the description for a component if you want to add examples
 */
const examplesData = {
  button: {
    examples: [
      { label: 'primary' },
      { label: 'secondary', type: 'secondary' },
      { label: 'Ghost', type: 'ghost' },
      { label: 'danger', type: 'danger', icon: 'errorOutline' },
      { label: 'Delete', type: 'action', icon: 'errorOutline' },
      { label: 'admin', type: 'admin' },
    ],
    exampleDescriptions: [
      'For all principle actions on a page. Used to highlight the most important actions. Avoid overwhelming usage of primary buttons.',
      'For secondary actions such as ‘Discard’ in combination with a primary button.',
      'Ghost button description',
      'When an action has harmful intentions to the users data (delete, remove, etc). To draw more attention on what the button does add and icon. Icons are always paired with a label.',
      'Used for table actions. They are paired with icon and label.',
      'Used when an action is accessible for MC Engineers only.',
    ],
  },

  link: {
    examples: [
      { label: 'standalone', path: '#' },
      { type: 'inline', label: 'inline link', path: '#' },
    ],
  },

  radiogroup: {
    examples: [
      { alignment: 'vertical',
        options: [
          { label: 'Coffee', value: 'coffee' },
          { label: 'Whisky', value: 'whisky' },
          { label: 'Irish Coffee', value: 'irishcoffee' }],
      },
      { alignment: 'horizontal',
        options: [
          { label: 'Coffee', value: 'coffee' },
          { label: 'Whisky', value: 'whisky' },
          { label: 'Irish Coffee', value: 'irishcoffee' }],
      },
    ],
  },

};


export default examplesData;
