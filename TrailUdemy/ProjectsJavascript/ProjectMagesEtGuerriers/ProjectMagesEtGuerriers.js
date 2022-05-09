jQuery(document).ready(function($) {
    // projet Classes et Guerriers
    // console.log('hello mages');

    /* classe Personnage */
    class Personnage {
        constructor(pseudo, classe, sante, attaque) {
            this.pseudo = pseudo;
            this.classe = classe;
            this.sante = sante;
            this.attaque = attaque;
            this.niveau = 1; // init a 1
        }

        get informations() {
            console.log(this.pseudo+' ('+this.classe+') a '+this.sante+' points de vie, et est au niveau '+this.niveau);
        }

        evoluer() {
            this.niveau+=1;
            console.log(this.pseudo+' passe au niveau '+this.niveau);
        }

        verifierSante() {
            if(this.sante<=0) {
                this.sante = 0;
                console.log(this.pseudo+' a perdu !');
            } else {
                // console.log(this.pseudo+' a encore '+this.sante+ ' pv.');
            }
        }
    }

    /* classe Magicien */
    class Magicien extends Personnage {
        constructor(pseudo, classe, sante, attaque) {
            super(pseudo, "magicien", 170, 90);
        }

        attaquer(adversaire) {
            let degats = this.attaque;
            adversaire.sante-=degats;

            console.log(this.pseudo +' attaque '+adversaire.pseudo+' en lançant un sort ('+ degats+' dégâts)');
            this.evoluer(); //.bind(Magicien);
            adversaire.verifierSante();
        }
        
        coupSpecial(adversaire) {
            let degatsCoupsSpecial = 5*this.attaque;
            adversaire.sante-=degatsCoupsSpecial;
            
            console.log(this.pseudo +' attaque avec son coup spécial puissance des arcanes '
            +adversaire.pseudo+' ('+ degatsCoupsSpecial+' dégâts)');
            this.evoluer();
            adversaire.verifierSante();
        }
    }

    /* classe Guerrier */
    class Guerrier extends Personnage {
        constructor(pseudo, classe, sante, attaque) {
            super (pseudo, "guerrier", 350, 50);
        }

        attaquer(adversaire) {
            let degats = this.attaque;
            adversaire.sante-=degats;

            console.log(this.pseudo +' attaque '+adversaire.pseudo+' avec son épée ('+ degats+' dégâts)');
            this.evoluer(); //.bind(Magicien);
            adversaire.verifierSante();
        }

        coupSpecial(adversaire) {
            let degatsCoupsSpecial = 5*this.attaque;
            adversaire.sante-=degatsCoupsSpecial;
            
            console.log(this.pseudo +' attaque avec son coup spécial haches de guerre '
            +adversaire.pseudo+' ('+ degatsCoupsSpecial+' dégâts)');
            this.evoluer();
            adversaire.verifierSante();
        }
    }

    // creation d'un personnage lambda
    let agresseurLambda = new Personnage('aggresseur', 'guerrier', 150, 500);
    console.table(agresseurLambda);
    agresseurLambda.evoluer();

    console.group();
    let gandalf = new Magicien('Gandalf le Gris');
    let superCouillu = new Guerrier('SuperCouillu');
    gandalf.verifierSante();

    gandalf.informations;
    superCouillu.informations;
    
    gandalf.attaquer(superCouillu);
    superCouillu.informations;
    superCouillu.attaquer(gandalf);
    gandalf.informations;
    gandalf.coupSpecial(superCouillu);
    console.groupEnd();
    


});