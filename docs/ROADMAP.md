# Roadmap

Priorités de travail, sans engagement de calendrier. Cocher une étape seulement
avec ses preuves de validation.

- [x] **P0 — Préparer la méthode.** Règles Codex, documentation courte, tests du
  modèle, procédure MCP et workflow de vérification ajoutés à la branche de PR.
- [ ] **P1 — Valider le socle TV.** Identifier modèle/année, Tizen et outils ;
  installer et lancer l'application, exécuter la grille de `TESTING.md` et
  consigner les résultats. Résoudre ou accepter explicitement les écarts.
- [ ] **P1 — Fiabiliser le cycle de vie.** Reproduire puis corriger les séquences
  démarrer/arrêter/redémarrer rapidement et masquer/reprendre. Critères : une
  seule boucle active, arrêt effectif, comportement de reprise défini et tests
  de régression. Vérifier également Retour/Exit sur la cible.
- [ ] **P2 — Cadrer le premier moteur.** Choisir la référence visuelle, les
  entrées, trois interactions au maximum et le rendu attendu ; consigner le
  choix de technique dans `DECISIONS.md` après vérification de compatibilité.
- [ ] **P2 — Livrer une scène.** Implémenter ce périmètre, comparer le rendu à
  la référence et vérifier lisibilité, télécommande et stabilité sur la TV.
  Définir ensuite seulement les besoins de performance et d'endurance mesurés.

Les étapes suivantes (autres moteurs, export, persistance) dépendront de ce
premier retour d'usage. Ne pas préparer leur architecture à l'avance.
