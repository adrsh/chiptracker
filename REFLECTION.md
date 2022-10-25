# Reflektion

## Meaningful Names
Det känns som att jag redan har tagit hänsyn till mycket av det som sägs, men lite extra under dessa labbar. Jag har försökt att vara lite mer övertydlig i namngivningen, men frågan är ibland om man behöver vara övertydlig eller om det är överflödigt. En funktion som heter nameToIndex (name) säger kanske inte så mycket tagen ur sitt sammanhang, men om man vet att den finns inuti en klass som heter Note så kanske man kan ana vad som händer, speciellt om den är privat. Jag har dock valt det första alternativet.

```js
noteNameToNoteIndex (noteName)
```
eller
```js
nameToIndex (name)
```

Sökbarheten är säkert bättre med det övre alernativet i och med att det skulle kunna finnas andra klasser som gör något liknande. Det kanske även blir lättare för editorn att föreslå rätt funktioner.

## Functions
Här kan vi dock se ett exempel på en funktion som gör alldeles för många saker, och där jag inte har följt bokens råd. Funktionen såg inte ut så här från början, utan det lades på nya saker allt eftersom, och då får man väl helt enkelt ta ett beslut att strukturera om hela funktionen.
```js
#handleKeyPress (event) {
  if (!event.repeat) {
    const noteNumber = this.#getNoteFromKey(event.code)
    const key = this.#getKeyFromMapping(event.code)
    if (noteNumber) {
      this.selectedNote = this.#selectNote(this.cursor.column, this.cursor.row)
      this.selectedNote.setAttribute('note', noteNumber)
    } else if (key) {
      event.preventDefault()
      if (key === 'Delete') {
        this.selectedNote = this.#selectNote(this.cursor.column, this.cursor.row)
        this.selectedNote.removeAttribute('note')
      } else if (key === 'Play') {
        this.#playPattern()
      }
    }
  }
}
```

Ett förbättringsförslag är det nedanstående där jag bryter ut stora delar. Nu gör funktionen en sak, har abstraherat lågnivå och är mycket mer lättläslig.

```js
#handleKeyDownEvent (event) {
  if (this.#isNoteKey(event.code)) {
    this.#handleNoteEvent(event)
  } else if (this.#isActionKey(event.code)) {
    this.#handleActionEvent(event)
  }
}
```


## Comments
Självförklarande kod är något som jag har börjat att tänka på oftare, istället för att skriva en lång if-sats med många olika jämförelser, så bryter man ut det och gör det mer lättläsligt.
```js
if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
  event.preventDefault()
  this.#handleArrowKeys(event.key)
}
```
```js
if (this.#isArrowKey(event.key)) {
  event.preventDefault()
  this.#handleArrowKeys(event.key)
}
```

Här är dock något som skulle kunna förbättras istället för att ha en eventuellt lite svårtolkad kommentar. Det är rätt så uppenbart vad som kan brytas ut här till egna funktioner i och med att kommentarerna säger *Extract octave* och *Extract note name*.
```js
notationToNoteNumber (notation) {
  if (notation.length > 3 || notation.length < 2) {
    throw new Error('Note notation has an invalid format.')
  }

  // Extract octave
  const octave = parseInt(notation.charAt(notation.length - 1))
  if (isNaN(octave) || octave < 0 || octave > 8) {
    throw new Error('Octave is out of range.')
  }

  // Extract note name
  let noteName
  if (notation.length === 2) {
    noteName = notation.slice(0, 1)
  } else if (notation.length === 3) {
    noteName = notation.slice(0, 2)
  }

  // Octave needs to add one because C0 is octave 0 but note number 12.
  return (octave + 1) * 12 + this.noteNameToNoteIndex(noteName)
}
```

Eftersom jag använder LNU:s kodstandard för Javascript så klagar editorn när det saknas en JSDoc-kommentar på funktioner. Visst, det kan vara lite tradigt att skriva dessa kommentarer för minsta lilla funktion, men man får tänka på att man inte alltid skriver kod som bara ska användas av en själv. Boken skriver om *Noise Comments* om kommentarer påpekar sådan som är uppenbart och inte tillför något nytt och att man lär sig att ignorera sådant, vilket jag kan hålla med om.


## Formatting
Boken skriver om *Team Rules* som handlar om ett utvecklingsteam bör komma överens om en kodstandard, och så får alla anpassa sig efter den. I andra kurser har vi varit behövt använda lnu:s kodstandard, men det är inte omöjligt att man får byta till ett annat sätt på en arbetsplats. Det händer att när man byter från Javascript till Java att man råkar glömma semikolon, men då är det tur att editorn och kompilatorn säger till.

```js
export function start(){
    context.start();
}
```
eller
```js
export function start () {
  context.start()
}
```

ESLint gör det möjligt att hitta och fixa problem automatiskt och editorn hjälper till att fixa indenteringen, så det finns mycket verktyg som hjälper en att ha prydligare kod.

## Objects and Data Structures
Efter att ha sett på föreläsningen så blev jag osäker på om jag använder getters och setters på rätt sätt. Just nu gör jag mer eller mindre som om det vore skrivet i Java, det vill säga på följande sätt:
```js
getNotation () {
  return this.noteNumberToNotation(this.#number)
}
```

I mitt fall är Note-klassen mer som en datastruktur och borde istället ge tillgång till variabler på nedanstående sätt, om jag har förstått rätt.
```js
get notation () {
  return this.name + this.octave
}

get octave () {
  return Math.floor((this.#number - 12) / 12)
}

get name () {
  return this.#noteIndexToNoteName(this.#number % 12)
}
```


## Error Handling

Boken tycker att man inte ska returnera null eftersom man måste kontrollera om värdet som har returnerats är null eller inte. Till exempel att skicka en tom lista istället för null. Men jag kan förstå principen att inte använda null och validera på något annat sätt, eller kasta ett fel istället.

Här är dock två exempel på liknande kod som jag har just nu. Övre exemplet är från modulen och den andra från applikationen. Jag ville att modulen skulle vara mer robust och använde Exceptions i några fall, men frågan är om det verkligen gjorde någon skillnad.
```js
  case 'B': return 11
  default: throw new Error('Invalid note name.')
}
```
```js
  case 'KeyP': return 76
  default: return null
}
```

Jag känner dock att min felhantering är lite hipp som happ, specifikt i Note-klassen. Jag sätter notnumret, och istället för att använda det felkontrollerade nya #number så använder jag fortfarande noteNumber till resterande funktioner, och kunde istället använda *getters* till frequency, octave, och name, istället för att sätta dem i denna funktion.

```js
#setNote (noteNumber) {
  this.#setNumber(noteNumber)
  this.#frequency = this.noteToFrequency(noteNumber)
  this.#octave = Math.floor((noteNumber - 12) / 12)
  this.#name = this.noteIndexToNoteName(noteNumber % 12)
}
```

Sedan jag skrev detta har jag strukturerat om Note-klassen en del och bytt ut de privata fälten till getters enligt Javascript. Istället blev det bara att hålla koll på variabeln *number* för alla resterande egenskaper.

## Boundaries

I modulen använder jag Web Audio API:et som kan vara lite komplicerat att förstå, och därför skrev jag lite kommentarer om vad det är som sker för att själv kunna komma ihåg det. Det tog en stund att sätta sig in i det och lista ut hur det fungerar, och då inser man att kodexempel är rätt så viktigt för att någon annan ska förstå vad min egna modul gör.

Exempel på kod där jag använder Web Audio API och försöker förstå mig på vad som händer.
```js
play (note, time = context.now()) {
  // Cancels any scheduled and ongoing changes to the gain value.
  this.gainNode.gain.cancelAndHoldAtTime(time)

  // Changes frequency of the oscillator.
  this.oscillator.frequency.setValueAtTime(note.frequency, time)

  // Sets the gain to 0.1 at the specified time.
  this.gainNode.gain.setValueAtTime(0.1, time)

  // Ramps the gain to zero linearly one second after the time.
  this.gainNode.gain.linearRampToValueAtTime(0, time + 1)
}
```


## Unit Tests

Jag vet att testning är en viktig del i mjukvaruutveckling, och det är verkligen något som jag borde sätta mig in i mer. Visst kan man göra manuella tester för att testa gränssnitt, men just att testa enskilda funktioner är något som helst görs automatiskt.

Boken säger att det är testerna som gör att man inte är rädd för att ändra koden, att ju fler tester man har desto mindre är man rädd för att göra något fel. Det stämmer nog och ger en trygghet i och med att man snabbt kan se om det har gått helt snett.

Utifrån sett ser modulen säkerligen pålitligare ut om den är vältestad.

Det hade kanske inte skadat att ha ett par *asserts* för att debugga koden lite lättare, men det är inte riktigt samma sak som *unit tests*.

```js
assert(2 > 1, 'Two is not bigger than one!?')
```

## Classes

Jag var inte helt nöjd med filstrukturen av webchiptune-modulen. Alla klasser och funktioner låg i en och samma fil, vilket var på grund av att jag inte lyckades lösa så att klasserna har tillgång till samma AudioContext om de ligger i olika filer. Detta har jag nu löst och nu har modulen en bättre filstruktur.

Variabler i Instrument och metoder och variabler i Note gjordes privata för att kapsla in dem och hålla dem privata.

```js
#oscillator
#gainNode
#audioContext
```

```js
#noteNotationToNoteNumber (notation)
```

Föreläsningen om objekt och felhantering gjorde att jag skrev om kod i Note-klassen i modulen och strukturerade det på ett sätt som känns lite bättre i alla fall. Som jag har exempel på under rubriken *Objects and Data Structures*.


## Systems

Jag är absolut inte säker på om jag har byggt modulen på rätt sätt. Boken nämner att det är en myt att system görs rätt från början. Det är svårt att säga redan nu vilka problem som kan uppstå i framtiden. Man kan ju se till att strukturera koden på ett sätt som gör det lättare att förstå den och kunna bygga vidare på den. 

```
├─ .gitignore
├─ DEVELOPER.md
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ README.md
├─ REFLECTION.md
├─ src
│  ├─ css
│  │  └─ style.css
│  ├─ index.html
│  └─ js
│     ├─ components
│     │  ├─ ct-cursor
│     │  │  ├─ ct-cursor.js
│     │  │  └─ index.js
│     │  ├─ ct-options
│     │  │  ├─ ct-options.js
│     │  │  └─ index.js
│     │  ├─ ct-sequence
│     │  │  ├─ ct-sequence.js
│     │  │  └─ index.js
│     │  ├─ ct-sequence-note
│     │  │  ├─ ct-sequence-note.js
│     │  │  └─ index.js
│     │  └─ ct-tracker
│     │     ├─ ct-tracker.js
│     │     └─ index.js
│     ├─ index.js
│     └─ webchiptune
│        ├─ context.js
│        ├─ index.js
│        ├─ instrument.js
│        ├─ note.js
│        ├─ pattern.js
│        └─ sequence.js
└─ vite.config.js
```

Rubriken *Separate Construcion a Sytem from Using It* skriver om att uppstartsprocessen är något man bör ta itu med. I Javascript skulle man kunna likna det med att man inte ska importera filer/moduler förrän de behövs, till exempel att man inte lägger alla importer i index.js.

```js
import '../ct-sequence-note'
```