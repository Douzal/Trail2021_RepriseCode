/**
 * Created by Alexis MASSON on 15/10/2019.
 */

/**
*
* NB : CET EXERCICE A ETE FAIT LE 15/10/2019 AVEC SUCCES (ok sur Trailhead)
*
 * Create an Apex test class called 'AddPrimaryContactTest'.
 * In the test class, insert 50 Account records for BillingState "NY" and 50 Account records for BillingState "CA".
 * Create an instance of the AddPrimaryContact class, enqueue the job and assert that a Contact record was inserted for each of the 50 Accounts with the BillingState of "CA".
 *
 * The unit tests must cover all lines of code included in the AddPrimaryContact class, resulting in 100% code coverage.
 * Run your test class at least once (via 'Run All' tests the Developer Console) before attempting to verify this challenge.
 */
@isTest(SeeAllData=false)
private with sharing class AddPrimaryContactTest {

    private Integer nbProcessedContacts=0;

    @testSetup
    private static void setup() {

        // create 50 accounts & insert it
        List<Account> accListNY = new List<Account>();
        List<Account> accListCA = new List<Account>();
        List<Account> accList = new List<Account>();

        Integer i = 0;
        for(i=0; i<50; i++) {
            accListNY.add(
                    new Account(Name='acc ' + i, BillingState='NY')
            );
            accListCA.add(
                    new Account(Name='acc ' + i, BillingState='CA')
            );
            accList.add(
                    new Account(Name='accSecond ' + i, BillingState='CA')
            );
        }
        i = 0; // réinitialisation (par principe)

        // add des listes à la liste finale
        accList.addAll(accListCA);
        accList.addAll(accListNY);

        // insert de la liste
        insert  accList;
    }

    @IsTest
    private static void testPrimaryContact () {

        // le contact à ajouter
        Contact con = new Contact(LastName='Masson');
        String state = 'NY';

        Test.startTest();
        // instanciation d'un job queuable
        AddPrimaryContact apcQueuable = new AddPrimaryContact(con, state);
        Id jobId = System.enqueueJob(apcQueuable);
        Test.stopTest();

        // datas pour les assert
        List<Contact> conListNY = [SELECT Id FROM Contact WHERE Account.BillingState = :state];
        List<Contact> conListNotNY = [SELECT Id FROM Contact WHERE Account.BillingState != :state];
        Integer nbAccNY = conListNY.size();
        Integer nbAccNotNY = conListNotNY.size();

        System.debug('nb d\'accounts concernés : '+ nbAccNY + '\nnb d\'accounts non concernés : ' + nbAccNotNY);

        // les assertions : vérifier que le contact a bien été inséré dans les 50 accounts
        System.assertEquals(50, nbAccNY);
        System.assertEquals(0, nbAccNotNY);
    }

}