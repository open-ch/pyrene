export interface Example<ExampleProps> {
  props?: ExampleProps;
  examples?: {props: ExampleProps, description: string}[];
  category?: string;
}
