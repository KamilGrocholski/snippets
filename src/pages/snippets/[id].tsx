import { type NextPage } from "next"
import { useRouter } from "next/router"
import Code from "../../components/Code"
import MainLayout from "../../components/layouts/MainLayout"
import StateWrapper from "../../components/common/StateWrapper"
import UserProfileInfo from "../../components/UserProfileInfo"
import { api } from "../../utils/api"
import Section from "../../components/common/Section"
import Button from "../../components/common/Button"

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
                Error={
                    <div className='flex flex-col space-y-2 w-fit mx-auto'>
                        <span>Sorry, we couldn&apos;t get the snippet.</span>
                        <Button
                            onClick={() => void snippetQuery.refetch()}
                        >
                            Try again
                        </Button>
                    </div>
                }
                NonEmpty={(snippet) =>
                    <>
                        <Section useBgColor={false} useSectionPadding={false}>
                            <UserProfileInfo
                                userProfile={snippet.user}
                            />
                        </Section>
                        <Section useSectionPadding={false}>
                            <Code
                                snippet={snippet}
                            />
                        </Section>
                    </>
                }
            />
        </MainLayout>
    )
}

export default SnippetPage
