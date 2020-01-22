![logo](https://www.rocketstud.io/img/logos/logo4.png)

# Rocket Studio {JS interview}
**Interview .js pour RS**

***Consignes :*** Emetre une pull request avec vos résolutions algorithmiques commentées et le résultat obtenu aussi en commentaire; vous n'êtes pas obligés de faire tous les exercices. 

---

## 🚀 Exercice A : Décolage d'une fusée 



Pour décoller, une fusée a besoin d'une quantité de carburant. 
Vous devez déterminer cette quantité de carburant en prenant en compte le poids des différents modules (satellite(s), vaisseau spatial, sonde(s), instruments) constituant notre fusée.

### Question 1 : Masse module 🛰️ 

Pour obtenir la quantité de carburant il faut : 
*Diviser une masse ℵ d'un module par trois, l'arrondir à l'unité inférieure et soustraire 2.*

Donc :

- Pour une masse de 12, divisez par 3 et arrondissez à l'inférieur pour obtenir 4, puis soustrayez 2 pour obtenir 2.
- Pour une masse de 14, diviser par 3 et arrondir à l'inférieur donne encore 4, donc le carburant nécessaire est aussi 2.
- Pour une masse de 1969, le carburant nécessaire est de 654.
- Pour une masse de 100756, le carburant nécessaire est de 33583.

Le compteur de carburant doit connaître le besoin total en carburant. Pour le trouver, calculez individuellement le carburant nécessaire pour la masse de chaque module, puis additionnez toutes les valeurs de carburant.

**Q1 : Quelle est la somme des besoins en carburant pour tous les modules de notre fusée ?**

📎 Voici les différents modules contituant notre fusée (c.a.d leur masse) : [MODULES](https://github.com/7antra/Rocket.studio-ITW/blob/master/A_liste-module.txt)

---

### Question 2 : Masse carburant ⛽ 

Evidemment, vous avez oublié que le carburant possède lui aussi sa propre masse. 
Le carburant lui-même nécessite du carburant tout comme un module - *prenez sa masse, divisez-la par trois, arrondissez à l'unité inférieure et soustrayez 2.* Cependant, ce carburant a aussi besoin de carburant, et ce carburant a besoin de carburant, et ainsi de suite. 

Donc, pour chaque masse de module, il faut calculer son carburant et l'ajouter au total. Ensuite, traitez la quantité de carburant que vous venez de calculer comme la masse d'entrée et répétez le processus, en continuant jusqu'à ce que le besoin en carburant soit nul ou négatif. Par exemple :

- Un module de masse 14 nécessite 2 combustibles. Ce carburant ne nécessite pas d'autre carburant (2 divisé par 3 et arrondi à 0, ce qui donnerait un carburant négatif), donc le carburant total requis est toujours juste 2.
- Au début, un module de masse 1969 nécessite 654 combustibles. Ensuite, ce carburant nécessite 216 de plus (654 / 3 - 2). 216 nécessite alors 70 de plus de carburant, ce qui nécessite 21 de plus de carburant, ce qui nécessite 5 de plus de carburant, ce qui ne nécessite pas de plus de carburant. Ainsi, le total de carburant nécessaire pour un module de masse 1969 est de 654 + 216 + 70 + 21 + 5 = 966.
- Le carburant requis par un module de masse 100756 et son carburant est : 33583 + 11192 + 3728 + 1240 + 411 + 135 + 43 + 12 + 2 = 50346.

**Q2 : Quelle est la somme des besoins en carburant de tous les modules de notre fusée en tenant compte également de la masse du carburant ajouté ?** (Calculez les besoins en carburant de chaque module séparément, puis additionnez-les tous à la fin).

📎 Même input que précedemment : [MODULES](https://github.com/7antra/Rocket.studio-ITW/blob/master/A_liste-module.txt)

---

## 🧬 Exercice B : Court-circuit

Zut, votre calcul du carburant est peut-être bon, mais il faut réparer l'assistance gravitationnelle : 

### Question 1 : Manhattan Distance 📐 

En ouvrant le panneau avant du module gravitationel, on découvre un enchevêtrement de fils. Plus précisément, deux fils sont reliés à un port central et se prolongent vers l'extérieur sur une grille. Vous tracez le chemin que prend chaque fil lorsqu'il quitte le port central, un fil par ligne de texte comme ceci : 

- *fil n°1 :* R8,U5,L5,D3
- *fil n°2 :* U7,R6,D4,L4

Les fils se tordent et tournent, mais les deux fils se croisent parfois. Pour réparer le circuit, vous devez trouver le point d'intersection le plus proche du port central. Comme les fils sont sur une grille, utiliser la [distance de Manhattan](https://fr.wikipedia.org/wiki/Distance_de_Manhattan) pour cette mesure. Bien que les fils se croisent techniquement au niveau du port central où ils commencent tous les deux, ce point ne compte pas, et un fil ne compte pas non plus comme se croisant avec lui-même.

Par exemple, si le chemin du premier fil est **D8,H5,G5,B3**, alors en partant du port central (o), il va de ***8 case à droite, 5 en haut, 5 à gauche, et finalement de 3 en bas*** représenté comme ceci : 

```
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
```


Ensuite, si le chemin du deuxième fil est **H7,D6,B4,G4**, ***il monte de 7, droite 6, descend de 4 et gauche 4*** comme ceci :

```
...........
.+-----+...
.|.....|...
.|..+--X-+.
.|..|..|.|.
.|.-X--+.|.
.|..|....|.
.|.......|.
.o-------+.
...........
```

Ces fils se croisent à deux endroits **(marqués X)**, mais celui en bas à gauche est plus proche du port central : sa *distance Manhattan* est de 3 + 3 = 6.

Voici quelques exemples supplémentaires :

- 1. **D75,B30,D83,H83,G12,B49,D71,H7,G72**
  2. **H62,D66,H55,D34,B71,D55,B58,D83** 
  - Distance de **159**
- 1. **D98,H47,D26,B63,D33,H87,G62,B20,D33,H53,D51**
  2. **H98,D91,B20,D16,B67,D40,H7,D15,H6,D7**
  - Distance de **135**
  
  
**Q1 : Quelle est la distance de Manhattan entre le port central et l'intersection la plus proche ?** 
  
📎 Voici vos fils : [INPUT](https://github.com/7antra/Rocket.studio-ITW/blob/master/B_input-fils.txt) (un fil par ligne)

---

### Question 2 : Timing parfait ⏱️

Il s'avère que ce circuit est très sensible au timing ; vous devez en fait minimiser le retard du signal.

Pour ce faire, calculez le nombre de pas/étape que chaque fil prend pour atteindre chaque intersection ; choisissez l'intersection où la somme des pas des deux fils est la plus faible. Si un fil visite une position sur la grille plusieurs fois, utilisez la valeur des pas de la première fois qu'il visite cette position pour calculer la valeur totale d'une intersection spécifique.

Le nombre de pas d'un fil est le nombre total de carrés de la grille que le fil a entrés pour se rendre à cet endroit, y compris l'intersection considérée. Considérons à nouveau l'exemple ci-dessus :

```
...........
.+-----+...
.|.....|...
.|..+--X-+.
.|..|..|.|.
.|.-X--+.|.
.|..|....|.
.|.......|.
.o-------+.
...........
```

Dans l'exemple ci-dessus, l'intersection la plus proche du port central est atteinte après 8+5+5+2 = 20 pas par le premier fil et 7+6+4+3 = 20 pas pour le second fil pour un total de 20+20 = 40 pas.

Cependant, l'intersection en haut à droite est meilleure : le premier fil prend seulement 8+5+2 = 15 et le second fil prend seulement 7+6+2 = 15, un total de 15+15 = 30 pas.

Voici les meilleurs pas pour les exemples supplémentaires du dessus :

- 1. **D75,B30,D83,H83,G12,B49,D71,H7,G72**
  2. **H62,D66,H55,D34,B71,D55,B58,D83** 
  - **610** pas.
- 1. **D98,H47,D26,B63,D33,H87,G62,B20,D33,H53,D51**
  2. **H98,D91,B20,D16,B67,D40,H7,D15,H6,D7**
  - **410** pas.
  
**Quelle est la plus petite combinaison de pas que les fils doivent franchir pour atteindre une intersection ?**

📎 Les fils n'ont pas changés : [INPUT](https://github.com/7antra/Rocket.studio-ITW/blob/master/B_input-fils.txt)
