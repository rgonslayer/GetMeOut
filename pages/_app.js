import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Auth } from '@supabase/ui'
import Navbar from '../components/navbar'



function MyApp({ Component, pageProps }) {

    return (
      <div>
        <Auth.UserContextProvider supabaseClient={supabase}>
        <div className="row flex flex-center">
        <Navbar />
        </div>
          <Component {...pageProps} />
        </Auth.UserContextProvider>
      </div>
    )
  }
  
export default MyApp
