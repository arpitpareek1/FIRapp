import { useForm } from "react-hook-form";
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonTextarea } from '@ionic/react';
import React from 'react';

import Header from './header';
import axios from "axios";
import { backendURL } from "../env";

const FIRForm: React.FC = () => {

  const { register, handleSubmit } = useForm<FIRFormInputs>();


  interface FIRFormInputs {
    date: string;
    time: string;
    fullName: string;
    contactNumber: number;
    address: string;
    incidentDate: string;
    incidentTime: string;
    location: string;
    incidentType: string;
    incidentDescription: string;
    witnessName: string;
    witnessContactNumber: string;
    witnessAddress: string;
    id: string
  }

  const onSubmit = (data: FIRFormInputs) => {
    console.log(data);
    let userData = JSON.parse(localStorage.getItem('userData')!)
    if (userData && userData?.id)
      data['id'] = userData?.id
    axios.post(`${backendURL}/craeteFir`, data).then((data) => {
      console.log(data.data.success);
      if (data && data.data && data.data.success) {
        alert("Your complin is registerd")
      }
    }).catch((e) => {
      console.log(e);
      alert("Your complin is not registerd. there was an error")
    })
  };

  return (
    <IonPage>
      <Header title='FIRST INFORMATION REPORT' />
      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <IonLabel>Date:</IonLabel>
            <IonInput type="date" {...register("date")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Time:</IonLabel>
            <IonInput type="time" {...register("time")} required />
          </IonItem>
          <h2>Complainant's Details:</h2>
          <IonItem>
            <IonLabel>Full Name:</IonLabel>
            <IonInput {...register("fullName")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Contact Number:</IonLabel>
            <IonInput type="number" {...register("contactNumber")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Address:</IonLabel>
            <IonTextarea {...register("address")} required />
          </IonItem>
          <h2>Incident Details:</h2>
          <IonItem>
            <IonLabel>Date:</IonLabel>
            <IonInput type="date" {...register("incidentDate")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Time:</IonLabel>
            <IonInput type="time" {...register("incidentTime")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Location of Incident:</IonLabel>
            <IonInput {...register("location")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Type of Incident:</IonLabel>
            <IonInput {...register("incidentType")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Description of Incident:</IonLabel>
            <IonTextarea {...register("incidentDescription")} required />
          </IonItem>
          <h2>Witness Details:</h2>
          <IonItem>
            <IonLabel>Name:</IonLabel>
            <IonInput {...register("witnessName")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Contact Number:</IonLabel>
            <IonInput type="number" {...register("witnessContactNumber")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Address:</IonLabel>
            <IonTextarea {...register("witnessAddress")} required />
          </IonItem>

          <IonButton type="submit" expand="block">Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}
export default FIRForm
