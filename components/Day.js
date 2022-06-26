import { supabase } from '../utils/supabaseClient'
import { Collapse, Button, Editable, EditableInput, EditablePreview } from '@chakra-ui/react'
import React from 'react'
import Activity from './Activity';
import {useState, useEffect} from 'react'

export default function Day({ day, dayID }) {
    const [show, setShow] = React.useState(false);

    const CurrentDay = "DAY " + day;

    const handleToggle = () => setShow(!show);

    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState(null)
    const [session, setSession] = useState(null)
  
    useEffect(() => {
      setSession(supabase.auth.session())
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])
  
    useEffect(() => {
      getDate()
    }, [session])
  
    async function getDate() {
      try {
        setLoading(true)
        const user = supabase.auth.user()
  
        let { data, error, status } = await supabase
          .from('activities')
          .select(`date`)
          .eq('user_id', user.id)
          .eq('id', dayID)
          .single()
  
        if (error && status !== 406) {
          throw error
        }
        if (data) {
          setDate(data.date)
        }
      } catch (error) {
        alert(error.message)
      } finally {
        setLoading(false)
      }
    }
  
    async function updateTableDate({ date }) {
      try {
        setLoading(true)
        const user = supabase.auth.user()
  
        const updates = {
          id: user.id,
          date,
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


  return (
      <>
        <Button variantColor="blue" onClick={handleToggle}>
        {CurrentDay}
        </Button>
        <Collapse mt={4} in={show}>
        <h2>{date}</h2>
        <Activity dayID={dayID}/>
        </Collapse>
      </>
  )
}


