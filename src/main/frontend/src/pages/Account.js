import AuthService from "../utils/AuthService";

function Account(){

    const loggedIn = !!AuthService.getCurrentUser();

    return(
        loggedIn ? 
        <div>
            <h1>Account</h1>
            <button onClick={() => AuthService.logout()}>LOG OUT</button>
        </div> :
        <div>
            <h3>You are not logged in!</h3>
        </div>
    );
}

export default Account;
