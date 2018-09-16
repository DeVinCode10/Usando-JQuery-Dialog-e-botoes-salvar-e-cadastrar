


// ../src/js/humane.min.js
;
/**
 * humane.js
 * Humanized Messages for Notifications
 * @author Marc Harter (@wavded)
 * @example
 *   humane.log('hello world');
 * @license MIT
 * See more usage examples at: http://wavded.github.com/humane-js/
 */

 /* Resolví não usar notify nesta aula
 caso queiram testar basta descomentar
!function(name,context,definition){if(typeof module!=="undefined")module.exports=definition(name,context);else if(typeof define==="function"&&typeof define.amd==="object")define(definition);else context[name]=definition(name,context)}("humane",this,function(name,context){var win=window;var doc=document;var ENV={on:function(el,type,cb){"addEventListener"in win?el.addEventListener(type,cb,false):el.attachEvent("on"+type,cb)},off:function(el,type,cb){"removeEventListener"in win?el.removeEventListener(type,cb,false):el.detachEvent("on"+type,cb)},bind:function(fn,ctx){return function(){fn.apply(ctx,arguments)}},isArray:Array.isArray||function(obj){return Object.prototype.toString.call(obj)==="[object Array]"},config:function(preferred,fallback){return preferred!=null?preferred:fallback},transSupport:false,useFilter:/msie [678]/i.test(navigator.userAgent),_checkTransition:function(){var el=doc.createElement("div");var vendors={webkit:"webkit",Moz:"",O:"o",ms:"MS"};for(var vendor in vendors)if(vendor+"Transition"in el.style){this.vendorPrefix=vendors[vendor];this.transSupport=true}}};ENV._checkTransition();var Humane=function(o){o||(o={});this.queue=[];this.baseCls=o.baseCls||"humane";this.addnCls=o.addnCls||"";this.timeout="timeout"in o?o.timeout:2500;this.waitForMove=o.waitForMove||false;this.clickToClose=o.clickToClose||false;this.timeoutAfterMove=o.timeoutAfterMove||false;this.container=o.container;try{this._setupEl()}catch(e){ENV.on(win,"load",ENV.bind(this._setupEl,this))}};Humane.prototype={constructor:Humane,_setupEl:function(){var el=doc.createElement("div");el.style.display="none";if(!this.container){if(doc.body)this.container=doc.body;else throw"document.body is null"}this.container.appendChild(el);this.el=el;this.removeEvent=ENV.bind(function(){var timeoutAfterMove=ENV.config(this.currentMsg.timeoutAfterMove,this.timeoutAfterMove);if(!timeoutAfterMove){this.remove()}else{setTimeout(ENV.bind(this.remove,this),timeoutAfterMove)}},this);this.transEvent=ENV.bind(this._afterAnimation,this);this._run()},_afterTimeout:function(){if(!ENV.config(this.currentMsg.waitForMove,this.waitForMove))this.remove();else if(!this.removeEventsSet){ENV.on(doc.body,"mousemove",this.removeEvent);ENV.on(doc.body,"click",this.removeEvent);ENV.on(doc.body,"keypress",this.removeEvent);ENV.on(doc.body,"touchstart",this.removeEvent);this.removeEventsSet=true}},_run:function(){if(this._animating||!this.queue.length||!this.el)return;this._animating=true;if(this.currentTimer){clearTimeout(this.currentTimer);this.currentTimer=null}var msg=this.queue.shift();var clickToClose=ENV.config(msg.clickToClose,this.clickToClose);if(clickToClose){ENV.on(this.el,"click",this.removeEvent);ENV.on(this.el,"touchstart",this.removeEvent)}var timeout=ENV.config(msg.timeout,this.timeout);if(timeout>0)this.currentTimer=setTimeout(ENV.bind(this._afterTimeout,this),timeout);if(ENV.isArray(msg.html))msg.html="<ul><li>"+msg.html.join("<li>")+"</ul>";this.el.innerHTML=msg.html;this.currentMsg=msg;this.el.className=this.baseCls;if(ENV.transSupport){this.el.style.display="block";setTimeout(ENV.bind(this._showMsg,this),50)}else{this._showMsg()}},_setOpacity:function(opacity){if(ENV.useFilter){try{this.el.filters.item("DXImageTransform.Microsoft.Alpha").Opacity=opacity*100}catch(err){}}else{this.el.style.opacity=String(opacity)}},_showMsg:function(){var addnCls=ENV.config(this.currentMsg.addnCls,this.addnCls);if(ENV.transSupport){this.el.className=this.baseCls+" "+addnCls+" "+this.baseCls+"-animate"}else{var opacity=0;this.el.className=this.baseCls+" "+addnCls+" "+this.baseCls+"-js-animate";this._setOpacity(0);this.el.style.display="block";var self=this;var interval=setInterval(function(){if(opacity<1){opacity+=.1;if(opacity>1)opacity=1;self._setOpacity(opacity)}else clearInterval(interval)},30)}},_hideMsg:function(){var addnCls=ENV.config(this.currentMsg.addnCls,this.addnCls);if(ENV.transSupport){this.el.className=this.baseCls+" "+addnCls;ENV.on(this.el,ENV.vendorPrefix?ENV.vendorPrefix+"TransitionEnd":"transitionend",this.transEvent)}else{var opacity=1;var self=this;var interval=setInterval(function(){if(opacity>0){opacity-=.1;if(opacity<0)opacity=0;self._setOpacity(opacity)}else{self.el.className=self.baseCls+" "+addnCls;clearInterval(interval);self._afterAnimation()}},30)}},_afterAnimation:function(){if(ENV.transSupport)ENV.off(this.el,ENV.vendorPrefix?ENV.vendorPrefix+"TransitionEnd":"transitionend",this.transEvent);if(this.currentMsg.cb)this.currentMsg.cb();this.el.style.display="none";this._animating=false;this._run()},remove:function(e){var cb=typeof e=="function"?e:null;ENV.off(doc.body,"mousemove",this.removeEvent);ENV.off(doc.body,"click",this.removeEvent);ENV.off(doc.body,"keypress",this.removeEvent);ENV.off(doc.body,"touchstart",this.removeEvent);ENV.off(this.el,"click",this.removeEvent);ENV.off(this.el,"touchstart",this.removeEvent);this.removeEventsSet=false;if(cb&&this.currentMsg)this.currentMsg.cb=cb;if(this._animating)this._hideMsg();else if(cb)cb()},log:function(html,o,cb,defaults){var msg={};if(defaults)for(var opt in defaults)msg[opt]=defaults[opt];if(typeof o=="function")cb=o;else if(o)for(var opt in o)msg[opt]=o[opt];msg.html=html;if(cb)msg.cb=cb;this.queue.push(msg);this._run();return this},spawn:function(defaults){var self=this;return function(html,o,cb){self.log.call(self,html,o,cb,defaults);return self}},create:function(o){return new Humane(o)}};return new Humane});


// notify
function notify(message) {
    var notify = humane.create({ timeout: 4000, baseCls: 'humane-original' });
    notify.clickToClose = true;
    notify.waitForMove = true;

    notify.log(message);
}

*/


//VALIDAÇÃO COM OUTROS CAMPOS

	function  validateClick(el_form){
	//$("*[data-validate]").not($("form[data-validate]")).click(function(){

	var REGEXES = {
		numero_ce: /(^([0-9]|)([0-9]|)([0-9]|)[0-9]\/[2][0][1-9][0-9])/,
		numero_desembolso: /(^([0-9]|)([0-9]|)([0-9]|)([0-9]|)([0-9]|)[0-9]\/[2][0][1-9][0-9])/,
        only_letters:new RegExp("^[a-zA-Z]+$"),
        letras:new RegExp("^[a-zA-Z]+$"),
        email:new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"),
        url:new RegExp("([0-9a-zA-Z-]+.)+[a-zA-Z]{2,6}(:[0-9]+)?(/S*)?$"),
        decimal:new RegExp("^[-+]?[0-9]*.?[0-9]+$"),
        dinheiro:new RegExp("^[-+]?[0-9]*.?[0-9]+$"),
		//dinheirocompontoevirgula:/(^(\d{1,3}){1}((\.?)\d{3})*(\,\d{2})?$)/, 
		dinheirocompontoevirgula:/(^(\d{1,3}){1}((\.?)\d{3})*(\,\d{2}|)(\,\d{1})?$)/, 
		//("d{1,3}(.d{3})*(,d{2})?"),
        text_and_numbers:new RegExp("[A-Za-z0-9 ]+"),
        texto_e_numeros:new RegExp("[A-Za-z0-9 ]+"),
        text:new RegExp("[A-Za-z0-9 ]+"),
        texto:new RegExp("[A-Za-z0-9 ]+"),
		time:new RegExp("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$"),
        horario:new RegExp("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$"),
		horarioComSegundo:new RegExp("^([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$"),
        //time:new RegExp("^([0-2][0-9]):([0-5][0-9])$"),
        //horario:new RegExp("^([0-2][0-9]):([0-5][0-9])$"),
		noregistroar: new RegExp("[A-Za-z]{2}[0-9]{9}[A-Za-z]{2}"),
        integer:new RegExp("^[0-9]+$"),
        inteiro:new RegExp("^[0-9]+$"),
        numero:new RegExp("^[0-9]+$"),
		//integer:new RegExp("^[0-9]*"),
		telefone: /(^((\d{11})|(\d{10}))$)/, // correta funciona
		axfcontrato: /(^(\d{4})(\/)(\d{4})$)/, // correta funciona
		onzenumeros: /(^\d{11}$)/, // correta funciona
		cnpj: /(^\d{14}$)/, // correta funciona. somente numeros
		umoudoisnumeros: /(^((\d{1})|(\d{2}))$)/, 
		
		usrempresa: /(^([X|x])(\d{5})$)/, //ou /(^([Xx])(\d{5})$)/,
        
		cpf: /^d{3}.d{3}.d{3}-d{2}$/,
        date: /^((((0?[1-9]|1\d|2[0-8])\/(0?[1-9]|1[0-2]))|((29|30)\/(0?[13456789]|1[0-2]))|(31\/(0?[13578]|1[02])))\/((19|20)?\d\d))$|((29\/0?2\/)((19|20)?(0[48]|[2468][048]|[13579][26])|(20)?00))$/,
        data: /^((((0?[1-9]|1\d|2[0-8])\/(0?[1-9]|1[0-2]))|((29|30)\/(0?[13456789]|1[0-2]))|(31\/(0?[13578]|1[02])))\/((19|20)?\d\d))$|((29\/0?2\/)((19|20)?(0[48]|[2468][048]|[13579][26])|(20)?00))$/,
		//datas até 2100
		datahora: /^((((0?[1-9]|1\d|2[0-8])\/(0?[1-9]|1[0-2]))|((29|30)\/(0?[13456789]|1[0-2]))|(31\/(0?[13578]|1[02])))\/((19|20)?\d\d))( ([0-1][0-9]|[2][0-3]):([0-5][0-9]))$|((29\/0?2\/)((19|20)?(0[48]|[2468][048]|[13579][26])|(20)?00))( ([0-1][0-9]|[2][0-3]):([0-5][0-9]))$/,
		datahoraComSegundo: /^((((0?[1-9]|1\d|2[0-8])\/(0?[1-9]|1[0-2]))|((29|30)\/(0?[13456789]|1[0-2]))|(31\/(0?[13578]|1[02])))\/((19|20)?\d\d))(\s([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9]))$|((29\/0?2\/)((19|20)?(0[48]|[2468][048]|[13579][26])|(20)?00))(\s([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9]))$/

	};	//fim das expressões regulares	

        //var el_form = $(this).closest("form");
        var el_form_output = $(el_form.find(".output"));
        el_form_output.html("");

        var messages = [];

		//abaixo para controlar as variaveis do radio e do checkbox
		var validacampo = true;//controla que valida um grupo de opções e não cada option
		var verificanomedoradiocheckbox="";
		//var peganameradioscheckboxcheckbox="options";
		
		validacampotudojunto = true;
		var verificasetudojunto = "";

        //el_form.find("input, textarea, select").not("[type=radio],[type=checkbox]").each(function(){ * este é util para o caso não querermos o input de tipo radio ou checkbox
		//mas decidi colocar dentro do codigo
        //el_form.find("input, textarea, select").not("[type=radio],[type=checkbox]").each(function(){ * este é util para o caso não querermos o input de tipo radio ou checkbox
		//mas decidi colocar dentro do codigo
		el_form.find("input, textarea, select").each(function(){
		
			//alert("hllh")
			
            var el_field = $(this);
			
            var el_field_name = el_field.attr("name");
            var el_field_val = $.trim(el_field.val());
            var el_field_message = el_field.data("msg");
			//abaixo testa o nome do campo
			//alert(el_field_name);
			//abaixo testa o tamanho do campo
			//alert(el_field_name.length);
            if (el_field.is(":disabled")) {
              return;
            }

            if (el_field_message === undefined) {
                el_field_message = "Preencha o campo " + el_field_name + " corretamente";
            }

            if (el_field.data("required") == undefined && el_field_val === "") {
                return;
            }

            // o requerimento é testado aqui
            if (el_field.data("required") !== undefined && el_field_val === "") {
                messages.push(el_field_message);
                return;
            }

            //aqui testa o formato do campo 
            //com a expressão regular definida
            //no atributo data-rule do campo
            if (REGEXES[el_field.data("rule")] !== undefined && REGEXES[el_field.data("rule")].test(el_field_val) === false) {
                messages.push(el_field_message);
                return;
            }
			
			
			//lógica diferenciada para checkbox

			if ( (el_field.attr('type')=="checkbox")){
				//alert(el_field.attr('type'));
				/*
				if(ggg<3){
					alert(el_field.data("validatudojunto"));
					ggg++;
				}
				
				*/
				
				if(el_field.data("validatudojunto")== undefined){
				
				
				
				//alert(existe);
				//atualiza o name atual do checkbox ou radio
				var peganameradioscheckbox = el_field_name;  //el_field.attr('name')
				
				// se está no mesmo grupo de radio ou checkbox não valida pois já houve uma verificação de check para o grupo => //** definimos validacampo = false;
				if (verificanomedoradiocheckbox == peganameradioscheckbox){
					
				validacampo = false;
							
				}
				else{
							
					validacampo = true;
				}
				
				//Passa o name de radio ou checkbox em peganameradioscheckbox para a variável de controle verificanomedoradiocheckbox			
				verificanomedoradiocheckbox = peganameradioscheckbox; 
				
				//alert(verificanomedoradiocheckbox);
				//alert(el_field.attr("name").replace("[]","").length);
				//alert(el_field_name.replace("[]","").length);
							
				
					if (validacampo == true){ 
					
					//alert(existe);
						if($("input:checkbox[name='" + verificanomedoradiocheckbox + "']").data("required") !== undefined){
							//alert($("input:checkbox[name='" + verificanomedoradiocheckbox + "']:checked").length);
							//mostra mensagem se o length for menor que 1
							if ($("input:checkbox[name='" + verificanomedoradiocheckbox + "']:checked").length<1){
							el_field_message = $("input:checkbox[name='" + verificanomedoradiocheckbox + "']").data("msg");
							//adiciona mensagem.
							messages.push(el_field_message);
							}
						}
					
					}//fim if valida campo
				
				
				}//Fim if data-validatudojunto = undefined
				
				//o else é para validar diferentes
				//grupos de checkbox como um só
				//caso tenham o atributo 
				//data-validatudojunto com o mesmo valor
				//Em outro video eu mostro como funciona.
				else{
					
					
				//atualiza o name atual do checkbox ou radio
				var pegavalorvalidatudojunto = el_field.data("validatudojunto");  //el_field.attr('name')
				
				// se está no mesmo grupo de radio ou checkbox não valida pois já houve uma verificação de check para o grupo => //** definimos validacampo = false;
				if (verificasetudojunto == pegavalorvalidatudojunto){
					
				validacampotudojunto = false;
							
				}
				else{
							
					validacampotudojunto = true;
				}
				
				//Passa o name de radio ou checkbox em peganameradioscheckbox para a variável de controle verificasetudojunto			
				verificasetudojunto = pegavalorvalidatudojunto;
					/*
					if(ggg<3){
						alert($("input:checkbox[data-validatudojunto='" + verificasetudojunto + "']:checked").length);
						ggg++;
					}
					*/
					
					
					if (validacampotudojunto == true){ 
				
						if($("input:checkbox[data-validatudojunto='" + verificasetudojunto + "']").data("required") !== undefined){
							//alert($("input:checkbox[name='" + verificanomedoradiocheckbox + "']:checked").length);
							//mostra mensagem se o length for menor que 1
							if ($("input:checkbox[data-validatudojunto='" + verificasetudojunto + "']:checked").length<1){
							el_field_message = $("input:checkbox[data-validatudojunto='" + verificasetudojunto + "']").data("msg");
							//adiciona mensagem.
							messages.push(el_field_message);
							}
						}
				
					}//fim if valida campo
					
				}//fim else data-validatudojunto  = undefined								
				//alert("kchkkkkki");
				
			}//fim if checkbox 
			

			//lógica diferenciada para elementos radio
			if ((el_field.attr('type')=="radio")) {
			
				//atualiza o name atual do checkbox ou radio
				var peganameradioscheckbox = el_field_name;  //el_field.attr('name')
				
				// se está no mesmo grupo de radio ou checkbox não valida pois já houve uma verificação de check para o grupo => //** definimos validacampo = false;
				if (verificanomedoradiocheckbox == peganameradioscheckbox){
					
				validacampo = false;
							
				}
				else{
							
					validacampo = true;
				}
				
				//Passa o name de radio ou checkbox em peganameradioscheckbox para a variável de controle verificanomedoradiocheckbox			
				verificanomedoradiocheckbox = peganameradioscheckbox; 
				
				if (validacampo == true){ 
				
				//alert(existe);
					if($("input:radio[name='" + verificanomedoradiocheckbox + "']").data("required") !== undefined){
						//alert($("input:radio[name='" + verificanomedoradiocheckbox + "']:checked").length);
						//mostra mensagem se o length for menor que 1
						if ($("input:radio[name='" + verificanomedoradiocheckbox + "']:checked").length<1){
							el_field_message = $("input:radio[name='" + verificanomedoradiocheckbox + "']").data("msg");
							//adiciona mensagem.
							messages.push(el_field_message);
						}
					}
					//alert(el_field.attr('type'));
				
				}//fim if valida campo
				
				
			}//fim radio
			
        });////fim el_form.find("input, textarea, select").each(function(){///

		//Atribui mensagens de erro de validação.
		//Caso existam não submete o form.
        if (messages.length > 0) {
            var output_html = "";

            $.each(messages, function(index, value){
                output_html += "<li>" + value + "</li>";
            });

            el_form_output.html("<ul>" + output_html + "</ul>");

            el_form_output.show(0);
            el_form_output.removeClass("hidden");
            //chama a função animate
            animate(el_form_output, "bounceIn");
			
            return false;
        } else {
        //Envia o form se está tudo certo.
            //$(el_form).find(':button').attr('disabled', 'disabled');
            el_form_output.hide(0);
			el_form.submit();
			return true;
        }
			//alert("só para testar se o código chega aqui");
		}//fim validateclick


// animate ->serve também para mostrar
//flash messages em código de back-end

function animate(el, animation){
	//alert("teste bounce");
    /* Options: "bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig", "flip", "flipInX", "flipInY", "flipOutX", "flipOutY", "lightSpeedIn", "lightSpeedOut", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "slideInUp", "slideInDown", "slideInLeft", "slideInRight", "slideOutUp", "slideOutDown", "slideOutLeft", "slideOutRight", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp", "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp", "hinge", "rollIn", "rollOut" */
    $(el).addClass(animation + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(el).removeClass(animation + ' animated');
    });
};