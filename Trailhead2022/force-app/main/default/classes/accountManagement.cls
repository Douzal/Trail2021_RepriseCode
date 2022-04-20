public class accountManagement {

    Public List<Account> getAccountsAndAssociatedContacts() {
        List<Account> accList = [SELECT Id, Name,
                                (SELECT Id, Name FROM Contacts)
                                FROM Account];
        if(accList.size() > 0) {
            For (account acc : accList) {
                System.debug('Account : ' + acc.Name);
                for(Contact con : acc.contacts) {
                    System.debug('     Contact : ' + con);
                }
            }
        }  
        return accList;
	}
}