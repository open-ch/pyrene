import React from 'react';

/**
 * Custimizable colors.
 *
 */
export interface Colors extends ThemeProperties {
  backgroundLight?: string
  backgroundTint?: string;
  border?: string;
  text?: string;
  icon?: string;
  iconLight?: string;
  primary?: string;
  primaryDark?: string;
  secondary?: string;
  secondaryDark?: string;
}

/**
 * All theme properties are a flat map of name to string.
 * (this will not entirely true anymore if we support more than colours).
 */
export interface ThemeProperties {
  [property: string]: string | undefined
}

/**
 * Changes camelCaseProperties to --css-variable-style names.
 *
 * @param key a theme key
 * @returns a css variable
 */
export const themePropertyToCssCustomProperty = (key: string) : string => `--${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;

/**
 * Transfers theme properties to CSS styles (custom properties).
 *
 * @param themeProperties properties of a theme, e.g., colors
 * @returns object with CSS styles
 */
export const themePropertiesToStyles = (themeProperties : ThemeProperties) : ThemeProperties => Object.entries(themeProperties)
  .reduce((cssProperties, [key, value]) => ({ ...cssProperties, [themePropertyToCssCustomProperty(key)]: value }), {});


/**
 * Multiple grouped theme properties (e.g. colors) can be passed to ThemeProvicer.
 */
export interface ThemeProviderProps {
  colors: Colors
  children: React.ReactNode
}

/*
 * Provides CSS variables to all nested components.
 */
const ThemeProvider = ({ colors, children }: ThemeProviderProps) : React.ReactElement => (
  <div style={themePropertiesToStyles(colors)}>
    {children}
  </div>
);

export default ThemeProvider;
