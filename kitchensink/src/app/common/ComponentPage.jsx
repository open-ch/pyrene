import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import ComponentEditor from './ComponentEditor';
import '../../css/componentPage.css';
import HowTo from './PageElements/HowTo';
import howToPages from '../static/howToPages';

const ComponentPage = (props) => (
  <div styleName="page">
    <div styleName="header">
      <div styleName="title">{props.component.displayName || props.component.name}</div>
      <div styleName="description">
        {<Markdown>{props.component.__docgenInfo.description}</Markdown> /* eslint-disable-line no-underscore-dangle */ }
      </div>
    </div>

    <div styleName="topicContent">
      <ComponentEditor component={props.component} componentOrigin={props.componentOrigin} examples={props.examples} />
    </div>


    { howToPages[props.component.name] && <HowTo howto={howToPages[props.component.name]} />}
  </div>
);


ComponentPage.displayName = 'ComponentPage';


ComponentPage.defaultProps = {
  componentOrigin: 'pyrene',
  examples: null,
};

ComponentPage.propTypes = {
  component: PropTypes.func.isRequired,
  componentOrigin: PropTypes.string,
  examples: PropTypes.shape({
    examples: PropTypes.arrayOf(
      PropTypes.shape(),
    ),
    howto: PropTypes.arrayOf(
      PropTypes.shape(),
    ),
    props: PropTypes.shape(),
  }),
};


export default ComponentPage;
