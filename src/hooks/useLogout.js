import {projectAuth} from '../config/firebase'

function useLogout() {
  
    const logout = () => {
        projectAuth.signOut()
    }

    return {
        logout
    }
}

export {
    useLogout
} 