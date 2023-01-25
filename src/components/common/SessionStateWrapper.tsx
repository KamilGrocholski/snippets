import { signIn, useSession } from "next-auth/react"
import React from "react"

type SessionState = 'Admin' | 'User'

type SessionStateWrapperProps = {
    Guest: (signIn: () => void) => JSX.Element
    Loading?: React.ReactNode
} & { [key in SessionState]: (session: NonNullable<ReturnType<typeof useSession>['data']>) => JSX.Element }

const SessionStateWrapper: React.FC<SessionStateWrapperProps> = ({
    Admin,
    User,
    Guest,
    Loading
}) => {
    const session = useSession()

    if (session.status === 'loading') return <>{Loading ?? null}</>

    if (!session?.data?.user) return Guest(() => void signIn('google'))

    if (session.data.user?.role === 'USER') return User(session.data)

    if (session.data.user?.role === 'ADMIN') return Admin(session.data)

    return <div>Error</div>

}

export default SessionStateWrapper


