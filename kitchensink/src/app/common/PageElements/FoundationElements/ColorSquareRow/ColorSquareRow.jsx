import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import style from './colorSquareRow.css';

const ColorSquareRow = ({ data, colorBoxSize }) => (
  <div className={style.colorGrid}>
    {data.map((element) => (
      <div key={`${element.colors[0].name}`}>
        {element.colors.map((color, index) => {
          const title = index === 0 ? element.title : '';
          return (
            <ColorBox
              title={title}
              colorName={color.colorName}
              variableName={color.name}
              hexValue={color.hex}
              size={colorBoxSize}
              darkFont={color.darkFont}
              bordered={color.bordered}
              stackPosition={color.stack}
              infoLabel={color.infoLabel}
              key={color.name}
            />
          );
        })}
      </div>
    ))}

    )}
    <div key={`${element.colors[0].name}`}>
      {element.colors.map((color, index) => {
        const title = index === 0 ? element.title : '';
        return (
          <ColorBox
            title={title}
            colorName={color.colorName}
            variableName={color.name}
            hexValue={color.hex}
            size={colorBoxSize}
            darkFont={color.darkFont}
            bordered={color.bordered}
            stackPosition={color.stack}
            infoLabel={color.infoLabel}
            key={color.name}
          />
        );
      })}
    </div>
  </div>
);

ColorSquareRow.displayName = 'ColorSquareRow';

ColorSquareRow.propTypes = {
  bordered: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']).isRequired,
  variableName: PropTypes.string.isRequired,
};

ColorSquareRow.defaultProps = {
  bordered: false,
};

export default ColorSquareRow;
