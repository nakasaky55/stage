const { APP_CONFIG } = process.env;
const ACCESS_TOKEN_KEY = "access_token";

let appSettings;
try {
  appSettings = JSON.parse(APP_CONFIG || "https://api-staging.1on1english.vn");
} catch (ex) {
  appSettings = {
    API_ENDPOINT: "https://api-staging.1on1english.vn",
  };
}

export const baseUrl = new URL(appSettings.API_ENDPOINT).toString();

export const setAccessToken = (accessToken) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);
