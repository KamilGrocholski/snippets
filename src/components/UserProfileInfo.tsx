import { type UserRouterOutputs } from "../server/api/routers/user"
import SocialLinkButton from "./SocialLinkButton"
import Image from "next/image"

const UserProfileInfo: React.FC<{
    userProfile: NonNullable<UserRouterOutputs['getUserProfile']>
}> = ({
    userProfile
}) => {
        return (
            <div className='flex gap-5'>
                <Image
                    src={userProfile.image ?? ''}
                    alt='avatar'
                    width={80}
                    height={80}
                    className='rounded-md overflow-hidden'
                />
                <div>
                    <div className='bg-base-300 w-fit font-semibold px-1 text-lg text-accent'>{userProfile.name}</div>
                    <div className='flex gap-1 px-1'>
                        <div className='flex flex-row gap-1'>
                            <SocialLinkButton social='github' link='https://www.github.com/KamilGrocholski' />
                            <SocialLinkButton social='discord' link='https://www.discord.com/KamilGrocholski' />
                            <SocialLinkButton social='youtube' link='https://www.youtube.com/KamilGrocholski' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <span>Snippets: {userProfile._count.snippets}</span>
                            <span>Comments: {userProfile._count.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default UserProfileInfo