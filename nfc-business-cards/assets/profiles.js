/**
 * Single source of truth for NFC profile data.
 * NFC cards should point to the HTML files in PROFILE_PAGES, not hash URLs.
 */
const NFC_BASE_PATH = "/nfc-business-cards/";

const PROFILE_PAGES = {
  helton: "helton-furau/",
  cornelder: "empresa-alvo-demo/",
};

const profilesData = {
  helton: {
    key: "helton",
    photo: "helton-furau.jpg",
    name: "Helton Furau",
    role: "CEO / Founder / Technology Solutions",
    company: "HioTech",
    location: "Beira, Moçambique",
    bio: "Soluções tecnológicas para empresas: desenvolvimento web e mobile, plataformas digitais, design e transformação digital.",
    phone: "+258875554622",
    email: "info@hiotech.co",
    website: "https://hiotech.co/",
    tags: [
      "Desenvolvimento Web",
      "Aplicativos",
      "Design",
      "Consultoria",
    ],
    theme: {
      gradient: "from-brand-blue to-brand-accent",
      accentColor: "text-brand-accent",
      accentBorder: "border-brand-blue",
      accentBg: "bg-brand-accent",
      svgColor: "#0EA5E9",
      buttonGradient: "from-brand-blue to-brand-accent",
    },
    links: [
      {
        title: "Website Oficial HioTech",
        description: "Conheça os nossos serviços",
        icon: "fa-solid fa-globe",
        color: "text-brand-accent",
        url: "https://hiotech.co/",
      },
      {
        title: "Portfólio HioTech",
        description: "Projetos e trabalhos recentes",
        icon: "fa-solid fa-briefcase",
        color: "text-brand-accent",
        url: "https://hiotech.co/portfolio.html",
      },
      {
        title: "NFC Business Cards",
        description: "Saiba mais sobre este serviço",
        icon: "fa-solid fa-wifi",
        color: "text-brand-accent",
        url: "../index.html",
      },
      {
        title: "WhatsApp",
        description: "Fale connosco diretamente",
        icon: "fa-brands fa-whatsapp",
        color: "text-emerald-400",
        url: "https://wa.me/258875554622",
      },
      {
        title: "Agendar uma Reunião",
        description: "Marque via WhatsApp",
        icon: "fa-solid fa-calendar-days",
        color: "text-emerald-400",
        url: "https://wa.me/258875554622",
      },
    ],
  },
  cornelder: {
    key: "cornelder",
    name: "Colaborador Demo",
    role: "Gestor Comercial",
    company: "Cornelder de Moçambique",
    location: "Porto da Beira, Moçambique",
    bio: "Operação portuária de excelência no coração da logística do SADC - contentores e carga geral no Porto da Beira.",
    phone: "+25823322735",
    email: "cornelder@cornelder.co.mz",
    website: "https://www.cornelder.co.mz/",
    theme: {
      gradient: "from-amber-600 to-orange-700",
      accentColor: "text-amber-400",
      accentBorder: "border-amber-500",
      accentBg: "bg-amber-500",
      svgColor: "#F59E0B",
      buttonGradient: "from-amber-600 to-orange-700",
    },
    links: [
      {
        title: "Website Cornelder",
        description: "Porto da Beira - Moçambique",
        icon: "fa-solid fa-ship",
        color: "text-amber-400",
        url: "https://www.cornelder.co.mz/",
      },
      {
        title: "Posição Portuária",
        description: "Informação operacional do porto",
        icon: "fa-solid fa-anchor",
        color: "text-amber-400",
        url: "https://www.cornelder.co.mz/port-position",
      },
      {
        title: "Berth Plan",
        description: "Plano de atracação e berços",
        icon: "fa-solid fa-map-location-dot",
        color: "text-orange-400",
        url: "https://www.cornelder.co.mz/berth-plan",
      },
      {
        title: "Contactos Institucionais",
        description: "Fale com a Cornelder",
        icon: "fa-solid fa-envelope",
        color: "text-amber-400",
        url: "https://www.cornelder.co.mz/contacts",
      },
    ],
  },
};

function getProfilePhotoPath(profileKey) {
  const data = profilesData[profileKey];
  if (!data?.photo) return null;

  const page = PROFILE_PAGES[profileKey];
  return page ? `${page}${data.photo}` : data.photo;
}

function getProfilePublicUrl(profileKey) {
  const page = PROFILE_PAGES[profileKey];
  if (!page) return window.location.href;

  if (window.location.protocol === "file:") {
    return new URL(page, window.location.href).href;
  }

  return `${window.location.origin}${NFC_BASE_PATH}${page}`;
}
