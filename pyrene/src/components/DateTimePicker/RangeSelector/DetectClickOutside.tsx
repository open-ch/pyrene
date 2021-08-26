import React, {
  useEffect,
  useRef,
  forwardRef,
  Ref,
  ReactEventHandler,
  ReactElement,
} from 'react';

export interface DetectClickOutsideProps{
  children?: ReactElement,
  listen?: boolean,
  ignore?: Node,
  onClick?: () => void,
  onClickOutside?: () => void,
}

const DetectClickOutside = forwardRef((
  {
    listen, onClickOutside, ignore, ...props
  }: DetectClickOutsideProps,
  ref: Ref<HTMLDivElement>,
) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const container = useRef<HTMLDivElement>(null);

  const handleEvent = (e: Event) => {
    if (container.current?.contains(e.target as Node)) return;

    // This ignore prop is used mostly for the buttons/links that toggle menus and drawers
    if (ignore && ignore.contains && ignore.contains(e.target as Node)) {
      return;
    }

    onClickOutside?.();
  };


  const onKeyUp = (e: KeyboardEvent) => {
    // If the user hits ESC, it's considered a click outside!
    if (e.keyCode === 27) onClickOutside?.();
    handleEvent(e);
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (listen && onClickOutside) {
      // Add listeners
      document.addEventListener('mousedown', handleEvent, false);
      document.addEventListener('touchend', handleEvent, false);
      document.addEventListener('keyup', onKeyUp);

      return () => {
        // Remove listeners
        document.removeEventListener('mousedown', handleEvent, false);
        document.removeEventListener('touchend', handleEvent, false);
        document.removeEventListener('keyup', onKeyUp);
      };
    }
    return () => {};
  });

  return <div ref={container} {...props} />;
});

DetectClickOutside.displayName = 'Detect Click Outside';
export default DetectClickOutside;
