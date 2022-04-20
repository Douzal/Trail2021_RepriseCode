/**
 * Created by Alexis MASSON on 16/10/2019.
 */
@IsTest // attention je l'avais oublié : le mock aussi est annoté @IsTest
public with sharing class AnimalLocatorMock implements HttpCalloutMock {

    /**
     * La seule méthode à définir pour implémenter l'interface HttpCalloutMock
     * On y défini la réponse à apporter EN CAS DE TESTS
     */
    public HttpResponse respond(HttpRequest param1) {

        // TODO : reprendre le JSon
        // String JSONresp = 'animal : {"id" : 124, "name":"oui", "sexe" : "fréquent" }';
        String JSONresp = '{ "animal": { "id": "123", "name": "Tonton",  "eats": "everything", "says": "SOIF !!" } }';

        // création de la réponse
        HttpResponse resp = new HttpResponse();
        resp.setHeader('Content-type', 'application/json');
        resp.setStatusCode(200);
        resp.setBody(JSONresp);

        return resp;
    }
}