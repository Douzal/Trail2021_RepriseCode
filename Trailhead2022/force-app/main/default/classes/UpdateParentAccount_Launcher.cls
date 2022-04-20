/**
 * Created by Alexis MASSON on 20/09/2019.
 */

public with sharing class UpdateParentAccount_Launcher {

    /**
    *  Cette classe ressemble à ce qui est dans le trail : https://trailhead.salesforce.com/fr/content/learn/modules/asynchronous_apex/async_apex_queueable
    *  C'est une adaptation, pour en garder la trace
    */
    public void testAsynch() {

        // find all accounts in ‘NY’ -- e fait chope des accounts
        List<Account> accounts = [select id from account];
        System.debug('taille de la liste d\'accounts : ' + accounts.size());

        // find a specific parent account for all records -- en fait random
        Account parentAccount = [SELECT id, Name from account LIMIT 1];

        Id parentId = parentAccount.Id;
        System.debug('Parent : ' + parentAccount);

        if (parentId != null) {
            // instantiate a new instance of the Queueable class
            UpdateParentAccount updateJob = new UpdateParentAccount(accounts, parentId);

            // enqueue the job for processing
            ID jobID = System.enqueueJob(updateJob);
        } else {
            System.debug('---coucou weekend---');
        }
    }
}