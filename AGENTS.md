# Travailler sur NoiseSheet

NoiseSheet vise une application de photographie générative pour Samsung Tizen TV.
Le code actuel est un modèle TV avec horloge, pas encore un moteur artistique.

<!-- codebase-memory-mcp:start -->
For structural codebase exploration, use the installed `codebase-memory` skill.
<!-- codebase-memory-mcp:end -->

## À chaque tâche

Méthode : comprendre → planifier → coder → tester → documenter.

1. Lire `docs/STATE.md`, puis seulement les documents utiles. Vérifier `git status`
   et conserver les modifications et fichiers existants de l'utilisateur.
2. Identifier les composants concernés avec Codebase Memory ; vérifier leur
   couverture et leur fraîcheur, puis lire les sources nécessaires. Si MCP est
   indisponible ou incomplet, le signaler et utiliser `rg` et les fichiers.
3. Annoncer un plan bref et des critères de réussite observables. Faire une
   modification ciblée ; ne pas ajouter de framework ou refactorisation annexe.
4. Exécuter `node --test tests/app.test.cjs` et les vérifications pertinentes de
   `docs/TESTING.md`. Distinguer résultat automatique, navigateur et vraie TV.
5. Actualiser uniquement l'état, les tâches et décisions réellement changés.
   Résumer les fichiers modifiés, les vérifications et les limites restantes.

## Conventions

- Documentation et échanges en français ; noms de code cohérents avec l'existant.
- Dans `js/`, rester compatible avec la syntaxe actuelle (`var`, fonctions
  classiques) tant que le modèle de TV et son moteur Web ne sont pas validés.
  Node sert aux tests, jamais de dépendance d'exécution sur la TV.
- HTML/CSS/JS simples, ressources locales ; éviter les dépendances sans besoin
  démontré. Conserver les identifiants Tizen et les ressources existantes.
- Prévoir télécommande, focus visible, Retour et cycle de vie pour chaque écran.
  Ne pas supposer qu'un test avec API Tizen simulée valide un appareil réel.
- Réserver le paquet TV aux fichiers applicatifs. La documentation, les tests,
  les outils de développement et les réglages personnels restent hors du `.wgt`.
- Tester les comportements modifiés et leurs cas limites ; ne pas recopier
  l'implémentation dans les tests. Ne pas imposer de tests pour une simple prose.
- `docs/DECISIONS.md` : seulement les choix durables et leurs raisons.
  `docs/STATE.md` : situation et prochaine action, sans journal de conversation.
- Branche par tâche, commits ciblés (`docs:`, `test:`, `fix:`, `feat:`), PR courte
  indiquant problème, résultat et validation. Pas de fusion automatique.
- Ne jamais versionner certificats, clés, profils de signature, adresses de TV,
  réglages personnels, paquets signés ou base de graphe MCP.

La procédure MCP est dans `docs/CODEBASE_MEMORY.md` ; ne pas dupliquer le graphe
ou les sources dans la documentation.
