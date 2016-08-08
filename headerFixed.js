(function($){
	
	/*
		Este plugin visa estabelecer um header fixo de uma tabela enquanto seus dados permanecem com a barra de rolagem.
		A ideia por trás da mágica é basicamente:
			- um clone da tabela original (Necessário pois todos os tds da table é o que moldam suas dimensoes) para um elemento que apenas apresentará o header da listagem original
			- na table original é escondido o header com margin negativo
	*/
	$.fn.headerFixed = function(){
		var headFixed = '<div id="headFixed"></div>';//elemento que receberá o header para estar fixo
		$(headFixed).insertBefore($(this).closest('div'));//adicionando o elemento antes do container da listagem original
		
		$('#headFixed').html($(this).clone());//recebe o clone
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
		
		//bloqueia o scroll do header fidex sempre para no topo
		$('#headFixed').on('scroll', function(){
			$(this).scrollTop(0);
		});
	}
})(jQuery);