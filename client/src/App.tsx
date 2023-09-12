import React from 'react';
import './App.css';
import Navbar from './components/Navbar/navbar.component';
import Pets from './components/Pets/pets.component';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Pets/>
    </div>
  );
}
export default App;
