import React from 'react';
import PropTypes from 'prop-types';

import './treeTableActionBar.css';
import ButtonBar from '../../ButtonBar/ButtonBar';
import Button from '../../Button/Button';

const TreeTableActionBar = props => (
  <div styleName={'treeTableActionBar'}>
    <ButtonBar
      leftButtonSectionElements={[
        <Button
          label={props.displayExpandAllAction ? 'Expand All' : 'Collapse All'}
          icon={props.displayExpandAllAction ? 'chevronDown' : 'chevronUp'}
          type={'action'}
          onClick={props.toggleAll}
        />,
      ]}
      noPadding
    />
  </div>
);


TreeTableActionBar.displayName = 'TreeTableActionBar';

TreeTableActionBar.defaultProps = {};

TreeTableActionBar.propTypes = {
  toggleAll: PropTypes.func.isRequired,
  displayExpandAllAction: PropTypes.bool.isRequired,
};

export default TreeTableActionBar;