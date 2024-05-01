export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "@fawredd Marcos Moore (BBA)(Developer) portfolio",
	description:``,
	navItems: [
		/* {
			label: "Home",
			href: "/",
		}, */
	],
	navMenuItems: [
		/* {
			label: "Home",
			href: "/",
		}, */
	],
	links: {
		github: "https://github.com/fawredd/",
		linkedin: "https://www.linkedin.com/in/mooremarcos",
		twitter: "https://twitter.com/fawredd",
	},
	myHero: {
		title:`I'm Marcos (@${process.env.USERNAME})`,
		subtitle:"Full stack developer",
		address:"Based on Buenos Aires, Argentina."
	},
	localRepos:[
		{ 
		uuid: crypto.randomUUID(),
		project_title: "Etercell.com",
		project_description: "Sitio web sobre wordpress empleando plantilla de Plethora Themes.",
		project_image: '/img/etercell-screenshot.jpg',
		project_languages: [{id:crypto.randomUUID(),language:'Other'}],
		project_url: "",
		project_homepage: "https://www.etercell.com",
		project_topics: ["PHP","WORDPRESS", "UI/UX", "Terapias regenerativas", "Productos autologos"]
		},
	]
};
