import {useState} from 'react'
import {projectAuth} from '../config/firebase'

function useSignup() {

    const [pending, setPending] = useState(false)
    const [error, setError] = useState(null)

    const signup = async (email,password) => {

        setPending(true)
        setError(null)

        try{

            await projectAuth.createUserWithEmailAndPassword(email,password)
        }catch(err)
        {
            setError(err.message)
        }

        setPending(false)
    }
  return {
    pending,
    error,
    signup
  }
}

export {
    useSignup
} 