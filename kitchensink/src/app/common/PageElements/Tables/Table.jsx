import React from 'react';
import PropTypes from 'prop-types';
import styles from './table.css';

export default class Table extends React.Component {

  renderCell = (cell) => {
    let returnedCell = cell;
    if (typeof cell === 'boolean') {
      returnedCell = cell ? 'yes' : 'no';
    }
    if (typeof cell === 'string') {
      // Remove ' from strings
      returnedCell = cell.replace(/'/g, '');
    }
    if (typeof cell === 'object') {
      return <td key={returnedCell}><div className={styles.propModifierCell}>{returnedCell}</div></td>;
    }
    return <td key={returnedCell}><div className={styles.cell} title={returnedCell}>{returnedCell}</div></td>;
  }

  render() {
    return (
      <div className={styles.table_container}>
        <div className={styles.title}>{this.props.title}</div>
        <table cellPadding={0} cellSpacing={0}>
          <colgroup>
            {this.props.cellWidthArray.map((width, index) => <col style={{ width: width }} key={this.props.headerElementArray[index]} />)}
          </colgroup>
          <thead>
            <tr>
              {this.props.headerElementArray.map((element) => <th key={element}>{element}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.props.rowArray.map((row) => (
              <React.Fragment key={row}>
                <tr>
                  {row.slice(0, 5).map((cell) => this.renderCell(cell))}
                </tr>
                <tr className={styles.descriptionRow}>
                  <td colSpan={5}><div className={styles.descriptionCell}>{row[5]}</div></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

}

Table.displayName = 'Table';

Table.propTypes = {
  cellWidthArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  headerElementArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  title: PropTypes.string,
};

Table.defaultProps = {
  title: '',
};
