import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { UserInter } from "../../interface/Interfaces";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch: any): Promise<void> => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));
    dispatch(login(result));
  };
};

export const starCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}: UserInter) => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({ email, password, displayName });
    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }: UserInter) => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });
    if (!result.ok) return dispatch(logout(result));
    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch: any) => {
    const result = await logoutFirebase();
    dispatch(logout(result));
  };
};
