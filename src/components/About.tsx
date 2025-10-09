import CreattieAnimation from './animation/CreattieAnimation';

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container section-padding flex flex-col md:flex-row items-start justify-center gap-10">
                <div className="flex-1 flex flex-col items-start justify-center gap-6 text-secondary dark:text-chart-3 leading-7">
                    <div className="about-wrapper md:!gap-3">
                        <h2 className="section-title">About me</h2>
                        <p>
                            I&#39;m Amirhossein, a front-end developer accepting new projects and collaboratios. I combine my design expertise with modern web development skills to create exceptional digital experiences that users love and businesses need.
                        </p>
                    </div>

                    <div className="about-wrapper">
                        <b className="text-xl">Current Focus</b>
                        <p>
                            Mastering TypeScript and Next.js development is my current focus. I&#39;m completing advanced frontend courses on Coursera and building portfolio projects that demonstrate clean code, responsive design, and modern development practices.
                        </p>
                    </div>

                    <div className="about-wrapper">
                        <b className="text-xl">Background</b>
                        <p>
                            I Started my work with web design which then evolved into web development. I am also pursuing my Computer Science degree (completing 2029). My professional experience at NeuroTRACT gives me a unique perspective on building user-focused interfaces.
                        </p>
                    </div>

                    <b>
                        Ready to contribute to your next project – let&#39;s connect!
                    </b>
                </div>

                <div className="flex-1 w-full h-full md:-mt-18">
                    <CreattieAnimation
                        animationURL='/animations/creattie-about.json'
                        autoplay={true}
                        loop={true}
                        speed={0.75}
                    />
                </div>
            </div>
        </section>
    )
}
export default About
