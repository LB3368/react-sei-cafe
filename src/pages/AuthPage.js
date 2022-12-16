import SignUpForm from "../component/SignUpForm"
import LoginForm from "../component/LoginForm"

export default function AuthPage ({ setUser }) {
    return (
    <main>
        <h1>AuthPage</h1>
        <SignUpForm setUser={setUser} /> 
        <LoginForm setUser={setUser}/>
        </main>
    )
}
