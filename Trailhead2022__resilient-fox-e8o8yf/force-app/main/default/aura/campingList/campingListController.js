({
    clickCreateItem  : function(cmp, e, helper) {

        let price = cmp.get("v.price");
        let Name = cmp.get("v.Name");
        let quantity = cmp.get("v.Quantity__c");
        let packed = cmp.get("v.Packed__c");

        let ok = isValid(cmp);
        if(ok) {
            /*
            If the form is valid, the JavaScript controller
            - pushes the newItem onto the array of existing items
            - triggers the notification that the items value provider has changed
            - resets the newItem value provider with a blank sObjectType of Camping_Item__c
            
            (for this challenge, place the code in your component's controller, not the helper)
            */
            pushNewItem(cmp);
            setDefaultValue(cmp);
        }
    },

    isValid : function(cmp) {
        // utiliser un Reduce

    },

    setDefaultValue : function(cmp) {
        let JSONdefault = "{ 'sobjectType': 'Camping_Item__c', 'Name': 'robotRock', 'Quantity__c': 0, 'Price__c': 0}";
        cmp.set("v.newItem", JSONdefault);
    },

    pushNewItem : function(cmp) {
        let items = cmp.get("v.items");
        let newItem = cmp.get("v.newItem");
        items.push(newItem);
    }
})