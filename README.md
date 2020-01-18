![logo](https://www.rocketstud.io/img/logos/logo4.png)

# Rocket Studio {JS interview}
Interview .js pour RS


## Exercice A : Décolage d'une fusée

Pour décoler, une fusée a besoin d'une quantité de carburant. 
Vous devez déterminer cette quantité de carburant en prenant en compte le poids des diférents modules (satellite(s), vaisseau spatial, sonde, instruments) constituant notre fusée.

*La formule admise ici pour obtenir la quantité de carburant : pour une masse ℵ d'un module ; la diviser par trois, l'arrondir à l'unité inférieure et soustraire 2.*

Donc :

Pour une masse de 12, divisez par 3 et arrondissez à l'inférieur pour obtenir 4, puis soustrayez 2 pour obtenir 2.
Pour une masse de 14, diviser par 3 et arrondir à l'inférieur donne encore 4, donc le carburant nécessaire est aussi 2.
Pour une masse de 1969, le carburant nécessaire est de 654.
Pour une masse de 100756, le carburant nécessaire est de 33583.

Le compteur de carburant doit connaître le besoin total en carburant. Pour le trouver, calculez individuellement le carburant nécessaire pour la masse de chaque module, puis additionnez toutes les valeurs de carburant.

**Quelle est la somme des besoins en carburant pour tous les modules de notre fusée ?**

Voici le liste des différents modules (leur masse) : 
