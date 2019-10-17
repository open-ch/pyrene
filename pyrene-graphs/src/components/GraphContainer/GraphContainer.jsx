import React from 'react';
import PropTypes from 'prop-types';
import './graphContainer.css';

const GraphContainer = props => (
  <div styleName="graphContainer">
    {props.header}
    {props.graphOverlay && (
      <div styleName="graphOverlay">
        {props.graphOverlay}
      </div>
    )}
    <div styleName="graph">
      {props.graph}
    </div>
  </div>
);

GraphContainer.displayName = 'Graph Container';

GraphContainer.defaultProps = {
  graphOverlay: undefined,
};

GraphContainer.propTypes = {
  graph: PropTypes.node.isRequired,
  graphOverlay: PropTypes.node,
  header: PropTypes.node.isRequired,
};

export default GraphContainer;
