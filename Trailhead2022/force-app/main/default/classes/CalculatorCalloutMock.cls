/**
 * Created by Alexis MASSON on 16/10/2019.
 */

/**
 * https://trailhead.salesforce.com/fr/content/learn/modules/apex_integration_services/apex_integration_soap_callouts
 */
@IsTest(SeeAllData=false)
global class CalculatorCalloutMock implements WebServiceMock {
    global void doInvoke(
            Object stub,
            Object request,
            Map<String, Object> response,
            String endpoint,
            String soapAction,
            String requestName,
            String responseNS,
            String responseName,
            String responseType) {
        // start - specify the response you want to send
        calculatorServices.doAddResponse response_x =
                new calculatorServices.doAddResponse();
        response_x.return_x = 3.0;
        // end
        response.put('response_x', response_x);
    }
}