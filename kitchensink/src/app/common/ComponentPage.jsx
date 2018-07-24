import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import ComponentEditor from './ComponentEditorNew';
import StartProps from '../data/propsData';
import '../../css/componentPage.css';

const ComponentPage = props => (
  <div styleName="page">
    <div styleName="header">
      <div styleName="title">{props.name}</div>
      <div styleName="description">
        <Markdown>{props.description}</Markdown>
      </div>
    </div>

    <div styleName="topicContent">
      <ComponentEditor
        component={props.component}
        startProps={StartProps[props.lowercaseName]}
      />
    </div>
  </div>
);


ComponentPage.displayName = 'ComponentPage';

ComponentPage.propTypes = {
  component: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  lowercaseName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

ComponentPage.defaultProps = {};

export default ComponentPage;
