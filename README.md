![logo](https://www.rocketstud.io/img/logos/logo4.png)

# Rocket Studio {JS interview}
**Interview .js pour RS**

***Consignes :*** Emmetre un pull request de vos résolutions algorithmiques commentées ; vous n'êtes pas obligés de faire tous les exercices. 

---

## Exercice A : Décolage d'une fusée



Pour décoler, une fusée a besoin d'une quantité de carburant. 
Vous devez déterminer cette quantité de carburant en prenant en compte le poids des diférents modules (satellite(s), vaisseau spatial, sonde, instruments) constituant notre fusée.

### Question 1 : Masse module

Pour obtenir la quantité de carburant il faut : 
*Diviser une masse ℵ d'un module par trois, l'arrondir à l'unité inférieure et soustraire 2.*

Donc :

- Pour une masse de 12, divisez par 3 et arrondissez à l'inférieur pour obtenir 4, puis soustrayez 2 pour obtenir 2.
- Pour une masse de 14, diviser par 3 et arrondir à l'inférieur donne encore 4, donc le carburant nécessaire est aussi 2.
- Pour une masse de 1969, le carburant nécessaire est de 654.
- Pour une masse de 100756, le carburant nécessaire est de 33583.

Le compteur de carburant doit connaître le besoin total en carburant. Pour le trouver, calculez individuellement le carburant nécessaire pour la masse de chaque module, puis additionnez toutes les valeurs de carburant.

**Q1 : Quelle est la somme des besoins en carburant pour tous les modules de notre fusée ?**

Voici l'input des différents modules (leur masse) : [MODULES](https://github.com/7antra/Rocket.studio-ITW/blob/master/A_liste-module.txt)

---

### Question 2 : Masse carburant

Evidemment, vous avez oublier que le carburant possède lui aussi sa propre masse. 
Le carburant lui-même nécessite du carburant tout comme un module - *prenez sa masse, divisez-la par trois, arrondissez à l'unité inférieure et soustrayez 2.* Cependant, ce carburant a aussi besoin de carburant, et ce carburant a besoin de carburant, et ainsi de suite. 

Donc, pour chaque masse de module, il faut calculer son carburant et l'ajouter au total. Ensuite, traitez la quantité de carburant que vous venez de calculer comme la masse d'entrée et répétez le processus, en continuant jusqu'à ce que le besoin en carburant soit nul ou négatif. Par exemple :

- Un module de masse 14 nécessite 2 combustibles. Ce carburant ne nécessite pas d'autre carburant (2 divisé par 3 et arrondi à 0, ce qui donnerait un carburant négatif), donc le carburant total requis est toujours juste 2.
- Au début, un module de masse 1969 nécessite 654 combustibles. Ensuite, ce carburant nécessite 216 de plus (654 / 3 - 2). 216 nécessite alors 70 de plus de carburant, ce qui nécessite 21 de plus de carburant, ce qui nécessite 5 de plus de carburant, ce qui ne nécessite pas de plus de carburant. Ainsi, le total de carburant nécessaire pour un module de masse 1969 est de 654 + 216 + 70 + 21 + 5 = 966.
- Le carburant requis par un module de masse 100756 et son carburant est : 33583 + 11192 + 3728 + 1240 + 411 + 135 + 43 + 12 + 2 = 50346.

**Q2 : Quelle est la somme des besoins en carburant de tous les modules de notre fusée en tenant compte également de la masse du carburant ajouté ?** (Calculez les besoins en carburant de chaque module séparément, puis additionnez-les tous à la fin).

Même input que précedemment : [MODULES](https://github.com/7antra/Rocket.studio-ITW/blob/master/A_liste-module.txt)

---

## Exercice B : Court-circuit

Zut, votre calcul du carburant est peut-être bon, mais il faut réparer l'assistance gravitationnelle : 

En ouvrant le panneau avant du module gravitationel, on découvre un enchevêtrement de fils. Plus précisément, deux fils sont reliés à un port central et se prolongent vers l'extérieur sur une grille. Vous tracez le chemin que prend chaque fil lorsqu'il quitte le port central, un fil par ligne de texte (votre input cf. plus bas).

Les fils se tordent et tournent, mais les deux fils se croisent parfois. Pour réparer le circuit, vous devez trouver le point d'intersection le plus proche du port central. Comme les fils sont sur une grille, utiliser la distance de Manhattan pour cette mesure. Bien que les fils se croisent techniquement au niveau du port central où ils commencent tous les deux, ce point ne compte pas, et un fil ne compte pas non plus comme se croisant avec lui-même.

Par exemple, si le chemin du premier fil est **R8,U5,L5,D3**, alors en partant du port central (o), il va de ***8 case à droite, 5 en haut, 5 à gauche, et finalement de 3 en bas*** représenté comme ceci : 

...........
...........
...........
....+----+.
....|....|.
....|....|.
....|....|.
.........|.
.o-------+.
...........
