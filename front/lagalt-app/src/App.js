import Nav from './components/shared/navbar/Nav'
import Footer from './components/shared/footer/Footer'
import Landing from './components/views/landing-page/Landing'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import { AuthContext } from './auth/Auth'
import { useState } from 'react'
import GoogleAuthenticationX from './components/views/profile-view/google-authentication/GoogleAuthenticationX'
import CreateUserX from './components/views/profile-view/profile-page/create-user/CreateUserX'
import GameDevFilter from './components/views/navbarItems/GameDevFilter';
import FilmFilter from './components/views/navbarItems/FilmFilter';
import MusicFilter from './components/views/navbarItems/MusicFilter';
import WebDevFilter from './components/views/navbarItems/WebDevFilter';



function App() {
  const [userName, setUserName] = useState('Login')

  return (
    <AuthContext.Provider value={false}>
      <Router>
        <div className="App">
          <Nav userName={userName} />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/gamedevelopment" component={GameDevFilter} />
            <Route path="/films" component={FilmFilter} />
            <Route path="/music" component={MusicFilter} />
            <Route path="/webdevelopment" component={WebDevFilter} />
            <Route path="/createuser" component={CreateUserX} />
            <Route path='/profile' render={(props) => (<GoogleAuthenticationX {...props} setUserName={setUserName} />)} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
