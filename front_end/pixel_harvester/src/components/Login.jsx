import React, {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";


function Login(){

    const navigate = useNavigate();

    //check for logged in user
    useEffect(() => {
        fetch('/api/user')
        .then(resp => resp.json())
        .then((data) => {
        if (data.username){
            navigate('/user')
        }
        })
    }, [])
   

    //login control
    const[user, setUser] = useState({
        username: "",
        password: ""
    })
    function handleLoginInputs(e){
        let key = e.target.name
        let value = e.target.value
        setUser({...user, [key]: value})
    }

    //account creation route
    function handleNewAccount(e) {
        e.preventDefault()
        console.log("hi")
        fetch('/api/new_account', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(user)
        }).then((resp) => {
            console.log("hi")
            resp.json()})
        .then((user) => {
            console.log("hi")
            navigate("/user")
        })
    }

    //account login route
    function handleLogin(e) {
        e.preventDefault()
        fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(user)
        }).then((resp) => resp.json())
        .then((user) => {
            navigate("/user")
        })
    }

    return (
        <div className = "login flex justify-center flex-wrap pb-3">
            <button className = "m-3 scrape_submit ml-2 p-1.5 rounded-md absolute right-0"><Link to="/about">ABOUT</Link></button>
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
                    <button className = "m-3 scrape_submit ml-2 p-1.5 rounded-md" onClick={handleLogin}>Login</button>
                </div>
            </form>
        </div>
    )
}
export default Login;