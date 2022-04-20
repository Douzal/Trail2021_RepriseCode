/**
 * Created by Alexis MASSON on 09/07/2019.
 */

public with sharing class AP01_Utils {

    public static Integer numExp =0;

    @AuraEnabled
    public static Date formattedDate(Date inputDate) {
        System.debug('date param : ' + inputDate);
        Date dateFormatted2 = Date.parse(String.valueOf(inputDate));

        System.debug('date return : ' + DateFormatted2);
        return dateFormatted2;// inputDate.format('yyyy-MM-dd');
    }


    /**
     * on teste la classe ci dessus, marche pas (exc non catchée)
     */
    public static void testerFormatterDate() {
        Date auj = Date.today();

        System.debug('date du jour : ' + auj);

        try{
            System.debug('Val : ' + AP01_Utils.formattedDate(auj));
        } catch (Exception e) { // on rentrer dedans..
            System.debug('Exception non catchée !');
        }
    }

    /**
     * return the input string without starting 0
     * Ex : input 00022373489 returns 22373489
     *
     * @param stringBeginningWith0
     *
     * @return
     */
    public static String returnTrim0(String stringBeginningWith0) {
        while(stringBeginningWith0.startsWith('0')){ // supp les 0
            stringBeginningWith0 = stringBeginningWith0.substring(1);
        }
        return stringBeginningWith0;
    }



    /**
    * @description this method takes a list of Accounts and return the list with no double values
    * @param listToProceed
    * @return the inputList without double values
    * @author Alexis Masson
    * @date 24/07/2019
    */
    public static List<sObject> exludeDoubleValues(List<sObject> ListToProceed) {
        List<sObject> ListPurified = new List<sObject>();
        Set<sObject> tempSet = new Set<sObject>();
        for(sObject obj : ListToProceed) {
            if(tempSet.add(obj)) { // true if sucessfully added to the Set
                ListPurified.add(obj);
            }
        }
        return ListPurified;
    }

    /**
    * @description get a string of 'len' numbers
    * @param len the number of caracters we want
    * @return len string
    * @author taken from CDN (P. Salameh ?)
    * @date 24/01/2020
    */
    public static String getRandom(Integer len) {

        final String chars='0123456789';
        String randStr='';
        while(randStr.length()<len){
            Integer idx= Math.mod(Math.abs(Crypto.getRandomInteger()), chars.length());
            randStr += chars.substring(idx,idx+1);
        }
        return randStr;
    }


    /**
    * Une méthode pour insérer quelques Expense__c en base
    */
    public static Boolean insertExpenses(Integer nbExp) {
        Integer i, j;
        List<Expense__c> expensesList = new List<Expense__c> ();
        Double formulaAmount;
        Boolean aBool;

        for (i = 0; i < nbExp; i++) {
            // set values for new Exp
            numExp +=1;
            formulaAmount = ((2.5 * i)+0.5);
            aBool = (Math.mod(i, 3)==1 ? false:true); // 1 sur deux packed

            // add an expense
            expensesList.add(new Expense__c(Name = 'testExp ' + numExp,
                    Amount__c = formulaAmount,
                    Reimbursed__c = aBool ));
        }

        // insert
        Database.SaveResult[] tablResults = Database.insert(expensesList, false);

        for (i = 0; j < tablResults.size(); i++) {
            if (tablResults[i].isSuccess() != true) {
                return false;
            }
        }
        return true;
    }

    /**
     * efface toutes les expense__c
     */
    public static void deleteAllExpenses() {
        List<Expense__c> allExp = [SELECT Id FROM Expense__c];
        System.debug('On va effacer ' + allExp.size() + ' dépenses !');
        try {
            Database.delete(allExp);
            allExp = [SELECT Id FROM Expense__c];
            System.debug('Il reste donc ' + allExp.size() + ' dépense.');
            numExp=0;
            return;
        } catch (DmlException ex) {
            System.debug('Erreur : ' + ex.getMessage());
        }
    }



    /**
     *  Debug toutes les dépenses existantes
     *  TODO : mettre une liste de sObject en param, caster, debugguer
     *  TODO : mais dans ce cas si param : (sObjectType type), les champs doivent être appropriés (chiant)
     */
    public static void debugExistingExpenses() {
        List<Expense__c> existingExpenses = [SELECT Id, Name, Amount__c, Client__c, Date__c, Reimbursed__c, CreatedDate
                                             FROM Expense__c];
        Integer tailleListe = existingExpenses.size();

        // debug
        for(Integer i=0; i < tailleListe; i++) {
            System.debug('dép ['+ i +'] :' + existingExpenses[i]);
        }
        System.debug('taille tot : ' + tailleListe);
    }

    /**
    *  Une méthode pour insérer quelques Camping_Item__c en base
    *
    */
    public static Boolean insertCampingItems(Integer nbExp) {
        integer i, j;
        List<Camping_Item__c> campItemList = new List<Camping_Item__c> ();
        Double formulaAmount;
        Boolean aBool;
        Integer price;

        for (i = 0; i < nbExp; i++) {
            // set values for new Exp
            numExp +=1;
            formulaAmount = ((2.5 * i)+0.5);
            aBool = (Math.mod(i, 3)==1 ? false:true); // 1 sur deux packed
            price = (i-5);
            // add an expense
            campItemList.add(new Camping_Item__c(Name = 'campObj : ' + numExp,
                    Quantity__c = formulaAmount,
                    Packed__c = aBool,
                    Price__c = price));
        }

        // insert
        Database.SaveResult[] tablResults = Database.insert(campItemList, false);

        for (i = 0; j < tablResults.size(); i++) {
            if (tablResults[i].isSuccess() != true) {
                return false;
            }
        }
        return true;
    }

    /**
     * efface toutes les expense__c
     */
    public static void deleteAllCampingItems() {
        List<Camping_Item__c> allCampItems= [SELECT Id FROM Camping_Item__c];
        System.debug('On va effacer ' + allCampItems.size() + ' objets de camping !');
        try {
            Database.delete(allCampItems);
            allCampItems = [SELECT Id FROM Camping_Item__c];
            System.debug('Il reste donc ' + allCampItems.size() + '  objets de camping.');
            numExp=0;
            return;
        } catch (DmlException ex) {
            System.debug('Erreur : ' + ex.getMessage());
        }
    }


    /**
     *  Debug toutes les dépenses existantes
     *  TODO : mettre une liste de sObject en param, caster, debugguer
     *  TODO : mais dans ce cas si param : (sObjectType type), les champs doivent être appropriés (chiant)
     */
    public static void debugExistingCampingItems() {
        List<Camping_Item__c> existingExpenses = [SELECT Id, Name, Quantity__c, Price__c, Packed__c
        FROM Camping_Item__c];
        Integer tailleListe = existingExpenses.size();

        // debug
        for(Integer i=0; i < tailleListe; i++) {
            System.debug('dép ['+ i +'] :' + existingExpenses[i]);
        }
        System.debug('taille tot : ' + tailleListe);
    }

    // TODO end of work about duplicating functions and adapt to Camping_Item__c

    /**
     * En gros, cette fonction permet de partir d'une chaine du type : Id, Name, autreParam
     * et de parvenir à 'Id', 'Name', 'autreParam'
     *
     * @param st the string to change
     * @param arroundString the caracter we want to add
     * @param spliter the caracter where to split (here, the coma)
     * @return from Id, Name, Amount__c, Client__c, Date__c, Reimbursed__c, CreatedDate
     * return -->  'Id','Name','Amount__c','Client__c','Date__c','Reimbursed__c','CreatedDate'
     */
    public static String addSomething(String st, String spliter, String arroundString) {

        String[] stArr = st.split(spliter);
        Integer len = stArr.size();

        for (Integer i = 0; i < len; i++) {
            stArr[i] = arroundString + stArr[i].trim();
        }

        String finalString = String.join(stArr, arroundString+spliter);
        finalString+=arroundString; // pour la fin de la chaine
        System.debug('Join : ' + finalString);
        return finalString;
    }

    /**
    * tests sur les maps
    * En gros, on peut récupérer les valeurs de la map et ajouter un objet en faisant
    * Map.get(indice).add(objectToAdd)
    */
    public static void testMap () {

        // creation d'une map String, List d'accounts
        Map<Integer, List<Account>> mapSt = new Map<Integer, List<Account>>();

        // création de deux listes
        List<Account> accL = new List<Account> ();
        List<Account> accL2 = new List<Account> ();

        // fill avec 4 accounts pour chaque liste
        for(Integer i=0;i<5;i++) {
            accL.add(new Account(Name='Acc ' + i));
            accL2.add(new Account(Name='coucou ' + (i*2)));
        }

        System.debug('ma liste 1 : ' + accL);
        System.debug('ma liste 2 : ' + accL2);

        mapSt.put(1, accL);
        mapSt.put(1, accL2); // ecrase la ligne au dessus..
        mapSt.put(2, accL2);

        System.debug('Taille de la liste de clef 2 : ' + mapSt.get(2).size());
        mapSt.get(2).add(new Account(name='NOUVEL ELEMENTARY SCHOOL'));
        System.debug('Taille de la liste de clef 2 : ' + mapSt.get(2).size());

        for (Integer j = 0; j< mapSt.get(2).size();j++) {
            System.debug('Element (' + (j+1) + ') : ' + mapSt.get(2).get(j));
        }


    }


    public static void verifListe() {
        List<Account> accL = new List<Account>{new Account(Name='Fra 2')};
        for(Integer i = 0; i <5; i++) {
            accL.add(new Account(Name='Fra ' + i));
        }
        accL.add(new Account(Name='Fra 4'));

        // ma liste doit contenir 7 éléments dont deux Fra 2 et Fra 4
        AP01_Utils.debugList(accL);

        // on exclu de la liste les doublons
        accL = AP01_Utils.exludeDoubleValues(accL);
        AP01_Utils.debugList(accL);
    }

    public static void debugList(List<sObject> maListe) {

        Integer tailleListe = maListe.size();

        // debug
        for(Integer i=0; i < tailleListe; i++) {
            System.debug('List ['+ i +'] :' + maListe[i]);
        }
        System.debug('Taille tot : ' + tailleListe);
    }



    /**
    * @description from a list, get the ids
    * @param listToProceed
    * @return the inputList without double values
    * @author Alexis Masson
    * @date 24/07/2019
    */
    public static List<Id> getIdsFromsObjList(List<sObject> listToProceed) {
        // apex has a list constructor that takes a set in input
        List<Id> idList = new List<Id>(new Map<Id, sObject> (listToProceed).keySet());

        return idList;
    }

    public static void testerRecupIds () {

        List<Account> accL = new List<Account>();

        // create accounts
        for(integer i = 0; i< 10; i++) {
            accL.add(new Account(Name='Bonneur' + i));
        }

        AP01_Utils.debugList(accL);
        System.debug('-----');
        AP01_Utils.debugList(AP01_Utils.getIdsFromsObjList(accL));
    }


    public static void debugList(List<Id> maListe) {

        Integer tailleListe = maListe.size();

        // debug
        for(Integer i=0; i < tailleListe; i++) {
            System.debug('List ['+ i +'] :' + maListe[i]);
        }
        System.debug('Taille tot : ' + tailleListe);
    }


    /**
     * Montre la façon d'utiliser sendMail()
     *
     * @param accId
     */
    public static void configureAndSendMail(Id accId) {

        // GET INFORMATIONS for MAILING (both mailRelance or mailDeactivation) - One SOQL >> Three SOQL
        Account acc = [SELECT Name, (SELECT Id, Email FROM Users), (SELECT Id, AccountId FROM Contacts WHERE AccountId=:accId) FROM Account WHERE Id = :accId LIMIT 1];
        //String userMail = [SELECT Email FROM User WHERE AccountId = :acc.Id LIMIT 1].Email;
        //Contact con =[SELECT Id,AccountId FROM Contact WHERE AccountId = :acc.Id LIMIT 1];
        String userMail = acc.Users[0].Email;
        Contact con = acc.Contacts[0];

        sendMail(acc, userMail, con, 'CDN_MissingDocuments_email_communityV1');
    }

    /**
     *  Allows to send a mail
     */
    public static void sendMail(Account acc, String userMail, Contact con, String nameOfTemplate) {

        System.debug('Sending mail ' + String.valueOf(nameOfTemplate));
        // create the mail
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();

        // configure the mail
        OrgWideEmailAddress owe = [SELECT Id,IsAllowAllProfiles,DisplayName,Address FROM OrgWideEmailAddress WHERE IsAllowAllProfiles = TRUE LIMIT 1];
        email.setOrgWideEmailAddressId(owe.Id);
        email.setWhatId(acc.Id);
        email.setTargetObjectId(con.Id);

        EmailTemplate emailtemplate = [SELECT Id,Name FROM EmailTemplate WHERE DeveloperName = :nameOfTemplate LIMIT 1]; // 'CDN-DossierClos_email_community' or 'CDN-MissingDocuments_email_community'
        email.setTemplateId(emailtemplate.Id);
        email.setToAddresses(new List<String> {userMail});

        Messaging.SendEmailResult [] r = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
    }




}