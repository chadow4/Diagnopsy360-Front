
# Diagnopsy360 Front-End

<div align="center">
    <img src="https://diagnopsy.jsmb.fr/assets/img/logo.png" alt="Logo Diagnopsy360" width="500" height="auto"/>
</div>

<br/>
Diagnopsy360 est une plateforme interactive dédiée à la santé psychologique, conçue pour faciliter la communication et le suivi entre les professionnels de la santé mentale et leurs patients. Créée avec [Angular CLI](https://github.com/angular/angular-cli) version 16.2.4, cette application offre une interface utilisateur intuitive pour le questionnement des patients sur leur état psychologique, la réalisation de diagnostics psychologiques, et la communication efficace entre médecins et patients.

La mise en production de l'application est : [https://diagnopsy.jsmb.fr](https://diagnopsy.jsmb.fr)

## I. Pré-requis 
  - **Node.js et npm (Node Package Manager)**
  Angular requiert Node.js pour son environnement d'exécution et npm pour la gestion des paquets. 
  
  - **Angular CLI** 
 Angular CLI est un outil essentiel pour développer des applications Angular 
 ```npm install -g @angular/cli```
 - **Éditeur de code ou IDE** Un environnement de développement intégré (IDE) ou un éditeur de texte pour écrire et gérer le code.


## II. Lancer le projet

Exécutez `ng serve` pour un lancer le serveur de développement. Naviguez vers `http://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez l'un des fichiers source.

Si vous souhaitez build le projet : 
Exécutez `ng build` pour construire le projet. Les artefacts de construction seront stockés dans le répertoire `dist/`.

## III.  Organisation des Pages de l'application

### A. Routes Publiques

Ces routes sont accessibles à tous, sans nécessité de connexion.

#### Route Accueil (`/home`)

-   Redirige automatiquement du chemin racine (`''`) vers `/home`.
-   Page principale accessible à tous, offrant un aperçu général de la plateforme.
-  Lien vers la page du questionnaire

#### Route Connexion (`/login`)

-   Page de connexion pour les utilisateurs existants.

#### Route Inscription (`/register`)

-   Page d'inscription pour les nouveaux utilisateurs.
- 
### B. Routes Réservées aux Médecins

Accessibles uniquement aux utilisateurs connectés avec des privilèges de médecin.

#### Route Docteur (`/doctor`)

-   Panneau de contrôle pour les médecins.
-   Permet de voir la liste des patients en attente de diagnostics et la liste des diagnostics des ses patients.

#### Route Diagnostics Docteur (`/doctor/diag`)

-   Page dédiée au diagnostic psychologique par les médecins.
-   Outils interactifs pour évaluer et enregistrer les diagnostics des patients.

### C. Routes Réservées aux Patients

Nécessitent une connexion et des privilèges de patient.

#### Route Questionnaire (`/questionnaire`)

-   Page où les patients remplissent des questionnaires de pré-diagnostic.
-   Collecte d'informations initiales sur l'état psychologique du patient.

#### Route Mes Diagnostics (`/mydiagnosis`)

-   Visualisation des diagnostics en attente de traitement et validés pour le patient.
- Accéder à la page Diagnostic Details.

### D. Routes communes aux Médecins et patients 

Accessibles aux utilisateurs connectés 

#### Route Diagnostic Détails (`/diagnosis/:id`)

-   Permet d'accéder à un diagnostic psychologique particulier.
-   Conclusion de la consultation.
-  Echange entre patient et médecin à l'aide d'une messagerie instantanée.

#### Route Mes Informations (`/myinfos`)

-   Page permettant aux utilisateurs de consulter et de modifier leurs informations personnelles.
