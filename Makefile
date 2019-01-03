install:
	npm install
start:
	npx babel-node -- src/bin/gendiff.js
publish:
	npm publish
lint:
	npx run eslint .
test:
	npm run test