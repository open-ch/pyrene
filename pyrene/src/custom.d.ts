import "react";

declare module '*.svg' 
declare module '*.css'
// FixMe: How do we make this better with postcss?
declare module "react" {
  interface Attributes {
    styleName?: string;
  }
}
