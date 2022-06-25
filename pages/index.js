import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import { useRouter } from 'next/router'


export default function Index() {
  const [session, setSession] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  function reroute() {
      router.push('/home')
  }
  

  return (

    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : reroute()}
    </div>
    
  )
}