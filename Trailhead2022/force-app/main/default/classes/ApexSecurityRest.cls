/*
 * Use the Security.stripInaccessible method logic to process the results.
 * Remove fields that the user does not have Read access to.
 * Remove the redundant object- and field-level access checks for Name and Top_Secret.
 * Note: Delete the unneeded code rather than commenting it out.
 * Apply the Safe Navigation operator functionality to Account in order to avoid null references.
 * 
*/

@RestResource(urlMapping='/apexSecurityRest')
global with sharing class ApexSecurityRest {
    
    @HttpGet
    global static Contact doGet() {
        Id recordId = RestContext.request.params.get('id');
        Contact result;
        if (recordId == null) {
           throw new FunctionalException('Id parameter is required');
        }
        
        if (Schema.SObjectType.Contact.isAccessible()
          && Schema.SObjectType.Contact.fields.Name.isAccessible()
          && Schema.SObjectType.Contact.fields.Top_Secret__c.isAccessible()
           ) {
               /* get accessibility */
               SObjectAccessDecision SObjAccDec = Security.stripInaccessible(AccessType.READABLE, [SELECT id, Name, Title, Top_Secret__c, Account.Name FROM Contact WHERE Id = :recordId]);
               
               /* get records */
               List<Contact> results = SObjAccDec.getRecords();
               
               if (!results.isEmpty()) {
                   result = results[0]; // on recup le premier contact

                   result.Description = result?.Account?.Name;
               }
           } else {
                 throw new SecurityException('You don\'t have access to all contact fields required to use this API');
               }
               return result;
          }
    
      public class FunctionalException extends Exception{}
      public class SecurityException extends Exception{}
}