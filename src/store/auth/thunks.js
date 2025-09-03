import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    // Change status to 'checking' for validate the authentication
    dispatch( checkingCredentials() );
  };
}


export const startGoogleSignIn = () => {
  return async (dispatch) => {
    // Change status to 'checking' for validate the authentication
    dispatch( checkingCredentials() );
    // Get info and login from Firebase
    const { ok, errorMessage, displayName, email, photoURL, uid } = await singInWithGoogle()
    // Validate if the sign-in was successful
    if (!ok) {
      dispatch(logout({ errorMessage }));
      return;
    }
    // Dispatch the login action with user data
    dispatch(login({
      uid: uid,
      displayName: displayName,
      email: email,
      photoURL: photoURL
    }));
  };
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch( checkingCredentials() );

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  }
}


export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch( checkingCredentials() );

    // Simulate a login process
    const { ok, uid, displayName, photoURL, errorMessage } = await loginWithEmailPassword({ email, password });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, photoURL }));
  }
}


export const startLogout = () => {
  return async (dispatch) => {
    // Call the Firebase logout function
    await logoutFirebase();
    // Dispatch the action to clear the journal state
    dispatch( clearNotesLogout() );
    // Dispatch the logout action
    dispatch(logout());
  }
}