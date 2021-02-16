# lokaal testen:

- start maven(intellij)
- start nodejs(`npm run local`)

gebruik http://localhost:8000 (poort van nodejs)

`npm run local` doet npm run build elke keer als er een bestand wordt aangepast.

# deploy:

deze stappen worden automatisch uitgevoerd:

```bash
npm install
npm run build
mvn package #gooit alles in een war, voor tomcat
```

gebruik http://localhost:8080 (poort van spring/java)

daarna wordt maven gebruikt voor de hosting.

# NodeJS server steps:

- bij aanpassen van bestand in `/frontend` reload de rollup config
- server:
  - als bestand in `src/main/resources/resources` staat, geef dat bestand
  - anders, stuur door naar spring server (http://localhost:8080)

# Vragen?

https://github.com/RubenNL/java-rollup-test/discussions/
