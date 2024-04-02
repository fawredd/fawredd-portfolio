import { siteConfig } from "@/config/site";

export interface Project_Interface {
    uuid: string;
    project_title: string;
    project_description: string;
    project_image: string;
    project_languages: { id: string, language: string}[] ;
    project_url: string;
    project_homepage: string;
    project_topics: Array<string>;
}

async function getRepos(): Promise<Project_Interface[]>{
  const userName = process.env.USERNAME;
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(`https://api.github.com/users/${userName}/repos`, { next: { revalidate: 43200 } }); //,{cache: 'no-store'}
  if (res.ok){
    const repoJson =  await res.json();
    let data = repoJson.map((item:any):Project_Interface =>{
        const { node_id, full_name, html_url, description, language, homepage, topics } = item;
        if (description && !description.includes('!portfolio')){
          return {
            uuid: node_id,
            project_title: full_name,
            project_description: description,
            project_image: '',
            project_languages: [{id:crypto.randomUUID(),language:''}], //https://api.github.com/repos/fawredd/clinical/languages
            project_url: html_url,
            project_homepage: homepage,
            project_topics: topics
          }
        }else{
          return {
            uuid: '',
            project_title: '',
            project_description: '',
            project_image: '',
            project_languages: [{id:crypto.randomUUID(),language:''}],
            project_url: '',
            project_homepage: '',
            project_topics: []
          };
        }
      })
      data = data.filter((item:any)=>item.uuid != '');
      for (let item of data) {
        item.project_image = await getScreenshot(item.project_title, "main");
        item.project_languages = await getLanguages(item.project_title);
      }
    return data;
  } else {
    return [{
        uuid: crypto.randomUUID(),
        project_title: "ERROR",
        project_description: `COULD NOT RETREIVE DATA. (` + res.statusText + `)`,
        project_image: '/img/repository-image-template.jpg',
        project_languages: [{id:crypto.randomUUID(),language:'Other'}],
        project_url: "https://fawredd-portfolio.vercel.app",
        project_homepage: "https://fawredd-portfolio.vercel.app",
        project_topics: ["Portfolio"]
      }]
  }
}



//Function to fetch files from users repository and return the first one thar has "screenshot" as name.
async function getScreenshot(repo:string,branch:string): Promise<string>{
  const res = await fetch(`https://api.github.com/repos/${repo}/git/trees/${branch}?recursive=0`, { next: { revalidate: 43200 } });
  if (res.ok){
    const repoJson =  await res.json();
    if (repoJson.message?.length>0){
      return "/img/repository-image-template.jpg";
    }
    const link = repoJson.tree
      .filter((item:any) => item.path.includes("screenshot"))
      .map((item:any) => item.path);
    if (link.length > 0){
      return `https://raw.githubusercontent.com/${repo}/${branch}/` + link[0];
    } else {
      return "/img/repository-image-template.jpg";
    }
  } else {
    return "/img/repository-image-template.jpg";
  }
}

//Function to fetch programming languages used in user repository
async function getLanguages(repo:string): Promise<{id:string, language:string}[]>{
  const res = await fetch(`https://api.github.com/repos/${repo}/languages`, { next: { revalidate: 86400 } }); //,{cache: 'no-store'}
  if (res.ok){
    const repoJson =  await res.json();
    if (repoJson.message?.length>0){
      return [{id:crypto.randomUUID(),language:`(${repoJson.message})`}];
    }
      return Object.keys(repoJson).map(item=>(
        {
          id:crypto.randomUUID(),
          language: item
        }
      ));
  } else {
    return [{id:crypto.randomUUID(),language:`(ERROR)`}];
  }
}

export async function ProjectsFercher(){
  const loadedProjects = await getRepos();
  //Add local JSON of repositories
  loadedProjects.push(...siteConfig.localRepos);
  //Filter empty items
  const filteredProjects = loadedProjects.filter((item) => Object.keys(item).length !== 0);
  return filteredProjects;
}