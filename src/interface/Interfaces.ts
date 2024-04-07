export interface Layout {
  children: any;
  title: string;
}

export interface FormValidationState {
  [key: string]: [(value: string) => boolean, string];
}


export interface FormCheckedValues {
  [key: string]: string | null;
}

export interface UserInter {
  email: string ;
  password: string ;
  displayName?: string ;
}
