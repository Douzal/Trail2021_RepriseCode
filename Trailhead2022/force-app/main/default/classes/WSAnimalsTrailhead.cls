/**
 * Created by Alexis MASSON on 16/10/2019.
 */

public with sharing class WSAnimalsTrailhead {

    /**
     * Method extract from the Trailhead
     */
    public static void getAnimals() {
        // instanciate the request
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('GET');

        // use it to get the response
        HttpResponse response = http.send(request);

        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            // Deserialize the JSON string into collections of primitive data types.
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            // Cast the values in the 'animals' key as a list
            List<Object> animals = (List<Object>) results.get('animals');

            System.debug('Received the following animals:');
            /* for (Object animal: animals) {
                System.debug(animal);
            }
             */
            String strAnimals = String.join(animals, '\nAnimal : ');
            System.debug('\n\nAnimal : ' + strAnimals);
        }
    }

    public static void postAnimals () {
        // setup
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');

        // Set the body as a JSON object
        request.setBody('{"name":"Tancrède Sidem"}');
        HttpResponse response = http.send(request);
        // Parse the JSON response
        if (response.getStatusCode() != 201) {
            System.debug('The status code returned was not expected: ' +
                    response.getStatusCode() + ' ' + response.getStatus());
        } else {
            System.debug(response.getBody());
        }
    }
}