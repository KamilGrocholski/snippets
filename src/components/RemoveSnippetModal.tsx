import { type Snippet } from "@prisma/client"
import { api } from "../utils/api"
import ConfirmationModal, { type ConfirmationModalProps } from "./common/ConfirmationModal"

interface Props extends Pick<ConfirmationModalProps, 'openState'> {
    snippetId: Snippet['id'],
    onSuccess: () => void,
    onError: () => void
}

const RemoveSnippetModal: React.FC<Props> = ({
    snippetId,
    onSuccess,
    onError,
    openState
}) => {
    const removeSnippetMutation = api.snippet.delete.useMutation({
        onSuccess: () => {
            onSuccess()
        },
        onError: () => {
            onError()
        }
    })

    const handleRemoveSnippet = () => {
        removeSnippetMutation.mutate({ snippetId: snippetId })
    }

    return (
        <ConfirmationModal
            openState={openState}
            onConfirm={handleRemoveSnippet}
            onCancel={() => openState[1](false)}
            title='Do you want to delete the snippet?'
            description="It can not be undone!"
            variant='danger'
        />
    )
}

export default RemoveSnippetModal