import Image from "next/image"
import PageContainer from "@/Components/Layout/PageContainer"
import hero from "../../assets/hero.png"
import { Link } from "react-router-dom"

const Hero = () => {
    return (
        <section id="hero" className="pb-16 pt-4 bg-[var(--background)] text-[var(--foreground)]">
            <PageContainer>
                <div className="rounded-[2rem] border border-subtle bg-surface p-5 shadow-soft lg:p-8">
                    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,1fr)]">
                        <div className="space-y-6">
                            <span className="inline-flex items-center rounded-full bg-[var(--primary)]/15 px-4 py-2 text-sm font-semibold text-[var(--primary)]">
                                Numbers first research
                            </span>
                            <h1 className="max-w-3xl text-center text-5xl font-extrabold leading-tight text-[var(--text-strong)] lg:text-left lg:text-6xl">
                                Financial data with no news.
                            </h1>
                            <p className="max-w-2xl text-center text-xl leading-8 text-[var(--text-muted)] lg:text-left">
                                Search relevant financial documents without fear mongering and fake
                                news.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                                <Link
                                    to="/search"
                                    className="inline-flex items-center rounded-2xl bg-[var(--primary)] px-6 py-3 text-base font-semibold text-slate-950 shadow-[0_18px_40px_rgba(45,212,191,0.24)] transition hover:-translate-y-0.5 hover:bg-[var(--primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                                >
                                    Get started
                                </Link>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-[1.5rem] border border-subtle bg-surface p-3 shadow-soft">
                            <Image
                                src={hero}
                                alt="Hero image"
                                className="w-full rounded-[1.25rem]"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </PageContainer>
        </section>
    )
}

export default Hero
