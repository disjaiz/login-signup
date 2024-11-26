import React, {useState} from 'react'

function Login() {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  async function submitLogin(e){
    e.preventDefault();
    const url = "http://localhost:3000/login";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ 
                             email: email.trim(), 
                             password: password.trim()
                            }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (response.ok) {
      const data = await response.json(); // Get JSON data from the response
      console.log("login was successful:", data);
    } else {
      const errorData = await response.json(); 
      console.error("login failed:", errorData.message);
    }
  }


  return (
    <div>
        <>
     {/* login */}
      <h1>Login here---</h1>
        <form onSubmit={submitLogin}>
                  
            <input type="text" placeholder="email" value={email} onChange={ (e)=> setEmail(e.target.value) }/>
            <br/>
            <input type="text" placeholder="password" value={password} onChange={ (e)=> setPassword(e.target.value) }/>
            <br/>
            <button >login</button>  
        </form>
        </>
    </div>
  )
}

export default Login
