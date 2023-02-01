import Link from "next/link"
import UiIcons from "../assets/UiIcons"
import { type SnippetRouterOutputs } from "../server/api/routers/snippet"
import formatBytes from "../utils/formatBytes"
import { formatDate } from "../utils/time"

const SnippetListItem: React.FC<{
    snippet: SnippetRouterOutputs['infiniteSnippets']['snippets'][number]
}> = ({
    snippet
}) => {
        return (
            <div className='hover:bg-base-300/50 p-2'>
                <div className='text-primary hover:text-primary/70 lg:text-lg text-2xl font-semibold'>
                    <Link href={`/snippets/${snippet.id}`} className='break-all'>
                        {snippet.title}
                    </Link>
                </div>
                <div className='flex flex-row lg:flex-nowrap flex-wrap gap-2'>
                    <div className='flex gap-1 items-center lg:text-xs text-lg capitalize'>
                        {UiIcons.commandLine}
                        {snippet.language}
                    </div>
                    <div className='flex gap-1 items-center lg:text-xs text-lg'>
                        {UiIcons.document}
                        {formatBytes(snippet.size)}
                    </div>
                    <div className='flex gap-1 items-center lg:text-xs text-lg'>
                        {UiIcons.calendar}
                        {formatDate(snippet.createdAt)}
                    </div>
                    <Link
                        className='text-primary/50 hover:text-primary'
                        href={`/user/${snippet.user.id}`}
                    >
                        <div className='flex gap-1 items-center lg:text-xs text-lg'>
                            {UiIcons.user}
                            {snippet.user.name}
                        </div>
                    </Link>
                </div>

            </div>
        )
    }

export default SnippetListItem