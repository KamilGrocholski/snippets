import { type SnippetRouterOutputs } from "../server/api/routers/snippet"
import formatBytes from "../utils/formatBytes"
import { formatDate } from "../utils/time"
import Link from 'next/link'

const SnippetsTable: React.FC<{
    snippets: SnippetRouterOutputs['getAllByUserIdPublic']
}> = ({
    snippets
}) => {
        return (
            <table className='table-auto container mx-auto border-collapse'>
                <thead>
                    <tr className='[&>th]:text-start'>
                        <th>Title</th>
                        <th className='hide-when-not-md'>Created</th>
                        <th>Size</th>
                        <th>Language</th>
                    </tr>
                </thead>
                <tbody>
                    {snippets.map((snippet, index) => (
                        <tr key={index} className='hover:bg-base-300/50'>
                            <td className='text-primary hover:text-primary/70'>
                                <Link href={`/snippets/${snippet.id}`}>
                                    {snippet.title}
                                </Link>
                            </td>
                            <td className='hide-when-not-md'>{formatDate(snippet.createdAt)}</td>
                            <td>{formatBytes(snippet.size)}</td>
                            <td>{snippet.language}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

export default SnippetsTable