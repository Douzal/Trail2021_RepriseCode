/**
 * Created by Alexis MASSON on 16/10/2019.
 */

@IsTest(SeeAllData=false)
private with sharing class AnimalLocatorTest {

    @IsTest
    private static void testBehavior() {
        // lancement du mock adéquat
        Test.setMock(HttpCalloutMock.class,
                new AnimalLocatorMock());

        // recupération de la réponse :
        String respDoesntWork = AnimalLocator.getAnimalNameById(1244);
        Integer id = 123;
        String respWorks = AnimalLocator.getAnimalNameById(id);

        // les assertions
        // FIRST ONE j'y arrive environ 0 %
        // String contentType = (String) resp.getHeader('Content-type');
        // System.assert(contentType == 'application/json');

    }
}