install:
	npm install
start:
	npx babel-node -- src/bin/gendiff.js before.json after.json
publish:
	npm publish
lint:
	npm run eslint .
test:
	npm run test