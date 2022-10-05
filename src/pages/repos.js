import React, {useEffect, useState} from "react"

import Layout from "../components/layout"
import RepoCard from "../components/cards/repo"
import AdbConnect from "../components/adbconnect"
import bgImage from "../media/phones.png"

import { TiWarning } from "react-icons/ti";
import { BiErrorAlt } from "react-icons/bi";
import { GoVerified } from "react-icons/go";
import { IconContext } from "react-icons";

import "./repos.css";

const IndexPage = () => {
    const [repos, setRepos] = useState(null);
    const [hadError, setHadError] = useState(false);
    
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/recloudstream/cs-repos/master/repos-db.json")
            .catch(err => { setHadError(true) })
            .then(r => r.json())
            .then(setRepos)
            .catch(err => { setHadError(true) })
    }, [setRepos])

    return <Layout>
        <div className="flex items-center w-full flex-col">
            <div className="alert alert-warning shadow-lg w-full mx-10 md:w-2/3 mb-5">
                <div>
                    <TiWarning className="stroke-current flex-shrink-0 h-6 w-6"/>
                    <div>
                        <h3 className="font-bold text-xl">Keep in mind that the extensions can execute arbitrary code inside the app.</h3>
                        <span className="text-xs">
                            This means you should treat them with the same level of scrutiny you treat any apps. Extensions can also read all of the Cloudstream's data.
                        </span>
                        <br />
                        <IconContext.Provider value={{className: 'inline-block'}}>
                            <span className="text-xs">
                                Repos with a <GoVerified class="stroke-current flex-shrink-0 mx-1" /> are constantly audited by the app developers so you can probably trust them.
                            </span>
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
            {(!repos && !hadError) &&
                <div className="swap-child">
                    <div class="alert shadow-lg w-full mx-10 md:w-2/3 mb-5">
                        <div>
                            <span>Fetching data...</span>
                        </div>
                    </div>
                    <div class="alert alert-error shadow-lg w-full mx-10 md:w-2/3 mb-5">
                        <div>
                            <BiErrorAlt />
                            <div>
                            <h3 class="font-bold">Failed to connect to GitHub servers.</h3>
                            <div class="text-xs">GitHub has been a target of <a href="https://en.wikipedia.org/wiki/Censorship_of_GitHub" className="link" target="_blank">censorship</a> in some countries. <br/> Please try changing your <a href="https://1.1.1.1/dns/" className="link" target="_blank">DNS server</a> or try using a VPN.</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {repos &&
                <>
                    <AdbConnect />
                    {repos.map((it, index) => <RepoCard repoData={it} key={index} isFirst={index===0}/>)}
                </>
            }
            {(!repos && hadError) &&
                <div class="alert alert-error shadow-lg w-full mx-10 md:w-2/3 mb-5">
                    <div>
                        <BiErrorAlt />
                        <div>
                          <h3 class="font-bold">Failed to connect to GitHub servers.</h3>
                          <div class="text-xs">GitHub has been a target of <a href="https://en.wikipedia.org/wiki/Censorship_of_GitHub" className="link" target="_blank">censorship</a> in some countries. <br/> Please try changing your <a href="https://1.1.1.1/dns/" className="link" target="_blank">DNS server</a> or try using a VPN.</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    </Layout>

}

export function Head() {
    return (
        <>
            <title>Cloudstream Repositories</title>
            <meta property="og:title" content="Cloudstream Repositories" />
            <meta property="og:description" content="Cloudstream is an Android app for streaming and downloading Movies, TV-Series and Anime." />
            <meta property="og:image" content={bgImage} />
            <meta property="og:image:type" content="image/png" />
            <meta name="twitter:card" content="summary_large_image" />
        </>
    )
}

export default IndexPage
