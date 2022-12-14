/* eslint-disable no-unused-vars */
import './App.css';
import { useState } from 'react'
import NewOrderPage from './pages/NewOrderPage';
import AuthPage from './pages/AuthPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import { Routes, Route } from 'react-router-dom'
import NavBar from './component/NavBar';

function App() {
  const [user, setUser] = useState({})
// using a Ternary expressions( user ? <NewOrderPage />  :  <AuthPage /> ): Used to render one component or another.
//Logical (&&) expressions: Used to render a component or nothing.

  return (
    <main className="App">
      {
        //Note the necessity to add a React.Fragment (<>) to wrap the <NavBar>and <Routes>components.
        user ? 
        <>
        <NavBar />
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
          </>
        : 
          <AuthPage />
      }
    </main>
  );
}

export default App;









