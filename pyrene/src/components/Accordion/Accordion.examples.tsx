import React from 'react';
import { Example } from '../../examples/Example';
import Placeholder from '../../examples/Placeholder';
import { AccordionProps } from './Accordion';

type Column = {
  width: string,
  renderContent: () => React.ReactNode
};

type Row = {
  columns: Column[]
};

const RowLayout: React.FC<Row> = ({ columns }: Row) => (
  <div style={{ display: 'flex' }}>
    {columns.map((column, index) => (
      <div
        style={{
          width: column.width,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        key={index} // eslint-disable-line react/no-array-index-key
      >
        {column.renderContent()}
      </div>
    ))}
  </div>
);

const Accordion: Example<AccordionProps, {active: boolean}> = {};
Accordion.props = {
  style: 'large',
  sections: [{
    title: 'Item 1',
    renderContent: () => <Placeholder />, // eslint-disable-line react/display-name
  }, {
    title: 'Item 2',
    renderContent: () => <Placeholder />, // eslint-disable-line react/display-name
  }, {
    title: 'Item 3',
    renderContent: () => <Placeholder />, // eslint-disable-line react/display-name
  }],
};

Accordion.examples = [
  {
    props: {
      style: 'large',
      sections: [{
        iconProps: ({ name: 'resolved', color: 'green600' }),
        renderContent: () => <Placeholder />, // eslint-disable-line react/display-name
        title: 'Section one',
      }, {
        iconProps: ({ name: 'info', color: 'blue500' }),
        renderContent: () => <Placeholder />, // eslint-disable-line react/display-name
        title: 'Section two',
      }, {
        iconProps: ({ name: 'error', color: 'red500' }),
        renderContent: () => <Placeholder />, // eslint-disable-line react/display-name
        title: 'Section three',
      }],
    },
    description: 'Outer Accordion',
  },
  {
    props: {
      style: 'small',
      sections: [{
        renderContent: () => ( // eslint-disable-line react/display-name
          <div style={{ padding: '0px 24px 0 8px' }}>
            <RowLayout columns={[{
              width: '50%',
              renderContent: () => 'column one',
            }, {
              width: '25%',
              renderContent: () => 'column two',
            }, {
              width: '25%',
              renderContent: () => 'column three',
            }]}
            />
          </div>
        ),
        renderTitle: () => (<div style={{ color: 'red' }}>subsection one</div>), // eslint-disable-line react/display-name
      }, {
        renderContent: () => ( // eslint-disable-line react/display-name
          <div style={{ padding: '0px 24px 0 8px' }}>
            <RowLayout columns={[{
              width: '50%',
              renderContent: () => 'this could be any content and you can make it as long as you want.',
            }, {
              width: '25%',
              renderContent: () => 'content two',
            }, {
              width: '25%',
              renderContent: () => 'content three',
            }]}
            />
          </div>
        ),
        renderTitle: () => ( // eslint-disable-line react/display-name
          <RowLayout columns={[{
            width: '50%',
            renderContent: () => <div style={{ color: 'green' }}>subsection two</div>, // eslint-disable-line react/display-name
          }, {
            width: '25%',
            renderContent: () => 'title two',
          }, {
            width: '25%',
            renderContent: () => 'title three',
          }]}
          />
        ),
      }],
    },
    description: 'Inner (nested) Accordion',
  },
];


Accordion.category = 'Interaction';

export default Accordion;
