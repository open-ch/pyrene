import React, { FC } from 'react';
import { CommonProps, components, SelectComponentsConfig } from 'react-select';

import { TagValue, Tag } from './types';
import styles from './DropdownMenu.module.css';

interface DropdownMenuProps {
  tags?: Tag[];
  children: JSX.Element;
  handleOnTagClick: (tag: string) => void;
  showSearching?: boolean;
}
const DropdownMenu: FC<
  DropdownMenuProps & SelectComponentsConfig<TagValue, true>['Menu'] & CommonProps<TagValue, true>
> = ({ tags, handleOnTagClick, children, showSearching, ...props }) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <components.Menu {...props}>
    <div className={styles.dropdownMenuContainer}>
      {!props.selectProps?.inputValue?.trim() ? (
        <div className={styles.hint}>Type anything you want to search for...</div>
      ) : (
        showSearching && (
          <div className={styles.searchLabel}>{`Search for "${props.selectProps.inputValue}"`}</div>
        )
      )}
      {(tags?.length ?? 0) > 0 && (
        <>
          <div className={styles.title}>Filter by</div>
          <div className={styles.tagRow}>
            {tags?.map((tag) => (
              <div
                key={tag.value}
                className={styles.tag}
                onClick={() => handleOnTagClick(tag.value)}
                style={{ backgroundColor: tag.style?.backgroundColor, color: tag.style?.color }}
              >
                {tag.value}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  </components.Menu>
);
export default DropdownMenu;
