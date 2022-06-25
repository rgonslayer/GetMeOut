import { supabase } from '../utils/supabaseClient'
<<<<<<< Updated upstream

export default function Checklist({ user }) {
  console.log({ user })
  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <h2>Travel Checklist here</h2>
    </div>
  )
}
=======
import { Auth } from '@supabase/ui'
import TodoList from '../components/travelListComp'
>>>>>>> Stashed changes

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: '/' } }
  }

  return { props: { user } }
<<<<<<< Updated upstream
=======
}


export default function TravelList() {
  const { user } = Auth.useUser()

  return (
    <div className="w-full h-full bg-gray-300">
      {!user ? (
        <div className="w-full h-full flex justify-center items-center p-4">
          <div>
            <Auth
              supabaseClient={supabase}
              providers={['google', 'github']}
              socialLayout="horizontal"
              socialButtonSize="xlarge"
            />
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full flex flex-col justify-center items-center p-4"
          style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}
        >
          <TodoList user={supabase.auth.user()} />
        </div>
      )}
    </div>
  )
>>>>>>> Stashed changes
}