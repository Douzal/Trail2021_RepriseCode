@isTest
private class MyTestClass {
    
    @testSetup
    static void creationJeuDeDonnees() {
        // création d'un jeu de données
    }
    
    @isTest
    static void myTest() {
        // code_block qui s'executé toujours après l'exécution de la méthode
        // annotée @testSetup
    }
}