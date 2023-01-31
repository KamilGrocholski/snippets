import { type UserRouterOutputs } from "../server/api/routers/user"
import Image from "next/image"
import React from "react"
import UiIcons from "../assets/UiIcons"
import Link from "next/link"
import { formatDate } from "../utils/time"

const UserProfileInfo: React.FC<{
    userProfile: NonNullable<UserRouterOutputs['getUserProfile']>
}> = ({
    userProfile
}) => {
        return (
            <div className='flex flex-row gap-5 items-start'>
                <div className='mt-1.5'>
                    <Image
                        src={userProfile.image ?? ''}
                        alt='avatar'
                        width={80}
                        height={80}
                        className='rounded-md overflow-hidden'
                    />
                </div>
                <div className='items-start flex flex-col'>
                    <div className='w-fit font-bold px-1 text-xl hover:text-primary'>
                        <Link href={`/user/${userProfile.id}`}>{userProfile.name}</Link>
                    </div>
                    <div className='flex flex-col px-1'>
                        <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-3'>
                            <InfoPair label='snippets' value={userProfile._count.snippets} />
                            <InfoPair label='comments' value={userProfile._count.comments} />
                            <InfoPair label='joined' value={formatDate(userProfile.createdAt)} />
                        </div>
                        {userProfile.websiteUrl !== null ?
                            <ProfileLink
                                icon={UiIcons.link}
                                link={userProfile.websiteUrl}
                                label='website'
                            /> : null}
                    </div>
                </div>
            </div>
        )
    }

export default UserProfileInfo

const ProfileLink: React.FC<{
    icon: React.ReactNode
    label?: string
    link: string
}> = ({
    icon,
    label,
    link
}) => {
        return (
            <div className='group-hover relative w-fit'>
                <a
                    target='_blank'
                    rel='noreferrer'
                    href={link}
                    className='text-white hover:text-primary flex gap-1 items-center'
                >
                    <span>{icon}</span>
                    <span>{label}</span>
                </a>
            </div>
        )
    }

const InfoPair: React.FC<{
    value: number | string
    label: string
}> = ({
    value,
    label
}) => {
        return (
            <span className='text-sm text-white/30'>
                {label}
                <span className='text-white ml-1'>{value}</span>
            </span>
        )
    }