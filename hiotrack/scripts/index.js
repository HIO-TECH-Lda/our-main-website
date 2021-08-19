AOS.init();
const theme_switcher = document.getElementById("theme_switcher");
const theme = localStorage.getItem("theme");
if (theme === "dark") {
  document.body.classList.add("dark");
  theme_switcher.checked = true;
}
theme_switcher.addEventListener("click", (e) => {
  if (theme_switcher.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.removeItem("theme");
  }
});


const form = document.querySelector('.contact__form');
const values = {};
if(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.querySelector("button").innerText = "Submetendo...";
    
    values.name = form.querySelector('#name').value;
    values.email = form.querySelector('#email').value;
    values.phone = form.querySelector('#phone').value;
    values.address = form.querySelector('#address').value;
    values.province = form.querySelector('#province').value;
    values.type = form.querySelector('#individual').checked ? 'individual' : 'empresa';
    
    const subject = "ADESÃO HIOTRACK";
    const body = `
      Nome: ${values.name};\n
      Email: ${values.email};\n
      Número de celular: ${values.phone};\n
      Endereço: ${values.address};\n
      Provincia: ${values.province};\n
      Tipo: ${values.type};\n
    `;
    const autoReply = `Obrigado pelo seu interesse em se juntar ao nosso serviço.
    
       \n\n
      ${values.name.split(" ")[0]},
       \n\n
       Estamos satisfeitos que você esteja interessado em nosso serviço de rastreamento e monitoramento de veículos. Atendê-lo é nossa prioridade, por isso um membro de nossa equipe de suporte entrará em contato com você o mais rápido possível para ajudá-lo a concluir o procedimento de adesão e desfrutar do serviço.
       \n\n
       \n\n
      Obrigado`;
    fetch("https://hiomail-api.herokuapp.com/api/v1/messages/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorName: values.name,
        visitorEmail: values.email,
        subject,
        body,
        autoReply,
        companyName: "HIO TECH, LDA",
        companyEmail: "hiotrack@hiotech.co",
        companyUrl: "https://hiotech.co/hiotrack",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        form.querySelector("button").innerText = "Submeter";
        alert(`Formulário submetido com sucesso!\n${values.name.split(" ")[0]} estamos satisfeitos que você esteja interessado em nosso serviço de rastreamento e monitoramento de veículos. Atendê-lo é nossa prioridade, por isso um membro de nossa equipe de suporte entrará em contato com você o mais rápido possível para ajudá-lo a concluir o procedimento de adesão e desfrutar do serviço.`);
        form.querySelector('input[type="reset"]').click();
      });
  });
    
  
}
