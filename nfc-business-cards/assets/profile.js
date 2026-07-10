function showToast() {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.classList.remove("translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-20", "opacity-0");
  }, 3500);
}

function foldVCardLine(line) {
  const maxLength = 75;
  if (line.length <= maxLength) return line;

  let folded = line.slice(0, maxLength);
  let remainder = line.slice(maxLength);

  while (remainder.length > 0) {
    folded += `\r\n ${remainder.slice(0, maxLength - 1)}`;
    remainder = remainder.slice(maxLength - 1);
  }

  return folded;
}

function getPhotoMimeType(filename) {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "png") return "PNG";
  if (ext === "webp") return "WEBP";
  return "JPEG";
}

async function loadProfilePhotoBase64(profileKey) {
  const data = profilesData[profileKey];
  if (!data?.photo) return null;

  const photoUrl = getProfilePhotoPublicUrl(profileKey);
  if (!photoUrl) return null;

  try {
    const response = await fetch(photoUrl);
    if (!response.ok) return null;

    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";

    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return {
      base64: btoa(binary),
      type: getPhotoMimeType(data.photo),
    };
  } catch {
    return null;
  }
}

function buildVCard(data, profileUrl, photo) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${data.name}`,
    `N:${data.name.split(" ").reverse().join(";")};;;`,
    `ORG:${data.company}`,
    `TITLE:${data.role}`,
    `TEL;TYPE=CELL;TYPE=VOICE;TYPE=PREF:${data.phone}`,
    `EMAIL;TYPE=PREF;TYPE=INTERNET:${data.email}`,
    `URL;TYPE=WORK:${profileUrl}`,
  ];

  if (photo?.base64) {
    lines.push(
      foldVCardLine(`PHOTO;ENCODING=b;TYPE=${photo.type}:${photo.base64}`)
    );
  }

  lines.push(
    "NOTE:Perfil digital HioTech - use o campo Website para voltar a este hub com links atualizados.",
    "END:VCARD"
  );

  return lines.join("\r\n");
}

function downloadVCard(vcard, filename) {
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8;" });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}

async function triggerSaveContact(profileKey) {
  const data = profilesData[profileKey];
  if (!data) return;

  const profileUrl = getProfilePublicUrl(profileKey);
  const photo = await loadProfilePhotoBase64(profileKey);
  const vcard = buildVCard(data, profileUrl, photo);

  downloadVCard(
    vcard,
    `${data.name.toLowerCase().replace(/\s+/g, "_")}.vcf`
  );

  showToast();
}

function renderProfileQR(containerId, url) {
  const container = document.getElementById(containerId);
  if (!container || typeof QRCode === "undefined") return;

  container.innerHTML = "";
  const canvas = document.createElement("canvas");
  container.appendChild(canvas);

  QRCode.toCanvas(
    canvas,
    url,
    {
      width: 112,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" },
    },
    (error) => {
      if (error) console.error("QR generation failed:", error);
    }
  );
}

function buildLinkCard(link) {
  const linkCard = document.createElement("a");
  linkCard.href = link.url;
  linkCard.target = "_blank";
  linkCard.rel = "noopener noreferrer";
  linkCard.className =
    "block w-full p-3.5 bg-slate-900 border border-slate-800/80 rounded-2xl hover:border-slate-700 transition";
  linkCard.innerHTML = `
    <div class="flex items-center gap-3">
      <i class="${link.icon} ${link.color} text-lg"></i>
      <div>
        <p class="text-xs font-bold text-white">${link.title}</p>
        <p class="text-[9px] text-slate-500">${link.description}</p>
      </div>
    </div>
  `;
  return linkCard;
}

function renderStandaloneProfile(profileKey) {
  const data = profilesData[profileKey];
  if (!data) return;

  document.title = `${data.name} | ${data.company}`;

  const bgHeader = document.getElementById("profile-standalone-bg");
  if (bgHeader) {
    bgHeader.className = `h-32 w-full bg-gradient-to-br ${data.theme.gradient} relative`;
  }

  const badge = document.getElementById("profile-standalone-badge");
  if (badge) badge.innerText = data.company;

  const avatarImg = document.getElementById("profile-standalone-avatar-img");
  const avatarSvg = document.getElementById("profile-standalone-avatar-svg");
  if (data.photo && avatarImg) {
    avatarImg.src = data.photo;
    avatarImg.alt = `Foto de ${data.name}`;
    avatarImg.classList.remove("hidden");
    if (avatarSvg) avatarSvg.classList.add("hidden");
  } else if (avatarSvg) {
    avatarSvg.classList.remove("hidden");
    avatarSvg.style.color = data.theme.svgColor;
    if (avatarImg) avatarImg.classList.add("hidden");
  }

  const nameEl = document.getElementById("profile-standalone-name");
  if (nameEl) nameEl.innerText = data.name;

  const roleEl = document.getElementById("profile-standalone-role");
  if (roleEl) {
    roleEl.innerText = data.role;
    roleEl.className = `text-sm font-semibold mt-1 ${data.theme.accentColor}`;
  }

  const locationEl = document.getElementById("profile-standalone-location");
  if (locationEl) locationEl.innerText = data.location;

  const bioEl = document.getElementById("profile-standalone-bio");
  if (bioEl) bioEl.innerText = `"${data.bio}"`;

  const tagsEl = document.getElementById("profile-standalone-tags");
  if (tagsEl) {
    tagsEl.innerHTML = "";
    if (data.tags?.length) {
      tagsEl.classList.remove("hidden");
      data.tags.forEach((tag) => {
        const chip = document.createElement("span");
        chip.className =
          "px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/60 text-xs text-slate-300";
        chip.textContent = tag;
        tagsEl.appendChild(chip);
      });
    } else {
      tagsEl.classList.add("hidden");
    }
  }

  const phoneBtn = document.getElementById("profile-standalone-action-phone");
  if (phoneBtn) {
    phoneBtn.href = `tel:${data.phone}`;
    phoneBtn.className = `w-12 h-12 rounded-full bg-slate-950 hover:bg-slate-800 flex items-center justify-center border border-slate-800 text-lg transition ${data.theme.accentColor}`;
  }

  const emailBtn = document.getElementById("profile-standalone-action-email");
  if (emailBtn) {
    emailBtn.href = `mailto:${data.email}`;
    emailBtn.className = `w-12 h-12 rounded-full bg-slate-950 hover:bg-slate-800 flex items-center justify-center border border-slate-800 text-lg transition ${data.theme.accentColor}`;
  }

  const whatsappBtn = document.getElementById("profile-standalone-action-whatsapp");
  if (whatsappBtn) {
    const waNumber = data.phone.replace(/\D/g, "");
    whatsappBtn.href = `https://wa.me/${waNumber}`;
    whatsappBtn.className = `w-12 h-12 rounded-full bg-slate-950 hover:bg-slate-800 flex items-center justify-center border border-slate-800 text-lg transition ${data.theme.accentColor}`;
  }

  const linksContainer = document.getElementById("profile-standalone-links");
  if (linksContainer) {
    linksContainer.innerHTML = "";

    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.onclick = () => triggerSaveContact(profileKey);
    saveBtn.className = `w-full py-3.5 bg-gradient-to-r ${data.theme.buttonGradient} rounded-xl text-center font-bold text-sm text-white shadow-lg flex items-center justify-center gap-2 hover:opacity-90`;
    saveBtn.innerHTML =
      '<i class="fa-solid fa-address-book"></i> Guardar Contacto';
    linksContainer.appendChild(saveBtn);

    const returnBtn = document.createElement("a");
    returnBtn.href = getProfilePublicUrl(profileKey);
    returnBtn.className =
      "block w-full p-3.5 bg-slate-900 border border-slate-800/80 rounded-2xl hover:border-slate-700 transition text-center text-xs font-bold text-slate-300";
    returnBtn.innerHTML =
      '<i class="fa-solid fa-link mr-1"></i> Voltar a este perfil depois';
    linksContainer.appendChild(returnBtn);

    data.links.forEach((link) => {
      linksContainer.appendChild(buildLinkCard(link));
    });
  }

  const hint = document.getElementById("profile-return-hint");
  if (hint) {
    hint.innerHTML = `<strong>Relacionamento digital contínuo:</strong> ao guardar este contacto, a URL deste perfil fica disponível no telemóvel para voltar a website, links e informações atualizadas.`;
  }

  renderProfileQR("profile-qr", getProfilePublicUrl(profileKey));
}

function initProfilePage(profileKey) {
  renderStandaloneProfile(profileKey);
}

function initLandingAnchors() {
  window.addEventListener("hashchange", scrollToAnchor);
  scrollToAnchor();
}

function scrollToAnchor() {
  const hash = window.location.hash;
  if (!hash || hash === "#landing") return;

  const element = document.querySelector(hash);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function renderSimulatorAvatar(profileKey, containerId) {
  const data = profilesData[profileKey];
  const container = document.getElementById(containerId);
  if (!container || !data?.photo) return;

  const photoPath = getProfilePhotoPath(profileKey);
  if (!photoPath) return;

  container.innerHTML = `<img src="${photoPath}" alt="Foto de ${data.name}" class="w-full h-full object-cover">`;
}

function initMobileMenu() {
  const button = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!button || !menu) return;

  button.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    const expanded = !menu.classList.contains("hidden");
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.add("hidden"));
  });
}

function initLandingPage() {
  initLandingAnchors();
  initMobileMenu();
  renderProfileQR("sim-qr-helton", getProfilePublicUrl("helton"));
  renderSimulatorAvatar("helton", "sim-avatar-helton");
  renderSimulatorAvatar("helton", "sim-panel-avatar-helton");
}
