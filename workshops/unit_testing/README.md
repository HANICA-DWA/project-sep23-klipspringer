# Test workshop

Dit is de test workshop van DWA. In 2023 was deze op dinsdag 7-11-2023 van Lars Tijsma.

Hieronder enkele gebruikte commando's. Voor context moet je wel de workshop hebben bijgewoond en meegedaan (en vragen stellen als je vastloopt).

## How to run

```console
// 
cd workshops/unit_testing
npm install

cd 02_mongoose_model_testing 
node map_server.js 
```

Handmatig uitvoeren test script.

```console
# Uitvoeren handmatig test (merk op dat je de `.js` extensie)
node 01_class_testing/manual-player-test

```

Gebruiken test framework `jest`.

```console
npm run test

// Of kort (voor aantal standaard acties zoals 'test', 'start' hoef je niet `npm run ...` te doen)
// npm test
```
