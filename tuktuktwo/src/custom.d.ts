declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '@vx/tooltip';
declare module '@vx/event';
