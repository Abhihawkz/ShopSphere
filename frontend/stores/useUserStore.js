import axios from "axios";
import {create} from "zustand";
import {toast} from "react-hot-toast";

export const useUserStore = create((set,get)=>({
    user:null,
    loading:false,
    checkingAuth:true,


    signup:async({username,email,password,confirmPassword}) =>{
        set({loading:true})
        if(password != confirmPassword){
            set({loading:false});
            return toast.error("Passwords do not match!!!");
        }

        try {
            const res = await axios.post("http://localhost:5000/api/v1/auth/register",{username,email,password,confirmPassword})
            console.log(res.data)
            set({user:res.data,loading:false})
            toast.success("Register succesfully")
        } catch (error) {
            set({loading:false})
            toast.error(error.response || "An error occured while loging up ")
        }
    },
    login:async(email,password) =>{
        set({loading:true})
        try {
            console.log(email,password)
            const res = await axios.post("http://localhost:5000/api/v1/auth/login",{email,password})
            set({user:res.data,loading:false})
        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.message || "An error occured while signinng up ")
        }
    },
    checkAuth:async()=>{
        set({checkingAuth:true})
        try {
            const res = await axios.get("http://localhost:5000/api/v1/auth/profile")
            set({user:res.data,checkingAuth:false})
        } catch (error) {
            console.log(error.message)
        }
    }
}))