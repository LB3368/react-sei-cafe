import { Link } from 'react-router-dom'
import * as userService from '../utilities/user-service'

export default function NavBar ({ name, setUser }) {
    function handleLogout () {
        //Delegate to the users-service
        userService.logOut()
        setUser(null)
    }
    /**Clicking any of the links performs client-side routing where React Router will:
***putting the nav about the return statement to have it show on everypage 
Update the path in the address bar without causing the page to reload
Automatically trigger a render */
    return (
    <nav>
        <Link to='/orders'>Order History</Link>
        &nbsp; | &nbsp;
        <Link to='/orders/new'>New Order</Link>
        <p>Welcome, {name}</p>
      &nbsp;&nbsp;<Link to="" onClick={handleLogout}>Log Out</Link>
        
    </nav>
    )
}

/**IMPORTANT: Inspecting the elements on the page will reveal that indeed an <a>element is 
 * being emitted to the DOM when we use a <Link>component. However, although they look like 
 * ordinary <a>elements, React intercepts their click event thus preventing an HTTP request 
 * from being sent. However, if you accidentally use an <a>tag, React will not intercept 
 * the click event and a page reload will occur 😞 */