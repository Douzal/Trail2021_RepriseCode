/**
 * Created by Alexis MASSON on 15/10/2019.
 */

/**
 * Create a Queueable Apex class that inserts the same Contact for each Account for a specific state. Write unit tests that achieve 100% code coverage for the class.
 *
 * Create an Apex class called 'AddPrimaryContact' that implements the Queueable interface.
 * Create a constructor for the class that accepts as its first argument a Contact sObject and a second argument as a string for the State abbreviation.
 * The execute method must query for a maximum of 200 Accounts with the BillingState specified by the State abbreviation passed into the constructor and insert the Contact sObject record associated to each Account. Look at the sObject clone() method.
 * Create an Apex test class called 'AddPrimaryContactTest'.
 * In the test class, insert 50 Account records for BillingState "NY" and 50 Account records for BillingState "CA". Create an instance of the AddPrimaryContact class, enqueue the job and assert that a Contact record was inserted for each of the 50 Accounts with the BillingState of "CA".
 * The unit tests must cover all lines of code included in the AddPrimaryContact class, resulting in 100% code coverage.
 * Run your test class at least once (via 'Run All' tests the Developer Console) before attempting to verify this challenge.
 */
// NB : déclaration en global ok ?
global with sharing class AddPrimaryContact implements Queueable {

    private Contact con;
    private String stateAbrv ='';

    /**
     * Constructor (two params : con, abrev)
     *
     * @param contact
     * @param stateAbrv
     */
    public AddPrimaryContact(Contact contact, String stateAbrv) {
        this.con = contact;
        this.stateAbrv=stateAbrv;
    }


    /**
     * The execute method must query for a maximum of 200 Accounts with the BillingState
     * specified by the State abbreviation passed into the constructor and insert the
     * Contact sObject record associated to each Account. Look at the sObject clone() method.
     */
    public void execute(QueueableContext qCtx) {
        // recupération des accounts à prendre en compte (ou ajouter le contact)
        String req = 'SELECT Id, BillingState FROM Account WHERE BillingState =:stateAbrv LIMIT 200';
        List<Account> accList = Database.query(req);

        System.debug('Taille de accList : ' + accList.size()); // renvoie 50

                // on voudrait retrouver 100 : OK on a bien 100
                /*String req2 = 'SELECT Id, BillingState FROM Account WHERE BillingState !=:stateAbrv LIMIT 200';
        List<Account> accListNotCorresponding = Database.query(req2);
        System.debug('Taille de accListnotCorresponding : ' + accListNotCorresponding.size()); // renvoie 100 ?
        */

        // une liste de contacts qui va être insérée
        List<Contact> conToAdd = new List<Contact>();
        // Contact clonedContact;

        // need ajouter à la liste des contacts un nouveau contact pour chaque Account de accList
        for(Account acc : accList) {
            Contact clonedContact = con.clone(false, false, false, false); // premier argument important à false
            // Id de l'Account
            clonedContact.accountId = acc.Id;
            conToAdd.add(clonedContact);
        }

        // condition sur la taille, vrai que c'est bon comme ça
        if(conToAdd.size() > 0) {
            Database.insert(conToAdd);
        }
    }
}