import { ref } from 'vue';
import {projectAuthentication} from "@/firebase/config";

const user = ref(projectAuthentication.currentUser);
let authInitialized = false;
let authResolve;

const authReady = new Promise(resolve => {
  authResolve = resolve;
});

const observeUserState = (callBack) => {
  return projectAuthentication.onAuthStateChanged(callBack);
}

projectAuthentication.onAuthStateChanged(_user => {
  user.value = _user;
  authInitialized = true;
  authResolve(); 
});

const getUser = () => {
  return user.value;
}

const isLogged = () => {
  return !!user.value;
}

const waitForAuthInit = () => {
  if (authInitialized) {
    return Promise.resolve();
  }
  return authReady;
}

export { getUser, isLogged, waitForAuthInit, observeUserState };
