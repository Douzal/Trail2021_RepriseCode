public with sharing class BatchLeadConvert implements Database.Batchable<SObject>, Database.RaisesPlatformEvents  {

    private final String CONVERTED_STATUS = [SELECT MasterLabel
                                            FROM LeadStatus
                                            WHERE IsConverted =true
                                            LIMIT 1].MasterLabel;

    /**
     * Method start()
     * create the QueryLocator
     *
     * nb : Database.getQueryLocator() allows to return a QueryLocator object.
     *
     * @param ctx batchable context
     * @return
     */
    public Database.QueryLocator start(Database.BatchableContext ctx){

        Database.QueryLocator queryLocators = Database.getQueryLocator(
            [SELECT Id
            FROM Lead
            WHERE ConvertedContactId = null]
        );

        return queryLocators;
    }

    /**
     *  Method execute()
     *
     * @param ctx
     * @param records
     */
    public void execute(Database.BatchableContext ctx, List<Lead> records){
        List<Database.LeadConvert> leadConverts = new List<Database.LeadConvert>();

        for(Lead record : records) {
            Database.LeadConvert lc = new Database.LeadConvert();
            lc.setConvertedStatus(CONVERTED_STATUS);
            lc.setLeadId(record.Id);

            leadConverts.add(lc);
        }
        Database.convertLead(leadConverts,true);
    }

    /**
     *
     *
     * @param ctx
     */
    public void finish(Database.BatchableContext ctx){

        // voir la liaison : c'est Id := ctx.getJobId() !!
        AsyncApexJob job = [SELECT Id, Status, NumberOfErrors,
                JobItemsProcessed,
                TotalJobItems, CreatedBy.Email
        FROM AsyncApexJob
        WHERE Id = :ctx.getJobId()];
    }
}


/**
 * Version initiale
 */
/**
  public with sharing class BatchLeadConvert implements Database.Batchable<SObject>{

    private final String CONVERTED_STATUS = [SELECT Id, MasterLabel FROM LeadStatus WHERE IsConverted=true LIMIT 1].MasterLabel;

    public Database.QueryLocator start(Database.BatchableContext ctx){
        return Database.getQueryLocator([SELECT Id FROM Lead WHERE ConvertedContactId = null]);
    }

    public void execute(Database.BatchableContext ctx, List<Lead> records){
        List<Database.LeadConvert> leadConverts = new List<Database.LeadConvert>();
        for(Lead record:records){
            Database.LeadConvert lc = new Database.LeadConvert();
            lc.setConvertedStatus(CONVERTED_STATUS);
            lc.setLeadId(record.Id);

            leadConverts.add(lc);
        }
        Database.convertLead(leadConverts, true);
    }

    public void finish(Database.BatchableContext ctx){

    }
}
 */