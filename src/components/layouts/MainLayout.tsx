import clsx from 'clsx'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import SessionStateWrapper from '../common/SessionStateWrapper'
import { Menu, Transition } from '@headlessui/react'
import UiIcons from '../../assets/UiIcons'
import { Fragment } from 'react'
import Button from '../common/Button'
import Image from 'next/image'
import { useRouter } from 'next/dist/client/router'
import { type Tab } from '../../pages/me'
import ToastContainer from '../common/Toasts'

const navConfig = {
    links: [
        // { label: 'Add', link: '/' },
        { label: 'Snippets', link: '/snippets' },
    ],
    accountMenuLinks: [
        { label: 'My snippets', link: '/me?tab=My+snippets', icon: UiIcons.calendar },
        { label: 'Profile', link: '/me?tab=Profile', icon: UiIcons.user },
        { label: 'Settings', link: '/me?tab=Settings', icon: UiIcons.cog6Tooth },
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

                <header className={clsx('lg:w-256 lg:px-0 px-3 w-full mx-auto z-40 fixed top-0 left-0 bg-base-300 h-12 right-0 flex items-center justify-between py-0.5 sm:py-1')}>
                    <ToastContainer />
                    <div>
                        <Link href='/' className='text-xl font-bold'>
                            Snippets
                        </Link>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <div className='flex gap-3 items-center'>
                            <Link href='/'>
                                <Button
                                    className='font-semibold'
                                    icon={UiIcons.plus}
                                >
                                    Add
                                </Button>
                            </Link>
                            {navConfig.links.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.link}
                                    className='font-semibold hover:text-primary'
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <SessionStateWrapper
                            Guest={(signIn) => <button onClick={signIn}>Sign in</button>}
                            Admin={(session) => <>
                                <AccountMenu image={session.image} role={session.role} />
                            </>}
                            User={(session) => <>
                                <AccountMenu image={session.image} role={session.role} />
                            </>}
                        />
                    </div>
                </header>

                <main
                    className={clsx(
                        'py-24',
                        useContainer && "container mx-auto min-h-screen"
                    )}>
                    {children}
                </main>


                <footer className='h-fit p-10 bg-base-200 flex flex-col [&>div]:mx-auto [&>div]:w-fit space-y-8'>
                    <div className="grid grid-flow-col gap-4">
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </div>
                    <div>
                        <div className="grid grid-flow-col gap-4">
                            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                        </div>
                    </div>
                    <div>
                        <p>Copyright © 2023 - All right reserved by ABCDEFGHIJKL</p>
                    </div>
                </footer>
            </>
        )
    }

export default MainLayout

const Avatar: React.FC<{ image: string, className?: string }> = ({ image, className }) => {
    return (
        <Image
            src={image}
            alt='avatar'
            width={40}
            height={40}
            className={clsx(
                'rounded-md',
                className
            )}
        />
    )
}

const AccountMenu: React.FC<{
    image: string
    role: string
}> = ({
    image,
    role
}) => {
        const router = useRouter()
        const changeTab = (tab: Tab) => {
            void router.replace(
                {
                    pathname: '/me',
                    query: {
                        tab
                    }
                },
                undefined
            )
        }

        return (
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="">
                        <Avatar image={image} />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute overflow-hidden right-0 mt-2 w-48 min-w-fit origin-top-right rounded-md bg-neutral shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div>
                            {navConfig.accountMenuLinks.map(({ label, link, icon }, index) => (
                                <Menu.Item key={index}>
                                    {({ active }) => (
                                        <Link
                                            className='bg-neutral w-full hover:bg-base-100/80 py-1.5 px-3 flex items-center gap-3 justify-start text-white'
                                            href={link}
                                        // onClick={() => changeTab(label)}
                                        >
                                            {icon}
                                            <span>{label}</span>
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                        <div>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className='bg-primary hover:bg-primary/80 w-full py-1.5 px-3 flex items-center gap-3 justify-start text-neutral'
                                        onClick={() => void signOut()}
                                    >
                                        {UiIcons.power}
                                        <span>Sign out</span>
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        )
    }


