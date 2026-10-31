# Architecture constatée

Application Web statique, sans compilation ni bibliothèque externe dans les
sources examinées. Node et GitHub Actions servent uniquement aux vérifications.

```text
config.xml → index.html → css/style.css
                       → js/main.js
                       → images/tizen_32.png
config.xml → icon.png
```

| Fichier | Responsabilité actuelle |
| --- | --- |
| `config.xml` | Manifeste, entrée HTML, identité et paramètres Tizen |
| `index.html` | Menu de trois liens, bouton d'horloge et zones de texte |
| `js/main.js` | Initialisation, focus, touches, horloge et sortie Tizen |
| `css/style.css` | Présentation du modèle et états de focus |
| `tests/` | Tests Node avec DOM/API Tizen simulés et liens de ressources |

Le manifeste déclare `required_version="2.3"`, une orientation paysage et la
fonctionnalité d'écran `screen.size.normal.1080.1920`. C'est une déclaration du
modèle, pas une preuve de compatibilité avec une TV donnée. Conserver ces valeurs
tant que la cible n'a pas été vérifiée.

`window.onload` initialise le focus et les événements. Les flèches déplacent le
focus, Entrée commande l'horloge ou affiche un texte de remplacement. Les codes
10009 et 10182 appellent `tizen.application.getCurrentApplication().exit()`.
L'horloge utilise `setTimeout`. Le gestionnaire `visibilitychange` est vide.

Points à traiter avant un usage prolongé : pause/reprise sans traitement,
temporisateurs potentiellement multiples après arrêt/redémarrage rapide,
sortie dépendante de l'API Tizen. Le navigateur seul ne valide pas ces aspects.

Il n'y a pas encore de moteur de rendu photographique dans ces sources. Créer
des modules supplémentaires seulement lorsqu'une fonctionnalité les justifie.
