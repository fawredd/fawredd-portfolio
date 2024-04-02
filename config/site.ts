export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "@fawredd Marcos Moore portfolio Fullstack developer",
	description:`"¡Bienvenido a mi portfolio! Soy un desarrollador de backend freelance especializado en JavaScript, Node.js, React.js, Next.js y Express.js.
	Durante mi trayectoria como programador he adquirido una sólida base técnica y enriquecido mi capacidad para resolver problemas que ayudaron a alcanzar objetivos de una manera efectiva y eficiente.
	Mi enfoque orientado al detalle y mi habilidad para comunicarme efectivamente me han permitido crecer positivamente junto a las personas que forme equipo.
	Explora mi portfolio para ver ejemplos de mi trabajo y cómo he utilizado mis habilidades en JavaScript, Node.js y otras tecnologías para crear soluciones personalizadas.
	Si estás buscando un desarrollador de backend altamente competente y versátil para tu próximo proyecto, estaré encantado de colaborar contigo.
	Palabras clave: JavaScript, Node.js, React.js, Next.js, Express.js, desarrollo backend, freelance, soluciones personalizadas, calidad del código, rendimiento del código.`,
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
