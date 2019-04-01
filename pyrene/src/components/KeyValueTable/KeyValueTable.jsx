import React from 'react';
import PropTypes from 'prop-types';
import './keyValueTable.css';


export default class KeyValueTable extends React.Component {

  render() {
    const { title, rows } = this.props;

    return (
      <div styleName="keyValueTable">
        {title && (
          <div styleName="keyValueTableTitle">
            {title}
          </div>
        )}
        <table styleName="keyValueBody">
          <tbody>
            {rows.length > 0 && rows.map(row => (
              <tr styleName="keyValueRow"
                key={row.key}
              >
                <td styleName="keyValueCellKey">
                  {row.key}
                </td>
                <td styleName="keyValueCellValue">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  }

}

KeyValueTable.displayName = 'KeyValueTable';

KeyValueTable.defaultProps = {
  title: '',
  rows: [{ key: 'key', value: 'value' }],
};

KeyValueTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.node,
  })),
  title: PropTypes.string,
};
