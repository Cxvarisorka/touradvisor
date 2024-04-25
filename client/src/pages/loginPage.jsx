import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../userContext";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserData} = useContext(UserContext);

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login', {email, password});
            alert("Login successful");
            setUserData(response.data);
            setRedirect(true);
        } catch(err) {
            alert("Login failed");
        }

    }

    if(redirect){
        return <Navigate to={"/"}/>
    }

    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form onSubmit={handleSubmitForm} className="max-w-lg mx-auto">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your@email.com"/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
                    <button className="bg-primary w-full py-2 px-3 text-white rounded-2xl my-1">Login</button>
                    <div className="text-center py-2">Don't have an account yet? <Link className="underline text-balck" to={"/register"}>Register Now</Link></div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;