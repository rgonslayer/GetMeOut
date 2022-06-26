import Link from "next/link"
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'

const Navbar = () => {
    const router = useRouter()
    async function signOut() {
        const { error } = await supabase.auth.signOut()
        router.push('/home')
    }
    return (
        <nav>
            <div className="logo">
                <h1>Get Me Out!</h1>
            </div>
            <Link href="/home"><a>Home</a></Link>
            <Link href="/profile"><a>Profile</a></Link>
            <Link href="/packinglist"><a>Packing CheckList</a></Link>
            <Link href="/budgetTracker"><a>Budget Tracker</a></Link>
            <Link href="/travellist"><a>Travel Checklist</a></Link>
            <button onClick={signOut}>Sign Out</button>
        </nav>
    )
}

export default Navbar; 