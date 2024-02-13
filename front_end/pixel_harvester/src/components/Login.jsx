import React, {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";


function Login(){

    const[errState, setErrState] = useState("")

    const navigate = useNavigate();

    //check for logged in user
    useEffect(() => {
        fetch('/api/user')
        .then(resp => resp.json())
        .then((data) => {
        if (data[1]){
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
        setErrState("")
        fetch('/api/new_account', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(user)
        }).then((resp) => {
            if (resp.status == 404) {
                throw new Error('Something went wrong')
            }
            return resp.json()})
        .then((user) => {
            navigate("/user")
        }).catch ((e) => {
            setErrState("creation")
        })
    }

    //account login route
    function handleLogin(e) {
        e.preventDefault()
        setErrState("")
        fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(user)
        }
        ).then((resp) => {
            if (resp.status == 404) {
                throw new Error('Something went wrong')
            }
            return resp.json()})
        .then((user) => {
            navigate("/user")
        }).catch ((e) => {
            setErrState("loggin")
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
                <p className = "text-sm text-slate-400">Username must be 8 charcters long</p>
                <div className="w-full flex justify-center m-3">
                    <label className = "mr-3" htmlFor="password">Password</label>
                    <input className ="text-black rounded-md" name = "password" type="password" id="password" value = {user["password"]} onChange ={handleLoginInputs}/>
                </div>
                <p className = "text-sm text-slate-400">Password must be 8 charcters long</p>
                <div className = "flex w-full justify-center">
                    <button className = "m-3 scrape_submit ml-2 p-1.5 rounded-md" onClick={handleNewAccount}>Signup</button>
                    <button className = "m-3 scrape_submit ml-2 p-1.5 rounded-md" onClick={handleLogin}>Login</button>
                </div>
                {errState == "creation"? <p>Error Creating Account</p>: null}
                {errState == "loggin"? <p>Error Logging In</p>: null}
            </form>
        </div>
    )
}
export default Login;