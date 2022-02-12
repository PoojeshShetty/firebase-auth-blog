import {useState} from 'react'
import {projectAuth} from '../config/firebase'

function useLogin() {
    
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(null)

    const login = async (email,password) => {

        setPending(true)
        setError(null)

        try{

            await projectAuth.signInWithEmailAndPassword(email, password)
        }catch(err)
        {
            setError(err.message)
        }

        setPending(false)
    }
    
  return {
    pending,
    error,
    login
  }

}

export {
    useLogin
} 