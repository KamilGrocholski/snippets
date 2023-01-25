import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import clsx from 'clsx'

interface CodeProps {
    language: string
    content: string
    className?: string
}

const Code: React.FC<CodeProps> = ({
    language,
    content,
    className
}) => {
    return (
        <div
            className={clsx(
                'my-3',
                className
            )}
        >
            <SyntaxHighlighter
                language={language}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                style={atomOneDark}
            >
                {content}
            </SyntaxHighlighter>
        </div>
    )
}

export default Code