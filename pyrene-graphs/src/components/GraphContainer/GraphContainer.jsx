import React from 'react';
import PropTypes from 'prop-types';
import './graphContainer.css';

const GraphContainer = props => (
  <div styleName="graphContainer">
    {props.header}
    <div styleName="graph">
      {props.graph}
    </div>
  </div>
);

GraphContainer.displayName = 'Graph Container';

GraphContainer.propTypes = {
  graph: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
};

export default GraphContainer;
