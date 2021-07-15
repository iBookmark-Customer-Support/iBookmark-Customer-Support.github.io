axios
  .get("localhost:3000/api/v1/status")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
