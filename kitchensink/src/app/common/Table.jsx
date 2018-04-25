import React from 'react';
import PropTypes from 'prop-types';

import '../../css/table.css';

const Table = props => (
  <div styleName={'table_container'}>
    <div styleName="title">{props.title}</div>
    <table cellPadding={0} cellSpacing={0}>
      <colgroup>
        {props.cellWidthArray.map((width, index) => <col style={{ width: width }} key={`${index}${width}`} />)}
      </colgroup>
      <thead>
        <tr>
          {props.headerElementArray.map(element => <th key={element}>{element}</th>)}
        </tr>
      </thead>
      <tbody>
        {props.rowArray.map(row => (<tr key={row}>{row.map((cell) => {
          if (typeof cell === 'boolean') {
            // Check mark & cross to display booleans
            const mark = cell ? '\u2714' : '\u2718';
            return <td key={mark}>{mark}</td>;
          }
          return (
            <td key={cell}>{cell}</td>
          );
        })}
        </tr>)
        )}
      </tbody>
    </table>
  </div>
);


Table.displayName = 'Table';

Table.propTypes = {
  title: PropTypes.string,
  cellWidthArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  headerElementArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired
};

Table.defaultProps = {
  title: ''
};

export default Table;
