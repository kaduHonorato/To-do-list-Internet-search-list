// Variáveis criadas a partir de Tags HTML

var tagListaMenu = document.querySelector("#listaMenu"); // recebe uma lista que contém as abas que podem ser selecionadas; 
var tagsItemsListamenu = tagListaMenu.querySelectorAll("li"); // recebe os filhos diretos da tag tagListaMenu;
var tagsAbaSel = document.querySelectorAll("#listaMenu input[name = 'abaSel']"); // Recebe tags input do tipo radio que definirão qual lista será exibida; 
var tagBoxToDoList = document.querySelector("#boxToDoList"); // Recebe uma tag div que conterá a lista de tarefas; 
var tagListaToDoList = document.querySelector("#listaToDoList"); // Reebe uma tag do tipo ul que conterá os items da lista de tarefas; 
var tagBoxInternetSearchList  = document.querySelector("#boxInternetSearchList"); // Recebe uma tag div que conterá a lista de coisas para se procurar na internet; 
var tagListaInternetSearchList = document.querySelector("#listaInternetSearchList"); // Reebe uma tag do tipo ul que conterá os items da lista de coisas para se pesquisas na internet; 
var tagTxtNovoItemLista = document.querySelector("#txtNovoItemLista"); // recebe uma tag input do tipo texto que receberá o texto do novo item a ser adicionado em uma das listas; 
var tagBtAddNovoItemLista = document.querySelector("#btAddNovoItemLista"); // Recebe uma tag button que adiciona um novo item em uma das listas;
var tagTemplateItemListaToDoList = document.querySelector("#templateItemListaToDoList"); // Recebe o template de lista de tarefas;
var tagTemplateItemListaInternetSearchList = document.querySelector("#templateItemListaInternetSearchList"); // Recebe o template de lista de coisas para se procurar na internet;  

// ======================================================================

// Variáveis Auxiliares 

var indiceTabSel;
var dadosListaToDoList = [];
var dadosListaInternetSearchList = [];

var camposLocalStorage = [
                          new ObjCarregaCampoLocalStorage("indInptTagsAbaSel",0,0),
                          new ObjCarregaCampoLocalStorage("dadosListaToDoList",false,1),
                          new ObjCarregaCampoLocalStorage("dadosListaInternetSearchList",false,1)
                         ];




// EVENTOS

AuxiliarCriaEventos(tagsAbaSel,"change",MotorSelecionaAba);
AuxiliarCriaEventos(tagsItemsListamenu,"mouseenter",MotorAdicionaCursorPointer);
AuxiliarCriaEventos(tagsItemsListamenu,"mouseleave",MotorAdicionaCursorPointer);
tagTxtNovoItemLista.addEventListener("input",MotorVerificaValorTxtNovoItemLista);
tagBtAddNovoItemLista.addEventListener("click",MotorAdicionaItemLista);

// ===========================================================

Inicio();


// Função padrão de início de código 

function Inicio(){

[indiceTabSel,dadosListaToDoList,dadosListaInternetSearchList] = CarregaDadosLocalStorage(camposLocalStorage); 


MotorVerificaValorTxtNovoItemLista();
SelecionaAba(indiceTabSel);

if(dadosListaToDoList){

    AuxiliarChamaFuncao3(dadosListaToDoList,AdicionaItemListaTarefas);
   

    AuxiliarAdicionaClasses(tagListaToDoList.querySelectorAll("li"),"eleSelecionado","eleNaoSelecionado");
    AuxiliarChamaFuncao(tagListaToDoList.querySelectorAll('li'),'opacityZeroPontoNove',AdicionaClasse);
    
    }
if(dadosListaInternetSearchList){
    
    AuxiliarChamaFuncao3(dadosListaInternetSearchList,AdicionaItemListaInternet);
    

    AuxiliarAdicionaClasses(tagListaInternetSearchList.querySelectorAll("li"),"eleSelecionado","eleNaoSelecionado");
    AuxiliarChamaFuncao(tagListaInternetSearchList.querySelectorAll('li'),'opacityZeroPontoNove',AdicionaClasse);
    
    }

}

// ======================================================================================

function MotorSelecionaAba(){

indiceTabSel = VerificaIndicesInputSelecionados(tagsAbaSel)[0];

GuardaDadosLocalStorage(new ObjSalvaCampoLocalStorage("indInptTagsAbaSel",indiceTabSel,0));

SelecionaAba(indiceTabSel);

}


function MotorAdicionaCursorPointer(ev){

ControlaCursorPointer(ev.type,ev.target.querySelector("label"),ev.target.querySelector("input[type='radio']"));

}



function SelecionaAba(indSel){


MudaCheckedElemento(tagsAbaSel[indSel],true);

AuxiliarChamaFuncao([tagBoxToDoList,tagBoxInternetSearchList],"displayNone",AdicionaClasse);
RemoveClasse(tagsAbaSel[indSel].parentElement,"cursorPointer");



AuxiliarAdicionaClasses(tagsItemsListamenu,"eleSelecionado","eleNaoSelecionado");
 

if(parseInt(tagsAbaSel[indSel].value))
    ToggleClasse(tagBoxInternetSearchList,"displayNone");
else
    ToggleClasse(tagBoxToDoList,"displayNone");
    

    

}


function MotorVerificaValorTxtNovoItemLista(){

ChecaValidadeEMudaDisabled(tagBtAddNovoItemLista,tagTxtNovoItemLista);

}


function MotorAdicionaItemLista(){

if(parseInt(tagsAbaSel[indiceTabSel].value)){
   
    AdicionaItemListaInternet([tagTxtNovoItemLista.value,false]);
    MotorAtualizaVetorDadosListaInternetSearchList();  

}else{
    
    AdicionaItemListaTarefas([tagTxtNovoItemLista.value,false]);     
    MotorAtualizaVetorDadosListaToDoList(); 
}   

}

function AdicionaItemListaTarefas(dados){
   
    var item = tagTemplateItemListaToDoList;

    var txtItem = item.content.querySelector(".txtItem");
        txtItem.textContent = dados[0];

    var inptCheckboxItem = item.content.querySelector("input[type = checkbox]");
        inptCheckboxItem.checked = dados[1];
      
   var novoItem = document.importNode(item.content,true);
       
   tagListaToDoList.appendChild(novoItem);
   
  FadeInElemento(tagListaToDoList.lastElementChild,20);
   
  tagListaToDoList.lastElementChild.addEventListener("click",ConfiguraItemsListaTarefas);
  tagListaToDoList.lastElementChild.addEventListener("mouseenter",MotorEfeitosMouseEnterELeave);
  tagListaToDoList.lastElementChild.addEventListener("mouseleave",MotorEfeitosMouseEnterELeave);
  tagListaToDoList.lastElementChild.querySelector('.btRemoveItem').addEventListener("mouseenter",MotorEfeitosMouseEnterELeave);
  tagListaToDoList.lastElementChild.querySelector('.btRemoveItem').addEventListener("mouseleave",MotorEfeitosMouseEnterELeave);
  tagListaToDoList.lastElementChild.querySelector('.btRemoveItem').addEventListener("click",MotorRemoveElementoListaTarefas);

}


function AdicionaItemListaInternet(dados){

var item = tagTemplateItemListaInternetSearchList;

var txtItem = item.content.querySelector(".txtItem");
    txtItem.textContent = dados[0];

var inptCheckeboxItem = item.content.querySelector("input[type = checkbox]");
    inptCheckeboxItem.checked = dados[1];

var linkPesquisa = item.content.querySelector(".btRealizaPesquisa");
     linkPesquisa.href = "https://www.google.com/search?q=" + dados[0];

var novoItem = document.importNode(item.content,true);
    
  tagListaInternetSearchList.appendChild(novoItem);

  FadeInElemento(tagListaInternetSearchList.lastElementChild,20);

  tagListaInternetSearchList.lastElementChild.addEventListener("click",ConfiguraItemsListaInternet);
  tagListaInternetSearchList.lastElementChild.addEventListener("mouseenter",MotorEfeitosMouseEnterELeave);
  tagListaInternetSearchList.lastElementChild.addEventListener("mouseleave",MotorEfeitosMouseEnterELeave);
  tagListaInternetSearchList.lastElementChild.querySelector('.btRemoveItem').addEventListener("mouseenter",MotorEfeitosMouseEnterELeave);
  tagListaInternetSearchList.lastElementChild.querySelector('.btRemoveItem').addEventListener("mouseleave",MotorEfeitosMouseEnterELeave);
  tagListaInternetSearchList.lastElementChild.querySelector('.btRemoveItem').addEventListener("click",MotorRemoveElementoListaInternet);

}



function MotorAtualizaVetorDadosListaToDoList(){

    dadosListaToDoList = AtualizaVetorItemsLista(tagListaToDoList);
    MotorGuardaDadosVetorLocalStorage(dadosListaToDoList,'dadosListaToDoList');

} 

function MotorAtualizaVetorDadosListaInternetSearchList(){

    dadosListaInternetSearchList = AtualizaVetorItemsLista(tagListaInternetSearchList);
    MotorGuardaDadosVetorLocalStorage(dadosListaInternetSearchList,'dadosListaInternetSearchList');
 
}


function MotorGuardaDadosVetorLocalStorage(vetor,nomeCampoLs){

if(vetor.length)
    GuardaDadosLocalStorage(new ObjSalvaCampoLocalStorage(nomeCampoLs,vetor,1));
else
    localStorage.removeItem(nomeCampoLs);

} 



function  AtualizaVetorItemsLista(elemento){

var itemsLista = elemento.querySelectorAll("li");
var vetor = new Array(itemsLista.length);


for(var x = 0; x < itemsLista.length; x++){

    vetor[x] = [];

    vetor[x].push(itemsLista[x].querySelector('span.txtItem').textContent);
    vetor[x].push(itemsLista[x].querySelector('input[type = "checkbox"]').checked);
    

}

return vetor;

}



function ConfiguraItemsListaTarefas(ev){

if((ev.target.tagName.localeCompare('INPUT'))){
    
    if(!(ev.target.tagName.localeCompare('SPAN')))
        MudaCheckedElemento(ev.target.parentElement.querySelector('input[type="checkbox"]'),!(ev.target.parentElement.querySelector('input[type="checkbox"]').checked));
    else
        MudaCheckedElemento(ev.target.querySelector('input[type="checkbox"]'), !(ev.target.querySelector('input[type="checkbox"]').checked));


    }

MotorAtualizaVetorDadosListaToDoList();



AuxiliarAdicionaClasses(tagListaToDoList.querySelectorAll("li"),"eleSelecionado","eleNaoSelecionado");

}


function ConfiguraItemsListaInternet(ev){

    if(ev.target.tagName.localeCompare('INPUT')){
   
        if(!(ev.target.tagName.localeCompare('A')))
            MudaCheckedElemento(ev.target.parentElement.querySelector('input[type="checkbox"]'),true);
        else if(!(ev.target.tagName.localeCompare('SPAN')))
            MudaCheckedElemento(ev.target.parentElement.querySelector('input[type="checkbox"]'),!(ev.target.parentElement.querySelector('input[type="checkbox"]').checked));
        else       
            MudaCheckedElemento(ev.target.querySelector('input[type="checkbox"]'), !(ev.target.querySelector('input[type="checkbox"]').checked));

        }

   MotorAtualizaVetorDadosListaInternetSearchList(); 
   
   AuxiliarAdicionaClasses(tagListaInternetSearchList.querySelectorAll("li"),"eleSelecionado","eleNaoSelecionado");
    
}



function MotorRemoveElementoListaTarefas(ev){

CancelaBolha(ev);

RemoveClasse(ev.target.parentElement.parentElement,"opacityZeroPontoNove");
FadeOutElemento(ev.target.parentElement.parentElement,300);

window.setTimeout(function(){

MotorRemoveElementoLista(ev);

MotorAtualizaVetorDadosListaToDoList(); 

},310);


}

function MotorRemoveElementoListaInternet(ev){

CancelaBolha(ev);
RemoveClasse(ev.target.parentElement.parentElement,"opacityZeroPontoNove");
FadeOutElemento(ev.target.parentElement.parentElement,300);

window.setTimeout(function(){

MotorRemoveElementoLista(ev);

MotorAtualizaVetorDadosListaInternetSearchList();  

},310);

}


function MotorRemoveElementoLista(ev){

RemoveFilhoElemento(ev.target.parentElement.parentElement.parentElement,ev.target.parentElement.parentElement);    

}


function MotorEfeitosMouseEnterELeave(ev){

if (!(ev.target.tagName.localeCompare("LI"))){

    ToggleClasse(ev.target,'opacityZeroPontoNove'); 
    ToggleClasse(ev.target.querySelector('.btRemoveItem'),'displayNone');    

}else
    ToggleClasse(ev.target,'opacityZeroPontoOito'); 


}