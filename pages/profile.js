import Account from "../components/Account";

export default function profile({session}) {
    return <Account key={session.user.id} session={session} />
}