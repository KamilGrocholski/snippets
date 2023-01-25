import Link from "next/link"
import UiIcons from "../assets/UiIcons"
import { type SnippetRouterOutputs } from "../server/api/routers/snippet"
import Divider from "./common/Divider"

const SnippetsList: React.FC<{
    snippets: SnippetRouterOutputs['infiniteSnippets']['snippets']
}> = ({
    snippets
}) => {
        return (
            <div className='flex flex-col space-y-1'>
                {snippets.map((snippet, index) => (
                    <>
                        <div key={index}>
                            <div className='text-primary text-lg font-semibold'>
                                <Link className='link link-primary' href={`/snippets/${snippet.id}`}>
                                    {snippet.title}
                                </Link>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex gap-1 items-end text-xs'>
                                    {UiIcons.commandLine}
                                    TypeScript
                                </div>
                                <Link
                                    className='link link-accent'
                                    href={`/user/${snippet.user.id}`}
                                >
                                    <div className='flex gap-1 items-end text-xs'>
                                        {UiIcons.user}
                                        {snippet.user.name}
                                    </div>
                                </Link>
                                <div className='flex gap-1 items-end text-xs'>
                                    {UiIcons.calendar}
                                    {snippet.createdAt.toString().slice(0, 15)}
                                </div>
                            </div>

                        </div>
                        {index === snippets.length - 1 ? null : <Divider />}
                    </>
                ))}
            </div>
        )
    }

export default SnippetsList