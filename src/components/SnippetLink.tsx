import Link from "next/link"
import { useRouter } from "next/router"
import { type SnippetRouterOutputs } from "../server/api/routers/snippet"

const SnippetLink: React.FC<SnippetRouterOutputs['getRecentlyAdded'][number]> = (snippet) => {
    const router = useRouter()

    return (
        <li>
            <Link
                href={`/snippets/${snippet.id}`}
            >
                <span>{snippet.title}</span>
            </Link>
            <button
                className='text-pink-600 hover:bg-pink-600/50 px-3 rounded-md text-sm'
                onClick={() => void router.push(`/user/${snippet.user.id}`)}
            >
                {snippet.user.name}
            </button>
        </li>
    )
}

export default SnippetLink