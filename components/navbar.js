import Link from "next/link"

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <h1>Get Me Out!</h1>
            </div>
            <Link href="/"><a>Home</a></Link>
            <Link href="/login"><a>Login</a></Link>
            <Link href="/profile"><a>Profile</a></Link>
            <Link href="/packingChecklist"><a>CheckList</a></Link>
            <Link href="/budgetTracker"><a>Budget Tracker</a></Link>
        </nav>
    )
}

export default Navbar; 