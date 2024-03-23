export interface Layout {
  children: any;
  title: string;
}

export interface FormValidationState {
  [key: string]: [(value: string) => boolean, string];
}

export interface FormState {
  [key: string]: string;
}
 