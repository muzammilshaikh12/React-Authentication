import { useState } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setLoading] = useState(false)
  
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;
   
    setLoading(true)
    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCx4Fvp-Si-PUI6sV4wqdCmpEuGlkn-a08",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),

          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setLoading(false)
        if (res.ok) {
          return res.json()
          .then(data=>{
            console.log(data)
          })
        } else {
          return res.json()
          .then(error=>{
           if(error && error.error && error.error.message) {
           alert(error.error.message) 
           } else {
            alert('Something Went Wrong')
           }
          })
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "Login" : "Create Account"}</button>}
          {isLoading && <p>Loading....</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
