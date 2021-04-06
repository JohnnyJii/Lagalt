import Nav from './components/shared/navbar/Nav'
import Footer from './components/shared/footer/Footer'
import Landing from './components/views/landing-page/Landing'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import { AuthContext } from './auth/Auth'
import { useState } from 'react'
import GoogleAuthenticationX from './components/views/profile-view/google-authentication/GoogleAuthenticationX'
import CreateUserX from './components/views/profile-view/profile-page/create-user/CreateUserX'
import Project from './components/views/project';


function App() {
  const [userName, setUserName] = useState('Login')
  console.log(userName)

  return (
    <AuthContext.Provider value={false}>
      <Router>
        <div className="App">
          <Nav userName={userName} />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/createuser" component={CreateUserX} />
            <Route path="/profile" render={(props) => (<GoogleAuthenticationX {...props} setUserName={setUserName} />)} />
            <Route path="/project/:projectId">
              <Project />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
