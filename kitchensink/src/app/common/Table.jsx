import React from 'react';
import PropTypes from 'prop-types';

import '../../css/table.css';

const Table = props => (
  <div styleName={'table_container'}>
    <table cellPadding={0} cellSpacing={0}>
      <colgroup>
        {props.cellWidthArray.map(width => <col style={{width: width}} key={width}/>)}
      </colgroup>
      <thead>
        <tr>
          {props.headerElementArray.map(element => <th key={element}>{element}</th>)}
        </tr>
      </thead>
      <tbody>
        {props.rowArray.map(row => <tr key={row}>{row.map(cell => <td key={cell}>{cell}</td>)}</tr>)}
      </tbody>
    </table>
  </div>
);


Table.displayName = 'Table';

Table.propTypes = {
  cellWidthArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  headerElementArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
};

Table.defaultProps = {};

export default Table;