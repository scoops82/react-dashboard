import "./App.css";
import TaskList from "./components/TaskList";
// import Weather from "./components/Weather.jsx";
import Joke from "./components/Joke.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Morning Dashboard</h1>
      </header>
      <main>
        <TaskList />
        {/* <Weather />*/}
        <Joke />
        {/* Clock maybe timezone form? */}
        {/* Top News */}
      </main>
    </div>
  );
}

export default App;
