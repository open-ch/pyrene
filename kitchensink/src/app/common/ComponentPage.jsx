import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import ComponentEditor from './ComponentEditor';
import '../../css/componentPage.css';
import HowToUse from '../static/howToPages';

const ComponentPage = (props) => {
  const HowTo = HowToUse[props.component.name] ? HowToUse[props.component.name] : null;

  return (
    <div styleName="page">
      <div styleName="header">
        <div styleName="title">{props.component.displayName || props.component.name}</div>
        <div styleName="description">
          {<Markdown>{props.component.__docgenInfo.description}</Markdown> /* eslint-disable-line no-underscore-dangle */ }
        </div>
      </div>

      <div styleName="topicContent">
        <ComponentEditor component={props.component} showcase={props.showcase} />
      </div>


      { HowTo ? <HowTo /> : null }
    </div>
  );
};


ComponentPage.displayName = 'ComponentPage';


ComponentPage.defaultProps = {
  showcase: null,
};

ComponentPage.propTypes = {
  component: PropTypes.func.isRequired,
  showcase: PropTypes.shape({
    examples: PropTypes.arrayOf(
      PropTypes.shape()
    ),
    props: PropTypes.shape(),
  }),
};


export default ComponentPage;
