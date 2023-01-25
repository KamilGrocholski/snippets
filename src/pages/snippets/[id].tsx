import { type NextPage } from "next"
import { useRouter } from "next/router"
import Code from "../../components/Code"
import MainLayout from "../../components/layouts/MainLayout"
import StateWrapper from "../../components/common/StateWrapper"
import UserProfileInfo from "../../components/UserProfileInfo"
import { api } from "../../utils/api"
import Section from "../../components/common/Section"

const SnippetPage: NextPage = () => {
    const router = useRouter()

    const snippetId = router.query.id as string

    const snippetQuery = api.snippet.getOneById.useQuery({ snippetId })

    return (
        <MainLayout useContainer={true}>
            <Section>
                <StateWrapper
                    data={snippetQuery.data}
                    isLoading={snippetQuery.isLoading}
                    isError={snippetQuery.isError}
                    NonEmpty={(snippet) => <>
                        <UserProfileInfo
                            userProfile={snippet.user}
                        />
                        <Code
                            language='javascript'
                            content={snippet.content}
                        />
                    </>}
                />
            </Section>
        </MainLayout>
    )
}

export default SnippetPage