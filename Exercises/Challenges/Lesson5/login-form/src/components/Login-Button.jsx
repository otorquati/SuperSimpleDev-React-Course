	 import { useState } from 'react'; 
	 import './Login-Button.css';
	  function LoginButton() {
		const [showPassword, setShowPassword] = useState(false);
		return (
				  <div className="app-container">
			<h1>Hello, welcome to my website</h1>
			<div class="inputs">
				<input type="text" placeholder="Email" />
				<div class="password">
					<input type={showPassword ? "text" : "password"} placeholder="Password" />
					<button className={()=>{(showPassword ? "hide" : "show")}} onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
				</div>
			</div>
			<div class="buttons">
				<button>Login</button>
				<button>Sign Up</button>
			</div>
		  </div>
		)
	};

	export default LoginButton;