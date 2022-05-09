import React, { useRef, forwardRef, useEffect } from 'react';
// @ts-ignore
const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    // @ts-ignore
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <input
      onClick={(e) => e.stopPropagation()}
      type="checkbox"
      // @ts-ignore
      ref={resolvedRef}
      {...rest}
    />
  );
});

export default IndeterminateCheckbox;
