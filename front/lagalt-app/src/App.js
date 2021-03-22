import Nav from './components/Nav'
import Footer from './components/Footer'
import Landing from './containers/Landing'
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'
import './App.css';
import ProfilePage from './components/views/profile-page/ProfilePage'
import ProfileProjects from './components/views/profile-projects/ProfileProjects'
import PrivateRoute from './PrivateRoute'
import Admin from './containers/Admin'
import { AuthContext } from './auth/Auth'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  return (
    <AuthContext.Provider value={false}>
      <Router>
        <div className="App">
          <Nav />
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/projects" component={ProfileProjects} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/admin" component={Admin} />
            </Switch>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
