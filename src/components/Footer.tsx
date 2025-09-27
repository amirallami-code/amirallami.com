"use client";

import Link from "next/link";
import Image from "next/image";
import CreattieAnimation from './animation/CreattieAnimation';

const Footer = () => {
    const contactLinks = [
        {
            label: "EMAIL",
            href: "mailto:amirallami.dev@gmail.com",
            text: "amirallami.dev@gmail.com"
        },
        {
            label: "GITHUB",
            href: "https://github.com/amirallami-code",
            text: "@amirallami-code"
        },
        {
            label: "TELEGRAM",
            href: "https://t.me/amirhosseinallami",
            text: "t.me/@amirhosseinallami"
        },
        {
            label: "LINKEDIN",
            href: "https://www.linkedin.com/in/amirhosseinallami",
            text: "in/amirhosseinallami"
        }
    ];

    return (
        <section id="stay-in-touch" className="section">
            <div className="container section-padding flex flex-col lg:flex-row gap-10">
                <div className="flex-1 flex items-center justify-center">
                    <CreattieAnimation
                        animationURL={'/animations/creattie-footer.json'}
                        className={"max-w-96"}
                        autoplay={true}
                        loop={true}
                        speed={0.75}
                    />
                </div>

                <div className="flex-1">
                    <h2 className='section-title'>Stay in touch</h2>

                    <ul className="stay-in-touch-item-wrapper">
                        {contactLinks.map((contact, index) => (
                            <li key={index}>
                                <b>{contact.label}</b>
                                <Link href={contact.href} target={"_blank"}>
                                    {contact.text}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="w-full flex flex-col items-end justify-start gap-5 mt-10">
                        <p className="font-serif text-primary">Sincerely, Amirhossein Allami.</p>
                        <Image src={"/signature/blue.webp"} width={150} height={250} alt="Signature"/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer