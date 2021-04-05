import Nav from './components/shared/navbar/Nav'
import Footer from './components/shared/footer/Footer'
import Landing from './components/views/landing-page/Landing'
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'
import './App.css';
import { AuthContext } from './auth/Auth'
import { useState } from 'react'
import GoogleAuthenticationX from './components/views/profile-view/google-authentication/GoogleAuthenticationX'
import CreateUserX from './components/views/profile-view/profile-page/create-user/CreateUserX'
import Codes from '../src/components/views/navbarItems/Codes'
import Movies from '../src/components/views/navbarItems/Movies'
import Music from '../src/components/views/navbarItems/Music'
import Web from '../src/components/views/navbarItems/Web'


function App() {
  const [userName, setUserName] = useState('Login')

  return (
    <AuthContext.Provider value={false}>
      <Router>
        <div className="App">
          <Nav userName={userName} />
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/codes" component={Codes} />
              <Route path="/movies" component={Movies} />
              <Route path="/music" component={Music} />
              <Route path="/web" component={Web} />
              <Route path="/createuser" component={CreateUserX} />
              <Route path='/profile' render={(props) => (<GoogleAuthenticationX {...props} setUserName={setUserName} /> )}/>
            </Switch>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
