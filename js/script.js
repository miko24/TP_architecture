
$("#add_btn").on("click",()=>{
    if($("#todo").val() == ""){
        return alert("il est obligatoire de remplir la zone de texte")
    }
    addTodo()
    $("#todo").val("")
})
document.addEventListener("keyup",(event)=>{
    if(event.keyCode === 13 && $("#todo").val() !== ""){
        addTodo()
        return $("#todo").val("")
    }
    else if(event.keyCode === 13 && $("#todo").val() === ""){
        alert("il est obligatoire de remplir la zone de texte")
    }
    
    
})

$(document).on("click",".formation",(event)=>{
    console.log(event.target)
    if (event.target.className == 'edit'){
        return    
        }
    else if(event.target.className == 'onoff toggle-on'|| event.target.className == 'onoff toggle-off'){
       return
            
    }

    $(event.target).parent().next().toggleClass("active")
    

})


$(document).on("click","#btn",(event)=>{
    var organisme= $(".organisme")
    var type= $(".type")
    var date= $(".date")
    // console.log($(event.target).parent().find(".detail-organisme"))
    $(event.target).parent().find(".detail-organisme").append(organisme.val())
   $(event.target).parent().find(".detail-type").append(type.val())
    $(event.target).parent().find(".detail-date").append(date.val())
    organisme.hide()
    type.hide()
    date.hide()
    $(event.target).hide()

})

function addTodo(){
        var textval = $("#todo").val()
        $("#todos-list").append(`<li class='formation'>
        <div class="onoff toggle-on"></div>
        <p> ${textval} </p>
        <button class="edit" ></button>
        <button class="delete" ></button>
        </li>
        <div class="details active" >
                <div>
                    <p class="detail-organisme"> Organisme responsable :  </p> <input class="organisme" type="text" placeholder="modifier l'organisme">
                </div>
                <br>
                <div>
                    <p class="detail-type"> type:  </p> <input class="type" type="text" placeholder="modifier type diplôme">
                </div>
                <br>
                <div>
                    <p class="detail-date"> Date de la fornation :  </p> <input class="date" type="text" placeholder="modifier la date">
                </div>
                <br>
                <div>
                    <p>Terminée ou en cours</p>  <input class="check" type="checkbox" checked="false">
                </div>
                <br> <br>
                <input id="btn" type="button" value="Valider les modifications">
            </div>`)

              
}


$(document).ready(()=>{

    $("#todos-list").on('click', '.delete', function (e) {
        $(e.target).parent().next().remove();
        $(this).closest('li').remove();
        
       });
    
})

$(document).ready(()=>{

    $("#todos-list").on('click', '.onoff', function () {
        $(this).toggleClass('toggle-on');
        $(this).toggleClass('toggle-off');
       });
    $(document).on('click','.check',function(e){
           console.log($(this).parent())
       })
})
