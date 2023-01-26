import Link from "next/link"
import UiIcons from "../assets/UiIcons"
import { type SnippetRouterOutputs } from "../server/api/routers/snippet"
import formatBytes from "../utils/formatBytes"

const SnippetListItem: React.FC<{
    snippet: SnippetRouterOutputs['infiniteSnippets']['snippets'][number]
}> = ({
    snippet
}) => {
        return (
            <div className='hover:bg-neutral/30'>
                <div className='text-primary hover:text-primary/70 text-lg font-semibold'>
                    <Link className='link link-primary' href={`/snippets/${snippet.id}`}>
                        {snippet.title}
                    </Link>
                </div>
                <div className='flex gap-2'>
                    <div className='flex gap-1 items-end text-xs capitalize'>
                        {UiIcons.commandLine}
                        {snippet.language}
                    </div>
                    <div className='flex gap-1 items-end text-xs'>
                        {UiIcons.document}
                        {formatBytes(snippet.size)}
                    </div>
                    <div className='flex gap-1 items-end text-xs'>
                        {UiIcons.calendar}
                        {snippet.createdAt.toString().slice(0, 15)}
                    </div>
                    <Link
                        className='text-primary/50 hover:text-primary'
                        href={`/user/${snippet.user.id}`}
                    >
                        <div className='flex gap-1 items-end text-xs'>
                            {UiIcons.user}
                            {snippet.user.name}
                        </div>
                    </Link>
                </div>

            </div>
        )
    }

export default SnippetListItem