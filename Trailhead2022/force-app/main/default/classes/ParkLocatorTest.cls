/**
 * Created by Alexis MASSON on 16/10/2019.
 */

@IsTest(SeeAllData=false)
global with sharing class ParkLocatorTest {

    // help there : https://developer.salesforce.com/forums/?id=906F0000000MIwfIAG
    @IsTest
    global static void countryTest() {
        Test.setMock(WebServiceMock.class, new ParkServiceMock()); // For the second argument, pass a new instance of your WebServiceMock interface implementation.

        String country = 'India';
        String[] results = ParkLocator.country(country);

        // verifiy
        System.assertEquals(new List<String> {'Lal Bhag', 'Cubbon Park', 'Pazhassi Dam'}, results);
    }

}