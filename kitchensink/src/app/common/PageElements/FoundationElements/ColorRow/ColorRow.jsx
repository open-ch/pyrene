import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ColorBox from '../ColorBox/ColorBox';
import './colorRow.css';

const createStackedColors = (options) => (
  <table>
    {
      (options.showInfo && (options.showInfo === 'fullInfo' || options.showInfo === 'onlyTitles'))
          && (
            <thead>
              <tr>
                {
                  options.title.length > 0 && <th key="base-col-header" style={{ width: (options.rowHeader.width ? options.rowHeader.width : 'auto'), textAlign: 'left' }} styleName={classNames('title', { [`${options.rowSize}`]: true })}>{options.title}</th>
                }
                {
                  options.preColumns && options.preColumns > 0
                && <th colSpan={options.preColumns} />
                }
                {
                  (options.rowHeader && Object.keys(options.rowHeader).length > 0)
                && options.rowData.map((element) => {
                  if (options.showInfo && (options.showInfo === 'fullInfo' || options.showInfo === 'onlyTitles')) {
                    const title = element.title.length > 0 ? element.title : '';
                    return (
                      <th key={`${element.colors[0].name}-title`}><div styleName={classNames('title', { [`${options.rowSize}`]: true })}>{`${title}`}</div></th>
                    );
                  }
                })
                }
              </tr>
            </thead>
          )
    }
    <tbody>
      <tr styleName="colorRow">
        {
          (options.rowHeader && options.rowHeader.colors)
              && (
                <td key="base-row-header" style={{ paddingLeft: 10 }}>
                  <ColorBox
                    colorName={options.rowHeader.colors[0].colorName}
                    variableName={options.rowHeader.colors[0].name}
                    hexValue={options.rowHeader.colors[0].hex}
                    size={options.rowSize}
                    darkFont={options.rowHeader.colors[0].darkFont}
                    bordered={options.rowHeader.colors[0].bordered}
                    stackPosition={options.rowHeader.colors[0].stack}
                    infoBox={{ infoTitle: options.rowHeader.colors[0].colorName, infoLabel: options.rowHeader.colors[0].infoLabel }}
                    key={options.rowHeader.colors[0].name}
                    style={{ justifyContent: 'left' }}
                  />
                </td>
              )
        }
        {
          options.preColumns && options.preColumns > 0
            && <td colSpan={options.preColumns} />
        }
        {
          options.rowData.map((element) => (
            <td key={`${element.colors[0].name}`}>
              {
                element.colors.map((color) => (
                  <ColorBox
                    colorName={color.colorName}
                    variableName={color.name}
                    hexValue={color.hex}
                    size={options.rowSize}
                    darkFont={color.darkFont}
                    bordered={color.bordered}
                    stackPosition={color.stack}
                    infoBox={(
                      options.showInfo && (options.showInfo === 'fullInfo')
                        ? { infoTitle: color.colorName, infoText: color.name, infoLabel: color.infoLabel }
                        : (options.showInfo === 'onlyTitles')
                          ? color.colorName ? { infoTitle: color.colorName } : {}
                          : {}
                    )}
                    key={color.name}
                  />
                ))
              }
            </td>
          ))
        }
        {
          // This is used to create column padding and is set in props.columns
          options.columns && (options.columns - (options.rowHeader ? options.rowData.length + 1 : options.rowData) - (options.preColumns ? options.preColumns : 0)) > 0
            && <td colSpan={(options.columns - (options.rowHeader ? options.rowData.length + 1 : options.rowData) - (options.preColumns ? options.preColumns : 0))} />
        }
      </tr>
    </tbody>
  </table>
);

const ColorRow = (props) => (
  <div styleName="colorRowContainer">
    {createStackedColors(props)}

    {
      (props.description)
      && (
        <div styleName="descriptionCell">
          {props.description}
        </div>
      )
    }
  </div>
);

ColorRow.displayName = 'ColorRow';

ColorRow.propTypes = {
  preColumns: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.any,
  rowHeader: PropTypes.object,
  rowData: PropTypes.array,
  showInfo: PropTypes.string,
  rowSize: PropTypes.oneOf(['small', 'medium', 'large']),
  columns: PropTypes.number,
};

ColorRow.defaultProps = {
  title: '',
  rowHeader: {},
  rowData: [],
  showInfo: 'fullInfo',
  rowSize: 'large',
};

export default ColorRow;
