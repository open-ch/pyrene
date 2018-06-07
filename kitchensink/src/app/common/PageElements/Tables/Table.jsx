import React from 'react';
import PropTypes from 'prop-types';

import './table.css';

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
        {props.rowArray.map(row => (
          <React.Fragment key={row}>
            <tr>{row.map((cell, index) => {
              if (index < 5) {
                let returnedCell = cell;
                if (typeof cell === 'boolean') {
                  returnedCell = cell ? 'yes' : 'no';
                }
                if (typeof cell === 'string') {
                  // Remove ' from strings
                  returnedCell = cell.replace(/'/g, '');
                }
                if (typeof cell === 'object') {
                  return <td key={returnedCell}><div styleName={'propModifierCell'}>{returnedCell}</div></td>;
                }
                return <td key={returnedCell}><div styleName={'cell'}>{returnedCell}</div></td>;
              }
            })}
            </tr>
            <tr styleName={'descriptionRow'}>
              <td colSpan={5}><div styleName={'descriptionCell'}>{row[5]}</div></td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);


Table.displayName = 'Table';

Table.propTypes = {
  title: PropTypes.string,
  cellWidthArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  headerElementArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
};

Table.defaultProps = {
  title: '',
};

export default Table;
