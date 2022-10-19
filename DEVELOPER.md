## Vision

Tanken är att denna webbapplikation ska fungera som en *music tracker*, till exempel FamiTracker, och användas till att göra enklare chiptune-liknande musik.

## Krav

### Redigering

1. Lägga ut noter med tangentbordet
2. Flytta markören med piltangenterna
3. Flytta markören med muspekaren
4. Ta bort noter
5. Förflytta noter med muspekaren
6. Markera flera noter för förflyttning eller borttagning

### Uppspelning

1. Spela upp det som har skapats
2. Stoppa uppspelningen
3. Ändra tempo på uppspelningen

### Ljud

1. Välja mellan olika instrument/oscillatorer (square, sine, triangle, sawtooth)


## Testspecifikation

## A. Redigering

### 1. Lägga ut noter med tangentbordet
Förberedelser: Starta applikationen.

Teststeg: Tryck på Z på ditt tangentbord.

Förväntat resultat: Noten C3 placeras ut på markörens position.

### 2. Flytta markören med piltangenterna
Förberedelser: Starta applikationen.

Teststeg: Tryck på nedåtpilen och sedan högerpilen.

Förväntat resultat: Markören flyttas nedåt en rad och en kolumn till höger.


### 3. Flytta markören med muspekaren
Förberedelser: Starta applikationen.

Teststeg: Klicka på en rad och kolumn som inte markören står på.

Förväntat resultat: Markören flyttas till den rad och kolumn som klickades på.

### 4. Ta bort noter
Förberedelser: Starta applikationen.

Teststeg: Tryck på Z på ditt tangentbord för att placera ut en not. Tryck sedan på Delete-knappen.

Förväntat resultat: Noten C3 placeras ut på markörens position och tas bort när man trycker på Delete.

### 5. Förflytta noter med muspekaren
Förberedelser: Starta applikationen.

Teststeg: Tryck på Z på ditt tangentbord för att placera ut en not. Dra sedan noten med muspekaren till en annan rad.

Förväntat resultat: Noten C3 placeras ut på markörens position och förflyttas när noten dras med muspekaren.

### 6. Markera flera noter för förflyttning eller borttagning
Förberedelser: Starta applikationen.

Teststeg: Tryck på Z på ditt tangentbord för att placera ut en not. Dra sedan noten med muspekaren till en annan rad.

Förväntat resultat: Noten C3 placeras ut på markörens position och förflyttas när noten dras med muspekaren.


## B. Uppspelning
### 1. Spela upp det som har skapats
Förberedelser: Starta applikationen.

Teststeg: Tryck på Z på ditt tangentbord för att placera ut en not. Klicka sedan på Play-knappen.

Förväntat resultat: Noten C3 placeras ut på markörens position och spelas upp när man klickar på Play.

### 2. Stoppa uppspelningen
Förberedelser: Starta applikationen.

Teststeg: Tryck på Z på ditt tangentbord för att placera ut en not. Klicka sedan på Play-knappen och därefter snabbt på Stop-knappen.

Förväntat resultat: Noten C3 placeras ut på markörens position och spelas upp när man klickar på Play och stoppas när man klickar på Stop.

### 3. Ändra tempo på uppspelningen
Förberedelser: Starta applikationen.

Teststeg: Placera ut noter på rutnätet. Klicka sedan på Play-knappen. Stoppa uppspelningen. Byt tempo till 90. Klicka på Play.

Förväntat resultat: Noterna spelas upp i 120 BPM först och sedan 90.

### C. Ljud

### 1. Välja mellan olika instrument/oscillatorer (square, sine, triangle, sawtooth)
Förberedelser: Starta applikationen.

Teststeg: Placera ut noter på varje kolumn genom att trycka på Z på tangentbordet och vänsterpil för att placera noter och byta kolumn för markören.

Förväntat resultat: Olika instrument/oscillatorer hörs när de olika kolumnerna spelas upp tillsammans.

## Testresultat

| Testfall | Resultat |
|----------|----------|
| A1 | OK |
| A2 | OK |
| A3 | OK |
| A4 | OK |
| A5 | FAIL |
| A6 | FAIL |
| B1 | OK |
| B2 | OK |
| B3 | OK |
| C1 | OK |

A5 och A6 misslyckas eftersom de i nuläget inte är implementerade.

## Applikationen i nuläget

Applikationen är byggd med *custom elements* och kommunicerar med events och attribut. Applikationen har i dagsläget grundläggande funktionalitet som är begränsad till funktionaliteten i Webchiptune.

## Framtida förbättringar

- Höja och sänka oktav på noter med kortkommando
- Visa vilken rad som uppspelningen befinner sig på
- Loopa uppspelningen
- Förflytta noter med muspekaren
- Markera flera noter för förflyttning eller borttagning

En *music tracker* som FamiTracker har egentligen fler avancerade funktioner. En not-rad har fält för volym, "instrument" och olika effekter som skulle kunna implementeras. Men dessa funktioner bör istället impementeras i Webchiptune, som i nuläget har väldigt grundläggande funktionalitet.