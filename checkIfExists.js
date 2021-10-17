const checkIfExists = () => {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: email,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3030/checkUser", requestOptions)
    .then((response) => response.text())
    .then((result) => alert(result))
    .catch((error) => console.log("error", error));
};
