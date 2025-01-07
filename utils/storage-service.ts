export enum StorageKeys {
  ACCESS_TOKEN = "access_token",
}

const saveToLocalStorage = (key: StorageKeys, data: any) => {
  if (typeof window !== "undefined") {
    if (typeof data === "object") {
      window.localStorage.setItem(key, JSON.stringify(data));
    } else {
      window.localStorage.setItem(key, data);
    }
  }
};
const getFromLocalStorage = (key: StorageKeys) => {
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem(key);
    if (data && typeof data === "object") {
      return JSON.parse(data);
    } else {
      return data;
    }
  }
};

export { getFromLocalStorage, saveToLocalStorage };
