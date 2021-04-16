import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ColorBox from '../ColorBox/ColorBox';
import './colorRow.css';

const ColorRow = (props) => (
  <div styleName="colorRowContainer">
    {
      <table>
        {
          (props.showInfo && (props.showInfo === 'fullInfo' || props.showInfo === 'onlyTitles'))
          && (
            <thead>
              <tr>
                {
                  props.title.length > 0 && <th key="base-col-header" style={{ width: (props.rowHeader.width ? props.rowHeader.width : 'auto'), textAlign: 'left' }} styleName={classNames('title', { [`${props.rowSize}`]: true })}>{props.title}</th>
                }
                {
                  props.preColumns > 0
                  && <th colSpan={props.preColumns}>&nbsp;</th>
                }
                {
                  (props.rowHeader && Object.keys(props.rowHeader).length > 0)
                  && props.rowData.map((element) => {
                    if (props.showInfo && (props.showInfo === 'fullInfo' || props.showInfo === 'onlyTitles')) {
                      const title = element.title.length > 0 ? element.title : '';
                      return (
                        <th key={`${element.colors[0].name}-title`}>
                          <div styleName={classNames('title', { [`${props.rowSize}`]: true })}>{`${title}`}</div>
                        </th>
                      );
                    }
                    return null;
                  })
                }
              </tr>
            </thead>
          )
        }
        <tbody>
          <tr styleName="colorRow">
            {
              (props.rowHeader && props.rowHeader.colors)
              && (
                <td key="base-row-header" style={{ paddingLeft: 10 }}>
                  <ColorBox
                    variableName={props.rowHeader.colors[0].name}
                    hexValue={props.rowHeader.colors[0].hex}
                    size={props.rowSize}
                    darkFont={props.rowHeader.colors[0].darkFont}
                    bordered={props.rowHeader.colors[0].bordered}
                    stackPosition={props.rowHeader.colors[0].stack}
                    infoBox={{ infoTitle: props.rowHeader.colors[0].colorName, infoLabel: props.rowHeader.colors[0].infoLabel }}
                    key={props.rowHeader.colors[0].name}
                    style={{ justifyContent: 'left' }}
                  />
                </td>
              )
            }
            {
              props.preColumns > 0
              && <td colSpan={props.preColumns} />
            }
            {
              props.rowData.map((element) => (
                <td key={`${element.colors[0].name}`}>
                  {
                    element.colors.map((color) => (
                      <ColorBox
                        variableName={color.name}
                        hexValue={color.hex}
                        size={props.rowSize}
                        darkFont={color.darkFont}
                        bordered={color.bordered}
                        stackPosition={color.stack}
                        infoBox={(function () {
                          if (props.showInfo && (props.showInfo === 'fullInfo')) {
                            return { infoTitle: color.colorName, infoText: color.name, infoLabel: color.infoLabel };
                          }
                          if (props.showInfo === 'onlyTitles') {
                            if (color.colorName) {
                              return { infoTitle: color.colorName };
                            }
                          }
                          return {};
                        }())}
                        key={color.name}
                      />
                    ))
                  }
                </td>
              ))
            }
            {
              // This is used to create column padding and is set in props.columns
              (props.columns - (props.rowHeader ? props.rowData.length + 1 : props.rowData) - (props.preColumns ? props.preColumns : 0)) > 0
              && <td colSpan={(props.columns - (props.rowHeader ? props.rowData.length + 1 : props.rowData) - (props.preColumns ? props.preColumns : 0))} />
            }
          </tr>
        </tbody>
      </table>
    }
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
  columns: PropTypes.number,
  description: PropTypes.node,
  preColumns: PropTypes.number,
  rowData: PropTypes.arrayOf(
    PropTypes.shape({
      colors: PropTypes.arrayOf(
        PropTypes.shape({
          bordered: PropTypes.bool,
          colorName: PropTypes.string,
          darkFont: PropTypes.bool,
          hex: PropTypes.string,
          infoLabel: PropTypes.string,
          name: PropTypes.string,
          stack: PropTypes.string,
        }),
      ),
      title: PropTypes.string,
    }),
  ),
  rowHeader: PropTypes.shape({
    colors: PropTypes.arrayOf(
      PropTypes.shape({
        bordered: PropTypes.bool,
        colorName: PropTypes.string,
        darkFont: PropTypes.bool,
        hex: PropTypes.string,
        infoLabel: PropTypes.string,
        name: PropTypes.string,
        stack: PropTypes.string,
      }),
    ),
    width: PropTypes.string,
  }),
  rowSize: PropTypes.oneOf(['small', 'medium', 'large']),
  showInfo: PropTypes.string,
  title: PropTypes.string,
};

ColorRow.defaultProps = {
  columns: 0,
  description: '',
  preColumns: 0,
  title: '',
  rowHeader: {},
  rowData: [],
  showInfo: 'fullInfo',
  rowSize: 'large',
};

export default ColorRow;
