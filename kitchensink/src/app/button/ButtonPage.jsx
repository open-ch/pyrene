import React from 'react';
import PropTypes from 'prop-types';
import PagingMenu from './common/PagingMenu/PagingMenu';

const ButtonPage = props => (
    <div className="page">
      <PagingMenu />
    </div>
);



ButtonPage.displayName = 'ButtonPage';

ButtonPage.propTypes = {
};

ButtonPage.defaultProps = {
};

export default ButtonPage;