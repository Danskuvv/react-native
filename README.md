1. Testikäyttäjätunnukset:
kayttaja1, salasana
kayttaja2, salasana
Voit myös luoda oman käyttäjätunnuksen.

kuvakaappaukset sovelluksen käyttöliittymästä:


Sovelluksen käyttöönottoohjeet:
1. Lataa tämän repon tiedostot ja pura ne.
3. Lataa Expo go puhelimen sovelluskaupasta.
4. Käynnistä sovellus.
5. suorita npm start projektin root kansiossa. (Ongelmien sattuessa voit kokeilla "npm run android" (tai IOS), "npm run tunnel" tai "npm run web"(rajoitettu toiminnallisuus) ).
6. Skannaa qr koodi, tai kirjoita ip manuaalisesti. Voit myös painaa "a", jos android laite on yhdistetty USB:llä ja usb vianetsintä on laitettu päälle androidin järjestelmäasetuksista.

linkit käytössä oleviin back-end API:hin
Media-api: https://media-api-71zl.onrender.com/api/v1 | https://github.com/Danskuvv/media-api
Auth-api: https://auth-api-07r2.onrender.com/api/v1 | https://github.com/Danskuvv/auth-api
Upload-api: https://upload-api-idxk.onrender.com | https://github.com/Danskuvv/upload-api


linkki API-dokumentaatioon (apidoc)_
-https://auth-api-07r2.onrender.com
-
-


Tietokannan kuvaus
![image](https://github.com/Danskuvv/react-native/assets/111982581/03177aac-2dd3-413b-8c3a-a5439d29dd0d)

listaus ja kuvaus kaikista toiminnallisuuksista, mitä olet toteuttanut

Käyttäjän rekisteröityminen: Käyttäjä voi rekisteröityä sovellukseen luomalla uudet tunnukset käyttäjätunnuksella, sähköpostilla ja salasanalla.
Käyttäjän kirjautuminen: Käyttäjä voi kirjautua sisään käyttäjänimellä ja salasanalla
Julkaisut listassa: Käyttäjä näkee ihmisten julkaisuja etusivulla.
Yksittäiset julkaisusivut: Käyttäjä voi klikata julkaisuja, jolloin niitä voi tarkastella yksityiskohtaisesti ja saa enemmän toimintoja saataville.
Julkaisun muokkaus: Julkaisun sivulla julkaisun omistaja voi muokata julkaisun otsikkoa ja kuvausta.
Julkaisun poisto: Julkaisun sivulla julkaisun omistaja voi poistaa julkaisun.
Julkaisusta tykkääminen ja tykkäyksen poisto: Julkaisun sivulla kuka tahansa voi tykätä julkaisusta.
Julkaisun kommentoiti: Julkaisun sivulla kuka tahansa voi kommentoida julkaisua.
Kuvien ja videoiden julkaisu: Kuka tahansa voi julkaista kuvan tai videon alustalle, sisältäen otsikon ja kuvauksen.
Profiilisivu: Käyttäjä näkee oman profiilinsa.
Omien julkaisujen tarkastelu: Omia julkaisuja voi tarkastella profiilisivulta.
Käyttäjän uloskirjautuminen: Käyttäjä voi kirjautua ulos profiilisivulta

Tiedossa olevat bugit/ongelmat:
Tiedostojen poisto on hajalla (vielä)
Joskus AUTH-API:ssa ja MEDIA-API:ssa on ongelma, joka vaatii uudelleen kirjautumisen, tai muutaman kirjautumisyrityksen. Ei ikinä tapahtunut lokaalisti, joten todennäköisesti ongelma Render hostauksen puolella.
Expo-go:ssa koodin sovellus ei joskus aukea ollenkaan ja antaa erroria "Uncaught JavaScript error. Could not connect to...", vaikka sovellus yrittää avata koodin sovelluksen.
En tiedä mistä johtuu, kaikki keinot on testattu. Ei ole omasta koodista kiinni, koska sovellus ei edes lataa koodia. Ongelma on yleensä randomisti korjautunut sillä, että olen sulkenut ohjelmistot ja tullut yrittämään uudelleen muutaman tunnin kuluttua.

Referenssit, käytetyt tutoriaalit, grafiikkakirjastot, tms.:

Tiedostot tallennettu AWS S3 buckettiin.
API:t hostattu [Render.com sivustolla.](https://render.com)
Database hostattu https://www.freesqldatabase.com

Tiedoksi:
Jokus palvelimet sammuvat/menevät lepotilaan. Kun silloin tekee pyynnön palvelimelle, esim yrittää kirjautua tai hakee mediatiedostoja tai yrittää tehdä julkaisun, palvelimilla saattaa kestää 5-10 minuuttia käynnistyä.
Ennen kuin käynnistät sovelluksen npm start komennolla, klikkaa API:en URL:liä, ja odota että api sivu lataa jotta ongelmia ei tule kun käynnistää sovelluksen.
