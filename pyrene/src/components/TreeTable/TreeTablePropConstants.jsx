import PropTypes from 'prop-types';

const TreeTablePropConstants = {
  COLUMNS: PropTypes.arrayOf(PropTypes.shape({
    header: PropTypes.string,
    accessor: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
    width: PropTypes.number,
  })).isRequired,
  COLUMN: PropTypes.shape({
    header: PropTypes.string,
    accessor: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
    width: PropTypes.number,
  }).isRequired,
  DATA: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]))).isRequired,
};

export default TreeTablePropConstants;