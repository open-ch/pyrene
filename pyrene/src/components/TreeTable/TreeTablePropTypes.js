import PropTypes from 'prop-types';

const ALLOWED_VALUES = [PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.bool, PropTypes.func, PropTypes.bool];

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
  DATA: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType(ALLOWED_VALUES))).isRequired,
  DATAOBJECT: PropTypes.objectOf(PropTypes.oneOfType(ALLOWED_VALUES)),
  ALLOWED_VALUES,
};

export default TreeTablePropTypes;
