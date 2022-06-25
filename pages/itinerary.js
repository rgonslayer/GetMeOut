import { supabase } from '../utils/supabaseClient'
import { Collapse, Button, variantColor } from '@chakra-ui/react'
import React from 'react'
import Activity from '../components/Activity'

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)
  
    if (!user) {
      return { props: {}, redirect: { destination: '/' } }
    }
  
    return { props: { user } }
  }


export default function Itinerary({ user }) {
  console.log({ user })
  return (
    <>
    <div>
    <Activity day={"1"}/>
    </div>
  </>
  )
}