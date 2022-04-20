/**
 * Created by Alexis MASSON on 17/10/2019.
 */
@IsTest
global with sharing class ParkServiceMock implements WebServiceMock { // implémente l'interface WebServiceMock

    // seule méthode du contrat (interface)
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
        // start - on spécifie la valeur qu'on veut récupérer lors des tests d'appels au WS (mock)
        ParkService.byCountryResponse byCountryResp = new ParkService.byCountryResponse();
        byCountryResp.return_x = new List<String>{'parking Saint Germain', 'parking rue des Saint Pères'};

        // end - pas sur d'avoir tout pigé comment on appelera le mock (la clef de la map response, c'est quoi ?)
        response.put('byCountryResp', byCountryResp);

    }
}