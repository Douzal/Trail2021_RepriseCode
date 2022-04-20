/**
 * Created by Alexis MASSON on 17/09/2019.
 */
/**
 * This is usefull for the Maintenance Trail for certification DEV 450 - Winter 19'
 * link : https://trailhead.salesforce.com/fr/content/learn/modules/platform-developer1-maintenance-summer19/get-hands-on-using-platform-events-from-batch-apex-classes-summer19
 *
 */
trigger BatchApexErrorTrigger on BatchApexErrorEvent (after insert) {


    List<BatchLeadConvertErrors__c> batchErrorsList = new List<BatchLeadConvertErrors__c>();

    for(BatchApexErrorEvent errEv : Trigger.new) {
        // create a new batchError to add to the list
        BatchLeadConvertErrors__c batchLeadConvertError = new BatchLeadConvertErrors__c();

        batchLeadConvertError.AsyncApexJobId__c = errEv.AsyncApexJobId;
        batchLeadConvertError.records__c = errEv.JobScope;
        batchLeadConvertError.StackTrace__c = errEv.StackTrace;

        // add the liste
        batchErrorsList.add(batchLeadConvertError);
    }

    // create a list of errors
    Database.SaveResult[] sr = Database.insert(batchErrorsList);

    /**
    * Autre solution pour l'insert :
    */
    /*
    if(List_LeadConvertError.size() > 0 && List_LeadConvertError != null){
        insert List_LeadConvertError;
    }
    */

}