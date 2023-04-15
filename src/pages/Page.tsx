import {  IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid,  IonIcon, IonItem , IonPage, IonRow,  } from '@ionic/react';
import './Page.css';
import {  arrowForward, openOutline, diamondOutline } from 'ionicons/icons';
import Header from './header';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const Page: React.FC = () => {
  const history = useHistory()
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [canChange, setCanChange] = useState<boolean>(false);

  useEffect(()=>{
    const data =  JSON.parse(localStorage.getItem('islogin')!)
    console.log(data, 'is login')
    setIsLogedIn(data)
    let role = localStorage.getItem('role')
    if(role === 'admin'){
      setCanChange(true);
    }
    },[])
  function logout() {
    localStorage.setItem('islogin', 'false');
    history.push('/login')
  }


  return (
    <>
      <IonPage>
        <Header title="FIR APP" />
        <IonContent fullscreen={true}>
          <div className="pb60 welcome-page">
            <IonGrid>
              <IonRow className="ion-justify-content-center hide-xs">
                <IonCol sizeLg="4" sizeMd="3" size="7">
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center">
                <IonCol sizeXs="12" size="10" sizeMd="6" >
                  <IonCard className="tiny-padding"  onClick={()=>{isLogedIn ? history.push('/FIRform') : alert('To complain you have to login')}} >
                    <IonCardHeader className="slim-padding">
                      <IonItem className="blank-item" lines="none">
                        <IonIcon slot="end" icon={arrowForward} />
                        <IonCardTitle>Compalin</IonCardTitle>
                      </IonItem>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center">
                <IonCol sizeXs="12" size="10" sizeMd="6" >
                  <IonCard
                    className="tiny-padding"
                    routerLink='/allFIR'
                  >
                    <IonCardHeader className="slim-padding">
                      <IonItem className="blank-item" lines="none">
                        <IonIcon slot="end" icon={openOutline} />
                        <IonCardTitle>View Complain</IonCardTitle>
                      </IonItem>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center">
                <IonCol sizeXs="12" size="10" sizeMd="6" >
                  <IonCard
                    className="shineCard tiny-padding"
                    onClick={()=>{canChange ? history.push('/allFIR') : alert('you can not Update Complains')}}
                  >
                    <IonCardHeader className="slim-padding">
                      <IonItem className="blank-item" lines="none" >
                        <IonIcon slot="end" icon={diamondOutline} />
                        <IonCardTitle>Update Complains</IonCardTitle>
                      </IonItem>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow> 
              {/* <IonRow className="ion-justify-content-center">
                <IonCol sizeXs="12" size="10" sizeMd="6" >
                  <IonCard
                    className="shineCard tiny-padding"
                   >
                    <IonCardHeader className="slim-padding">
                      <IonItem className="blank-item" lines="none">
                        <IonIcon slot="end" icon={cardOutline} />
                        <IonCardTitle>About US</IonCardTitle>
                      </IonItem>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow> */}
              {
                !isLogedIn?
                <IonRow className="ion-justify-content-center">
                <IonCol sizeXs="12" size="10" sizeMd="6" >
                  <IonCard
                    className="shineCard tiny-padding"
                    routerLink="/login"
                   >
                    <IonCardHeader className="slim-padding">
                      <IonItem className="blank-item" lines="none">
                        <IonIcon slot="end" icon={arrowForward} />
                        <IonCardTitle>Login</IonCardTitle>
                      </IonItem>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>:<IonRow className="ion-justify-content-center">
                <IonCol sizeXs="12" size="10" sizeMd="6" >
                  <IonCard
                    className="shineCard tiny-padding"
                   onClick={logout}
                   >
                    <IonCardHeader className="slim-padding">
                      <IonItem className="blank-item" lines="none">
                        <IonIcon slot="end" icon={arrowForward} />
                        <IonCardTitle>Log out</IonCardTitle>
                      </IonItem>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
              }

             
            </IonGrid>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Page;
