import Link from "next/link"
import SocialIcon, { type Social } from "../assets/SocialIcon"

const SocialLinkButton: React.FC<{
    social: Social
    link: string
}> = ({
    social,
    link
}) => {
        return (
            <Link
                href={link}
                className='group relative rounded-full'
            >
                <div className='absolute animate-fade-in hidden group-hover:block bottom-full mb-1 bg-secondary px-3 rounded-md'>
                    {link}
                </div>
                <SocialIcon social={social} />
            </Link>
        )
    }

export default SocialLinkButton