import React from 'react';
import PropTypes from 'prop-types';
import './graphOverlay.css';

const GraphOverlay = props => (
  <div styleName="container">
    {props.children}
  </div>
);

GraphOverlay.displayName = 'Graph Overlay';

GraphOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GraphOverlay;
