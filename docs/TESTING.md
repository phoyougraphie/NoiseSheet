# Vérifier NoiseSheet

## Automatique

Prérequis : Node.js 24. À la racine : `node --test tests/app.test.cjs`
(ou `npm test` si npm est installé).
Pas de paquet à installer. Les tests vérifient les ressources référencées,
l'initialisation, la navigation, l'horloge, les liens de remplacement et les
appels de sortie avec DOM/API Tizen simulés. La CI exécute la même commande.
Ils ne chargent pas un navigateur, ne valident pas le schéma XML Tizen et ne
prouvent pas la compatibilité avec un moteur Web de TV.

## Navigateur puis TV

Pour un aperçu, ouvrir `index.html` et utiliser flèches/Entrée. Les touches
Retour/Exit du modèle appellent Tizen et ne fonctionnent pas dans un navigateur
ordinaire. Pour la cible réelle, utiliser les outils Samsung/Tizen installés et
un profil de signature conservé hors Git. Ne pas déduire de cette grille qu'une
installation ou un test TV a été effectué.

| Scénario | Attendu / observation à relever |
| --- | --- |
| Lancement | Page visible, focus sur Start Clock, aucune erreur bloquante |
| Haut/Bas | Passage bouton ↔ menu ; focus identifiable à distance |
| Gauche/Droite dans le menu | Parcours circulaire des trois liens |
| Entrée sur un lien | Texte « Please develop the page » (modèle actuel) |
| Entrée sur l'horloge | Démarrage, mise à jour chaque seconde puis arrêt |
| Arrêt puis relance avant une seconde | Compter les boucles ; risque connu de plusieurs temporisateurs |
| Masquer puis reprendre | Observer l'horloge et les ressources ; gestionnaire actuellement vide |
| Retour et Exit | Sortie effective sur la TV, comportement à confirmer |
| Affichage prolongé | Relever durée, erreurs, saccades et consommation si mesurable |

Avant le premier essai, noter : date, testeur, commit, modèle/année de TV,
version Tizen, version des outils et mode d'installation. Pour chaque scénario,
consigner réussi/échoué/non testé et l'observation. Un navigateur ne suffit pas
pour cocher une validation TV.

Lors d'une correction des temporisateurs, ajouter un test qui fait démarrer,
arrêter et redémarrer avant le premier tick et exige une seule boucle ; définir
aussi le comportement attendu lors de la mise en arrière-plan.
