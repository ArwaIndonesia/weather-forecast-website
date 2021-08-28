const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messagetwo = document.querySelector("#message-2");

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "loading...";
  messagetwo.textContent = " ";
  fetch("http://localhost:4000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.Error) {
          messageOne.textContent = data.Error;
        } else {
          messageOne.textContent = data.Location;
          messagetwo.textContent = data.forecast;
        }
      });
    }
  );
});
