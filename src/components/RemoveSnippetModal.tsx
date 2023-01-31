import { type Snippet } from "@prisma/client"
import { api } from "../utils/api"
import ConfirmationModal, { type ConfirmationModalProps } from "./common/ConfirmationModal"
import useToastsController from "../hooks/useToastsController"

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
    const { add } = useToastsController()

    const removeSnippetMutation = api.snippet.delete.useMutation({
        onSuccess: () => {
            add('remove-snippet-success')
            onSuccess()
        },
        onError: () => {
            add('remove-snippet-error')
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