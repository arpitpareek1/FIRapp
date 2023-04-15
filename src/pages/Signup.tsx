
import React, { useState } from 'react';
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
} from '@ionic/react';
import './Login.css';
import axios from 'axios';
import { useHistory } from 'react-router';
import Header from './header';
import { backendURL } from '../env';

const Singup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const history = useHistory()
  const Singup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!username) {
      setUsernameError(true);
    }
    else if (!password) {
      setPasswordError(true);
    }
    else if (!email) {
      setEmailError(true);
    }
    else if (!number) {
      setNumberError(true)
    }
    else {
      const data = {
        'username': username,
        'password': password,
        'number': number,
        'email': email,
        'role': 'user'
      }
      console.log(data)
      axios.post(`${backendURL}/signup`, data).then((response) => {
        try {
          
       
        console.log(response.data, '--------', response.data.success, response.data.data.role)
        if (response && response.data && response.data.success) {
          console.log('in if condition')
          localStorage.setItem('islogin', 'true')
          if (response && response.data && response.data.data.role === 'admin') {
            localStorage.setItem('role', 'admin')
          } else {
            localStorage.setItem('role', 'user')
          }
          history.push('/login')
        } else {
          if (response && response.data && !response.data.success) {
            alert('this email is already in use')
          }
        }
      } catch (error) {
          alert('You Already have acount with this email')
      }
      }).catch((error) => { 
        console.log(error); 
      })
      
    }

  };

  return (
    <IonPage id="signup-page">
      <Header title='Signup'/>
      <IonContent>
        <form noValidate onSubmit={Singup}>
          <IonList>
            <IonItem>
              <IonInput
                label="email"
                labelPlacement="stacked"
                color="primary"
                name="email"
                type="email"
                value={email}
                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                onIonInput={(e) => {
                  setEmail(e.detail.value as string);
                  setEmailError(false);
                }}

              >
                {formSubmitted && emailError && (
                  <IonText color="danger" slot="error">
                    <p>email is required</p>
                  </IonText>
                )}
              </IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Username"
                labelPlacement="stacked"
                color="primary"
                name="username"
                type="text"
                value={username}
                spellCheck={false}
                autocapitalize="off"
                onIonInput={(e) => {
                  setUsername(e.detail.value as string);
                  setUsernameError(false);
                }}
                required
              >
                {formSubmitted && usernameError && (
                  <IonText color="danger" slot="error">
                    <p>Username is required</p>
                  </IonText>
                )}
              </IonInput>
            </IonItem>

            <IonItem>
              <IonInput
                label="Password"
                labelPlacement="stacked"
                color="primary"
                name="password"
                type="password"
                value={password}
                onIonInput={(e) => {
                  setPassword(e.detail.value as string);
                  setPasswordError(false);
                }}
              >
                {formSubmitted && passwordError && (
                  <IonText color="danger" slot="error">
                    <p>Password is required</p>
                  </IonText>
                )}
              </IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                label="Phone Number"
                labelPlacement="stacked"
                color="primary"
                name="Number"
                type="number"
                value={number}
                onIonInput={(e) => {
                  setNumber(e.detail.value as string);
                  setNumberError(false);
                }}
              >
                {formSubmitted && numberError && (
                  <IonText color="danger" slot="error">
                    <p>number is required</p>
                  </IonText>
                )}
              </IonInput>
            </IonItem>

          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">
                Signup
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Singup
