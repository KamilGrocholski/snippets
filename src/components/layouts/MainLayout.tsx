import clsx from 'clsx'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import SessionStateWrapper from '../common/SessionStateWrapper'

const navConfig = {
    links: [
        { label: '+ Snippet', link: '/' },
        { label: 'Snippets', link: '/snippets' },
    ]
} as const

const MainLayout: React.FC<{
    children: JSX.Element | JSX.Element[]
    useContainer: boolean
}> = ({
    children,
    useContainer
}) => {


        return (
            <>

                <header className={clsx('z-40 fixed top-0 left-0 bg-base-200 h-16 right-0 flex items-center justify-between pt-4 pb-2 sm:py-4 px-4 sm:px-8')}>
                    <div>
                        <Link href='/'>
                            Logo
                        </Link>
                    </div>
                    <div className='flex gap-3'>
                        {navConfig.links.map((item, index) => (
                            <Link key={index} href={item.link}>
                                {item.label}
                            </Link>
                        ))}
                    </div>
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

                <main className={clsx(useContainer && "container mx-auto min-h-screen py-24")}>
                    {children}
                </main>


                <footer className='h-64'></footer>
            </>
        )
    }

export default MainLayout