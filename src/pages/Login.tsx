import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonInput,
  IonText,
} from "@ionic/react";
import "./Login.css";
import axios from "axios";
import { useHistory } from "react-router";
import Header from "./header";
import { backendURL } from "../env";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const history = useHistory();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!username) {
      setUsernameError(true);
    }else{
      setUsernameError(false);

    }
    if (!password) {
      setPasswordError(true);
    }else{

      setPasswordError(false);
    }
    if (username && password) {
      const data = {
        email: username,
        password: password,
      };
      axios
        .post(`${backendURL}login`, data)
        .then((e) => {
          let userdata = e.data.data[0];
          if (e && e.data && e.data.success) {
            if (e.data.data[0].role === "admin") {
              localStorage.setItem("role", "admin");
            } else {
              localStorage.setItem("role", "user");
            }
            localStorage.setItem("islogin", "true");
            let a = JSON.stringify(userdata);
            localStorage.setItem("userData", a);
            window.location.href = "/";
          } else {
            if (!e.data.success) {
              // console.log(e)
              alert(" email or password is not right");
            }
          }
        })
        .catch((a) => {
          console.log(e);
        });
    }
  };

  return (
    // <IonPage id="login-page">
    //   <Header title="Login" />

    //   <IonContent>
    //     <form onSubmit={submit}>
    //       <IonList>
    //         <IonItem>
    //           <IonInput
    //             label="email"
    //             labelPlacement="stacked"
    //             color="primary"
    //             name="email"
    //             type="text"
    //             value={username}
    //             spellCheck={false}
    //             autocapitalize="off"
    //             onIonInput={(e) => setUsername(e.detail.value as string)}
    //             required
    //           >
    //             {formSubmitted && usernameError && (
    //               <IonText color="danger" slot="error">
    //                 <p>Username is required</p>
    //               </IonText>
    //             )}
    //           </IonInput>
    //         </IonItem>

    //         <IonItem>
    //           <IonInput
    //             label="Password"
    //             labelPlacement="stacked"
    //             color="primary"
    //             name="password"
    //             type="password"
    //             value={password}
    //             onIonInput={(e) => setPassword(e.detail.value as string)}
    //           >
    //             {formSubmitted && passwordError && (
    //               <IonText color="danger" slot="error">
    //                 <p>Password is required</p>
    //               </IonText>
    //             )}
    //           </IonInput>
    //         </IonItem>
    //       </IonList>
    //       <IonButton type="submit" className="loginBtn" expand="block">
    //         Login
    //       </IonButton>
    //       <p>Don't have an account</p>
    //     </form>
    //   </IonContent>
    // </IonPage>
    <>
      <Header title="Login" />
      <div className="loginPage">
        <div className="pagesContainer">
          <div className="loginPart">
            <h1>Please login to your account to access your details</h1>
          <IonInput
            label="email"
            labelPlacement="stacked"
            color="primary"
            name="email"
            type="text"
            value={username}
            spellCheck={false}
            autocapitalize="off"
            onIonInput={(e) => setUsername(e.detail.value as string)}
            required
          >
            {formSubmitted && usernameError && (
              <IonText color="danger" slot="error">
                <p>Username is required</p>
              </IonText>
            )}
          </IonInput>
            <br />
            
            <IonInput
              label="Password"
              labelPlacement="stacked"
              color="primary"
              name="password"
              type="password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value as string)}
            >
              {formSubmitted && passwordError && (
                <IonText color="danger" slot="error">
                  <p>Password is required</p>
                </IonText>
              )}
            </IonInput>
            <div className="loginBtn" onClick={submit}>LOG IN</div>
            <p>
              Don’t have an account? <span onClick={()=> window.location.href='/signup'}>Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
