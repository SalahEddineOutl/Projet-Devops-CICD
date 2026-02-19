# 🚀 TP DevOps — Pipeline CI/CD avec GitHub Actions

## 📌 Description

Ce projet a pour objectif de mettre en place un pipeline CI/CD complet dans le cadre du TP DevOps.

Le pipeline est configuré avec **GitHub Actions** et utilise un **self-hosted runner local (Windows)**.

L’application est une application **Frontend + Backend Node.js** avec base de données SQLite et tests automatisés.


## 🏗️ Architecture du projet

tp-devops/
│── app.js
│── db.js
│── package.json
│── public/
│ └── index.html
│── tests/
│ ├── unit.test.js
│ └── integration.test.js
│── .github/
│ └── workflows/
│ └── ci.yml



## ⚙️ Installation en local

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/USERNAME/Projet-Devops-CICD.git
cd Projet-Devops-CICD
2️⃣ Installer les dépendances
npm install
3️⃣ Lancer l’application
npm start
Application disponible sur :

http://localhost:3000
🔐 Variables nécessaires
Variables utilisées dans le pipeline :

Variable non sensible
APP_NAME = TPDevOps
Secret GitHub
DB_PASSWORD
Le secret est configuré dans :

GitHub → Settings → Secrets and Variables → Actions
🧪 Tests
Deux types de tests sont exécutés automatiquement :

Test unitaire
npm run test:unit
Test d’intégration
npm run test:integration
Les tests sont exécutés à chaque pipeline.

⚡ Pipeline CI/CD
Le pipeline contient les étapes suivantes :

Installation des dépendances

Tests unitaires

Tests d’intégration

Génération d’artefacts

Analyse des artefacts

Build selon environnement

Déclenchement automatique :

push

pull request

🖥️ Runner local
Un self-hosted runner GitHub est utilisé pour exécuter les jobs sur une machine locale Windows.

Configuration :

runs-on: self-hosted
📦 Artefacts
Le pipeline produit plusieurs artefacts :

Rapport de tests (test-artifact)

Build environnement dev (build-dev)

Build environnement prod (build-prod)

Les artefacts :

sont téléchargeables depuis GitHub

ont une durée de conservation définie

sont réutilisés entre jobs

🔄 Réutilisation des artefacts
Un job génère un artefact :

unit-tests → test-artifact
Un autre job le récupère :

analyse-artifact → download-artifact
⚙️ Parallélisation
Les jobs suivants sont exécutés en parallèle :

unit-tests

integration-tests

Puis :

build-dev

build-prod

Cela permet une orchestration optimisée du pipeline.

🌍 Build multi-environnements
Deux environnements sont configurés :

Dev
Environment: DEV
API_URL=https://dev.api.local
Prod
Environment: PROD
API_URL=https://prod.api.local
Chaque environnement génère un artefact différent.
