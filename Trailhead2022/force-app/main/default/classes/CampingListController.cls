/**
 * Created by Alexis MASSON on 19/07/2019.
 */

/**
 * Controller of CampingList cmp
 * With sharing, but it's not sufficient : security check on fields has to be done
 */
public with sharing class CampingListController {

    @AuraEnabled
    public static List<Camping_Item__c> getItems () {
        List<Camping_Item__c> campingItems = [SELECT Id, Name, Quantity__c, Price__c, Packed__c  FROM Camping_Item__c]; // 'Camping_Item__c', 'Name', 'Quantity__c', 'Price__c'

        System.debug('Liste d\'objets : ' + campingItems);

        String[] fieldsToCheck = new String[] {'Id', 'Name', 'Quantity__c', 'Price__c', 'Packed__c'};

        //TODO : tcheck for FLS (field level security)
        if(FLScheck(fieldsToCheck)) {
            //ystem.debug('--getIems from server returned the list : ' + campingItems);
            return campingItems;
        } else {
            //System.debug('User needs permissions');
            throw new System.NoAccessException();
            // return null;
        }
    }

    @AuraEnabled
    public static Boolean saveItem (Camping_Item__c itemToSave) {
        Boolean saveOk = false;

        System.debug('Objet a save : ' + JSON.serialize(itemToSave));

        try {
            Database.insert(itemToSave);
            System.debug('--saveItem server side -- A priori insert ok ? ');
        } catch (DmlException ex) {
            System.debug('--saveItem server side -- ERREUR : ' + ex.getMessage());
        }

        return saveOk;
    }


    @AuraEnabled
    public static void deleteAllItems() {
        System.debug('--Call deleteAllItems -- serveur side');
        Database.delete([SELECT Id FROM Camping_Item__c]);

    }

    /**
     * Recupere les FLS selon la string donnée, pour l'objet de type donné
     * @param fieldsToCheck
     *
     * @return
     */
    private static Boolean FLScheck(String[] fieldsToCheck) {
        Boolean permissionAllowed = false;

        // get map :
        Map<String, Schema.sObjectField> fieldTokensMap = Schema.sObjectType.Camping_Item__c.fields.getMap();

        // tcheck permissions
        for(String field : fieldsToCheck) {
            if(!fieldTokensMap.get(field).getDescribe().isAccessible()) {
                System.debug('Attention l\'user n\'a pas le droit de visionner ce field');
                return permissionAllowed;
            }
        }

        permissionAllowed = !permissionAllowed;
        System.debug('--FLSCheck - user has right ! : ' + permissionAllowed);

        return permissionAllowed;
    }
}