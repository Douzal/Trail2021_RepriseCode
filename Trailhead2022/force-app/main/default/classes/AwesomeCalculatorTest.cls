/**
 * Created by Alexis MASSON on 16/10/2019.
 */
/**
 * https://trailhead.salesforce.com/fr/content/learn/modules/apex_integration_services/apex_integration_soap_callouts
 */
@IsTest(SeeAllData=false)
private class AwesomeCalculatorTest {
    @IsTest static void testCallout() {
        // This causes a fake response to be generated
        Test.setMock(WebServiceMock.class, new CalculatorCalloutMock());
        // Call the method that invokes a callout
        Double x = 1.0;
        Double y = 2.0;
        Double result = AwesomeCalculator.add(x, y);
        // Verify that a fake result is returned
        System.assertEquals(3.0, result);
    }
}