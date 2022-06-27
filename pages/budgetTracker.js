import Graph from "../components/Graph";
import Form from "../components/Form";

import { supabase } from '../utils/supabaseClient'

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: '/' } }
  }

  return { props: { user } }
}

export default function BudgetTracker() {
    return(
        <div style={{ maxWidth: '420px', margin: '96px auto' }}>
        <div className="budgetTracker">
            <div className="container mx-auto max-w-6xl text-center drop-shadow">
                <h1 className="text-4xl py-8 mb-10 bg-slate-800 text white rounded"></h1>
                <div className="grid md:grid-cols-2 gap-4">
                    <Graph></Graph>
                    <Form></Form>
                </div>
            </div>
        </div>
        </div>
    )
}
