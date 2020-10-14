/* eslint-disable react/require-default-props */
import React from 'react';

type Props = {
  label?: string;
  width?: number | string;
};

const Placeholder: React.FC<Props> = ({ label = 'Content', width = '100%' }: Props) => (
  <div className="unSelectable" style={{
    height: 200,
    backgroundColor: 'var(--neutral-020)',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    color: 'var(--neutral-100)',
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    width: width,
  }}
  >
    {label}
  </div>
);

export default Placeholder;
