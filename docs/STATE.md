# État — 2026-10-31

## Constat et préparation

- Dépôt GitHub initialement vide, sans branche. Le dossier local examiné n'avait
  pas de métadonnées Git ; six fichiers applicatifs et des réglages VS Code.
- Base applicative copiée octet pour octet : manifeste, HTML, CSS, JS et deux
  PNG. Le dossier d'origine et ses réglages personnels restent intacts.
- Méthode Codex, documentation, tests et workflow préparés sur une branche de PR.
  La fusion et la validation réelle sur TV restent à faire.
- Vérification locale : huit tests réussis avec Node 24.22.1 via
  `node --test tests/app.test.cjs`. Aucun essai navigateur ou TV effectué ici.
- Aucun moteur génératif livré. Ne pas confondre le modèle horloge avec NoiseSheet
  terminé ; les intentions artistiques sont dans `VISION.md`.

## Limites connues

- Les tests automatiques simulent le DOM et l'API Tizen ; ils ne vérifient ni
  l'installation/signature, ni le rendu, ni la télécommande physique.
- Pause/reprise vide et risque de boucles d'horloge concurrentes après bascule
  rapide ; correction volontairement laissée à une tâche fonctionnelle dédiée.
- L'ancien graphe local mentionnait encore un `install.ps1` absent du disque :
  preuve qu'il faut vérifier fraîcheur et sources. Ne pas supprimer de fichiers
  en se fondant sur le seul graphe.

## Prochaine action

Après revue de la PR, identifier la cible et consigner une première passe de la
grille TV de `TESTING.md`, puis fiabiliser le cycle de vie (roadmap P1).
À chaque reprise, vérifier l'état Git et les fichiers avant de mettre cette page
à jour ; ne pas ajouter de journal quotidien.
