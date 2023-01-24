import { type SnippetRouterOutputs } from "../server/api/routers/snippet"

const SnippetsListing: React.FC<{
    snippets: SnippetRouterOutputs['getRecentlyAdded'],
    renderItem: (item: SnippetRouterOutputs['getRecentlyAdded'][number], index: number) => JSX.Element,
}> = ({
    snippets,
    renderItem
}) => {
        return (
            <ul className='flex flex-col'>
                {snippets.map((item, index) => (
                    renderItem(item, index)
                ))}
            </ul>
        )
    }

export default SnippetsListing