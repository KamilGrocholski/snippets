import { type SnippetRouterOutputs } from "../server/api/routers/snippet"
import Divider from "./common/Divider"
import SnippetListItem from "./SnippetListItem"

const SnippetsList: React.FC<{
    snippets: SnippetRouterOutputs['infiniteSnippets']['snippets']
}> = ({
    snippets
}) => {
        return (
            <div className='flex flex-col space-y-1'>
                {snippets.map((snippet, index) => (
                    <>
                        <SnippetListItem snippet={snippet} key={index} />
                        {index === snippets.length - 1 ? null : <Divider />}
                    </>
                ))}
            </div>
        )
    }

export default SnippetsList
