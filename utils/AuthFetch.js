import 'regenerator-runtime/runtime';
import { getSessionToken } from "@shopify/app-bridge-utils";

// function to authenticate fetch to backend
const authFetch = async (url, options = {}) => {
  const newToken = await getSessionToken(window.app);
  const updateOptions = (newOptions) => {
    const update = { ...newOptions };
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${newToken}`,
    };
    return update;
  };
  return fetch(url, updateOptions(options));
};

export default authFetch;