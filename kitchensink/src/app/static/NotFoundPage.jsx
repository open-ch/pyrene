import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../../css/componentPage.css';

const NotFoundPage = (props) => (
  <div className={styles.page}>
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.title}>404: Page not found</div>
        <div className={styles.description}>
          <p>Please review the link you just tried to access: </p>
          <br />
          <strong>{props.location.pathname}</strong>
        </div>
      </div>
    </div>
  </div>
);

NotFoundPage.displayName = 'NotFoundPage';

NotFoundPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

NotFoundPage.defaultProps = {};

export default withRouter(NotFoundPage);
