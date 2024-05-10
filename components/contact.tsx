import { title } from "@/components/primitives";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";

export const Contact = () => {

    return (
    <div className="flex flex-col items-center gap-3 justify-evenly">
        <h1 className={title()}>Contact</h1>
        <p>I'd love to connect and explore potential collaborations. I'm open to full-time employment opportunities, freelance projects, or simply chatting about the industry.</p>
        <div className="flex flex-row gap-6 justify-evenly items-center">
            <Link href="https://www.linkedin.com/in/mooremarcos">
                <Image
                    alt="fawredd Linkedin icon"
                    src="/img/linkedin-original.svg"
                    width={64}
                    height={64}
                />
            </Link>
            <Link href="https://www.github/fawredd">
                <Image
                    alt="fawredd github icon"
                    src="/img/github-original.svg"
                    className="dark:filter dark:invert"
                    width={64}
                    height={64}
                />
            </Link>
            <Link href="https://www.twitter.com/fawredd">
                <Image
                    alt="fawredd Twitter icon"
                    src="/img/twitter-original.svg"
                    className="dark:filter dark:invert"
                    width={64}
                    height={64}
                />
            </Link>
        </div>
    </div>
    )
}