import React from 'react';
import PropTypes from 'prop-types';
import Paragraph from '../Paragraph/Paragraph';
import DisplayBox from './DisplayBox/DisplayBox';
import DescriptionBox from '../DescriptionBox/DescriptionBox';

const HowTo = props => (
  <div>
    { props.howto.map(h => (
      <Paragraph title={h.title} key={h.title}>
        <DescriptionBox>{h.description}</DescriptionBox>
        <DisplayBox><h.component /></DisplayBox>
      </Paragraph>
    ))}
  </div>
);

HowTo.displayName = 'HowTo';

HowTo.defaultProps = {
};

HowTo.propTypes = {
  howto: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.func.isRequired,
      description: PropTypes.string.isRequired,
      title: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default HowTo;
