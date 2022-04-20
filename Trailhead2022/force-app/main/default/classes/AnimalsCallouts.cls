/**
 * Created by Alexis MASSON on 16/10/2019.
 */

/**
 * Class from Trailhead - 15 oct 19
 * https://trailhead.salesforce.com/fr/content/learn/modules/apex_integration_services/apex_integration_rest_callouts
 */
public class AnimalsCallouts {

    /**
     * GET ANIMALS
     */
    public static HttpResponse makeGetCallout() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            // Deserializes the JSON string into collections of primitive data types.
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            // Cast the values in the 'animals' key as a list
            List<Object> animals = (List<Object>) results.get('animals');
            System.debug('Received the following animals : ');
            /*for (Object animal: animals) {
                System.debug(animal);
            }*/

            String animalsStr = String.join(animals, '\nAnimal : ');
            System.debug('\n\nAnimal : ' + animalsStr);
        }
        return response;
    }

    /**
     * POST ANIMAL
     */
    public static HttpResponse makePostCallout() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setBody('{"name":"mighty moose"}');
        HttpResponse response = http.send(request);
        // Parse the JSON response
        if (response.getStatusCode() != 201) {
            System.debug('The status code returned was not expected: ' +
                    response.getStatusCode() + ' ' + response.getStatus());
        } else {
            System.debug(response.getBody());
        }
        return response;
    }
}