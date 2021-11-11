import React, {
  FunctionComponent, useEffect, useRef, MouseEvent, useReducer,
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

type ContentHeight = number;

enum ActionTypes {
  toggling = 'toggling',
  loading = 'loading',
  changing = 'changing',
}

interface State {
  contentHeight?: ContentHeight,
  expanded: boolean
}

interface Action {
  type: ActionTypes
}

interface TogglingAction extends Action {
  type: ActionTypes.toggling,
  payload: {
    expanded: boolean,
  }
}

interface ChangingAction extends Action {
  type: ActionTypes.changing,
  payload: {
    event: MouseEvent<HTMLDivElement>,
    onChange?: (event: MouseEvent<HTMLDivElement>) => void
  }
}

interface LoadingAction extends Action {
  type: ActionTypes.loading,
  payload: {
    contentHeight: ContentHeight
  }
}

const reducer = (state: State, action: LoadingAction | TogglingAction | ChangingAction): State => {
  switch (action.type) {
    case ActionTypes.loading:
      return {
        ...state,
        contentHeight: action.payload.contentHeight,
      };
    case ActionTypes.toggling: {
      return {
        ...state,
        expanded: action.payload.expanded,
      };
    }
    // ActionTypes.changing
    default:
      action.payload?.onChange?.(action.payload.event);
      return { ...state };
  }
};

const Container: FunctionComponent<ContainerProps> = ({
  collapsible = false,
  defaultExpanded = false,
  renderCallback,
  title,
  onChange,
}: ContainerProps) => {
  const [state, dispatch] = useReducer(reducer, { contentHeight: undefined, expanded: defaultExpanded });

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef?.current) {
      dispatch({
        type: ActionTypes.loading,
        payload: {
          contentHeight: contentRef.current.clientHeight,
        },
      });
    }
  }, []);

  const toggleCollapse = (event: MouseEvent<HTMLDivElement>) => {
    event.persist();
    if (collapsible) {
      dispatch({
        type: ActionTypes.toggling,
        payload: {
          expanded: !state.expanded,
        },
      });
      dispatch({
        type: ActionTypes.changing,
        payload: {
          event,
          onChange,
        },
      });
    }
  };

  return (
    <div className={clsx(styles.container, { [styles.expanded]: state.expanded || !collapsible })}>
      <div
        className={clsx(styles.header, {
          [styles.collapsible]: collapsible,
        })}
        onClick={toggleCollapse}
        role="button"
        aria-label="Show or hide container"
      >
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

Container.displayName = 'Container';

export default Container;
