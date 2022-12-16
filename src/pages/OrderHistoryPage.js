import { checkToken } from "../utilities/user-service"


export default function OrderHistoryPage (props) {
    const handleCheckToken = async () => {
        // eslint-disable-next-line no-unused-vars
        const expDate = await checkToken()
    }
    return (
        <>
    <h1>OrderHistoryPage</h1>
    <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
    )
}