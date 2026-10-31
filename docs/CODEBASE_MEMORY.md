# Codebase Memory MCP

Le poste examiné dispose déjà du serveur et du skill `codebase-memory` pour
Codex/VS Code. Cette installation est personnelle : ne pas la recopier dans le
dépôt et ne pas remplacer les configurations globales ou les réglages VS Code.
Sur un autre poste, installer le serveur selon sa documentation officielle,
redémarrer la session Codex, puis vérifier que ses outils sont disponibles.

## Boucle de travail

1. Lire le skill installé. Appeler `list_projects`, puis `index_status` pour le
   projet dont `root_path` correspond au dossier **actuellement ouvert**.
   Ne pas réutiliser le graphe d'une autre copie de NoiseSheet.
2. Si nécessaire, appeler `index_repository` avec `repo_path` absolu et
   `persistence: false`. En mode `async: true`, suivre le travail avec
   `index_repository` (`status: true`, même chemin) jusqu'à sa fin.
3. Pour comprendre la structure : `get_graph_schema`, puis `search_graph` ciblé.
   Lire les symboles utiles avec `get_code_snippet` ; utiliser `trace_path`
   entrant/sortant selon la question. Paginer si `has_more` le demande.
4. Appeler `check_index_coverage` pour les chemins cités et, pour une affirmation
   d'absence, les scopes concernés. Couverture propre ne signifie pas preuve
   d'exhaustivité : vérifier le disque pour les fichiers exclus, manquants ou
   obsolètes. Lire HTML, manifeste et ressources au besoin.
5. Après changement structurel, vérifier la fraîcheur ; réindexer si nécessaire.
   Éviter une réindexation complète pour chaque petite édition de texte.

Les noms exacts et paramètres suivent les outils exposés par la version installée.
Le projet est identifié par le nom renvoyé par `list_projects` ou son chemin
absolu, jamais par le simple nom supposé `NoiseSheet`.

## Séparation des mémoires

- MCP : symboles et relations techniques ; base locale, ignorée par Git.
- `DECISIONS.md` : choix et raisons ; `STATE.md` : situation et prochaine action.
- Pas de copie des sources, inventaire exhaustif de fonctions ou export du graphe
  dans les Markdown. Pas de serveur MCP requis dans les tests ou la CI.

Si MCP ne répond pas, poursuivre avec `rg` et la lecture ciblée, en signalant la
limite. Ne pas annoncer un graphe actualisé sans avoir vérifié son état.
