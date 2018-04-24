import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './link.css';


export default class Link extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <a
        styleName={classNames('link', {[`type-${this.props.type}`]: true}, {['isDisabled']: this.props.isDisabled})}
        href={this.props.path}
      >
        {this.props.label}
        {this.props.type === 'standalone' && <span className={'icon-Skip-right'}/>}
      </a>
    );
  }
}

/**
 *
 *  Object which contains all props for the Proptable in Kitchensink
 *  Each prop should be passed as key-value pair following this scheme:
 *
 *  propName:{isRequired(bool): true|false, type(string): 'String|Bool|OneOf|...', default(string): 'defaultValue', description(string): 'This prop changes...'}
 *
 *  Note: default is only required if isRequired is false.
 *
 */

Link.docProps = [
  {propName: 'type', isRequired: false, type: 'oneOf: standalone inline', defaultValue: 'standalone', description: 'To be changed according to the use case. "Inline" inherits the style from it\'s parent.'},
  {propName: 'label', isRequired: true, type: 'String', defaultValue: '', description: 'Displayed label.'},
  {propName: 'path', isRequired: true, type: 'String', defaultValue: '', description: 'Do you know da wae?'},
  {propName: 'isDisabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the link.'}
];

Link.displayName = 'Link';

Link.defaultProps = {
  type: 'standalone',
  isDisabled: false
};

Link.propTypes = {
  type: PropTypes.oneOf(['standalone', 'inline']),
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool
};