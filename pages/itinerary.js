import { supabase } from '../utils/supabaseClient'
import { Collapse, Button, variantColor } from '@chakra-ui/react'
import React from 'react'
import {useState, useEffect} from 'react'
import Day from '../components/Day'

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)
  
    if (!user) {
      return { props: {}, redirect: { destination: '/' } }
    }
  
    return { props: { user } }
  }

  
export default function Itinerary({ user }) {
  console.log({ user })

  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(null)
  const [numDays, setNumDays] = useState(null)
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    getDay()
  }, [session])

  async function getDay() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('itinerary')
        .select(`day, days`)
        .eq('user_id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setDays(data.day)
        setNumDays(data.days)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateActivity({ date, time, activity, description, location, city }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        date,
        time,
        activity,
        description,
        location,
        city,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('activities').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteTodo = async (id) => {
      try {
        await supabase.from('packinglist').delete().eq('id', id)
        setTodos(todos.filter((x) => x.id != id))
      } catch (error) {
        console.log('error', error)
      }
    }

  function displayDays(num) {
  var rows = [];
    for (var i = 1; i <= num; i++) {
      rows.push(<div><Day day={i} dayID = {days[i - 1]}/></div>); 
    }
    return <div>{rows}</div>;
  }  

  return (
    <>
    {displayDays(numDays)}
    </>
  )
}