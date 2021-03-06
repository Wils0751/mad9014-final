$(document).ready(function(){
  var shoppingList = [];
  
  if (localStorage.getItem("grocery-wils0751")) {
        shoppingList = JSON.parse(localStorage.getItem("grocery-wils0751"));
  }
  
  $("#subBtn").on("click", addItem);

  $("#clearBtn").on('click', listClear);



  
  function addItem()
  {
    var newItem = $("#itemInput :input").val();
    
    if (/\S/.test(newItem))
    {
      shoppingList.push(newItem);
  
      saveList(shoppingList);

      newItem = [newItem];
      updateList(newItem);

      attachItemListeners();
      $("#mainList").listview("refresh");
    }
    $('#newItem').val('');

  }

  function updateList(updatedList)
  {
    $(updatedList).each(function(index)
    {
      $("#mainList")
      .append
      ("<li class='listItem'>" +'<input type="checkbox" id="checkbox"></input>' + "<span>" + updatedList[index] + "</span>" + "<button class='itmIcon ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all' type='button' data-icon='delete' />" +"</li>").listview("refresh");
    });
  }
  
  function listClear()
  {
    shoppingList = []; 
    
    $("[class^='listItem']").each(function()
    {
      $(this).remove();
    });
    
    if ('localStorage' in window)
    {
      localStorage.removeItem('grocery-wils0751');
    }//remove list from localstorage
    $("#mainList").listview("refresh");
	  
	
  }
  
  function delItem()
  {
    var delete = $(this);
    
    if(delete.prop("tagName") === "LI")
    {
      delete.remove();
    }
    else if (delete.prop("tagName") === "BUTTON")
    {
      delete.parent().remove();
    }
    shoppingList = [];

    $("li span").each(function(index)
    {
      shoppingList.push($(this).text());
    });
    saveList(shoppingList);

    $("#mainList").listview("refresh");
    
  }
	                 
  function saveList(save)
  {
    if('localStorage' in window)
    {
      save = JSON.stringify(save);
      localStorage.setItem('grocery-wils0751', save);
    }
  }
  
  function attachItemListeners()
  {
    $(".listItem").bind(delItem);

    $("[class^='itmIcon']").bind("click", delItem);

  }
});
//Citations
//http:/api.jquery.com/