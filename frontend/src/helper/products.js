export const getUsers = () => {
    return fetch(`http://localhost:8000/api/getAllUsers`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };