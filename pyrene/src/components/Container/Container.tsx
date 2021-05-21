import React, {
  FunctionComponent, Dispatch, useEffect, useRef, MouseEvent, useReducer,
} from 'react';
import clsx from 'clsx';

import styles from './container.css';

/**
 * Container contain content and actions about a single subject.
 */

export interface ContainerProps {
  /**
   * Whether the container is collapsible when the user clicks on the header.
   */
  collapsible?: boolean,
  /**
   * Whether to display the content when the component is first mounted.
   */
  defaultExpanded?: boolean,
  /**
   * Javascript event handler.
   */
  onChange?: (event: MouseEvent<HTMLDivElement>) => void,
  /**
   * Sets the content to be rendered inside the component.
   */
  renderCallback: () => JSX.Element,
  /**
   * Sets the title displayed in the header of the component.
   */
  title: string,
}

/*
toggleCollapse = (event) => {
  event.persist();
  if (this.props.collapsible) {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }),
    () => this.props.onChange(event));
  }
};
*/

interface State {
  contentHeight: null | number,
  expanded: boolean
}

interface Action {
  type: 'toggling' | 'loading' | 'change'
}

interface TogglingAction extends Action {
  type: 'toggling',
  payload: {
    expanded: boolean,
    event: MouseEvent<HTMLDivElement>,
    dispatcher: Dispatch<ChangeAction>,
    onChange: (event: MouseEvent<HTMLDivElement>) => void,
  }
}

interface ChangeAction extends Action {
  type: 'change',
  payload: {
    event: MouseEvent<HTMLDivElement>,
    onChange: (event: MouseEvent<HTMLDivElement>) => void
  }
}

interface LoadingAction extends Action {
  type: 'loading',
  payload: number | null
}

const reducer = (state: State, action: LoadingAction | TogglingAction | ChangeAction) => {
  switch (action.type) {
    case 'loading':
      return { ...state, contentHeight: action.payload };
    case 'toggling': {
      action.payload.dispatcher({
        type: 'change',
        payload: {
          event: action.payload.event,
          onChange: action.payload.onChange,
        },
      });
      return { ...state, expanded: action.payload.expanded };
    }
    default: {
      action.payload.onChange(action.payload.event);
      return { ...state };
    }
  }
};

const Container: FunctionComponent<ContainerProps> = ({
  collapsible = false,
  defaultExpanded = false,
  onChange = () => null,
  renderCallback,
  title,
}: ContainerProps) => {
  const [state, dispatch] = useReducer(reducer, { contentHeight: null, expanded: defaultExpanded });

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef?.current) {
      dispatch({
        type: 'loading',
        payload: contentRef.current.clientHeight,
      });
    }
  }, []);

  const toggleCollapse = (event: MouseEvent<HTMLDivElement>) => {
    event.persist();
    if (collapsible) {
      dispatch({
        type: 'toggling',
        payload: {
          dispatcher: dispatch,
          expanded: !state.expanded,
          onChange,
          event,
        },
      });
    }
  };

  return (
    <div className={clsx(styles.container, { [styles.expanded]: state.expanded || !collapsible })}>
      <div className={clsx(styles.header, { [styles.collapsible]: collapsible })} onClick={toggleCollapse} role="button" aria-label="Show or hide container">
        <span className={clsx(styles.title, 'unSelectable')}>
          {' '}
          {title}
        </span>
        <div className={styles.arrowContainer}>
          {collapsible && <span className={clsx('pyreneIcon-chevronDown', styles.collapsArrow)} />}
        </div>
      </div>
      <div
        className={styles.contentContainer}
        style={{ ...(state.expanded || !collapsible) && state.contentHeight ? { height: state.contentHeight } : {} }}
      >
        <div className={styles.innerContentContainer} ref={contentRef}>
          {renderCallback()}
        </div>
      </div>
    </div>
  );
};

export default Container;
