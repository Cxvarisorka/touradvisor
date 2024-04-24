import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try{
            await axios.post("/register", {
                name, email, password
            });
            alert("Registration Succsesfull.");
        } catch(err){
            alert("Registration failed");
        }
        
    }

    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form onSubmit={(e) => handleSubmitForm(e)} className="max-w-lg mx-auto">
                    <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your@email.com"/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
                    <button className="bg-primary w-full py-2 px-3 text-white rounded-2xl my-1">Register</button>
                    <div className="text-center py-2">Already a member? <Link className="underline text-balck" to={"/login"}>Login Now</Link></div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;