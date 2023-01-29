import { type NextPage } from "next"
import { useRouter } from "next/router"
import MainLayout from "../../components/layouts/MainLayout"
import Section from "../../components/common/Section"
import StateWrapper from "../../components/common/StateWrapper"
import UserProfileInfo from "../../components/UserProfileInfo"
import { api } from "../../utils/api"
import SnippetListItem from "../../components/SnippetListItem"

const UserProfile: NextPage = () => {
    const router = useRouter()

    const userId = router.query.id as string

    const getUserProfileQuery = api.user.getUserProfile.useQuery({ userId })
    const getUserSnippetsQuery = api.snippet.getAllByUserIdPublic.useQuery({ userId })

    return (
        <MainLayout useContainer={true}>
            <Section>
                <StateWrapper
                    data={getUserProfileQuery.data}
                    isLoading={getUserProfileQuery.isLoading}
                    isError={getUserProfileQuery.isError}
                    NonEmpty={(userProfile) => <UserProfileInfo userProfile={userProfile} />}
                />
            </Section>
            <Section>
                <StateWrapper
                    data={getUserSnippetsQuery.data}
                    isLoading={getUserSnippetsQuery.isLoading}
                    isError={getUserSnippetsQuery.isError}
                    NonEmpty={(snippets) =>
                        <div className='flex flex-col lg:space-y-1 space-y-5'>
                            {snippets.map((snippet, index) => (
                                <SnippetListItem snippet={snippet} key={index} />
                            ))}
                        </div>
                    }
                />
            </Section>
        </MainLayout>
    )
}

export default UserProfile

