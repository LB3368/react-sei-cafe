/* eslint-disable no-unused-vars */
import './App.css';
import { useState } from 'react'
import NewOrderPage from './pages/NewOrderPage';
import AuthPage from './pages/AuthPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import NavBar from './component/NavBar';
import { Routes, Route } from 'react-router-dom'
// Add the following import
import { getUser } from './utilities/user-service'

function App() {

  //use state hook
  const [user, setUser] = useState(getUser())
// using a Ternary expressions( user ? <NewOrderPage />  :  <AuthPage /> ): Used to render one component or another.
//Logical (&&) expressions: Used to render a component or nothing.

  return (
    <main className="App">
      {
        //Note the necessity to add a React.Fragment (<>) to wrap the <NavBar>and <Routes>components.
        user ? 
        <>
        <NavBar name={user.name} setUser={setUser}/>
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
          </>
        : 
          <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

export default App;









