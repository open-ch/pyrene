import React, { useState } from 'react';

import styles from './CopyIcon.module.css';

import Tooltip from '../Tooltip/Tooltip';
import Icon, { IconProps } from '../Icon/Icon';

// @ts-ignore
import CopyIconSvg from '../../icons/copy.svg?url';
// @ts-ignore
import CopyIconSvgHovered from '../../icons/copy_hover.svg?url';

export interface CopyIconProps {
  /**
   * The Value as string which can be copied.
   */
  valueToCc?: string;
  /**
   * Size of the icon as string that represents a pixel value, ex '8px'.
   */
  size?: IconProps['size'];
  /**
   * Custom Tooltip label for the onHover behaviour, default: Copy 'example' to Clipboard.
   */
  customLabel?: string;
}

/**
 * Copy Icon.
 */
const CopyIcon: React.FC<CopyIconProps> = ({
  valueToCc,
  size = 'small',
  customLabel = `Copy '${valueToCc}' to Clipboard`,
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  if (valueToCc === undefined) return <></>;

  const saveValueInClipboard = (value: string) => {
    // eslint-disable-next-line no-void
    void navigator.clipboard.writeText(value);
  };

  const onIconClick = (value: string) => {
    saveValueInClipboard(value);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <Tooltip label={isClicked ? 'Copied!' : customLabel} preferredPosition={['top', 'bottom']}>
      <div
        className={styles.icon}
        onClick={() => valueToCc && onIconClick(valueToCc)}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <Icon type="standalone" svg={isHovered ? CopyIconSvgHovered : CopyIconSvg} size={size} />
      </div>
    </Tooltip>
  );
};

CopyIcon.displayName = 'CopyIcon';

export default CopyIcon;
