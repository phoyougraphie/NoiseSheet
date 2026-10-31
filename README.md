# NoiseSheet

Projet de photographie générative pour Samsung Tizen TV, développé avec VS Code
et Codex. À ce stade, l'application est le modèle Tizen TV local : navigation,
focus et horloge. Le rendu génératif n'est pas encore implémenté.

## Démarrer

Ouvrir ce dossier dans VS Code. Pour les vérifications automatiques, utiliser
Node.js 24, puis lancer à la racine :

```powershell
node --test tests/app.test.cjs
```

Aucune installation npm n'est nécessaire : les tests utilisent les modules
intégrés à Node. `npm test` est aussi disponible si npm est installé.
Ouvrir `index.html` dans un navigateur permet un aperçu avec
les flèches et Entrée ; Retour/Exit nécessite l'API Tizen et une vraie validation
TV. La visibilité et le rendu réel ne sont pas couverts par les simulations.

Pour la TV : disposer des outils Samsung/Tizen, d'une cible configurée et d'un
profil de signature local. Suivre [les vérifications TV](docs/TESTING.md).
La cible identifiée et le premier lancement confirmé sont consignés dans
[l'état du projet](docs/STATE.md). La grille complète reste à exécuter ; aucun
script de déploiement automatique n'est livré.

## Reprendre avec Codex

Lire [AGENTS.md](AGENTS.md) et [l'état actuel](docs/STATE.md), puis demander par
exemple : « Reprends NoiseSheet, vérifie l'état réel et traite la prochaine tâche
de la roadmap avec ses critères de validation. »

- [Vision](docs/VISION.md) : intention et questions ouvertes.
- [Architecture](docs/ARCHITECTURE.md) : organisation constatée.
- [Roadmap](docs/ROADMAP.md) : tâches et critères de réussite.
- [Décisions](docs/DECISIONS.md) : choix durables.
- [Codebase Memory MCP](docs/CODEBASE_MEMORY.md) : exploration et mémoire technique.

Les six fichiers de l'application proviennent du dossier local existant et sont
conservés sans modification fonctionnelle. Les réglages personnels VS Code ne
sont pas publiés. Aucun choix de licence n'a été fait dans cette préparation.
