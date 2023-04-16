import { useForm } from "react-hook-form";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import React from "react";
import "./Login.css";
import Header from "./header";
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
    id: string;
  }
  const gender =[
    "male", "female" , "transgender"
  ]
  const districts = [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad",
  ];

  const onSubmit = (data: FIRFormInputs) => {
    console.log(data);
    let userData = JSON.parse(localStorage.getItem("userData")!);
    if (userData && userData?.id) data["id"] = userData?.id;
    axios
      .post(`${backendURL}craeteFir`, data)
      .then((data) => {
        console.log(data.data.success);
        if (data && data.data && data.data.success) {
          alert("Your complin is registerd");
          window.location.href = "/";
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Your complin is not registerd. there was an error");
      });
  };

  return (
    <IonPage>
      <Header title="Register FIR" />
      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)} className="inputfir">
          <h2>Complainant's Details:</h2>
          <IonItem>
            <IonLabel>Full Name:</IonLabel> <br/> <br/>
            <IonInput {...register("fullName")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Contact Number:</IonLabel> <br/>
            <IonInput type="number" {...register("contactNumber")} required />
          </IonItem>
          <IonItem>
          <IonLabel>Gender :</IonLabel> <br/>
          <IonSelect  interface="action-sheet" mode='ios'>
          {gender.map(gender => (
            <IonSelectOption key={gender} value={gender}>
              {gender}
            </IonSelectOption>
          ))}
        </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Address:</IonLabel> <br/>
            <IonSelect
              {...register("address")}
              interface="action-sheet"
              mode="ios"
            >
              {districts.map((district) => (
                <IonSelectOption key={district} value={district}>
                  {district}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Date:</IonLabel> <br/>
            <IonInput type="date" {...register("date")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Time:</IonLabel> <br/>
            <IonInput type="time" {...register("time")} required />
          </IonItem>
          <h2>Incident Details:</h2>
          <IonItem>
            <IonLabel>Date:</IonLabel> <br/>
            <IonInput type="date" {...register("incidentDate")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Time:</IonLabel> <br/>
            <IonInput type="time" {...register("incidentTime")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Location of Incident:</IonLabel> <br/>
            <IonInput {...register("location")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Type of Incident:</IonLabel> <br/>
            <IonInput {...register("incidentType")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Description of Incident:</IonLabel> <br/>
            <IonTextarea {...register("incidentDescription")} required />
          </IonItem>
          <h2>Witness Details:</h2>
          <IonItem>
            <IonLabel>Name:</IonLabel> <br/>
            <IonInput {...register("witnessName")} required />
          </IonItem>
          <IonItem>
            <IonLabel>Contact Number:</IonLabel> <br/>
            <IonInput
              type="number"
              {...register("witnessContactNumber")}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel>Address:</IonLabel> <br/>
            {/* <IonTextarea {...register("witnessAddress")} required />
             */}
            <IonSelect
              {...register("address")}
              interface="action-sheet"
              mode="ios"
            >
              {districts.map((district) => (
                <IonSelectOption key={district} value={district}>
                  {district}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
                <div className="ion-text-center">
          <IonButton
            class="ion-text-capitalize ion-button-small custom-button"
            type="submit"
            // className="loginionBtn"
            // expand="block"
            // color={"dark"}
          >
            Submit
          </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};
export default FIRForm;
