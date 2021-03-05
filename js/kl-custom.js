;(function($){
	"use strict";

	$(document).ready(function() {

		// Your JS & jQuery Code here
		const form = document.querySelector('.contact_form')

		if(form){
			form.addEventListener('submit', e => {
				e.preventDefault();
				form.querySelector('button').innerText = "Enviando..."
				
				const visitorFirstName = form.querySelector('#cf_name-pop-up').value.trim()
				const visitorSurname = form.querySelector('#cf_lastname-pop-up').value.trim()
				const visitorEmail = form.querySelector('#cf_email-pop-up').value.trim()
				const subject = form.querySelector('#cf_subject-pop-up').value.trim()
				const body = form.querySelector('#cf_message-pop-up').value.trim()
		
				if(visitorFirstName && visitorSurname && visitorEmail && subject && body)
					fetch("https://hiomail-api.herokuapp.com/api/v1/messages/send",
						{
							method: "POST", headers: {
								'Content-Type': 'application/json',
							}, body: JSON.stringify({
								visitorName: `${visitorFirstName} ${visitorSurname}`,
								visitorEmail,
								subject,
								body,
								companyName: "HIO TECH, Lda.",
								companyEmail: "info@hiotech.co",
								companyUrl: "https://hiotech.co",
								autoReply: "recebemos a tua mensagem, iremos retornar assim que possível"
							})
						}
					).then(res => res.json()).then(data => {
						form.querySelector('button').innerText = "Enviar"
						alert("A tua mensagem foi enviada!")

					})
				else
					form.querySelector('button').innerText = "Enviar"
					alert("Por favor preencha todos os dados!")
		
				
			})
		}
	});// end of document ready

})(jQuery);