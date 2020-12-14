/* eslint-disable react/display-name */
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
  type: 'regular',
  sections: [{
    renderContent: () => <Placeholder />,
    title: 'Section one',
  }, {
    renderContent: () => <Placeholder />,
    title: 'Section two',
  }, {
    renderContent: () => <Placeholder />,
    title: 'Section three',
  }],
};

Accordion.examples = [
  {
    props: {
      ...Accordion.props,
    },
    description: 'Simple regular accordion',
  },
  {
    props: {
      type: 'regular',
      sections: [{
        iconProps: ({ name: 'resolved', color: 'green600' }),
        renderContent: () => <Placeholder />,
        title: 'Section one',
      }, {
        iconProps: ({ name: 'info', color: 'blue500' }),
        renderContent: () => <Placeholder />,
        title: 'Section two',
      }, {
        iconProps: ({ name: 'error', color: 'red500' }),
        renderContent: () => <Placeholder />,
        title: 'Section three',
      }],
    },
    description: 'Regular accordion with icons',
  },
  {
    props: {
      type: 'custom',
      sections: [{
        renderContent: () => (
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
        title: () => (
          <RowLayout columns={[{
            width: '50%',
            renderContent: () => <div>section one</div>,
          }, {
            width: '25%',
            renderContent: () => 'title two',
          }, {
            width: '25%',
            renderContent: () => 'title three',
          }]}
          />
        ),
      }, {
        renderContent: () => (
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
        title: () => (
          <RowLayout columns={[{
            width: '50%',
            renderContent: () => <div>section two</div>,
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
    description: 'Custom accordion with render prop title',
  },
];


Accordion.category = 'Interaction';

export default Accordion;
