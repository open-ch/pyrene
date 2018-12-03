import PropTypes from 'prop-types';

const TreeTablePropTypes = {
  COLUMNS: PropTypes.arrayOf(PropTypes.shape({
    headerName: PropTypes.string,
    headerStyle: PropTypes.object,
    cellStyle: PropTypes.object,
    accessor: PropTypes.string.isRequired,
    initiallyHidden: PropTypes.bool,
    width: PropTypes.number,
  })).isRequired,
  COLUMN: PropTypes.shape({
    headerName: PropTypes.string,
    headerStyle: PropTypes.object,
    cellStyle: PropTypes.object,
    accessor: PropTypes.string.isRequired,
    initiallyHidden: PropTypes.bool,
    width: PropTypes.number,
  }).isRequired,
  DATA: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]))).isRequired,
  DATAOBJECT: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])).isRequired,
};

export default TreeTablePropTypes;