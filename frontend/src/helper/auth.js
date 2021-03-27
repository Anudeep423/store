export const signUp = (data) => {
    return fetch(`http://localhost:8000/api/user/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: data
      })
        .then(response => {
          return response.json();
        })
        .catch(err => console.log(err));
  };

  export const signIn = async (data) => {
    return await fetch(`http://localhost:8000/api/user/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body:  JSON.stringify(data)
      })
        .then(response => {
          return response.json();
        })
        .catch(err => console.log(err));
  };