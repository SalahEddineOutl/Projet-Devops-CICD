# 🚀 TP DevOps — Pipeline CI/CD avec GitHub Actions

## 📌 Description

Ce projet met en place un pipeline CI/CD complet dans le cadre du TP DevOps.  
Le pipeline est configuré avec **GitHub Actions** et utilise un **self-hosted runner local (Windows)**.  
L'application est une app **Frontend + Backend Node.js** avec base de données **SQLite** et tests automatisés.

---

## 🏗️ Architecture du projet
```
tp-devops/
├── app.js
├── db.js
├── package.json
├── public/
│   └── index.html
├── tests/
│   ├── unit.test.js
│   └── integration.test.js
└── .github/
    └── workflows/
        └── ci.yml
```

---

## ⚙️ Installation en local

**1. Cloner le projet**
```bash
git clone https://github.com/USERNAME/Projet-Devops-CICD.git
cd Projet-Devops-CICD
```

**2. Installer les dépendances**
```bash
npm install
```

**3. Lancer l'application**
```bash
npm start
```

Application disponible sur : [http://localhost:3000](http://localhost:3000)

---

## 🔐 Variables nécessaires

| Type | Nom | Valeur |
|------|-----|--------|
| Variable | `APP_NAME` | `TPDevOps` |
| Secret GitHub | `DB_PASSWORD` | *(confidentiel)* |

> Les secrets sont configurés dans : **GitHub → Settings → Secrets and Variables → Actions**

---

## 🧪 Tests

Deux types de tests sont exécutés automatiquement :

**Tests unitaires**
```bash
npm run test:unit
```

**Tests d'intégration**
```bash
npm run test:integration
```

---

## ⚡ Pipeline CI/CD

Le pipeline se déclenche automatiquement sur **push** et **pull request**.

### Étapes du pipeline

| Ordre | Étape | Description |
|-------|-------|-------------|
| 1 | Installation | Installation des dépendances |
| 2 | Tests unitaires | Exécution en parallèle |
| 2 | Tests d'intégration | Exécution en parallèle |
| 3 | Génération d'artefacts | Rapport de tests |
| 4 | Analyse des artefacts | Téléchargement et analyse |
| 5 | Build Dev | Build environnement DEV (en parallèle) |
| 5 | Build Prod | Build environnement PROD (en parallèle) |

### 🖥️ Runner local

Un self-hosted runner GitHub est utilisé pour exécuter les jobs sur une machine locale Windows.
```yaml
runs-on: self-hosted
```

---

## 📦 Artefacts

Le pipeline produit plusieurs artefacts téléchargeables depuis GitHub :

| Artefact | Description |
|----------|-------------|
| `test-artifact` | Rapport de tests |
| `build-dev` | Build environnement Dev |
| `build-prod` | Build environnement Prod |

Les artefacts ont une **durée de conservation définie** et sont **réutilisés entre jobs**.

### 🔄 Réutilisation entre jobs
```
unit-tests       →  génère   →  test-artifact
analyse-artifact →  télécharge →  test-artifact
```

---

## 🌍 Build multi-environnements

| Environnement | Variable `API_URL` |
|---------------|-------------------|
| `DEV` | `https://dev.api.local` |
| `PROD` | `https://prod.api.local` |

Chaque environnement génère un artefact distinct.
