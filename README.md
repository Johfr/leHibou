# install
Nuxt3
typescript
sass
json-server
tailwindcss
pinia

# init
pnpm install
pnpm run dev

# server
npx json-server --watch server/db.json --port 3001


# techno utilisée
- pinia store pour stocker les datas. préférable à vueX depuis la version 3 de vue


### Notes sur l'implémentation
- Par souci de temps et d'efficacité, j'ai choisi de me concentrer sur les fonctionnalités principales demandées, notamment le CRUD complet. Certaines fonctionnalités bonus (tests unitaires, barre de recherche, pagination, catégorisation, etc.) n'ont pas été implémentées, mais elles sont réalisables en production si nécessaire.
- Concernant le style, j'ai mixé TailwindCSS et des classes CSS personnalisées pour ce test. En projet réel, je m'aligne toujours sur les normes et bonnes pratiques définies par l'équipe.