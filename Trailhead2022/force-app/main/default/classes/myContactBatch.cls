/**
 * Created by Alexis MASSON on 14/10/2019.
 *
 * Un batch pour exemple :
 * change la BillingCity from Paris to Paros
 */
//  with sharing
global  class myContactBatch implements Database.Batchable<Account>, Database.Stateful {

    global Integer nbAccountProcessed =0;

    /**
     * Recupération des comptes qui nous intéressent
     */
    global List<Account> start(Database.BatchableContext bc){
        List<Account> accToProcessList = [SELECT Id, BillingCity, (SELECT Id, firstName, lastName FROM Contacts) FROM Account WHERE BillingCity = 'PARIS'];
        return accToProcessList;
    }

    /**
     * Travail sur la liste récupérée
     */
    global void execute(Database.BatchableContext bc, List<Account> scope) {
        List<Contact> updatedConList = new List<Contact>();
        for(Account acc : scope) {
            for (Contact con : acc.contacts) {
                con.MailingCity = 'PARIS';
                updatedConList.add(con);
                nbAccountProcessed++;
            }

            update updatedConList;
        }

    }

    global void finish(Database.BatchableContext bc) {
        AsyncApexJob job = [SELECT Id, Status, NumberOfErrors FROM AsyncApexJob WHERE Id = :bc.getJobId()];
    }

}