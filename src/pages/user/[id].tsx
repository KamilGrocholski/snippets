import { type NextPage } from "next"
import { useRouter } from "next/router"
import StateWrapper from "../../components/StateWrapper"
import { api } from "../../utils/api"

const UserProfile: NextPage = () => {
    const router = useRouter()

    const userId = router.query.id as string

    const getUserProfileQuery = api.user.getUserProfile.useQuery({ userId })

    return (
        <>
            <StateWrapper
                data={getUserProfileQuery.data}
                isLoading={getUserProfileQuery.isLoading}
                isError={getUserProfileQuery.isError}
                NonEmpty={(userProfile) => <>
                    <div className='flex gap-5'>
                        <div>{userProfile.id}</div>
                        <div>{userProfile.role}</div>
                        <div>{userProfile.name}</div>
                        <div>{userProfile.email}</div>
                    </div>
                </>}
            />
        </>
    )
}

export default UserProfile