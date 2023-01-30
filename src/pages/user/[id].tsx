import { type NextPage } from "next"
import { useRouter } from "next/router"
import MainLayout from "../../components/layouts/MainLayout"
import Section from "../../components/common/Section"
import StateWrapper from "../../components/common/StateWrapper"
import UserProfileInfo from "../../components/UserProfileInfo"
import { api } from "../../utils/api"
import SnippetsTable from "../../components/SnippetsTable"

const UserProfile: NextPage = () => {
    const router = useRouter()

    const userId = router.query.id as string

    const getUserProfileQuery = api.user.getUserProfile.useQuery({ userId })
    const getUserSnippetsQuery = api.snippet.getAllByUserIdPublic.useQuery({ userId })

    return (
        <MainLayout useContainer={true}>
            <Section containerClassName="mb-4">
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
                        <SnippetsTable snippets={snippets} />
                        // <div className='flex flex-col lg:space-y-1 space-y-5'>
                        //     {snippets.map((snippet, index) => (
                        //         <SessionStateWrapper
                        //             key={index}
                        //             Guest={() => <SnippetListItem snippet={snippet} />}
                        //             User={(userData) => userData.id === snippet.user.id ? <EditableSnippetListItem snippet={snippet} /> : <SnippetListItem snippet={snippet} />}
                        //             Admin={(adminData) => adminData.id === snippet.user.id ? <EditableSnippetListItem snippet={snippet} /> : <SnippetListItem snippet={snippet} />}
                        //         />
                        //     ))}
                        // </div>
                    }
                />
            </Section>
        </MainLayout>
    )
}

export default UserProfile

