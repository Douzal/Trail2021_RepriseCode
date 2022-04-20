/**
 * Created by Alexis MASSON on 26/07/2019.
 */

public with sharing class AP01_brouillon {


    /**
     * Méthode simple, utilisation de logginglevel.INFO et de String.join(iterableCollection, 'separator');
     */
    public static void testsOnArrays() {
        String req = 'SELECT Id, Name From Account Limit 10';
        Account[] accounts = Database.query(req);
        /* DEPRECATED use String.join instead !!
        for(account acc : accounts) {
            System.debug(logginglevel.INFO, 'Acc : ' + acc.Name);
         }
         */
        System.debug(logginglevel.INFO, String.join(accounts, '\nAccount : '));
    }

    /**
     * Map containing a pannel of Account Ids, and the related list of Contacts
     *
     * @return
     */
    public static void mapAccIdToConList (Integer n) {
        // the map to be returned, map to fill
        Map<Id, List<Contact>> mapAccToContacts = new Map<Id, List<Contact>>();

        // get the pannel of n accounts
        List<Account> accList = [SELECT Id, Name FROM Account LIMIT :n];

        // a list instanciated once here and used in the loop to fill the map
        List<Contact> conList = new List<Contact>();

        Id actualId;

        /* fill map with n account Ids */
        for (Integer i = 0; i < accList.size() ; i++) {
            actualId = accList[i].Id;
            System.debug('actualId : ' + actualId);
            // dont think this is possible (constructor)
            List<Contact> tempConList = [
                    SELECT Id, Name
                    FROM Contact
                    WHERE Contact.AccountId = :actualId];

            // this list.addAll should work
            conList.addAll(tempConList);

            // fill the map with the list
            mapAccToContacts.put(actualId, conList);

            // we do not clear() the list...
        }

        // debugs
        for(Id accId : mapAccToContacts.keySet()) {
            System.debug('\n\nAccountID ' + accId); //+ 'AccName : ' + accList.get(String.valueOf(accId)));
            System.debug(logginglevel.INFO, String.join(mapAccToContacts.get(accId), '\nContact : '));

        }

        System.debug('\n\n\n--------------------\n\n\n');
        for(Id accKey : mapAccToContacts.keySet()) {
            //
            System.debug('Account d\' id : ' + accKey);
        }

    }


    /**
    *   On va montrer qu'un passage d'une map en paramètre , est un passage en référence
    *   La Map en paramètre est donc changée si l'on touche à ses éléments
    *
    */
    Public static Map<Integer, Account> createMap (Integer nbAcc) {
        Map<Integer, Account> newMap = new Map< Integer, Account> ();

        for (Integer i = 0; i < nbAcc; i++) {
            // add datas
            List<Account> accList = new List<Account>();

            newMap.put(i, new Account(name= i+' bonjour '+i));
        }
        return newMap;
    }




    // create map for testing purposes
    Public static Map<Integer, List<Account>> createMap2 (Integer nbAcc) {
        Map<Integer, List<Account>> newMap = new Map<Integer, List<Account>> ();
        List<Account> accL = new List<Account>();


        for (Integer i = 0; i < nbAcc; i++) {
            // add datas
            accL.add(
                    new Account(Name= i+'bonjour'+i));
        }

        for (Integer i = 0; i < nbAcc; i++) {
            newMap.put(i, accL.clone());
        }

        return newMap;
    }


    /**
     * This methods
     */
    public static void testsSurMaps () {
        // getting a map of three accounts
        Map<Integer, List<Account>> myMap = createMap2(3);

        // debug de la map originale
        for(Integer nb : myMap.keySet()) {
            System.debug('M1[' + nb + '] : ' + myMap.get(nb));
        }

        Account copain = new Account(Name='YOLO à TOULOUSE');

        myMap.get(0).add(copain);

        System.debug('\n\n\n');

        for(Integer nb : myMap.keySet()) {
            System.debug('Key is : ' + nb + '\nMap[' + nb + '] : ' + myMap.get(nb) + '\n');
        }

        // The account has been added to all the keyset ?!! --> no, c'était quand je passais par référence l'account..
    }

    // declaration d'une variable de classe
    Map<Account, Contact> mapAccountToContacts = new Map<Account, Contact>();
    Integer a = 0;

    /**
     * This methods is for testing purposes
     * Test passing global class variables in methods to change it ?
     *
     * The primitive data shouldnt be changed, but the map should be
     */
    public static void testOnReferencePassing() {
        // declaration within the method
        Map<Account, List<Contact>> mapAccountToContacts = new Map<Account, List<Contact>>();
        Integer a = 5;

        getContacts(mapAccountToContacts, a);
        debugResultsOnMapWork(mapAccountToContacts, a);

        System.debug('a dans main' + a);

        // je m'attends à voir la map, et a=5

    }

    public static void getContacts (Map<Account, List<Contact>> carte, Integer entier42) {
        List<Account> accList = [SELECT Id, Name, (SELECT Id, Name FROM Contacts) FROM Account];
        entier42 = 42;
        for(Account acc : accList) {
            carte.put(acc, acc.Contacts);
        }
        System.debug('a dans getContacts (meth 1) : ' + entier42);
    }

    public static void debugResultsOnMapWork (Map<Account, List<Contact>> carte, Integer entier) {
        for (Account acc : carte.keySet()) {
            System.debug('\n\n    COMPTE: ' + acc.Name);
            String debugStr ='';

            for(Contact conList : carte.get(acc)) {
                debugStr+='    contacts : ' + conList;
            }
        System.debug(debugStr);
        }

        System.debug('a dans debugResultsOnMapWork : ' + entier);

    }



    ////////// SAME BUT WITH MAP<Id, ACCOUNT>
    /**
 * This methods is for testing purposes
 * Test passing global class variables in methods to change it ?
 *
 * The primitive data shouldnt be changed, but the map should be
 */
    public static void testOnReferencePassingIdAcc() {
        // declaration within the method
        Map<Id, Account> mapIdToAccount = new Map<Id, Account>();

        getIdAcc(mapIdToAccount);
        debugResultsOnMapIdAcc(mapIdToAccount);

    }

    public static void getIdAcc (Map<Id, Account> carteMere) {
        List<Account> accList = [SELECT Id, Name, ShippingAddress, ShippingCity, (SELECT Id, Name FROM Contacts) FROM Account];
        for(Account acc : accList) {
            carteMere.put(acc.Id, acc);
        }
    }

    public static void debugResultsOnMapIdAcc (Map<Id, Account> carteFille) {
        for (Id idAcc : carteFille.keySet()) {
            System.debug('\n\n    id Account: ' + idAcc);
            String debugStr ='    Account : ' + carteFille.get(idAcc);
            System.debug(debugStr);
        }
    }

}