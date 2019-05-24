const API_URL = process.env.REACT_APP_API_URL;

const fetchData = async function(url, method, access_token, body, headers){
  const params = {
    method: method,
    headers: {
      ...headers,
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  };

  if (body) {
    params.body = JSON.stringify(body)
  };

  if (access_token) {
    params.headers["Authorization"] = `Bearer ${access_token}`
  }

  return fetch(url, params)
    .then(response=>{
      return new Promise((resolve, reject)=>{
        if (response.status===204) {
          return resolve();
        }
        response.json()
          .then(responseJson=>{
            if (response.status < 200 || response.status > 299) {
              responseJson.status = response.status;
              reject(responseJson);
            } else {
              resolve(responseJson);
            }
          });
      });
    });
}

export class Auth {
    static signInWithEmailAndPassword = async (email, password)=>(
      fetchData(`${API_URL}/auth`, "POST", null, { email, password })
        // .then(response=>response.json())
    )

    static signOut = async (access_token)=>(
      fetchData(`${API_URL}/auth`, "DELETE", access_token, {}).then( object=>object )
    )

    static getCurrentUser = async (access_token)=>(
      fetchData(`${API_URL}/auth/me`, "GET", access_token)
    )

    static recoverPassword = async email => (
        fetchData(`${API_URL}/auth/passwordRecovery`, "POST", null, { email })
    )

    static changePassword = async (password, access_token) => (
        fetchData(`${API_URL}/auth/changePassword`, "POST", access_token, { password })
    )
}