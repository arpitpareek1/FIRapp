import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonProgressBar,
  IonToolbar,
} from "@ionic/react";
import "./allFirPage.css";

interface HeaderProps {
  title?: string;
  hideBackButton?: boolean;
  hideMenuButton?: boolean;
  progress?: number;
  buffer?: number;
  showPopUp?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  function progressBar() {
    if (props.progress) {
      return <IonProgressBar value={props.progress} buffer={props.buffer} />;
    }
  }
  return (
    <>
      <IonHeader mode="ios">
        <IonToolbar>
          <h1 className="header-text"> {props.title} </h1>
          <IonButtons slot="start">
            {props.hideBackButton === true ? null : (
              <IonBackButton defaultHref="/" />
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {progressBar()}
    </>
  );
};

export default Header;
