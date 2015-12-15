$(document).on('ready', init);

function init()
{
  var shoppingList = [];
  var checkbox = [];
  
  if ('localStorage' in window)
  {
    var list = localStorage.getItem('grocery-wils0751');
    list = JSON.parse(list);
   
    if (list != null)
    {
      shoppingList = list[0];
      checkbox = list[1];
     
      updateList(shoppingList, checkbox);
     
    }
  }
  
  $("#subBtn").on("click", addItem);

ItemListeners();
	
  function addItem()
  {
    var newItem = $("#itemInput :input").val();
    
    if (/\S/.test(newItem))
    {
      shoppingList.push(newItem);
      checkbox.push(false);

      saveList(shoppingList, checkbox);

      newItem = [newItem];
      updateList(newItem, [false]);
    
      ItemListeners();
 
      $("#mainList").listview("refresh");
    }
    

  }

  function updateList(updatedList, updatedState)
  {
    $(updatedList).each(function(index)
    {
      $("#mainList")
        .append
        ("<li class='listItem'>"+"<input type='checkbox' class='checkbox'></input>"+"<span>" + updatedList[index] + "</span>" +
          "<button class='itmIcon ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all' type='button' data-icon='delete' />" +"</li>").listview("refresh");
		$('#newItem').val('');
      $("li:last-child input").prop("checked", updatedState[index]);
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
    checkbox = [];
 
    $("#mainList li").each(function(index)
    {
      shoppingList.push($(this).find("span").text());
      checkbox.push($(this).find("input").prop("checked"));
    });
    saveList(shoppingList, checkbox);

    $("#mainList").listview("refresh");
  }
  
  function checkboxChange()
  {
    var check = $(this);
    checkbox[check.parent().index()] = check.prop("checked");
    saveList(shoppingList, checkbox);
  }
                         
  function saveList(items, check)
  {
    if('localStorage' in window)
    {
      var save = [items, check]
      localStorage.setItem('grocery-wils0751', JSON.stringify(save));
    }
  }
  
  function ItemListeners()
  {
   
    $("[class^='itmIcon']").one("click", delItem);
   
    $("[class^='checkbox']").bind("click", checkboxChange);
    
  }
}
