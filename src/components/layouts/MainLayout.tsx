import clsx from 'clsx'
import { signOut } from 'next-auth/react'
import SessionStateWrapper from '../SessionStateWrapper'

const MainLayout: React.FC<{
    children: JSX.Element | JSX.Element[]
    useContainer: boolean
}> = ({
    children,
    useContainer
}) => {


        return (
            <>

                <header className={clsx('flex items-center justify-between pt-4 pb-2 sm:py-4', useContainer ? 'container mx-auto' : 'px-4 sm:px-8')}>
                    <div>Logo</div>
                    <div className='flex gap-5'>
                        <SessionStateWrapper
                            Guest={(signIn) => <button onClick={signIn}>Sign in</button>}
                            Admin={(session) => <>
                                <span>{session.user?.name}</span>
                                <button onClick={() => void signOut()}>Sign out</button>
                            </>}
                            User={(session) => <>
                                <span>{session.user?.name}</span>
                                <button onClick={() => void signOut()}>Sign out</button>
                            </>}
                        />
                    </div>
                </header>

                <main className={clsx(useContainer && "container mx-auto")}>
                    {children}
                </main>


                <footer></footer>
            </>
        )
    }

export default MainLayout