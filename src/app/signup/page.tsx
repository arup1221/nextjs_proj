"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import  axios  from "axios";

export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisaled] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const onSignup = async() => {
        try{
            setLoading(true)
            const responce = await axios.post("/api/users/signup",user)
            console.log("Signup Success", responce.data)
            router.push("/login")
        }catch(error: any){
            console.log("SignUp failed", error.message)
            toast.error(error.message);
        } finally{
            setLoading(false);
        }

    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisaled(false)
        } else{
            setButtonDisaled(true)
        }
    },[user]);
    
    return( 
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "processing": "Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
        id="username"
        type="text"
        placeholder="username"
        value={user.username}
        onChange = {(e)=> setUser({...user, username: e.target.value})}
        className="text-black p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-blue-500"
         />
          <label htmlFor="email">email</label>
        <input
        id="email"
        type="text"
        placeholder="email"
        value={user.email}
        onChange = {(e)=> setUser({...user, email: e.target.value})}
        className="text-black p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-blue-500"
         />

<label htmlFor="password">password</label>
        <input
        id="password"
        type="password"
        placeholder="password"
        value={user.password}
        onChange = {(e)=> setUser({...user, password: e.target.value})}
        className="text-black p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-blue-500"
         />

         <button onClick={onSignup}
         className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600">{buttonDisabled ? "No signup" : "signup" }</button>
         <Link href="/login">visit login page</Link>
    </div>
    )
}