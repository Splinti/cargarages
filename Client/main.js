API.onServerEventTrigger.connect(function (eventName, args) {
    switch (eventName) {
        case "t":
            var s = API.returnNative(args[0], 0, args[1], args[2]);
            break;
        case "show_menu":
            var idList = new Array();
            var menu = API.createMenu("Cars", 0, 0, 6);
            menuPool = API.getMenuPool();
            var array = JSON.parse(args[0]);
            for (var i = 0; i < array.length; i++) {
                var s = API.createMenuItem(array[i].displayname.toString()+" Nameplate: "+array[i].nameplate_text, "HP: " + array[i].health.toString());
                idList.push(array[i].id.toString());
                menu.AddItem(s);
            }
            menuPool.Add(menu);
            menu.Visible = true;
            menu.OnItemSelect.connect(function (sender, item, index) {
                API.triggerServerEvent("garage_unpark_car", idList[index]);
                menu.Visible = false;
            });
            break;
    }
})
function objectLength(obj) {
    var result = 0;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            result++;
        }
    }
    return result;
}
API.onUpdate.connect(function () {
    if(menuPool != null)
        menuPool.ProcessMenus();
});
var menuPool = null;