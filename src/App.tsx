import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Singup from './pages/Signup';
import FIRForm from './pages/FIRForm';
import AllFirPage from './pages/allFirPage';
import Header from './pages/header';
import MyCompaines from './pages/myComplaines';
setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp  >
      <IonReactRouter >
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            <Header/>
            <Route path="/" exact={true}>
            <Page />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route path="/signup" exact={true}>
              <Singup />
            </Route>
            <Route path="/FIRForm" exact={true} >
              <FIRForm />
            </Route>
            <Route path="/allFIR" exact={true}>
              <AllFirPage/>
            </Route>
            <Route path="/myCompaines" exact={true}>
              <MyCompaines/>
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
