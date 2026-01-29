interface project {
    shortTittle : string;
    tittle : string;
    image : string;
    tech : string;
    fullTech : string;
    description : string;
    link : string;
}

const projectList : project[] = [
        {
            shortTittle : "CRUD Food App",
            tittle : "Simple CRUD Food App",
            image : "/crud-food.jpg",
            tech : "Full-Stack",
            fullTech : "Next Js, Prisma, Supabase, ShadcnUI",
            description : "A Simple app to create, read, update, and delete restaurants food menus.",
            link : "https://food-crud-app.vercel.app/"
        },
        {
            shortTittle : "My Coffee Websited",
            tittle : "My Coffee Website Landing Page",
            image : "/my-coffee.jpg",
            tech : "Front-End",
            fullTech : "Next Js, Tailwind CSS, ShadcnUI",
            description : "A Simple Website Landing Page About Presenting a Coffee Shop ",
            link : "https://my-coffe-app.vercel.app/"
        },
        {
            shortTittle : "Re-Design UPNVYK Library",
            tittle : "Re-Design UPNVYK Library Website Using User Centered Design Method",
            image : "/upnvkyk-library.jpg",
            tech : "UI/UX",
            fullTech : "Figma, User Centered Design, UX Research",
            description : "Re-designing UPNVYK Library website using user centered design method",
            link : "https://www.figma.com/proto/ebM6odYO58bk38Z1zOsBCf/Website-OPAC-NEW?node-id=307-13110&starting-point-node-id=307%3A13021&scaling=scale-down-width&content-scaling=fixed&t=9dzyEGU98zNTAlqw-1"
        },
        {
            shortTittle : "Sewa Kantor App",
            tittle : "Design UI/UX Sewa Kantor App",
            image : "/sewa-kantor.jpg",
            tech : "UI/UX",
            fullTech : "Figma, Design Thinking, UX Research",
            description : "Designing UI/UX Sewa Kantor App in Team Collaboration Project.",
            link : "https://www.figma.com/proto/feprXALgyZBLA5Jk94lYsg/Capstone-Project---Sewa-Kantor?node-id=234-1320&starting-point-node-id=230%3A426&scaling=scale-down-width&content-scaling=fixed&t=CDkZHulz3ULQKeJ9-1"
        },
        {
            shortTittle : "Re-Design 2TangTea",
            tittle : "Re-Design 2TangTea Website Using Design Thinking",
            image : "/2tangtea.jpg",
            tech : "UI/UX",
            fullTech : "Figma, Design Thinking, UX Research",
            description : "Re-designing 2TangTea website using design thinking method",
            link : "https://www.figma.com/proto/RqlLTWg62JDeeltStly0w8/Mini-Project-2tangtea?node-id=81-899&p=f&t=TY9cMTvFGdDA4MtL-1&scaling=scale-down-width&content-scaling=fixed&page-id=76%3A12&starting-point-node-id=81%3A899"
        },
    ];

export default projectList;