import { people01, people02, people03, facebook, instagram, linkedin, twitter, airbnb, binance, coinbase, dropbox, send, shield, star  } from "../assets";

export const navLinks = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "/auth/signup",
    title: "Inscription",
  },
  {
    id: "/auth/signin",
    title: "Connexion",
  },
  
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Rewards",
    content:
      "We enable you to broaden your vision and get more input and advice on your various projects.",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "100% Secured",
    content:
      "We ensure the security of your information and the fluidity of exchanges between investors and project submitters. .",
  },
  
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "J'investis depuis 4 ans : aucun retard sur mes 3 projets obligataires. Du côté des PME, j'ai investi dans 11 sociétés.",
    name: "Herman Jensen",
    title: "Co-Leader & Team Leader",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "L'investissement que j'ai fait avec Francky, mon conseiller StarFinancial, donne de très bons résultats. J'ai été bien informé et guidé dans mon investissement avec l'achat d'actions.",
    name: "Steve Mark",
    title: "Founder & Leader",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "Les conseillers sont très professionnels et disponibles. On n'a pas l'impression d'être un client parmi des centaines d'autres et ils me rappellent toujours (contrairement à d'autres plateformes).",
    name: "Kenn Gallagher",
    title: "Product Manager",
    img: people03,
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "Compagnies",
    value: "1000+",
  },
  {
    id: "stats-2",
    title: "Investisseurs",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Transactions",
    value: "$50+",
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];