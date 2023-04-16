import { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardTitle,
  IonContent,
  IonCardContent,
  IonPage,
} from "@ionic/react";
import axios from "axios";
import "./allFirPage.css";
import { backendURL } from "../env";
import Header from "./header";

interface Issue {
  id: number;
  date: string;
  userid: number;
  time: string;
  fullName: string;
  contactNumber: string;
  address: string;
  incidentDate: string;
  incidentTime: string;
  location: string;
  incidentType: string;
  incidentDescription: string;
  witnessName: string;
  witnessContactNumber: string;
  witnessAddress: string;
  status: string;
}

const AllFirPage: React.FC = () => {
  const [issueList, setIssueList] = useState<Issue[]>([]);
  const [reload, setReload] = useState<number>(0);
  const [canChange, setCanChange] = useState<boolean>(false);

  useEffect(() => {
    axios
      .post(`${backendURL}getallfir`)
      .then((e) => {
        let firData = e.data.data;
        setIssueList(firData);
      })
      .catch((e) => {
        alert("there is some error feching data");
      });
  }, [reload]);

  useEffect(() => {
    let role = localStorage.getItem("role");
    if (role === "admin") {
      setCanChange(true);
    }
  }, []);

  function setSolve(e: number) {
    let data = { id: e, status: "resolved" };
    axios
      .post(`${backendURL}setStatusSolve`, data)
      .then((e) => {
        setReload(reload + 1);
      })
      .catch(() => {});
  }

  function setDiscart(e: number) {
    let data = { id: e, status: "Discard" };
    axios
      .post(`${backendURL}setStatusSolve`, data)
      .then((e) => {
        setReload(reload + 1);
      })
      .catch(() => {});
  }
  return (
    <IonPage>
      <Header title="All Complaines" />
      <IonContent>
        <div className="box">
          <div className="allComplains">
            <h1>All Complains</h1>
          </div>
          {issueList.map((issue) => (
            <div key={issue.id}>
              <div className="label-box">
                <IonCard className="my-table">
                  <IonCardTitle> Complainer Info</IonCardTitle>
                  <IonCardContent>complian Date :{issue.date}</IonCardContent>
                  <IonCardContent>complian time :{issue.time}</IonCardContent>
                  <IonCardContent>
                    complianer name :{issue.fullName}
                  </IonCardContent>
                  <IonCardContent>
                    complianer number :{issue.contactNumber}
                  </IonCardContent>
                  <IonCardContent>
                    complainer address :{issue.address}
                  </IonCardContent>
                  <IonCardTitle>Incident Info</IonCardTitle>

                  <IonCardContent>
                    {" "}
                    Incident date: {issue.incidentDate}
                  </IonCardContent>
                  <IonCardContent>
                    Incident Time : {issue.incidentTime}
                  </IonCardContent>
                  <IonCardContent>
                    Incident loaction: {issue.location}
                  </IonCardContent>
                  <IonCardContent>
                    Incident type: {issue.incidentType}
                  </IonCardContent>
                  <IonCardContent>
                    Incident Description :{issue.incidentDescription}
                  </IonCardContent>

                  <IonCardTitle> witness info</IonCardTitle>
                  <IonCardContent>
                    witness name: {issue.witnessName}
                  </IonCardContent>
                  <IonCardContent>
                    witness Contact Number: {issue.witnessContactNumber}
                  </IonCardContent>
                  <IonCardContent>
                    witness Address: {issue.witnessAddress}
                  </IonCardContent>
                  <IonCardContent>issue status: {issue.status}</IonCardContent>
                </IonCard>
                {issue.status !== "resolved" && canChange ? (
                  <IonButton
                    fill="clear"
                    onClick={(e) => {
                      setSolve(issue.id);
                    }}
                  >
                    Solved
                  </IonButton>
                ) : (
                  ""
                )}
                {issue.status !== "Discard" && canChange ? (
                  <IonButton
                    fill="clear"
                    onClick={(e) => {
                      setDiscart(issue.id);
                    }}
                  >
                    Discard
                  </IonButton>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>

    // <>
    // <div className="allComplains">
    //   <h1>All Complains</h1>
    // </div>
    // </>
  );
};

export default AllFirPage;
