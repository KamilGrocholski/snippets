import { signIn, useSession } from "next-auth/react"
import React from "react"

export type SessionState = 'Admin' | 'User'

type SessionStateWrapperProps = {
    Guest: (signIn: () => void) => JSX.Element
    Loading?: React.ReactNode
} & { [key in SessionState]: (session: NonNullable<NonNullable<ReturnType<typeof useSession>['data']>['user']>) => JSX.Element }

const SessionStateWrapper: React.FC<SessionStateWrapperProps> = ({
    Admin,
    User,
    Guest,
    Loading
}) => {
    const { data: session, status } = useSession()

    if (status === 'loading') return <>{Loading ?? null}</>

    if (!session?.user) return Guest(() => void signIn('google'))

    if (session.user?.role === 'USER') return User(session.user)

    if (session.user?.role === 'ADMIN') return Admin(session.user)

    return <div>Error</div>

}

export default SessionStateWrapper


