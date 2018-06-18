import React from 'react';
import PropTypes from 'prop-types';
import CodePage from './CodePage';
import '../../css/componentPage.css';
import testOptions from '../data/selectTestData';

const ComponentPage = (props) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">{props.name}</div>
      <div styleName="description">
        {props.description}
      </div>
    </div>

    <div styleName="topicContent">
      <CodePage
        component={props.component}
        startProps={{
          label: 'Click Me',
          radioLabels:['option 1', 'option 2', 'option 3'],
          selectedOption: 'option 1',
          title: 'Label',
          placeholder: 'Placeholder Text',
          helperLabel: 'Helper text for instructions',
          width: 500,
          rows: 3,
          maxLength: 50,
          path: '#',
          defaultValues: [testOptions[1].value, testOptions[2].value],
          options: testOptions,
          defaultValue: 'spearmint',
          position: 'bottom-right',
          link: 'http://www.veryveryverylonglinkonanydomainintheinternet.com',
        }}
      />
    </div>
  </div>
);


ComponentPage.displayName = 'ComponentPage';

ComponentPage.propTypes = {
  component: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

ComponentPage.defaultProps = {};

export default ComponentPage;