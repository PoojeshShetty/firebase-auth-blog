import {useState,useEffect} from 'react'
import logo from './logo.svg';
import { projectAuth } from './config/firebase'
import './App.css';
import { useSignup } from './hooks/useSignup';
import { useLogout } from './hooks/useLogout';
import { useLogin } from './hooks/useLogin';

function App() {

  const [view, setView] = useState('signup')
  const [user, setUser] = useState(null)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [sigupPass, setSignupPass] = useState('')
  const {pending:signupPending, error: signupError, signup} = useSignup()
  const {pending:loginPending, error: loginError, login} = useLogin()
  const {logout} = useLogout()

  useEffect(()=>{

     projectAuth.onAuthStateChanged(user => {
      setUser(user)
    })
  },[])

  const handleToggleView =  () => {
    view === 'signup' ? setView('login') : setView('signup')
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()

    signup(
      signupEmail,
      sigupPass
    )

    setSignupEmail('')
    setSignupPass('')
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    login(
      loginEmail,
      loginPass
    )

    setLoginEmail('')
    setLoginPass('')
  }

  const handleLogout = () => {
    logout()
  }

  const Signup = (
      <form className="form" onSubmit={(e) => handleSignupSubmit(e)}>
        {
          signupError && <div className='err--msg'>{signupError}</div>
        }
        <h2>Sign up</h2>
      <input type="email" placeholder='Email' value={signupEmail} onChange={({target}) => setSignupEmail(target.value.trim())} required/>
      <input type="password" placeholder='Password' value={sigupPass} onChange={({target}) => setSignupPass(target.value.trim())} required/>

      {
        signupPending ? <button className='btn' disabled>Sign up</button> : <button className='btn'>Sign up</button>
      }
    </form>
  )

  const Login = (
    <form className="form" onSubmit={(e) => handleLoginSubmit(e)}>
      {
        loginError && <div className='err--msg'>{loginError}</div>
      }
        <h2>Login</h2>
      <input type="email" placeholder='Email' value={loginEmail} onChange={({target}) => setLoginEmail(target.value.trim())} required/>
      <input type="password" placeholder='Password'  value={loginPass} onChange={({target}) => setLoginPass(target.value.trim())} required/>

      { loginPending ? <button className='btn' disabled>Login</button> : <button className='btn'>Login</button>}
    </form>
  )

  return (
    <div className="App">

      {
        user ? 
        <div className='show__info'>
          Signed in user {user.email} <button onClick={handleLogout}>Logout</button>
        </div> : 
        <div className='show__info'>Not signed in</div>
      }
      <button className='toggle__btn btn' onClick={handleToggleView}>{view === 'signup' ? "Login" : "Sign up"}</button>
      
      
      {
        view === 'signup' ? Signup : Login
      }

    </div>
  );
}

export default App;
