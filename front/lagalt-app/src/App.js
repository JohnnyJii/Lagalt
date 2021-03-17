import Nav from './components/Nav'
import Footer from './components/Footer'
import About from './containers/About'
import Projects from './containers/Projects'
import Landing from './containers/Landing'
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/about" component={About} />
            <Route path="/projects" component={Projects} />
          </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
