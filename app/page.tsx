import { title, subtitle } from '@/components/primitives';
import ProjectsContainer  from '@/components/projects-container';
import { Image } from '@nextui-org/image';
import { Contact } from '@/components/contact'
import { Suspense } from 'react';
import { ProjectsFercher } from './lib/data';
import { siteConfig } from '@/config/site';
const { myHero } = siteConfig;
import Chat from '../components/chat/chat';

export default async function Home() {
  const userName = process.env.USERNAME;
  const itoken = process.env.NEXT_PUBLIC_ITOKEN;
  const projects = await ProjectsFercher();
  return (
    <section className="flex flex-col gap-4 flex-grow py-3 md:py-4 h-full">
      
      <div className="min-h-[calc(100vh-6rem)] flex flex-col flex-grow basis-auto gap-4 items-center justify-center">
        <div className="flex-shrink basis-1/4 inline-block max-w-lg text-center justify-center mb-3">
          <h1 className={title({size: 'sm'})}>{myHero.title}</h1>
          <br />
          <h1 className={title({ color: 'green', size: 'sm' })}>
            {myHero.subtitle}
          </h1>
          <br />
          <h3 className={subtitle()}>{myHero.address}</h3>
        </div>
        <div className="flex-grow basis-3/4 grid lg:grid-cols-1 md:grid-cols-1 gap-4 justify-items-center w-full p-3 min-h-full">
          <Chat className="lg:w-1/2 w-full max-h-full"/>
          {/* 
          <Image
            src=`https://faw-github-readme-stats.vercel.app/api?username=${userName}&token=${itoken}&hide_title=false&hide_rank=false&show_icons=true&include_all_commits=true&count_private=true&disable_animations=false&theme=transparent&locale=en&hide_border=false&order=1`
            fallbackSrc="/img/statsGraph.svg"
            alt="fawredd stats graph"
          />
                   
          <Image
            src={`https://faw-github-readme-stats.vercel.app/api/top-langs?username=${userName}&token=${itoken}&locale=en&hide_title=false&layout=compact&langs_count=5&theme=transparent&hide_border=false&order=2`}
            fallbackSrc="/img/languagesGraph.svg"
            alt="fawred languages graph"
            className="w-full lg:h-full md:w-auto flex-shrink basis-1/4 hidden"
          />
          */}
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectsContainer projects={projects} />
      </Suspense>

      <Contact />
      
    </section>
  );
}