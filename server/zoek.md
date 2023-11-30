Dag Klipspringer,

Zoals al gemeld in issue #142 was ik even aan het kijken naar het testen, en heb ik even lokaal geprobeerd jullie applicatie te runnen. Het Agile manifesto zegt niet voor niets 😄  :

>"Running software over comprehensive documentation"

Hierbij heb ik meteen een opzetje gemaakt van README.md voor de back-end, met ook een MongoDB runnend in een Docker container. Vinden jullie het okee als ik dit incheck? Ik doe dit even als pull request die ik bij dit issue aanmaak.

<img width="1063" alt="image" src="https://github.com/HANICA-DWA/project-sep23-klipspringer/assets/3029472/1c8ba59d-671c-4f33-8fec-e7ae4a2c90b0">

Ook graag opnemen in README dat je Node v 21 of groter moet hebben. Ik heb nog v 18 en deze geeft een (de volgende) error als ik `npm test` run:

```console
node: bad option: --experimental-test-coverage
```

Nadat ik ben geupdatet naar v21(.2.0) krijg ik helaas alsnog een error. Hieronder foutmelding, ook ter eigen referentie. Dit is wellicht een macOS issue, of misschien herkennen jullie het.
------------

```console
npm test

> test
> cross-env NODE_ENV=test node --test --experimental-test-coverage ./__tests__/

node:internal/modules/cjs/loader:1147
  throw err;
  ^

Error: Cannot find module '/Users/bartvanderwal/Library/CloudStorage/OneDrive-HAN/DWA/project/project-sep23-klipspringer/server/__tests__'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1144:15)
    at Module._load (node:internal/modules/cjs/loader:985:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12)
    at node:internal/main/run_main_module:28:49 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v21.2.0
✖ __tests__ (41.151167ms)
  'test failed'

ℹ tests 1
ℹ suites 0
ℹ pass 0
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 46.974833
ℹ start of coverage report
ℹ -----------------------------------------------------
ℹ file | line % | branch % | funcs % | uncovered lines
ℹ -----------------------------------------------------
ℹ -----------------------------------------------------
ℹ all… | 100.00 |   100.00 |  100.00 |
ℹ -----------------------------------------------------
ℹ end of coverage report

✖ failing tests:

test at __tests__:1:1
✖ __tests__ (41.151167ms)
  'test failed'
```