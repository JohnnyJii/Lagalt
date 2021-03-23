import Nav from './components/shared/navbar/Nav'
import Footer from './components/shared/footer/Footer'
import Landing from './components/views/landing-page/Landing'
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'
import './App.css';
import ProfilePage from './components/views/profile-page/ProfilePage'
import ProfileProjects from './components/views/profile-projects/ProfileProjects'
import PrivateRoute from './PrivateRoute'
import { AuthContext } from './auth/Auth'
import Login from './components/views/login-page/Login'
import Signup from './components/views/login-page/Signup'
import FirebaseChat from './components/views/firebase-chat/firebase-chat-view/FirebaseChat'

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
              <Route path="/chat" component={FirebaseChat} />
            </Switch>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
