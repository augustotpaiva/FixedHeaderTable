# FixedHeaderTable
Desenvolvimento de um plugin que deixa o header da table fixo e o corpo com scroll.

* É necessário jQuery para funcionar.
* É necessário que sua table esteja dentro de um div
* Plugin acompanha as dimensões do seu table original.
 
###Como executar o plugin

Instancie no "document ready" de sua página o plugin da seguinte forma:
```
  $(document).ready(function(){
    $('#myTable').headerFixed(500);
  });
```

Onde:
  - #MyTable é o ID de sua tabela
  - 500 é a altura em pixels do elemento que conterá sua table

###Também é possível fixar a primeira coluna da tabela

Instancie no "document ready" de sua página o plugin da seguinte forma:
```
  $(document).ready(function(){
    $('#myTable').headerAndFcolFixed(500);
  });
```
