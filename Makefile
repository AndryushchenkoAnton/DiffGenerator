install:
       npm ci

link:
     npm link

gendiff:
        node bin/gendiff.js -h

lint:
     npx eslint .

fix:
   npx eslint --fix .

