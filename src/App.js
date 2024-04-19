import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import TodoList from './todoList/TodoList';
import { Provider } from 'react-redux';
import store from './todoList/store';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/todo-list" element={<Provider store={store}><TodoList /></Provider>} />
      </Routes>
    </Router>
  );
}

export default App;
