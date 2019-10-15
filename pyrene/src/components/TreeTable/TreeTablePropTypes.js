import PropTypes from 'prop-types';

const TreeTablePropTypes = {
  COLUMNS: PropTypes.arrayOf(PropTypes.shape({
    accessor: PropTypes.string.isRequired,
    cellStyle: PropTypes.object,
    headerName: PropTypes.string,
    headerStyle: PropTypes.object,
    initiallyHidden: PropTypes.bool,
    width: PropTypes.number,
  })).isRequired,
  COLUMN: PropTypes.shape({
    accessor: PropTypes.string.isRequired,
    cellStyle: PropTypes.object,
    headerName: PropTypes.string,
    headerStyle: PropTypes.object,
    initiallyHidden: PropTypes.bool,
    width: PropTypes.number,
  }).isRequired,
  DATA: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.bool]))).isRequired,
  DATAOBJECT: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])),
};

export default TreeTablePropTypes;
