import auth0 from "auth0-js";

export const auth0Instance = new auth0.WebAuth({
  domain      : "victroll.auth0.com",
  clientID    : "P56HrPLK9V6MkGtlBW7u7rwYFbpvKWNH",
  redirectUri : "http://127.0.0.1:3000/auth/callback",
  audience    : "https://victroll.auth0.com/userinfo",
  responseType: "token id_token",
  scope       : "openid profile"
});

export const login = () => auth0Instance.authorize();

export const verifyAuthentication = async () => {
  // Check whether the current time is past the
  // Access Token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
  //await new Promise(resolve => setTimeout(resolve, 1000));
  return new Date().getTime() < expiresAt;
};

export const logout = () => {
  // Clear Access Token and ID Token from local storage
  localStorage.removeItem("access_token");
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
  localStorage.removeItem("idTokenPayload");
  // navigate to the home route
  // history.replace('/home');
};

export const setSession = authResult => {
  // Set the time that the Access Token will expire at
  let expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime()
  );
  localStorage.setItem("access_token", authResult.accessToken);
  localStorage.setItem("id_token", authResult.idToken);
  localStorage.setItem("expires_at", expiresAt);
  localStorage.setItem(
    "idTokenPayload",
    JSON.stringify(authResult.idTokenPayload)
  );
  // navigate to the home route
  // history.replace('/home');
};

export const handleAuthentication = () => {
  return new Promise((resolve, reject) => {
    auth0Instance.parseHash((err, authResult) => {
      if (!err && !authResult) return reject(new Error("No callback data"));
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        resolve(authResult);
      } else if (err) {
        reject(err);
      }
    });
  });
};

export const getAuthenticationData = () => {
  const accessToken = localStorage.getItem("access_token");
  const idToken = localStorage.getItem("id_token");
  const expiresAt = localStorage.getItem("expires_at");
  const payload = JSON.parse(localStorage.getItem("idTokenPayload"));
  return { accessToken, idToken, expiresAt, payload };
};

export const getProfile = () => {
  return new Promise((resolve, reject) => {
    var accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      reject();
    }

    auth0Instance.client.userInfo(accessToken, function(err, profile) {
      if (profile && !err) {
        localStorage.setItem("profile", JSON.stringify(profile));
        resolve(profile);
      } else {
        return reject(err);
      }
    });
  });
};
