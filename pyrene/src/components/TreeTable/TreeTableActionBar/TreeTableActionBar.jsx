import React from 'react';
import PropTypes from 'prop-types';

import './treeTableActionBar.css';
import ButtonBar from '../../ButtonBar/ButtonBar';
import Button from '../../Button/Button';

const TreeTableActionBar = props => (
  <div styleName={'treeTableActionBar'}>
    <ButtonBar leftButtonSectionElements={[<Button label={'Expand All'} type={'action'} icon={'chevronDown'} onClick={props.expandAll}/>]} noPadding />
  </div>
);


TreeTableActionBar.displayName = 'TreeTableActionBar';

TreeTableActionBar.defaultProps = {};

TreeTableActionBar.propTypes = {
  expandAll: PropTypes.func.isRequired,
};

export default TreeTableActionBar;