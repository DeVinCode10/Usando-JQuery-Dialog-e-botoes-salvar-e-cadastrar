
<?php
//em php para usar sessões
//é necessário definir o session start 
//no inicio da página
session_start();

//tem que definir as session
//com algum valor em php
//$_SESSION["USR"] = "";

if (!isset($_SESSION["flash"])) {
 $_SESSION["flash"] = "";
}

//Função para passar mensagens entre páginas
function flash($mensagem){
	$_SESSION["flash"] = $mensagem;
}
//Informa se tem ou não flash
function tem_flash(){
	if ($_SESSION["flash"] <> "") {
		return true;
		}
	else{
		return false;
	}
}
//Função para ler o conteúdo da mensagem flash
function ler_flash(){
	if ($_SESSION["flash"] <> ""){
		return $_SESSION["flash"];
		}
	else{
		return false;
		}
}
//Função para ler o flash e limpar
function ler_flash_e_limpar(){
	
	$flash = ler_flash();

	$_SESSION["flash"] = ""; //limpou o flash
	return $flash;
}

//define variaveis para o valor vazio ("").
$ideia_enviada = $Messages = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$ideia_enviada = $_POST["ideia_enviada"];

	//aqui você implementa a sua lógica
	//de acesso ao banco de dados.

	//em caso de sucesso
	//se clicou no botão cadastar
	if($ideia_enviada == "1"){
		$Messages = "Os dados do projeto foram cadastrados na base. Você não poderá mais fazer alterações.";
	}
	else{ //se clicou no botão salvar
		$Messages = "Os dados do projeto foram salvos na base. Você ainda poderá fazer alterações nos dados, porém ao final você deverá clicar no botão cadastrar para efetivar o cadastro.";
	}

	$_SESSION["flash"] = $Messages;

}


?>

<!-- Declaração do tipo de documento html. Neste caso é HTML5 -->
<!doctype html>

<script>

</script>

<!-- importante! Definir a linguagem da página WEB -->
<html lang="pt-br">

<head>

    <meta charset="utf-8" />
	<!-- tem que ter em php aqui se não não estava funcionando -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
	
<META HTTP-EQUIV="Pragma" CONTENT="no-cache" />
<META HTTP-EQUIV="Expires" CONTENT="-1" />

    <meta name="description" 
 content="Nesta página veremos como implementar JQuery Dialog e botões salvar e cadastrar com mensagens Flash." />
    
    <meta name="author" content="DeVinCode" />

    <title>JQuery Dialog e Botões Salvar e Cadastrar com mensagens Flash</title>

    <!-- Bootstrap Core CSS -->
   <!-- Versão CSS compilada e minificada -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<link rel="stylesheet" href="cssexterno.css" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,300|Material+Icons'
     rel='stylesheet' type='text/css'>	
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
	
	<style>	
	
/*.container */

.header{

}
        
#page-content-wrapper{
position:relative;
/*top:25px;*/

}

body {
    word-wrap: break-word;
}

form{font-weight:bolder;}
    
.panel-title{
        
   font-size: 2.0rem;
}
        
</style>

	
</head>

<body  >

<div class="container-fluid header">
 <!-- -->
				
		

<!-- Page Content -->
        <div id="page-content-wrapper">

<!--  -->

<div class="container-fluid">

<!-- abaixo é como eu acrescento uma linha em branco
Não costumo usar <br /> quando uso bootstrap.
 -->
<div class="row">
	<div class="col-md-12">
	&nbsp;
	</div> <!-- fim col -->
</div>

<div class="row">&nbsp;</div>


	<div class="panel panel-info">
  <div class="panel-heading">
    <h1 class="panel-title" style="font-size: 2.5rem;">JQuery Dialog e Botões Salvar e Cadastrar com mensagens Flash</h1>
  </div>
  <div class="panel-body " style="background-color:#d9edf7;">

  

	
    <div class="col-md-12">
	<!-- data-validate -->
	<form name="formenvio" id="formenvio" action="<?=htmlspecialchars($_SERVER['PHP_SELF'])?>" class="form-horizontal"   method="post">

	
<div class="row">	<!-- class="col-xs-4 regula o tamanho da div e col-xs-offset-4-->
	<div class="col-xs-8 col-xs-offset-2">
		<div class="alert alert-warning output hidden">&nbsp;</div>
	</div>
</div>

<!-- Caso a unica coisa que vá utilizar
do Jquery ui seja um dialog você
pode pensar em utilizar o modal do
bootstrap para fazer a mesma tarefa -->

<div id="dialog-confirm" title="Cadastrar Projeto Inovador" style="display:none;background-color:#dff0d8;">
  <p style="background-color:#dff0d8;font-weight:bolder; "><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>Caso Confirme o cadastro, você não poderá fazer mais alterações no projeto.<br /> Você realmente quer confirmar?</p>
</div>


<?php 

	
	if (tem_flash()) {
	// são divs então é só estilizar
	//ex: width:50% e depois ajusta a posição
	?>
		<div style="font-weight:bolder;font-size: 100%;"
		 id="alert" class="alert alert-danger">
			<button type="button" class="close" 
			data-dismiss="alert" aria-hidden="true">&times;</button>
			<?php 
			echo ler_flash_e_limpar();		
			?>
		</div>
	<?php  
	}
	?>


	<div class="form-group has-success">
    <label for="NO_Titulo"  class="col-sm-2 control-label">Nome do projeto: </label>
    <div class="col-sm-9">
      <input type="text" value="" class="form-control" 
      placeholder="Nome do projeto com até 100 caracteres."
	  data-required data-msg='O campo "Nome do projeto" é obrigatório.'
	   id="NO_Titulo" name="NO_Titulo" >
	  
    </div>
  </div>


  <div class="form-group has-success">
    <label for="TX_Resumo_Ideia" class="col-sm-2  control-label">Resumo do projeto:</label>
    <div class="col-sm-9">
      <textarea data-required data-msg='O campo "Resumo" é de preenchimento obrigatório.' 
	  class="form-control textarea-scrollbar scrollbar-outer" rows="5"
name="TX_Resumo_Ideia"  id="TX_Resumo_Ideia" 
placeholder="Resuma o projeto aqui com até 400 caracteres."></textarea>

    </div>
  </div>
  
  
    
  <hr />
    
<div class="row">
	<div class="col-sm-2">
		  <div  class="form-group">
			<div class="col-sm-2 ">
			  <button id="salvaformprincipal" data-salvacadastra="0" 
			  data-tooltip title="Salva os dados para envio futuro."  
			  type="button"  class="btn btn-warning btn-lg">Salvar</button> 
			</div> 
		  </div>
	 </div>
	  
	  <div class="col-sm-2">
		  <div  class="form-group">
			<div class="col-sm-2 ">
			  <button id="cadastraformprincipal" data-salvacadastra="1" 
			  data-tooltip title="Use este botão para cadastrar sua ideia."  
			  type="button"  class="btn btn-danger btn-lg">Cadastrar</button> 
			</div> 
		  </div>
	  </div>
	  
	  <input type='hidden' name = "ideia_enviada" id="ideia_enviada" value="" /> 
	  
  
</div>
  

</form>
	
	
	</div>
	
	
	

	
  </div> <!-- fim panelbody principal-->
</div> <!-- fim panel principal -->

<?php 

	
	if (tem_flash()) {
	?>
		<div style="font-weight:bolder;font-size: 100%;" id="alert" class="alert alert-danger">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
			<?php
			//mostra a mensagem de flash
			//e já limpa o flash
			echo ler_flash_e_limpar();		
			?>
		</div>
	<?php  
	}
	?>

</div> <!-- container -->
		
<!-- Abaixo mostra mensagem, caso o navegador
seja o internet explorer, para o usuário escolher
outro navegador. Caso seja necessário em seus projetos.
 -->		

<!-- js -->

	

</div> <!-- fim  Page Content  id="page-content-wrapper 	-->
	
	
	<!-- jQuery -->
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>



	<!-- Bootstrap Core JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>	



<!-- jquery-ui.js poe abaixo do bootstrap js para o x aparecer -->
<!--página -> https://jqueryui.com/dialog/#modal-confirmation -->
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

            
</div> <!--<div class="container-fluid"> -->
 
<script src="jsexterno.js"></script>

<script type="text/javascript">

$(document).ready(function(){

//alert("cx");


	//aqui eu pensei, já que os dois botões fazem a
	// mesma coisa, pq não ter uma função só
	//aí pensei em pesquisar no google. Jquery 
	//como selecionar 2 elementos. só achei besteira.
	//aí coloquei jquery how to select two elements. 
	//o primeiro resultado já resolveu meu problema
	//https://api.jquery.com/multiple-selector/
	
	$('#cadastraformprincipal,#salvaformprincipal').on('click', function(e){
		//executa as mesmas coisas ao selecionar ou
		//o botão salvar ou o botão enviar

		//alert($(this).closest("form").html());					

		//pega o botão clicado
		var btn = jQuery(this);		
			
		 if (btn.data("salvacadastra")=='1'){

            //usa JQuery UI. é melhor usar sem Bootstrap
            //alert("oi");
            $("#dialog-confirm").dialog({

                resizable: false,

                height: "auto",

                width: 400,

                modal: true,

                buttons: {

                    "OK": function() {

                    $( this ).dialog( "close" );

                    cadastrarSalvar(btn);
                    

                }, 

                "Cancelar": function() {

                $( this ).dialog( "close" );

                //return false;

                }//fim cancelar

            }//fim buttons

        });

    }

                               
    //se clicou no botão salvar
    //não tem caixa de confirmação
    if (btn.data("salvacadastra") == '0'){

        //0 É SALVAR: CHAMA A FUNÇÃO DIRETO
		//SEM tela de confirmação. ok?
        cadastrarSalvar(btn);
        
    }
	
 });

 

 function cadastrarSalvar(btn){


 			//Seja qual for o botão
			//põe o valor do atributo data-salvacadastra
			//do botão clicado como o valor do input
			//hidden de id=ideia_enviada
			$('#ideia_enviada').val(btn.data("salvacadastra"));
		//}
		//alert($('#ideia_enviada').val());
	
		
	var caracteresDigitados;

	//$(this).closest("element") procura o primeiro
	//element ancestral do elemento atual, no caso o 
	//formulario ancestral de $(this)  
	//var el_form = $(this).closest("form");
	
	//O $(this) foi trocado por btn aqui
	//já que btn foi passado como parametro
	//de qualquer forma
	var el_form = btn.closest("form");
		//Encontra o elemento no form com a classe  output para mostrar a mensagem
	var el_form_output = $(el_form.find(".output"));
	el_form_output.html("");//Limpa qualquer mensagem anterior do elemento que mostra a mensagem
	var messagess = [];
		
		caracteresDigitados = parseInt($("#NO_Titulo").val().length);
		//alert(caracteresDigitados);
		//muda para 5 aqui para testar
		if(caracteresDigitados>100){
		
			messagess.push("Somente 100 caracteres são permitidos no campo nome do projeto.");
		}
		
		caracteresDigitados = parseInt($("#TX_Resumo_Ideia").val().length);
		//alert(caracteresDigitados);
		
		if(caracteresDigitados>400){
		
			messagess.push("Somente 400 caracteres são permitidos no campo resumo.");
		}
		
	

		//alert(messagess.length);
		//abaixo ver se tem mensagens aqui e nem mostra as outras mensagens que apareceriam pelo arquivo bootstrap.min.js
		if (messagess.length > 0) {
				var output_html = "";

				$.each(messagess, function(index, value){
					output_html += "<li>" + value + "</li>";
				});

				el_form_output.html("<ul>" + output_html + "</ul>");

				el_form_output.show(0);
				el_form_output.removeClass("hidden");
				
				// a função animate está no jsexterno.js
				//aqui passamos o elemento a animar
				//e o tipo de animação
				//veja a função animate mais abaixo
				//para ver os outros tipos deanimações
				animate(el_form_output, "pulse");
				
			} 					  		  
		  else {
				//$(el_form).find(':submit').data('disabled', 'disabled');
                //acima é o código que ficaria ao usar o botão input type=submit
              //mas como estamos usando button o código está abaixo
				$(this).data('disabled', 'disabled');				
				//código de validação que é comum
                //a vários forms do site é 
                validateClick($(el_form));
				


                // Aqui pode haver um código ajax que 
                //chama a página que inclui os dados na base
                //depois vem a mensagem de sucesso (ou não)
                //pelo notify. neste caso o form não seria submetido
                // e nem usaria o  validateClick($(el_form))
                /*
                
                abaixo é para testar o notify
                //Mas no modelo de código usado não funciona
                //pois submetemos o form no validateclick
                //ou em caso de não validação dou return false
                
                if(el_form_output.hasClass("hidden")){
	                if (btn.data("salvacadastra")=='0'){
						notify("Os dados foram salvos com sucesso !!!")
					}
					if (btn.data("salvacadastra")=='1'){
						notify("Os dados foram cadastrados com sucesso !!!")
					}
				}
				*/

			}//fim else (para messagess.length <= 0).

 }//fim funcao salvaCadatra
	
		
});

</script>

<script>
	$(document).ready(function(){
	  animate("#alert", "bounceInDown");
	 //new PerfectScrollbar('#meubody');
	});
</script>               

</body>


</html>






