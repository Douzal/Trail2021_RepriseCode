/**
 * Created by Alexis MASSON on 16/10/2019.
 */

/**
 * Use WSDL2Apex to generate a class called 'ParkService' in public scope using this WSDL file. After you click the 'Parse WSDL' button don't forget to change the name of the Apex Class Name from 'parksServices' to 'ParkService'.
 * Create a class called 'ParkLocator' that has a 'country' method that uses the 'ParkService' class and returns an array of available park names for a particular country passed to the web service. Possible country names that can be passed to the web service include Germany, India, Japan and United States.
 * Create a test class named ParkLocatorTest that uses a mock class called ParkServiceMock to mock the callout response.
 * The unit tests must cover all lines of code included in the ParkLocator class, resulting in 100% code coverage.
 * Run your test class at least once (via 'Run All' tests the Developer Console) before attempting to verify this challenge.
 */
public with sharing class ParkLocator {

    public static String[] country(String country) {

        // implémentation
        ParkService.ParksImplPort parkService = new ParkService.ParksImplPort();

        // String[] parkNames = new String[]{'country'};
        //return parkNames;
        return parkService.byCountry(country);
    }
}