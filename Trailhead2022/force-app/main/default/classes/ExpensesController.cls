/**
 * Created by Alexis MASSON on 16/07/2019.
 */

public with sharing class ExpensesController {

    @AuraEnabled
    public static List<Expense__c> getExpenses() {
        // appel du débug des expenses
        //ExpensesController.debugAllExp();

        // CHECK FOR SECURITY - les fields sont à mettre ici en dur ??
        String[] fieldsToCheck = new String[] {'Id','Name','Amount__c','Client__c','Date__c','Reimbursed__c','CreatedDate'};

        // get the map of fields
        Map<String, Schema.sObjectField> fieldDescribeTokens =
                Schema.sObjectType.Expense__c.fields.getMap();


        for (String field : fieldsToCheck) {
            // verifier l'accès
            if(!fieldDescribeTokens.get(field).getDescribe().isAccessible()) {
                // jarter ce champs pour le user (traitement à parfaire, là bullshit)
                throw new System.noAccessException();
            }
        }

        List<Expense__c> allExp = [SELECT Id, Name, Amount__c, Client__c, Date__c, Reimbursed__c, CreatedDate FROM Expense__c];
        //System.debug('--ExpensesController--getExpenses-- Nb d\'exp : ' + allExp.size());

        return allExp;
    }


    @AuraEnabled
    public static Boolean saveExpense(Expense__c ex) {
        Boolean isInserted = false;

        System.debug('--saveExpense--begin-- expense a add : ' + ex); // TODO : supprimer debug

        try {
            Database.insert(ex);
            isInserted = !isInserted;
        } catch (DmlException dmlEx) {
            System.debug('DML exception : ' + dmlEx.getMessage());
        }
        System.debug('--saveExpense--isInserted ? : ' + isInserted); // TODO : supprimer debug
        return isInserted;
    }


    @AuraEnabled
    public static Boolean saveExpenseArray(Expense__c[] expArray) {

        Boolean insertOk = false;
        System.debug('Liste : ' + expArray);

        try {
            Database.SaveResult[] sr = Database.insert(expArray, false);
            System.debug('expList' + expArray);

            // loop pour vérifier
            Integer iter = 0;
            do {
                System.debug('expList[' + iter + '] : ' + expArray[iter]);
                insertOk = insertOk && sr[iter].isSuccess();
            } while(iter<sr.size() && insertOk == true);

        } catch (exception e) {
            System.debug('Min une erreur d\'insert');
        }

        return insertOk;
    }

    @AuraEnabled
    public static void deleteExpenses () {
        AP01_Utils.deleteAllExpenses();
    }


    @AuraEnabled
    public static void debugAllExp() {
        AP01_Utils.debugExistingExpenses();
    }
}