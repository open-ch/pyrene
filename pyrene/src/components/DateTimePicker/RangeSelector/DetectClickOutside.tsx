import React, {
  useEffect,
  useRef,
  ReactElement,
} from 'react';

export interface DetectClickOutsideProps{
  children?: ReactElement,
  listen?: boolean,
  ignore?: Node,
  onClick?: () => void,
  onClickOutside?: () => void,
}

const DetectClickOutside: React.FC<DetectClickOutsideProps> = ({
  listen,
  onClickOutside,
  ignore,
  ...props
}: DetectClickOutsideProps) => {

  const container = useRef<HTMLDivElement>(null);

  const handleEvent = (e: Event) => {
    if (container.current?.contains(e.target as Node)) return;

    // This ignore prop is used mostly for the buttons/links that toggle menus and drawers
    if (ignore && ignore.contains && ignore.contains(e.target as Node)) {
      return;
    }

    onClickOutside?.();
  };


  const onKeyDn = (e: KeyboardEvent) => {
    // If the user hits ESC, it's considered a click outside!
    if (e.code.toLocaleLowerCase() === 'escape') onClickOutside?.();
    handleEvent(e);
  };

  useEffect(() => {
    if (listen && onClickOutside) {
      // Add listeners
      document.addEventListener('mousedown', handleEvent, false);
      document.addEventListener('touchend', handleEvent, false);
      document.addEventListener('keydown', onKeyDn);

      return () => {
        // Remove listeners
        document.removeEventListener('mousedown', handleEvent, false);
        document.removeEventListener('touchend', handleEvent, false);
        document.removeEventListener('keydown', onKeyDn);
      };
    }
    return () => {};
  });

  return <div ref={container} {...props} />;
};

DetectClickOutside.displayName = 'Detect Click Outside';
export default DetectClickOutside;
