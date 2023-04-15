import React from "react";
import {IonBackButton, IonButtons, IonHeader, IonProgressBar, IonTitle, IonToolbar,} from "@ionic/react";


interface HeaderProps {
    title?: string
    hideBackButton?: boolean
    hideMenuButton?: boolean
    progress?: number,
    buffer?: number,
    showPopUp?: boolean
}

const Header: React.FC<HeaderProps> = (props) => {

    function progressBar() {
        if (props.progress){
            return <IonProgressBar value={props.progress} buffer={props.buffer} />
        }
    }
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{props.title}</IonTitle>
                    <IonButtons slot="start">
                        { props.hideBackButton === true ? null : <IonBackButton defaultHref="/"/>}
                    </IonButtons>
                    {/* <IonButtons slot="end">
                        {   !(props.hideMenuButton) &&
                            <IonMenuButton slot="end" onClick={()=> menuController.open()}/>
                        }
                    </IonButtons> */}
                </IonToolbar>
            </IonHeader>
            {progressBar()}
        </>
    );
}

export default Header;

