import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import colors from '../../node_modules/tailwindcss/colors'
import clsx from 'clsx'
import Button from './common/Button'
import useCopyToClipboard from '../hooks/useCopyToClipboard'
import createBlobUrl from '../utils/createBlobUrl'
import { type SnippetRouterOutputs } from '../server/api/routers/snippet'
import formatBytes from '../utils/formatBytes'
import Dot from './common/Dot'
import { formatDate } from '../utils/time'
import Modal from './common/Modal'
import { useState } from 'react'

interface CodeProps {
    snippet: Extract<NonNullable<SnippetRouterOutputs['getOneById']>, { content: string }>
    className?: string
}

const Code: React.FC<CodeProps> = ({
    snippet,
    className
}) => {
    const [, copy] = useCopyToClipboard()

    // copy a snippet to the clipboard
    const handleCopy = async () => {
        const isCopySuccess = await copy(snippet.content)
        if (!isCopySuccess) {
            console.log({ isCopySuccess })
        } else {
            console.log({ isCopySuccess })
        }
    }

    // open a new page with a raw snippet
    const handleRaw = () => {
        const url = createBlobUrl(snippet.content)
        const link = document.createElement('a')
        link.href = url
        link.target = '_blank'
        link.click()
        link.remove()
    }

    // download a snippet as .txt file
    const handleDownload = () => {
        const url = createBlobUrl(snippet.content)
        const link = document.createElement('a')
        link.href = url
        link.download = 'nazwa.txt'
        link.click()
        link.remove()
    }

    // get a snippet's link
    const handleCopyLink = async () => {
        const isCopySuccess = await copy(window.location.href)
        if (!isCopySuccess) {
            console.log({ isCopySuccess })
        } else {
            console.log({ isCopySuccess })
        }
    }

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div
            className={clsx(
                'my-3',
                className
            )}
        >

            <Modal
                openState={[isMobileMenuOpen, setIsMobileMenuOpen]}
            >
                <div className='flex flex-col space-y-2 w-full' onClick={() => setIsMobileMenuOpen(false)} onTouchStart={() => setIsMobileMenuOpen(false)}>
                    <MenuButtonMobile text='copy' onClick={handleCopy} />
                    <MenuButtonMobile text='raw' onClick={handleRaw} />
                    <MenuButtonMobile text='download' onClick={handleDownload} />
                    <MenuButtonMobile text='link' onClick={handleCopyLink} />
                </div>
            </Modal>

            <div className='flex flex-col md:flex-row justify-between gap-1 bg-neutral px-2 py-1 rounded-t-md border-b border-base-200'>
                <div className='flex lg:flex-row flex-col lg:gap-2 gap-1 lg:items-center items-start'>
                    <div className='text-md font-medium'>{snippet.title}</div>
                    <div className='w-[1px] h-full bg-base-100'></div>
                    <div className='capitalize text-primary'>{snippet.language}</div>
                    <div className='w-[1px] h-full bg-base-100'></div>
                    <div className=''>{formatBytes(snippet.size)}</div>
                    <div className='w-[1px] h-full bg-base-100'></div>
                    <div className=''>{formatDate(snippet.createdAt)}</div>
                </div>
                <Button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className='justify-center lg:hidden flex'
                >
                    Menu
                </Button>
                <div className='lg:flex hidden gap-1 items-center'>
                    <MenuButton onClick={handleCopy}>copy</MenuButton>
                    <Dot />
                    <MenuButton onClick={handleRaw}>raw</MenuButton>
                    <Dot />
                    <MenuButton onClick={handleDownload}>download</MenuButton>
                    <Dot />
                    <MenuButton onClick={handleCopyLink}>link</MenuButton>
                </div>
            </div>
            <SyntaxHighlighter
                language={snippet.language}
                showLineNumbers
                lineNumberContainerStyle={{
                    backgroundColor: 'hover:'
                }}
                lineNumberStyle={{
                    paddingRight: '8px',
                    paddingLeft: '4px',
                    marginRight: '12px',
                    minWidth: '2.5rem',
                    backgroundColor: colors.zinc['900']
                }}
                customStyle={{
                    padding: '0'
                }}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                style={atomOneDark}
                className='rounded-b-md'
            >
                {snippet.content}
            </SyntaxHighlighter>
        </div>
    )
}

export default Code

const MenuButton: React.FC<{
    onClick: () => void | Promise<void>
    children: React.ReactNode
}> = ({
    onClick,
    children
}) => {
        return (
            <Button
                variant='primary-reversed'
                size='xs'
                className='font-semibold'
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={onClick}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onTouchStart={onClick}
            >
                {children}
            </Button>
        )
    }

const MenuButtonMobile: React.FC<{
    onClick: () => void | Promise<void>
    text: string
}> = ({
    onClick,
    text
}) => {
        return (
            <Button
                variant='primary-reversed'
                size='supa-large'
                className='font-semibold'
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={onClick}
            >
                {text}
            </Button>
        )
    }