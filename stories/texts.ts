export const Texts = {
  pages: {
    introduction: {
      title: 'Introduction',
      description: ['Open Systems is growing. As the business evolves, maintaining a coherent and captivating user experience for our interfaces is challenging. To keep our user interfaces coherent, we have created pyrene, a collection of components and the underlying design principles and foundations.',
        'It\'s a place for people familiar with our design system and for anyone wishing to learn more about our work. It provides our engineers a collection of reusable components to build user interfaces.',
        'This is a living place that will be updated as we continue to develop and explore the specifics of our user-facing products.'
      ],
      sections: [
        {
          title: 'Design System',
          description: 'Our design system helps us to increase speed and efficiency of how we design and build our products. Understanding the system and adopting the library will help us to use up-to-date and consistent markup, styles and behavior in prototype or production work. It also improves and keeps the quality of our user experiences.',
          subSections: [
            {
              icon: 'pages',
              title: 'pages',
              description: 'Pages are the final stage and show what a user interfaces looks like with real representative content in place.'
            }, {
              icon: 'templates',
              title: 'templates',
              description: 'Templates are page-level objects that place components into a layout and visualize the underlying content structure.'
            }, {
              icon: 'components',
              title: 'components',
              description: 'Components are the UI building blocks. Components can be single UI elements like a Button or acting together as a unit. Some examples include Buttons, Inputs, Selects, Modals etc.'
            }, {
              icon: 'foundations',
              title: 'foundations',
              description: 'Foundations are the underlying parameters and variables which drive the general appearance, expression and behavior. Those elements can\'t be broken down any further and do include fonts, colors, shapes, icons, grids, writing etc.'
            }
          ]
        },
        {
          title: 'Principles',
          description: 'What we do is important. But how we do it is even more important. Our principles will guide us and help us to make decisions that are sustainable.',
          subSections: [
            {
              icon: 'tailor',
              title: 'Tailor-Made but Application-Agnostic',
              description: 'We aim to find the sweet spot of reusability. Leaving out functionality allows our components to be used consistently. Yet, we don\'t want them to be so specific that they can only be used in a specific application'
            },
            {
              icon: 'extensible',
              title: 'Extensible',
              description: 'We accept that we can\'t always get it right the first time, and we know that there will be future use cases that we just couldn\'t think of yet. That\'s why we design our components not to be complete, but to be extensible.'
            }, {
              icon: 'simple',
              title: 'Simple but Controlled',
              description: 'While we want components to be as easy to use as possible, we understand that hiding complex state handling from their parents is not always the best option. Aspects that are of interest to the parent components, we must allow them to control, rather than consume.'
            }, {
              icon: 'clarity',
              title: 'Clarity',
              description: 'We do not overwhelm our users with information. We practice simplicity by focusing on the essential aspects.'
            }, {
              icon: 'efficiency',
              title: 'Efficiency',
              description: 'We minimize the effort it takes to reach a goal. We create familiarity by applying established patterns and use the same solution to the same problem.'
            }, {
              icon: 'coherence',
              title: 'Coherence',
              description: 'We take care of consistent interactions, visual designs and writing. We pursue the same intuitive experience and create recognition across our products.'
            }, {
              icon: 'accuracy',
              title: 'Accuracy',
              description: 'We are proud of what we do. We demonstrate respect for people\'s time and attention through well thought and elegant craftsmanship.'
            }, {
              icon: 'all',
              title: 'Design for All',
              description: 'We actively involve users and collect feedback to get a clear understanding of users and task requirements. We are committed to improve accessibility according W3C recommendations.'
            }]
        }
      ]
    },
    colors: {
      title: 'Colors',
      description: ['Maintaining consistent and engaging digital interfaces throughout Open Systems demands extended guidance around color usage. The following concepts are the foundation as we strive to achieve balance and harmony through our User Interface design.',
        'Our color palette contains primary, neutrals, interaction and status colors as well as color schemes used for data visualizations. They have been designed to work harmoniously with each other.',
        'The Neutral family is dominant in the default themes, making use of subtle shifts in value to help organize content into distinct zones.'],
      sections: [
        {
          title: 'Primary Colors',
          description: 'The primary colors give our applications the characteristic look and feel. These colors enjoy priority. White plays an important role in structuring content and the overall impression. Blue is used as accent color while Dark is the main color for type.'
        },
        {
          title: 'Neutral Colors',
          description: 'The neutral colours give a minimalist and clean impression. The neutral colours are mainly used for structuring and weighting the content. Typically they are used for text, icons and subtle backgrounds when we don\'t want to draw too much attention to a particular touchpoint or convey information such as inactive or disabled.'
        },
        {
          title: 'Semantic Colors',
          description: 'Semantic color helps users identify status, see actions, locate help, and understand next steps. The consistent use of color keeps cognitive load low and makes for a unified and engaging user experience.'
        },
        {
          title: 'Data Visualizations',
          description: 'The color palette for data visualizations is a selected subset of the Pyrene Design Language color palette. It is designed to maximize accessibility and harmony within a page.'
        }
      ]
    },
    typography: {
      title: 'Typography',
      description: [
        { text: 'Typography is at the core of Open Systems Product Design Language. We have chosen ', format: 'standard' },
        { text: 'FiraGo', format: 'strong' },
        { text: ' as our primary font. It was designed to be incredibly versatile with lots of range in terms of tone and playfulness. It can be quirky and expressive when it needs to be, or neutral when the situation calls for something a bit more serious. On rare occasions, we also use ', format: 'standard' },
        { text: 'Fira Sans Condensed', format: 'strong' },
        { text: ' for selected elements.', format: 'standard' }
      ],
      sections: [
        {
          title: 'Font Stack',
          description: 'For web projects, the best format is our icon font. Explore or search for an icon and copy the reference by clicking on a icon to use it in your project.',
          subDescription: {
            header: 'FiraGo'  , text: 'Fira Sans Condensed',
            footer: [
              { text: 'You can download FiraGo and Fira Sans Condensed as zip ' },
              { text: 'here', link: '../../../fonts/Pyrene_Font_Kit_v1.0.zip' },
              { text: '.' }
            ]},
        }, {
          title: 'Styles',
          description: 'Consistent typography and attention to logical hierarchies ensure that UI elements are clear and easy to recognise when scanning the page. Text sizes, styles and layouts have been chosen to balance content and UI.'
        },
      ]
    },
    icons: {
      title: 'Icons',
      description: ['Icons are used to communicate with users and serve a functional purpose. They draw attention and help to anticipate what to expect. Icons also help visually impaired users and enhance usability.'],
      sections: [
        {
          title: 'Icon Font',
          description: 'For web projects, the best format is our icon font. Explore or search for an icon and copy the reference by clicking on a icon to use it in your project.'
        },
        {
          title: 'Two-Tone And Multi-Color Icons',
          description: 'Two-tone and multi-color icons are not available in the icon font. These icons are available as SVG assets.'
        },
      ]
    }
  }
}
