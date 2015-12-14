$(document).ready(function(){
  var shoppingList= [];
  if (localStorage.getItem("grocery-wils0751")) {
        shoppingList = JSON.parse(localStorage.getItem("grocery-wils0751"));
  }
  
  $("#subBtn").on("click", addItem);

showList();
  
  function addItem()
  {
    var newItem = $("#itemInput :input").val();
    
    if (/\S/.test(newItem))
    {
      shoppingList.push(newItem);
  
      saveList(shoppingList);

      newItem = [newItem];
      updateList(newItem);

      showList();
      $("#mainList").listview("refresh");
    }
   
  }

  function updateList(updatedList)
  {
    $(updatedList).each(function(index)
    {
      $("#mainList")
      .append
      ("<li class='listItem'>" +'<input name="checkbox" type="checkbox" id="checkbox"></input>' + "<span>" + updatedList[index] + "</span>" + "<button class='itmIcon ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all' type='button' data-icon='delete' />" +"</li>").listview("refresh");
 
	  $('#newItem').val('');
		 });
  }
  
  function delItem()
  {
    var deleteitems = $(this);
    
    if(deleteitems.prop("tagName") === "LI")
    {
      deleteitems.remove();
    }
    else if (deleteitems.prop("tagName") === "BUTTON")
    {
      deleteitems.parent().remove();
    }
    shoppingList = [];

    $("li span").each(function(index)
    {
      shoppingList.push($(this).text());
		 
    });
    saveList(shoppingList);

    $("#mainList").listview("refresh");
    
  }
function saveList(TBS)
  {
    if('localStorage' in window)
    {
      TBS = JSON.stringify(TBS);
      localStorage.setItem('grocery-wils0751', TBS);
    }
  }//Stringify shoppinglist and save to localstorage

function showList(){
    var output = document.querySelector("#mainList");
    output.innerHTML = "";
    for(var i = 0; i < shoppingList.length; i++){
     $("#mainList")
      .append
      ("<li class='listItem'>" +'<input type="checkbox" id="checkbox"></input>' + "<span>" + shoppingList[i] + "</span>" + "<button class='itmIcon ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all' type='button' data-icon='delete' />" +"</li>");
		
  $(".listItem").bind(delItem);

  $("[class^='itmIcon']").bind("click", delItem);
    }
}

});
