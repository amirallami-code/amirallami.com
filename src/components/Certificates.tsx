"use client";

import Image from 'next/image';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { certificatesData, formatCertificateDate, getTimeAgo } from '@/data/certificatesData';

const Certificates = () => {
    return (
        <section id="certificates">
            <div className="container section-padding relative">
                <h2 className="section-title text-center mb-10">Certificates</h2>

                <div className="m-auto w-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-baseline gap-6">
                    {certificatesData.map((certificate, index) => (
                        <div key={`${certificate.title}-${index}`} className="certificates-card">
                            <div>
                                <Image
                                    src={certificate.imagePath}
                                    alt={certificate.imageAlt}
                                    className="!w-full !h-full max-h-[220px]"
                                    height={500}
                                    width={500}
                                />
                            </div>

                            <div className="h-full w-full flex flex-col gap-2 justify-between text-white">
                                <div className="flex flex-col gap-3">
                                    <p className="flex flex-row flex-wrap gap-1 text-xs">
                                        Earned on
                                        <b>
                                            {formatCertificateDate(certificate.earnedOn)}
                                        </b>
                                        •
                                        <span>
                                            {getTimeAgo(certificate.earnedOn)}
                                        </span>
                                    </p>

                                    <div className="flex flex-wrap flex-row gap-1.5">
                                        <Badge variant={"default"} className="certificates-tag bg-white flex items-center justify-center max-h-[19px] !px-0.5">
                                            <Image
                                                src={certificate.providerLogo}
                                                alt={`${certificate.provider} Logo`}
                                                width={50}
                                                height={19}
                                                loading={"lazy"}
                                                className="!h-full !w-auto"
                                            />
                                        </Badge>

                                        {certificate.tags.map((tag, tagIndex) => (
                                            <Badge
                                                key={`${tag.name}-${tagIndex}`}
                                                className="certificates-tag px-2.5 py-0.5 rounded-full text-xs font-medium"
                                                style={{
                                                    backgroundColor: tag.bgColor,
                                                    color: tag.textColor,
                                                    border: "1px solid #E5E7EB",
                                                }}
                                            >
                                                {tag.name}
                                            </Badge>
                                        ))}
                                    </div>

                                    <Link
                                        href={certificate.verifyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-extrabold text-sm tracking-wide hover:underline underline-offset-4"
                                    >
                                        {certificate.title}
                                    </Link>
                                </div>

                                <div>
                                    <p className="flex flex-row gap-1 text-xs">
                                        Offered by
                                        <b>
                                            {certificate.provider}
                                        </b>
                                        on
                                        <b>
                                            {certificate.platform}
                                        </b>
                                    </p>

                                    <Button variant={"secondary"} className="p-0 rounded-xl bg-secondary transition-all w-full mt-2 font-mont-med text-[13px] cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis border-2 border-[#3c587d] shadow-[inset_0_-2px_2px_#3c587d,inset_0_4px_5px_-3px_#6a8ebe]">
                                        <a
                                            href={certificate.downloadPath}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full h-full flex items-center justify-center"
                                            >
                                                Download Certificate
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Certificates;