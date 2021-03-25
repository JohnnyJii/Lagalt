import Nav from './components/shared/navbar/Nav'
import Footer from './components/shared/footer/Footer'
import Landing from './components/views/landing-page/Landing'
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'
import './App.css';
import ProfileProjects from './components/views/profile-projects/ProfileProjects'
import { AuthContext } from './auth/Auth'
import GoogleAuthentication from './components/views/login-page/GoogleAuthentication';

function App() {
  return (
    <AuthContext.Provider value={false}>
      <Router>
        <div className="App">
          <Nav />
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/profile" component={GoogleAuthentication} />
              <Route path="/projects" component={ProfileProjects} />
              </Switch>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
