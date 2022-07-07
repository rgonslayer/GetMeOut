import React from 'react'
import { Editable, EditableInput, EditablePreview, Tag } from "@chakra-ui/react"
import {useState, useEffect} from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Activity({ dayID }) {

    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [activity, setActivity] = useState(null)
    const [description, setDescription] = useState(null)
    const [location, setLocation] = useState(null)
    const [city, setCity] = useState(null)
    const [total, setTotal] = useState(null)
    const [session, setSession] = useState(null)
  
    useEffect(() => {
      setSession(supabase.auth.session())
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])
  
    useEffect(() => {
      getActivity()
    }, [session])
  
    async function getActivity() {
      try {
        setLoading(true)
        const user = supabase.auth.user()
  
        let { data, error, status } = await supabase
          .from('activities')
          .select(`date, time, activity, description, location, city, total`)
          .eq('user_id', user.id)
          .eq('id', dayID)
          .single()
  
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
          setDate(data.date)
          setTime(data.time)
          setActivity(data.activity)
          setDescription(data.description)
          setLocation(data.location)
          setTotal(data.total)
          setCity(data.city)
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
    

      function displayActivities(num) {
        var rows = [];
          for (var i = 1; i <= num; i++) {
            rows.push(<div><Tag> {time[i-1]} </Tag>
            <Tag> {activity[i-1]} </Tag>
            <Tag> {description[i-1]} </Tag>
            <Tag> {location[i-1]} </Tag>
            </div>); 
          }
          return <div>{rows}</div>;
        }  

  return (
      <>
        {displayActivities(total)}
      </>

  )
}