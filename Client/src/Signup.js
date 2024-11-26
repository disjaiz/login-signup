import React , {useState} from 'react'

function Signup() {
    var [name, setName] = useState("");
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
  
    async function submitRegister(e){
      e.preventDefault();
      const url = "http://localhost:3000/register";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ name: name.trim(),
                               email: email.trim(), 
                               password:password.trim() }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json(); // Get JSON data from the response
        console.log("Registration successful:", data);
      } else {
        const errorData = await response.json(); 
        console.error("Registration failed:", errorData.message);
      }
     
    }
  return (
    <div>
      <>
     <h1>Regist here---</h1>
    <form onSubmit={submitRegister}>
       
        <input type="text" placeholder="name" value={name} onChange={ (e)=> setName(e.target.value) }/>
        <br/>
        <input type="text" placeholder="email" value={email} onChange={ (e)=> setEmail(e.target.value) }/>
        <br/>
        <input type="text" placeholder="password" value={password} onChange={ (e)=> setPassword(e.target.value) }/>
        <br/>
        <button >register</button> 
    </form>
</>
    </div>
  )
}

export default Signup
 