import React, {useEffect, useRef} from 'react';
import classNames from 'classnames';

import './collapsible.css';

export interface CollapsibleProps {
  /**
   * Sets the alignment of the popover.
   */
  align?: 'start' | 'center' | 'end',
  /**
   * Whether to display the content when the component is first mounted.
   */
  defaultExpanded?: boolean,
  /**
  * Sets the label displayed to the user when the component is collapsed.
  */
  labelCollapsed?: string,
  /**
   * Sets the label displayed to the user when the component is expanded.
   */
  labelExpanded?: string,
  /**
   * Javascript event handler.
   */
  onChange?: (event: React.MouseEvent) => null,
  /**
   * Sets the content to be rendered inside the component.
   */
  renderCallback: () => JSX.Element,
}

/**
 * Collapsibles allow the user to reveal content that is not displayed.
 *
 * Collapsibles are used when space is limited and the content to be displayed is secondary.
 */
const Collapsible: React.FC<CollapsibleProps> = ({
  align = 'start',
  defaultExpanded = false,
  labelCollapsed = 'Show More',
  labelExpanded = 'Show Less',
  onChange = (event: React.MouseEvent) => null,
  renderCallback,
}: CollapsibleProps) => {

  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const [contentHeight, setContentHeight] = React.useState();
  const contentRef = useRef(null);

  useEffect(() => {
    const height = !!contentRef && !!contentRef.current ? contentRef.current.height : contentHeight;
    setContentHeight(height);
  });

  useEffect(() => {
    setExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const toggleCollapse = (event:React.MouseEvent) => {
    setExpanded(prevExpanded => !prevExpanded);
    onChange(event);
  }

  return (
    <div styleName={classNames('collapsibleBox', { expanded })}>
      <div styleName={classNames('buttonAlignmentBox', { [`align-${align}`]: true })}>
        <div styleName='collapsibleButton' className='unSelectable' onClick={(event:React.MouseEvent) => toggleCollapse(event)} role='button' aria-label='Show or hide content'>
          <div styleName='centeringBox'>
            <span styleName='label'>
              {expanded && labelExpanded ? labelExpanded : labelCollapsed}
            </span>
            <span className='pyreneIcon-chevronDown' styleName='collapsArrow' />
          </div>
        </div>
      </div>
      <div styleName='collapsibleBody' style={{ height: (expanded && contentHeight) ? contentHeight : undefined }}>
        <div ref={contentRef} style={{ paddingTop: 16 }}>
          {renderCallback()}
        </div>
      </div>
    </div>
  );
};

Collapsible.displayName = 'Collapsible';

export default Collapsible;