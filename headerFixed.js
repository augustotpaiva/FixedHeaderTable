(function($){
	
	/*
		Este plugin visa estabelecer um header fixo de uma tabela enquanto seus dados permanecem com a barra de rolagem.
		A ideia por trás da mágica é basicamente:
			- um clone da tabela original (Necessário pois todos os tds da table é o que moldam suas dimensoes) para um elemento que apenas apresentará o header da listagem original
			- na table original é escondido o header com margin negativo
	*/
	$.fn.headerFixed = function(altura_original_content){
		
		$(this).closest('div').height(altura_original_content).css('overflow-y', 'auto');//seta a altura para o div container da table
		
		var headFixed = '<div id="headFixed"></div>';//elemento que receberá o header para estar fixo
		$(headFixed).insertBefore($(this).closest('div'));//adicionando o elemento antes do container da listagem original
		
		$('#headFixed').html($(this).clone());//elemento fixo recebe o clone
		$('#headFixed').height($(this).find('thead').height());//recebe altura do header
		$('#headFixed').width($(this).closest('div').width());//recebe largura do container da listagem original
		$(this).css('margin-top', $(this).find('thead').height()*-1);//esconde o header da listagem original com margin top negativo
		
		//se existe scroll na listagem original, coloca scroll no header fixo também
		//isso evita que as larguras das colunas se difiram
		if($(this).height() > $(this).closest('div').height()){
			$('#headFixed').css('overflow-y', 'auto');
			$('#headFixed').css('overflow-x', 'hidden');
		}
		else{
			$('#headFixed').css('overflow', 'hidden');//esconde scrool
		}
		
		console.log($(this).height());
		console.log($(this).closest('div').height());
		
		//efetua scrool left no header
		$(this).closest('div').on('scroll', function(){
			$('#headFixed').scrollLeft($(this).closest('div').scrollLeft());
		});
		
		//bloqueia o scroll do header fixed sempre para no topo
		$('#headFixed').on('scroll', function(){
			$(this).scrollTop(0);
		});
	}
	
	/*
		Além da funcionalidade do plugin acima, este tem o objetivo de fixar a primeira coluna também
	*/
	$.fn.headerAndFcolFixed = function(altura_original_content){
		$(this).closest('div').height(altura_original_content).css('overflow-y', 'auto');//seta a altura para o div container da table
		
		var MasterContainer = '<div id="MasterContainerTable"></div>';//elemento master container
		$(MasterContainer).insertBefore($(this).closest('div'));//adicionando o elemento master container
		
		var headFixed		= '<div id="headFixed"></div>';//elemento que receberá o header para estar fixo
		var FixedContainer	= '<div id="tableContainerFixed"></div>';//elemento que receberá a table original e a coluna para estarem fixos
		
		$('#MasterContainerTable').html(headFixed+FixedContainer);//criando headFixed dentro do MasterContainer
		
		var colFixed		= '<div id="colFixed" style="float:left;"></div>';//elemento que receberá a primeira coluna para estar fixa
		$('#tableContainerFixed').html(colFixed);//criando colFixed dentro do MasterContainer
		$(this).closest('div').insertAfter('#colFixed');//Inserindo table original dentro do MasterContainer
		
		$('#headFixed, #colFixed').html($(this).clone());//elementos fixos recebem os clones
		$('#headFixed').height($(this).find('thead').height()).width($(this).closest('div').width());//recebe altura do header
		
		
		//calcula largura "correta" da coluna
		var larguraColFixed = $(this).find('thead tr th').eq(0).width();
		larguraColFixed += isNaN(parseInt($(this).find('thead tr th').eq(0).css('paddin-left'))) ? 0 : parseInt($(this).find('thead tr th').eq(0).css('paddin-left'));
		larguraColFixed += isNaN(parseInt($(this).find('thead tr th').eq(0).css('paddin-right'))) ? 0 : parseInt($(this).find('thead tr th').eq(0).css('paddin-right'));
		larguraColFixed += isNaN(parseInt($(this).find('thead tr th').eq(0).css('border-left-width'))) ? 0 : parseInt($(this).find('thead tr th').eq(0).css('border-left-width'));
		larguraColFixed += isNaN(parseInt($(this).find('thead tr th').eq(0).css('border-right-width'))) ? 0 : parseInt($(this).find('thead tr th').eq(0).css('border-right-width'));
		larguraColFixed += isNaN(parseInt($(this).css('border-width'))) ? 0 : parseInt($(this).css('border-width'))*2;
		
		$('#colFixed').width(larguraColFixed);//recebe largura da primeira coluna da listagem original
		$('#colFixed').height($('#tableContainerFixed').height());//recebe altura do container fixed
		
		$(this).css('margin-top', $(this).find('thead').height()*-1);//esconde o header da listagem original com margin top negativo
		$(this).css('margin-left', larguraColFixed*-1);//esconde a primeira col da listagem original com margin left negativo
		$('#colFixed table').css('margin-top', $(this).find('thead').height()*-1);//esconde o header da listagem original e da colfixed com margin top negativo
		$(this).closest('div').width($(this).closest('div').width() - larguraColFixed);//subtraindo da listagem original a largura da colfixed
		
		//$('#headFixed, #colFixed').css('overflow', 'hidden');//esconde scrool
		
		//se existe scroll na listagem original, coloca scroll no header fixo
		//isso evita que as larguras e alturas das colunas se difiram
		if($(this).height() > $(this).closest('div').height()){
			$('#headFixed').css('overflow-y', 'auto');
			$('#headFixed').css('overflow-x', 'hidden');
		}
		else{
			$('#headFixed').css('overflow', 'hidden');//esconde scrool
		}
		
		//se existe scroll na listagem original, coloca scroll na col fixa
		//isso evita que as larguras e alturas das colunas se difiram
		if($(this).width()-larguraColFixed > $(this).closest('div').width()){
			$('#colFixed').css('overflow-y', 'hidden');
			$('#colFixed').css('overflow-x', 'auto');
		}
		else{
			$('#colFixed').css('overflow', 'hidden');//esconde scrool
		}
		
		//efetua scrool left no header
		$(this).closest('div').on('scroll', function(){
			$('#headFixed').scrollLeft($(this).closest('div').scrollLeft());
			$('#colFixed').scrollTop($(this).closest('div').scrollTop());
		});
		
		//bloqueia o scroll do header fixed sempre para o topo
		$('#headFixed').on('scroll', function(){
			$(this).scrollTop(0);
		});
		
		//bloqueia o scroll do col fixed sempre para a esquerda
		$('#colFixed').on('scroll', function(){
			$(this).scrollLeft(0);
		});
	}
})(jQuery);




















