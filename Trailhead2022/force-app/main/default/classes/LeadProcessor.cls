/**
 * Created by Alexis MASSON on 14/10/2019.
 *
 * Create an Apex class that implements the Database.Batchable interface to update all Lead records in the org with a specific LeadSource. Write unit tests that achieve 100% code coverage for the class.
 * Create an Apex class called 'LeadProcessor' that uses the Database.Batchable interface.
 * Use a QueryLocator in the start method to collect all Lead records in the org.
 * The execute method must update all Lead records in the org with the LeadSource value of 'Dreamforce'.
 * Create an Apex test class called 'LeadProcessorTest'.
 * In the test class, insert 200 Lead records, execute the 'LeadProcessor' Batch class and test that all Lead records were updated correctly.
 * The unit tests must cover all lines of code included in the LeadProcessor class, resulting in 100% code coverage.
 * Run your test class at least once (via 'Run All' tests the Developer Console) before attempting to verify this challenge.
 */

// ATTENTION il est primordial d'implémenter non pas DB.Batchable<Lead> mais de <SObject> !!!
// de plus dans les tests de Batchs, nous sommes en Asynchrone donc il faut tester les Assert APRES Test.stopTest()
global with sharing class LeadProcessor implements Database.Batchable<SObject>, Database.Stateful {

    global Integer nbLead = 0;
    global Integer nbLeadProcessed = 0;

    /**
     * not using a QueryLocator donc valide pas le défi
     */
    /*
    global List<Lead> start(Database.BatchableContext bc) {
        List<Lead> allLeads = [SELECT Id FROM Lead];
        nbLead = allLeads.size();
        System.debug('start() - nbLeads : ' + nbLead);
        return allLeads;
    }

     */
    /**
     * start() method
     */
    global Database.queryLocator start (Database.BatchableContext bc) {
        String req = 'SELECT Id FROM Lead';
        return Database.getQueryLocator(req);
    }

    /**
     * execute() method
     */
    global void execute(Database.BatchableContext bc, List<Lead> leadList) {
        for(Lead lead : leadList) {
            lead.leadSource = 'Dreamforce';
            nbLeadProcessed++;
        }

        Database.update(leadList);

        System.debug('execute() - nbLeads : ' + nbLead);
        System.debug(nbLeadProcessed + ' pistes ont été updaté.');
    }

    /**
     * finish() method
     */
    global void finish(Database.BatchableContext bc) {
        AsyncApexJob job = [SELECT Id, NumberOfErrors, Status FROM AsyncApexJob WHERE Id = :bc.getJobId()];

        System.debug('finish() - Etat du job : ' + job.Status + '\nTerminé avec ' + job.NumberOfErrors + ' erreurs !');
    }
}