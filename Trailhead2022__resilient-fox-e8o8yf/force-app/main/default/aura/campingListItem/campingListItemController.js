({
    /**
     * The controller function should:
     * Mark the item attribute created in the previous challenge as Packed__c using a value of true
     * Disable the button by marking the disabled attribute using a value of true
     */
    packItem : function(cmp, e, helper) {
        // let packed = cmp.get('v.item');
        // packed.packed__c = true;
        cmp.set('v.item', true);
        // e.target.disable =true;
        // let butt = document.querySelector('#myButt');
        let butt = e.getSource();
        butt.disabled =true;
    }
})