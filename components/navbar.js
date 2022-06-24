import Link from "next/link"
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'

const Navbar = () => {
    async function signOut() {
        const { error } = await supabase.auth.signOut()
        router.push('/home')
      }
      const router = useRouter()
    return (
        <nav>
            <div className="logo">
                <h1>Get Me Out!</h1>
            </div>
            <Link href="/home"><a>Home</a></Link>
            <Link href="/profile"><a>Profile</a></Link>
            <Link href="/packingChecklist"><a>CheckList</a></Link>
            <Link href="/budgetTracker"><a>Budget Tracker</a></Link>
            <button onClick={signOut}>Sign Out</button>
        </nav>
    )
}

export default Navbar; 