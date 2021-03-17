import Nav from './components/Nav'
import Footer from './components/Footer'
import Landing from './containers/Landing'
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'
import './App.css';
import ProfilePage from './components/views/profile-page/ProfilePage';
import ProfileProjects from './components/views/profile-projects/ProfileProjects'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/projects" component={ProfileProjects} />
          </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
