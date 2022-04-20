/**
 * Created by Alexis MASSON on 15/10/2019.
 */
@IsTest(SeeAllData=false)
private with sharing class DailyLeadProcessorTest {

    // String that represents when to schedule
    /**
    *   A CE PROPOS : https://www.quartz-scheduler.org/api/2.1.7/org/quartz/CronExpression.html
    *  Seconds Minutes Hours Day_of_month Month Day_of_week Optional_year
    */
    public static String CRON_SCHEDULE_TIME = '0 0 0 1-31 1-12 ? 2020-2025';  // 2020-2025'; // Seconds Minutes Hours Day_of_month Month Day_of_week Optional_year

    @testSetup
    private static void setup() {
        List<Lead> leadList = new List<Lead>();
        Integer i = 0;

        // create 200 Lead records
        for (i = 0; i < 200; i++) {
            // add 200 compagny with no leadSource
            leadList.add(
                    new Lead(Company='fakeComp', LastName='Heisenberg - SayMyName - n°' + i)
            );
            leadList.add(
                    new Lead(Company='fakeComp', LastName='Heisenberg - SayMyName - n°' + i, LeadSource='leadd')
            );
        }
        // insert it
        if(leadList.size() > 0) {
            Database.insert(leadList);
        }
    }

    @IsTest
    private static void testDailyLeadProcessor() {

        // instanciation du scheduler
        DailyLeadProcessor myScheduledLeadProcessor = new DailyLeadProcessor();

        /** ASSERTIONS BEFORE SCHEDULED APEX **/
        // 1 - datas
        String req = 'SELECT Id FROM Lead';
        String reqNoLeadSource = 'SELECT Id FROM Lead WHERE LeadSource = null';
        String reqLeadSource = 'SELECT Id FROM Lead WHERE LeadSource != null';

        List<Lead> allLeads = database.query(req);
        List<Lead> leadNoLeadSource = database.query(reqNoLeadSource);
        List<Lead> leadLeadSource = database.query(reqLeadSource);

        // 2 - tcheck assertions
        System.assertEquals(400, allLeads.size());
        System.assertEquals(200, leadNoLeadSource.size());
        System.assertEquals(200, leadLeadSource.size());


        // PERFORM TESTS
        Test.startTest();
        Id jobId = System.schedule('test Task Name', CRON_SCHEDULE_TIME, myScheduledLeadProcessor);
        Test.stopTest();

        /** ASSERTIONS AFTER SCHEDULED APEX **/
        String reqLeadSourceDreamforce = 'SELECT Id FROM Lead WHERE LeadSource = \'Dreamforce\'';

        // relance des queries
        List<Lead> allLeadsAfter = database.query(req);
        List<Lead> leadNoLeadSourceAfter = database.query(reqNoLeadSource);
        List<Lead> leadLeadSourceAfter = database.query(reqLeadSource);
        List<Lead> leadLeadSourceDreamforce = database.query(reqLeadSourceDreamforce);


        // 2 - tcheck assertions - Numbers should have changed
        System.assertEquals(400, allLeadsAfter.size());
        System.assertEquals(0, leadNoLeadSourceAfter.size());
        System.assertEquals(400, leadLeadSourceAfter.size());
        System.assertEquals(200, leadLeadSourceDreamforce.size());
    }

}