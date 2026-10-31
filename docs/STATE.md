# État — 2026-10-31

## Constat et préparation

- Dépôt GitHub initialement vide, sans branche. Le dossier local examiné n'avait
  pas de métadonnées Git ; six fichiers applicatifs et des réglages VS Code.
- Base applicative copiée octet pour octet : manifeste, HTML, CSS, JS et deux
  PNG. Aucun changement fonctionnel des sources dans cette préparation.
- Méthode Codex, documentation, tests et workflow préparés sur une branche de PR.
  La fusion et la grille complète de validation TV restent à faire.
- Vérification locale : huit tests réussis avec Node 24.22.1 via
  `node --test tests/app.test.cjs` ; CI GitHub également réussie.
- Aucun moteur génératif livré. Ne pas confondre le modèle horloge avec NoiseSheet
  terminé ; les intentions artistiques sont dans `VISION.md`.

## Premier essai TV

- Cible reconnue par SDB : Samsung `UE55AU7105KXXC`, Tizen `6.0`.
- Outils : extension VS Code Tizen `10.4.4`, configuration initiale terminée,
  mode développeur activé et connexion SDB vérifiée.
- Profil Samsung `NoiseSheet` créé et actif ; clés et mots de passe hors Git.
- Compilation, installation et premier lancement confirmés par l'utilisateur
  le 2026-10-31 depuis le dossier local. Le commit déployé n'est pas identifié,
  ce dossier n'étant pas un dépôt Git lors de l'inspection initiale.
- Navigation complète, horloge, Retour/Exit, reprise et endurance : pas encore
  de résultats consignés. Le premier lancement ne valide pas toute la grille.

## Limites connues

- Les tests automatiques simulent le DOM et l'API Tizen ; ils ne vérifient ni
  l'installation/signature, ni le rendu, ni la télécommande physique.
- Pause/reprise vide et risque de boucles d'horloge concurrentes après bascule
  rapide ; correction volontairement laissée à une tâche fonctionnelle dédiée.
- L'ancien graphe local mentionnait encore un `install.ps1` absent du disque :
  preuve qu'il faut vérifier fraîcheur et sources. Ne pas supprimer de fichiers
  en se fondant sur le seul graphe.

## Prochaine action

Après revue de la PR, compléter la grille TV de `TESTING.md` et identifier la
révision testée, puis fiabiliser le cycle de vie (roadmap P1).
À chaque reprise, vérifier l'état Git et les fichiers avant de mettre cette page
à jour ; ne pas ajouter de journal quotidien.
