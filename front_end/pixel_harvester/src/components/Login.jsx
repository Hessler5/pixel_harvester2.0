import React, {useState} from "react";


function Login(){

    //login control
    const[user, setUser] = useState({
        username: " ",
        password: " "
    })
    function handleLoginInputs(e){
        let key = e.target.name
        let value = e.target.value
        setUser({...user, [key]: value})
    }

    //account creation route
    function handleNewAccount() {
        fetch()
    }

    return (
        <div className = "login flex justify-center flex-wrap pb-3">
            <img className = "w-1/5 h-1/5" src={"src/assets/Pixel_Harvester_Logo.webp"}/>
            <form className="w-full flex justify-center flex-wrap">
                <div className="w-full flex justify-center m-3">
                    <label className = "mr-3" htmlFor="username">Username</label>
                    <input className ="text-black rounded-md" name = "username" type="text" id="username" value = {user["username"]} onChange ={handleLoginInputs}/>
                </div>
                <div className="w-full flex justify-center m-3">
                    <label className = "mr-3" htmlFor="password">Password</label>
                    <input className ="text-black rounded-md" name = "password" type="password" id="password" value = {user["password"]} onChange ={handleLoginInputs}/>
                </div>
                <div>
                    <button className = "m-3 scrape_submit ml-2 p-1.5 rounded-md" onClick={handleNewAccount}>Signup</button>
                    <button className = "m-3 scrape_submit ml-2 p-1.5 rounded-md">Login</button>
                </div>
            </form>
        </div>
    )
}
export default Login;