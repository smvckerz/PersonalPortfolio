import './App.css';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Tabs from './Tabs';
import './Home'
import PreLoader1 from './PreLoader1';

function App() {
  return (
     <div>
      <PreLoader1/>
      <Tabs className="App-header">
        <Home label="Home" />
        <About label="About" />
        <Projects label="Projects" />
      </Tabs>
    </div>
  );
}

export default App;
