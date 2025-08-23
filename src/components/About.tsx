import CreattieAbout from '../components/animation/CreattieAbout';

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container section-padding flex flex-col md:flex-row items-start justify-center gap-10">
                <div className="flex-1 md:sticky md:top-0 w-full h-full">
                    <CreattieAbout
                        autoplay={true}
                        loop={true}
                        speed={0.75}
                    />
                </div>
                <div className="flex-1 flex flex-col items-start justify-center gap-4 text-primary leading-7 font-medium">
                    <h2 className="section-title">About me</h2>
                    <p>
                        Hi! I&#39;m Amirhossein Allami, a front-end developer and designer based
                        in Shiraz, Iran. My tech journey began at age 12 with Photoshop,
                        sparking a passion that evolved into web development. I&#39;m currently
                        pursuing Computer Science while building my skills in JavaScript and
                        React. With a background in design – including 5 years of
                        collaboration with NeuroTRACT creating visual content – I bring a
                        unique perspective to web development.
                    </p>
                    <div className="flex flex-col items-start justify-center gap-3">
                        <b className="text-xl">My Toolkit & Interests</b>
                        <ul className="toolkit-list">
                            <li>
                                <b>Front end Development:</b>
                                Building responsive interfaces with
                                React, focusing on clean code and modern best practices
                            </li>
                            <li>
                                <b>Front end Development:</b>
                                Building responsive interfaces with
                                React, focusing on clean code and modern best practices
                            </li>
                            <li>
                                <b>Front end Development:</b>
                                Building responsive interfaces with
                                React, focusing on clean code and modern best practices
                            </li>
                            <li>
                                <b>Front end Development:</b>
                                Building responsive interfaces with
                                React, focusing on clean code and modern best practices
                            </li>
                        </ul>
                    </div>
                    <p>
                        While I&#39;m currently focused on learning rather than job hunting, I&#39;m
                        always excited to connect with fellow developers and designers.
                        Let&#39;s chat about code, design, or the latest tech trends!
                    </p>
                </div>
            </div>
        </section>
    )
}
export default About
