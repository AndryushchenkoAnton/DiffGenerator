install:
       npm ci

link:
     npm link

difference:
        node bin/gendiff.js -h

lint:
     npx eslint .

fix:
   npx eslint --fix .

