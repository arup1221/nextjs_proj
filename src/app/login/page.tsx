"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import   axios  from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password: "",
        
    })
    const [buttonDisabled, setButtonDisaled] = useState(false);
    const [loading, setLoading] = useState(false)

    const onLogin = async() => {
        try{
            setLoading(true)
            const responce = await axios.post("api/users/login", user);
            console.log("Login Success", responce.data)
            toast.success("Login success")
            router.push("/profile")
        }
        catch(error: any){
            console.log("Login Failed", error.message)
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisaled(false)
        }
        else {
            setButtonDisaled(true)
        }
    }, [user])

    return( 
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "processing":"Login"}</h1>
        <hr />
       
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

         <button onClick={onLogin}
         className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600">Login Here</button>
         <Link href="/signup">visit Signup page</Link>
    </div>
    )
}