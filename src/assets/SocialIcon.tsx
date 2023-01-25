import Image from 'next/image'

import github from './github.png'
import discord from './discord.png'
import youtube from './youtube.png'

const ICONS = {
    github,
    discord,
    youtube
} as const

export type Social = keyof typeof ICONS

const SocialIcon: React.FC<{
    social: Social
}> = ({
    social
}) => {
        return (
            <Image
                src={ICONS[social]}
                alt=''
                width={30}
                height={30}
                className='hover:bg-secondary rounded-full overflow-hidden'
            />
        )
    }

export default SocialIcon