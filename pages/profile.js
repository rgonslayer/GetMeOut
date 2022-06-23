import Account from "../components/Account";
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'


export default function profile() {

    const [session, setSession] = useState(null)

    useEffect(() => {
      setSession(supabase.auth.session())
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

    return <Account key={session.user.id} session={session} />
}