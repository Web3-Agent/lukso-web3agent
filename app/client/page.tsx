'use client'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import UserCard from '@/app/_components/UserCard'

export default function ClientPage() {
    const session: any = {}
    //useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         redirect('/api/auth/signin?callbackUrl=/client')
    //     }
    // })

    return (
        <section className="flex flex-col gap-6" >
            <UserCard user={session?.user} pagetype={"Client"} />
        </section >
    )
}