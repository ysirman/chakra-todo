https://user-images.githubusercontent.com/24975537/206498166-7bf3fbcd-cfd8-44e2-87e3-50c20a5d8eb8.mov

# 環境構築

```bash
# Next.js セットアップ
npx -y create-next-app@latest --use-npm --ts .

# eslint インストール
npm init @eslint/config

# prettier インストール
npm install --save-dev @typescript-eslint/eslint-plugin prettier eslint-config-prettier

# chakra-ui インストール
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
npm i @chakra-ui/icons

# prisma インストール
# https://vercel.com/guides/nextjs-prisma-postgres#step-2:-set-up-prisma-and-connect-your-postgresql-database
npm install prisma --save-dev
npm install @prisma/client

# prisma studio の起動
npx prisma studio

# migration
# 実行
npx prisma migrate dev
# リセット
npx prisma migrate reset
```

# 参考記事

- https://zenn.dev/mizchi/articles/1c35fdcc77065c02f631
- https://vercel.com/guides/nextjs-prisma-postgres
