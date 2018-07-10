import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../css/componentPage.css';

const NotFoundPage = props => (
  <div styleName="page">
    <div styleName="page">
      <div className="header">
        <div styleName="title">404: Page not found</div>
        <div styleName="description">
          <p>Please review the link you just tried to access: </p><br />
          <strong>{props.location.pathname}</strong>
        </div>
      </div>
    </div>
  </div>
);


NotFoundPage.displayName = 'NotFoundPage';

NotFoundPage.propTypes = {};

NotFoundPage.defaultProps = {};

export default withRouter(NotFoundPage);