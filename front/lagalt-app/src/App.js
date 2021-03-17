import './App.css';
import ProfilePage from './components/views/profile-page/ProfilePage';
import ProfileProjects from './components/views/profile-projects/ProfileProjects'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Switch>
            <Route path="/profile" component={ProfilePage} />
            <Route path="/projects" component={ProfileProjects} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
