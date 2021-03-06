//on declare une variable qui aura comme role de donner un id unique a chaque element toggle et a chaque checkbox de class check
var i=1;
//la fonction qui ajoutera les formations et les details representatif 
function addTodo(){
        var textval = document.getElementById("todo").value
        list = document.createElement("li")
        list.className = 'formation'
        list.innerHTML = '<div class="onoff toggle-on"  id="tog'+i+'" ></div> <p> '+textval+'</p><button class="edit" ></button><button class="delete" ></button>'
        div = document.createElement("div")
        div.className = 'details active'
        div.innerHTML =  ` <div>
                    <p class="detail-organisme"> Organisme responsable :  </p> <input class="organisme" type="text" placeholder="modifier l'organisme">
                </div>
                <br>
                <div>
                    <p class="detail-type"> type:  </p> <input class="type" type="text" placeholder="modifier type diplôme">
                </div>
                <br>
                <div>
                    <p class="detail-date"> Date de la formation :  </p> <input class="date" type="text" placeholder="modifier la date">
                </div>
                <br>
                <div>
                    <p>Terminée ou en cours</p>  <input class="check" type="checkbox" id="check`+i+`">
                </div>
                <br> <br>
                <input id="btn" type="button" value="Valider les modifications">
            </div>`
        document.getElementById("todos-list").appendChild(list)
        document.getElementById("todos-list").appendChild(div)
//on incremente la variable d unicite
        i++;
              
}
//on declare une variable afin de pouvoir acceder iterer le tableau contenant les childrens d un element
var formationindex = 0
document.addEventListener("DOMContentLoaded",()=>{
    // on ajoute un evenement de type click  pour l'element ayant l'id #add_btn 
document.getElementById("add_btn").addEventListener("click",()=>{
    // on renvoie un message d erreur s il n y a pas de valeur saisie dans l'element input ayant l id #todo
    if(document.getElementById("todo").value == ""){
        return alert("il est obligatoire de remplir la zone de texte")
    }
    //si il y a une valeur ecrit dans l element input on a appele la fonction addtodo()
    addTodo()
    addingevents(formationindex)
    formationindex ++
    document.getElementById("todo").value = ""
})
// on ajoute un evenement de  type keyup pour l'element de ayant l id #todo
document.getElementById("todo").addEventListener("keyup",(event)=>{
    //on appele la fonction addtodo() au cas ou l utilisateur click sur entrer et si une valeur a ete saisie
    if(event.keyCode === 13 && document.getElementById("todo").value !== ""){
        addTodo()
        addingevents(formationindex)
        formationindex ++
        return document.getElementById("todo").value = ""
    }
    //on renvoie un message d erreur si aucune valeur n a ete saisie
    else if(event.keyCode === 13 && document.getElementById("todo").value === ""){
        alert("il est obligatoire de remplir la zone de texte")
    }
})

//on ajoute un evenement de type click list de type formation 
function  addingevents(i){
document.getElementsByClassName("formation")[i].addEventListener("click",(event)=>{
    // on remplace le paragraphe representant le titre de la formation en element de type input 
    if (event.target.className == 'edit'){
        input = document.createElement("input")
        input.className = 'change'
        type = document.createAttribute("type")
        type.value = 'textarea'
        placeholder = document.createAttribute("placeholder")
        placeholder.value = "Edit Here"
        input.setAttributeNode(type)
        input.setAttributeNode(placeholder)
        li = event.target.closest("li")
        li.replaceChild(input , li.children[1])
        button = document.getElementsByClassName("details active")[i].children[9]
        button.closest("div").children[0].children[0].innerHTML = " Organisme responsable : "
        button.closest("div").children[2].children[0].innerHTML = "type: "
        button.closest("div").children[4].children[0].innerHTML = "Date de la formation : "
        button.closest("div").children[0].children[1].style.display = 'block'
        button.closest("div").children[2].children[1].style.display = 'block'
        button.closest("div").children[4].children[1].style.display = 'block'
        console.log(button.closest("div").children[6].children[1])
        button.closest("div").children[6].children[1].disabled = false
        button.style.display = 'block'
        return    
        }
    else if(event.target.className === 'onoff toggle-off' || event.target.className === 'onoff toggle-on' ){
        tog(event.target.id)
        return
    }
    //on fait en sorte que si on click sur les elements de class change , onoff toggle-on , onoff toggle-off n appelent pas la methode toggleClass implemente ci-dessous
    else if(event.target.className == 'change'){ 
            return
        }
    event.target.closest("li").nextElementSibling.classList.toggle("active")
})
// on ajoute un evenement de type click au bouton ayant l id #btn qui represente le bouton de modification 
document.getElementsByClassName("details active")[i].children[9].addEventListener("click",(event)=>{
    //on declare  variable ayant comme valeur les elements a l'interieur des details de la formation
    var organisme= event.target.closest("div").children[0].children[1]
    var type=  event.target.closest("div").children[2].children[1]
    var date= event.target.closest("div").children[4].children[1]
    var checkbox = event.target.closest("div").children[6].children[1]
    //on ajoute les valeurs saisies aux labels dans les details de la formation
    event.target.closest("div").children[0].children[0].append(organisme.value)
    event.target.closest("div").children[2].children[0].append(type.value)
    event.target.closest("div").children[4].children[0].append(date.value)
    checkbox.disabled = true
    parent = document.getElementsByClassName("formation")[i]
    if (parent.children[1].value === undefined) {
        data = parent.children[1].innerHTML
    }
    else {
        data = parent.children[1].value
    }
    p = document.createElement("p")
    p.innerHTML = data
    parent.replaceChild(p , parent.children[1])
    //on efface les valeurs saisie par l utilisateur
    organisme.value = ""
    type.value = ""
    date.value = ""
    //on cache les elements input et le bouton 
    organisme.style.display = 'none'
    type.style.display = 'none'
    date.style.display = 'none'
    event.target.style.display = 'none'

})
    //on ajoute un evenement de type click a l'element de class delete
    document.getElementsByClassName("formation")[i].children[3].addEventListener('click',function () {
        this.closest("li").nextElementSibling.remove()
        this.closest("li").remove()
        formationindex --
        
       });
    // on ajoute un evenement de type click a l'element de class onoff
    document.getElementsByClassName("formation")[i].children[0].addEventListener('click', function () {
        //on change de class afin de changer le fichier svg correspondant 
        this.classList.toggle('toggle-on')
        this.classList.toggle('toggle-off')
       });
}    
})



//la fonction tog sera responsable de changer la partie checkbox en verifiant si le toggle est en toggle-on ou en toggle-off
function tog(id){
    var nb=id.replace('tog','').trim()
    if(document.getElementById(id).className === "onoff toggle-off"){
        document.getElementById('check'+nb).checked = true;}
    else if (document.getElementById(id).className === "onoff toggle-on"){
        document.getElementById('check' + nb).checked = false;
    }
} 


