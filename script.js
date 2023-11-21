let TOKEN = null;

// ******************* Login form **************************
const form = document.querySelector("#login-form");
if (form) {
   form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("data took", form);
      const data = {
         username: form[0].value,
         password: form[1].value,
      };

      const fetchLink = "https://catalin-backend-final.onrender.com/login";
      // const fetchLink = "http://127.0.0.1:8000/login";

      fetch(fetchLink, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      })
         .then((res) => {
            if (!res.ok) {
               throw new Error("something went wrong", res.status);
            }
            return res.json();
         })
         .then((data) => {
            console.log("this is logged in data:", data);
            console.log("thsi is token", data.token);
            TOKEN = data.token;
            // window.location.href = "/index.html";
            // get_userCreatedPosts(TOKEN);

            if (TOKEN) {
               form.style.display = "none";
               createUserContest(TOKEN);
               get_userCreatedPosts(TOKEN);
            }
         })
         .catch((error) => {
            console.error("Error:", error);
         });
   });
}

// console.log("this in new token:", TOKEN);

// console.log("this is login form:", form);

// ******************* signup form **************************
const formSignUP = document.querySelector("#signup-form");
if (formSignUP) {
   console.log("this is sign up form", formSignUP);
   formSignUP.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("data took", formSignUP[0].value);
      const data = {
         email: formSignUP[0].value,
         username: formSignUP[1].value,
         password: formSignUP[2].value,
      };

      console.log("this is sending data", data);

      const fetchLink = "https://catalin-backend-final.onrender.com/signup";
      // const fetchLink = "http://127.0.0.1:8000/signup";

      fetch(fetchLink, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      })
         .then((res) => {
            if (!res.ok) {
               throw new Error("something went wrong", res.status);
            }
            return res.json();
         })
         .then((data) => console.log("this is logged in data:", data))
         .catch((error) => {
            console.log("Error:", error);
         });
   });
}

// ************************ create contest **************************

function createUserContest(token) {
   const createContest = document.querySelector("#create-contest");
   if (createContest) {
      createContest.addEventListener("submit", (e) => {
         e.preventDefault();
         const data = {
            winner_1: createContest[0].value,
            winner_2: createContest[1].value,
            winner_3: createContest[2].value,
            winner_4: createContest[3].value,
            winner_5: createContest[4].value,
            not_winner: createContest[5].value,
            user: 1,
         };
         const fetchLink =
            "https://catalin-backend-final.onrender.com/userCreateContest/";

         fetch(fetchLink, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: "Token " + token,
            },
            body: JSON.stringify(data),
         })
            .then((res) => {
               if (!res.ok) {
                  throw new Error(
                     "something went wrong when creating contest",
                     res.status
                  );
               }
               return res.json();
            })
            .then((data) => {
               console.log("this created contest:", data);
               get_userCreatedPosts(TOKEN);
            })
            .catch((error) => {
               console.log("Error:", error);
            });
      });
   }
}

// ******************** functions **********************

function get_userCreatedPosts(token) {
   console.log("im reading token: ", token);
   const fetchLink = "https://catalin-backend-final.onrender.com/userContest";
   // const fetchLink = "http://127.0.0.1:8000/contest";
   // const fetchLink = "http://127.0.0.1:8000/userContest";

   fetch(fetchLink, {
      headers: {
         "Content-Type": "application/json",
         Authorization: "Token " + token,
      },
   })
      .then((res) => {
         if (!res.ok) {
            throw new Error("somethig wrong in fetch");
         }
         return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => {
         console.error("Error:", error);
      });
}
