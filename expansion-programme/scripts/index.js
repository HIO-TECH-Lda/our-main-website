const formStep1 = document.querySelector("#form-step1");
const formStep2 = document.querySelector("#form-step2");
const backButton = document.querySelector("#backward");
const fields = {};

//alert handlers
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert = (type, msg, time = 7, close) => {
  hideAlert();
  const closeBtn = `<button type="button" onClick={hideAlert()}>X</button>`
  const markup = `<div class="alert alert--${type}">${msg} ${close ? `<br/> ${closeBtn}` : ''}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, time * 1000);
};
showAlert('warning', 'Bem Vindo(a), preencha os campos muito cuidadosamente para não cometer erros. Contacte-nos se tiver alguma pergunta.<br/>Welcome, fill in the fields very carefully in order to not to make mistakes. Contact us if you have any questions.', 30, true)

//TODO: Verificar se algum campo é vazio
//TODO: Verificar se algum campo é invalido
if (formStep1) {
  formStep1.addEventListener("submit", (event) => {
    event.preventDefault();
    fields.applicantEmail = formStep1.querySelector("#email").value.trim();
    fields.applicantName = formStep1.querySelector("#name").value.trim();
    fields.subject = "HIO TECH EXPANSION PROGRAMME S012021";
    fields.birthDate = formStep1.querySelector("#birth_date").value.trim();
    fields.phoneNumber = formStep1.querySelector("#phone_number").value.trim();
    fields.address = formStep1.querySelector("#address").value.trim();
    fields.country = formStep1.querySelector("#country").value.trim();
    fields.city = formStep1.querySelector("#city").value.trim();
    fields.province = formStep1.querySelector("#province").value.trim();
    fields.zipCode = formStep1.querySelector("#zipcode").value.trim();

    formStep1.classList.add("form__invisible");
    formStep2.classList.remove("form__invisible");
  });
}
//TODO: usar os campos que falam sobre citar os nossos servicos e vantagens
if (formStep2) {
  formStep2.addEventListener("submit", (event) => {
    event.preventDefault();
    fields.skills = formStep2.querySelector("#skills").value.trim();
    fields.why = formStep2.querySelector("#why").value.trim();
    fields.services = formStep2.querySelector("#services").value.trim();
    fields.advantages = formStep2.querySelector("#advantages").value.trim();
    formStep2.querySelector("#submit").innerText = "Submetendo...";
    backButton.disabled = true;
    const subject = "HIO TECH EXPANSION PROGRAMME S012021";
    const body = `
      Nome: ${fields.applicantName};\n
      Data de nascimento: ${fields.birthDate};\n
      Número de celular: ${fields.phoneNumber};\n
      Email: ${fields.applicantEmail};\n
      Endereço: ${fields.address};\n
      Pais: ${fields.country};\n
      Cidade: ${fields.city};\n
      Provincia: ${fields.province};\n
      Código Postal: ${fields.zipCode};\n
      Habilidades: ${fields.skills};\n
      Porque: ${fields.why};\n
      Serviços: ${fields.services};\n
      Vantagens: ${fields.advantages};\n
    `;
    const autoReply = `Obrigado por se candidatar:
       \n\n
      ${fields.applicantName.split(" ")[0]},
       \n\n
      Obrigado por reservar um tempo para se candidatar ao nosso cargo. Agradecemos seu interesse em trabalhar na HIO TECH como <Angariador de Clientes>.
       \n\n
      No momento, estamos em processo de candidaturas para esta posição. Começaremos a fazer entrevistas nas próximas quatro semanas (apenas candidatos selecionados serão contactados). Se você for selecionado para continuar com o processo de entrevista, nosso departamento de recursos humanos entrará em contato com você até 20 de Junho de 2021.
       \n\n
      Obrigado,
       \n\n
      Helton Furau,
       \n\n
      CEO`;
    fetch("https://hiomail-api.herokuapp.com/api/v1/messages/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorName: fields.applicantName,
        visitorEmail: fields.applicantEmail,
        subject,
        body,
        autoReply,
        companyName: "HIO TECH, LDA",
        companyEmail: "recruitment@hiotech.co",
        companyUrl: "https://hiotech.co",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        formStep2.querySelector("#submit").innerText = "Submeter";
        backButton.disabled = false;

        showAlert('success', "A sua candidatura foi submetida! Verifique o seu e-mail, verifique também na aba promoções caso não encontre uma mensagem nossa.", 20, true);
        document.querySelectorAll('.form__input').forEach( e => e.value  = '');
      });
  });
}
if (backButton) {
  backButton.addEventListener("click", () => {
    formStep2.classList.add("form__invisible");
    formStep1.classList.remove("form__invisible");
  });
}
