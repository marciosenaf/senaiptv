var notifyTimeout,notifyRemoveTimeout;function produce_native_notify(msg,type='msg',time=5000,callback=false){window.clearTimeout(notifyTimeout);window.clearTimeout(notifyRemoveTimeout);$('.shion_native_notify_system').remove();let textoContexto='';let title='';if(type=='msg'){title='mensagem';}else if(type=='alert'){title='alerta!';}else if(type=='error'){title='oops.. houve um erro';}else{title='sucesso!';}
textoContexto+=`
	<section class="shion_native_notify_system show ${type}">
		<header class="SNNS_header">
			${title}
		</header>
		<section class="SNNS_content">
			${msg}
		</section>
	</section>`;$('body').append(textoContexto);notifyTimeout=setTimeout(()=>{$('.shion_native_notify_system').removeClass('show').addClass('hide');notifyRemoveTimeout=setTimeout(()=>{$('.shion_native_notify_system').remove();if(callback){callback();}},700);},time);}