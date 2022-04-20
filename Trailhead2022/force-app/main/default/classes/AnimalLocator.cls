/**
 * Created by Alexis MASSON on 16/10/2019.
 */

/**
 * https://trailhead.salesforce.com/fr/content/learn/modules/apex_integration_services/apex_integration_rest_callouts
 * The Apex class must be called 'AnimalLocator', have a 'getAnimalNameById' method that accepts an Integer and returns a String.
 * The 'getAnimalNameById' method must call https://th-apex-http-callout.herokuapp.com/animals/:id, using the ID passed into the method. The method returns the value of the 'name' property (i.e., the animal name).
 * Create a test class named AnimalLocatorTest that uses a mock class called AnimalLocatorMock to mock the callout response.
 * The unit tests must cover all lines of code included in the AnimalLocator class, resulting in 100% code coverage.
 * Run your test class at least once (via 'Run All' tests the Developer Console) before attempting to verify this challenge.
 */
public with sharing class AnimalLocator {

    /**
     * Chopé du net https://developer.salesforce.com/forums/?id=906F0000000MIjRIAW

    public class Animal {
        public Integer id;
        public String name;
        public String eats;
        public String says;
    }
    */

    public static String getAnimalNameById(Integer id) {
        String url = 'https://th-apex-http-callout.herokuapp.com/animals/' + id;

        // setup
        HttpRequest httpReq = new HttpRequest();
        httpReq.setEndpoint(url);
        httpReq.setMethod('GET');

        // send request
        Http http = new Http();
        HttpResponse httpResp = http.send(httpReq);

        String animalName = '';

        if(httpResp!=null) {
            if(httpResp.getStatusCode() != 200) {
                System.debug('Http GET error - failed with status : ' + httpResp.getStatusCode());
                // animalName = 'error';
            } else {
                // parse the result : the result is a Map<String, ANY>
                // animalName = (String) JSON.deserializeUntyped(httpResp.getBody());

                Map<String, Object> resultMap = (Map<String, Object>) JSON.deserializeUntyped(httpResp.getBody());
                Map<String, Object> animData = (Map<String, Object>) resultMap.get('animal');

                animalName = (String) animData.get('name');

                System.debug('retour 200 : ' + httpResp.getBody());
                System.debug('retour 200 deserializeUntyped : ' + animalName);

                /**
                * Deserialize the JSON string into collections of primitive data types.
                * Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                * Cast the values in the 'animals' key as a list
                * List<Object> animals = (List<Object>) results.get('animals');
                */

            }
        }

        return animalName;
    }

}