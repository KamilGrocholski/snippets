import { type NextPage } from "next"
import { useRouter } from "next/router"
import MainLayout from "../../components/layouts/MainLayout"
import Section from "../../components/common/Section"
import StateWrapper from "../../components/common/StateWrapper"
import UserProfileInfo from "../../components/UserProfileInfo"
import { api } from "../../utils/api"

const UserProfile: NextPage = () => {
    const router = useRouter()

    const userId = router.query.id as string

    const getUserProfileQuery = api.user.getUserProfile.useQuery({ userId })

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
        </MainLayout>
    )
}

export default UserProfile

