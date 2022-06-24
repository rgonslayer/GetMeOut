import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { Auth, Typography, Button } from '@supabase/ui'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  async function signInWithFacebook() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'facebook',
    })
  }
  async function signInWithGoogle() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    })
  }
  const Container = (props) => {
      const { user } = Auth.useUser()
      if (user)
        return (
          <>
            <Typography.Text>Signed in: {user.email}</Typography.Text>
            <Button block onClick={() => props.supabaseClient.auth.signOut()}>
              Sign out
            </Button>
          </>
        )
      return props.children
    }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">GetMeOut!</h1>
        <p className="description">Sign in via magic link with your email below</p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
        <div>
        <button
            onClick={(e) => {
              e.preventDefault()
              signInWithFacebook()
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Facebook Login'}</span>
          </button>
        </div>
        <div>
        <button
            onClick={(e) => {
              e.preventDefault()
              signInWithGoogle()
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Google Login'}</span>
          </button>
            <Auth.UserContextProvider supabaseClient={supabase}>
2             <Container supabaseClient={supabase}>
                <Auth supabaseClient={supabase} providers={['google', 'facebook', 'github']} />
              </Container>
            </Auth.UserContextProvider>
        </div>
      </div>
    </div>
  )
}