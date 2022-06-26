import Link from "next/link"
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'


const Navbar = () => {
    const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')

    async function signOut() {
        await supabase.auth.signOut()
        router.push('/')
      }
      async function signIn() {
        router.push('/')
      }

      async function checkUser() {
        const user = await supabase.auth.user()
        if (user) {
          setAuthenticatedState('authenticated')
        }
      }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
    handleAuthChange(event, session)
    if (event === 'SIGNED_IN') {
    setAuthenticatedState('authenticated')
    router.push('/home')
    }
    if (event === 'SIGNED_OUT') {
    setAuthenticatedState('not-authenticated')
    }
    })
    checkUser()
    return () => {
    authListener.unsubscribe()
    }
    }, [])


    async function handleAuthChange(event, session) {
        await fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
        })
        }
  

      const router = useRouter()
    return (
        <div className="row flex flex-center">
        <h1 className="header">GetMeOut!</h1>
        <nav style={navStyle}>
          <Link href="/home">
            <a style={linkStyle}>Home</a>
          </Link>
          <Link href="/profile">
            <a style={linkStyle}>Profile</a>
          </Link>

          <Link href="/packinglist">
            <a style={linkStyle}>Packing List</a>
          </Link>
          <Link href="/budgetTracker">
            <a style={linkStyle}>Budget Tracker</a>
          </Link>
          <Link href="/travellist">
            <a style={linkStyle}>Travel CheckList</a>
          </Link>
          <Link href="/itinerary"> 
            <a style={linkStyle}>Itinerary</a>
          </Link>
          {
            authenticatedState === 'authenticated' && (
              <button onClick={signOut}>Sign Out</button>
            )
          }
          {
            authenticatedState === 'not-authenticated' && (
              <button onClick={signIn}>Sign In</button>
            )
          }
        </nav>
        </div>
    )
}

const navStyle = {
    margin: 20
  }
  
  const linkStyle = {
    marginRight: 10
  }

export default Navbar; 