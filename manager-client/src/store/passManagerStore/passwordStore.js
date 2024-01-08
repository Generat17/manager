import { makeAutoObservable, runInAction } from "mobx";

import {
  deletePasswordAPI,
  getPasswordsAPI,
  postPasswordAPI,
  putPasswordAPI,
} from "../../api/passManagerAPI/passwordAPI";

class PasswordStore {
  passwords = [];
  isLoadingPassword = false;

  constructor() {
    makeAutoObservable(this);
  }

  getPasswords = async (serviceId) => {
    try {
      this.isLoadingPassword = true;
      const res = await getPasswordsAPI(serviceId);

      runInAction(() => {
        this.passwords = res;
        this.isLoadingPassword = false;
      });
    } catch {
      console.log("error getPasswords");
      this.isLoadingPassword = false;
    }
  };

  createPassword = async (login, password, description, serviceId) => {
    try {
      this.isLoadingPassword = true;
      await postPasswordAPI(login, password, description, serviceId);
      this.isLoadingPassword = false;
    } catch {
      console.log("error createPassword");
      this.isLoadingPassword = false;
    }
  };

  updatePassword = async (login, password, description, passwordId) => {
    try {
      this.isLoadingPassword = true;
      await putPasswordAPI(login, password, description, passwordId);
      this.isLoadingPassword = false;
    } catch {
      console.log("error updatePassword");
      this.isLoadingPassword = false;
    }
  };

  deletePassword = async (passwordId) => {
    try {
      this.isLoadingPassword = true;
      await deletePasswordAPI(passwordId);
      this.isLoadingPassword = false;
    } catch {
      console.log("error deletePassword");
      this.isLoadingPassword = false;
    }
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PasswordStore();
