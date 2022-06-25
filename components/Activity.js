import { supabase } from '../utils/supabaseClient'
import { Collapse, Button } from '@chakra-ui/react'
import React from 'react'

export default function Activity({ day }) {
    const [show, setShow] = React.useState(false);

    const CurrentDay = "DAY " + day;

    const handleToggle = () => setShow(!show);

  return (
      <>
        <Button variantColor="blue" onClick={handleToggle}>
        {CurrentDay}
        </Button>
        <Collapse mt={4} in={show}>
        <h2>activities here</h2>
        </Collapse>
      </>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: '/' } }
  }

  return { props: { user } }
}


