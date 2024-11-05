import './App.css';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Tabs from './Tabs';

function App() {
  return (
     <div>
      <Tabs className="App-header">
        <Home label="Home" />
        <About label="About" />
        <Projects label="Projects" />
      </Tabs>
    </div>
  );
}

export default App;
