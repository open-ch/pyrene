import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import './modal.css';
import ButtonBar from '../ButtonBar/ButtonBar';
import Button from '../Button/Button';

export default class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  _sizeToPixel(size) {
    switch (size) {
      case 'small':
        return 440;
      case 'large':
        return 720;
      case 'xlarge':
        return 960;
      default:
        return 440;
    }
  }

  _renderContent(){
    return (
      <Fragment>
        <div styleName={'titleBar'}>
          {this.props.titleLabel}
        </div>
        <div styleName={'contentContainer'}>
          <div styleName={'content'}>
            {this.props.content}
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <div styleName="modalOverlay">
          <div styleName={'modalContainer'} style={{width: this._sizeToPixel(this.props.size)}}>
            {this.props.isLoading ? <Loader /> : this._renderContent()}
            <ButtonBar rightButtonSectionElements={[<Button label={'Cancel'} onClick={this.props.closeButtonClicked} />]} />
          </div>
        </div>
      </Fragment>
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

Modal.docProps = [

];

Modal.displayName = 'Modal';

Modal.defaultProps = {
  isLoading: false,
  buttonBarElements: [],
  shareLink: '',
  previousButtonClicked: () => null,
  nextButtonClicked: () => null,
  closeButtonClicked: () => null
};

Modal.propTypes = {
  isLoading: PropTypes.bool,
  titleLabel: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  size: PropTypes.oneOf(['small', 'large', 'xlarge']).isRequired,
  buttonBarElements: PropTypes.arrayOf(PropTypes.element),
  shareLink: PropTypes.string,
  previousButtonClicked: PropTypes.func,
  nextButtonClicked: PropTypes.func,
  closeButtonClicked: PropTypes.func
};
