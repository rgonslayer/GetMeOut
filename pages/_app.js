import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')
  

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

  async function checkUser() {
    const user = await supabase.auth.user()
    if (user) {
      setAuthenticatedState('authenticated')
    }
  }

  async function handleAuthChange(event, session) {
    await fetch('/api/auth', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ event, session }),
    })
    }
  async function signOut() {
      await supabase.auth.signOut()
      router.push('/')
    }

  async function signIn() {
    router.push('/')
  }

    return (
      <div>
        <nav style={navStyle}>
          <Link href="/home">
            <a style={linkStyle}>Home</a>
          </Link>
          <Link href="/profile">
            <a style={linkStyle}>Profile</a>
          </Link>

          <Link href="/checklist">
            <a style={linkStyle}>Checklist</a>
          </Link>
          <Link href="/budgetTracker">
            <a style={linkStyle}>Budget Tracker</a>
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
        <Component {...pageProps} />
      </div>
    )
  }
  
  const navStyle = {
    margin: 20
  }
  
  const linkStyle = {
    marginRight: 10
  }

export default MyApp

