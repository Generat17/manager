import { makeAutoObservable, runInAction } from "mobx";
import {
  deleteServiceAPI,
  getServicesAPI,
  postServiceAPI,
  putServiceAPI,
} from "../../api/passManagerAPI/serviceAPI";

class ServiceStore {
  services = [];
  isLoadingService = false;

  constructor() {
    makeAutoObservable(this);
  }

  getServices = async () => {
    try {
      this.isLoadingService = true;
      const res = await getServicesAPI();

      runInAction(() => {
        this.services = res;
        this.isLoadingService = false;
      });
    } catch {
      console.log("error getServices");
      this.isLoadingService = false;
    }
  };

  createService = async (name) => {
    try {
      this.isLoadingService = true;
      await postServiceAPI(name);
      this.isLoadingService = false;
    } catch {
      console.log("error createService");
      this.isLoadingService = false;
    }
  };

  updateService = async (selected, name) => {
    try {
      this.isLoadingService = true;
      await putServiceAPI(selected, name);
      this.isLoadingService = false;
    } catch {
      console.log("error updateService");
      this.isLoadingService = false;
    }
  };

  deleteService = async (selected) => {
    try {
      this.isLoadingService = true;
      await deleteServiceAPI(selected);
      this.isLoadingService = false;
    } catch {
      console.log("error deleteService");
      this.isLoadingService = false;
    }
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ServiceStore();
