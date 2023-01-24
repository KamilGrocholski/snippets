import { type NextPage } from "next"
import { useRouter } from "next/router"
import MainLayout from "../../components/layouts/MainLayout"
import StateWrapper from "../../components/StateWrapper"
import { api } from "../../utils/api"

const SnippetPage: NextPage = () => {
    const router = useRouter()

    const snippetId = router.query.id as string

    const snippetQuery = api.snippet.getOneById.useQuery({ snippetId })

    return (
        <MainLayout useContainer={true}>
            <StateWrapper
                data={snippetQuery.data}
                isLoading={snippetQuery.isLoading}
                isError={snippetQuery.isError}
                NonEmpty={(snippet) => <>
                    <div className='bg-base-200'>
                        <div>{snippet.user.id}</div>
                        <div>{snippet.user.name}</div>
                    </div>
                    <div className='flex gap-5'>
                        <div>{snippet.id}</div>
                        <div>{snippet.title}</div>
                        <div>{snippet.createdAt.toString()}</div>
                        <div>{snippet.user.name}</div>
                        <div>{snippet.content}</div>
                    </div>
                </>}
            />
        </MainLayout>
    )
}

export default SnippetPage