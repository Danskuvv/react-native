Testikäyttäjätunnukset:
  1. kayttaja1, salasana
  2. kayttaja2, salasana

Voit myös luoda oman käyttäjätunnuksen.

kuvakaappaukset sovelluksen käyttöliittymästä:

![image](https://github.com/Danskuvv/react-native/assets/111982581/6042e2df-82e9-40cf-9550-28921fd3c4cb)
![image](https://github.com/Danskuvv/react-native/assets/111982581/76e94a8b-36e5-4af6-9512-633d3aaae99c)
![image](https://github.com/Danskuvv/react-native/assets/111982581/6170c1c8-5034-43c5-bebc-13cd96490895)
![image](https://github.com/Danskuvv/react-native/assets/111982581/05f4da41-e3a4-43ad-8210-6e763a88fb84)
![image](https://github.com/Danskuvv/react-native/assets/111982581/011febea-8a58-4743-865d-cbb60a4e62a5)
![image](https://github.com/Danskuvv/react-native/assets/111982581/36393331-167d-464c-b535-ffe4eb03ba63)
![image](https://github.com/Danskuvv/react-native/assets/111982581/bddd9dce-5cbf-4417-90f5-8d76dca92b82)
![image](https://github.com/Danskuvv/react-native/assets/111982581/6a845e6f-1f23-4c40-ac24-18115ed76699)
![image](https://github.com/Danskuvv/react-native/assets/111982581/6f96e9d4-b987-48fb-bdb5-6bc65641781c)
![image](https://github.com/Danskuvv/react-native/assets/111982581/dd383e31-1f55-4c1c-9dd0-35c9b411195f)
![image](https://github.com/Danskuvv/react-native/assets/111982581/64d2e091-c3f9-43db-aefe-637754a30f5f)





Sovelluksen käyttöönottoohjeet:
1. Lataa tämän repon tiedostot.
3. Lataa Expo go puhelimen sovelluskaupasta.
4. Käynnistä sovellus puhelimessa.
5. suorita npm start projektin root kansiossa. (Ongelmien sattuessa voit kokeilla "npm run tunnel" tai "npm run web"(rajoitettu toiminnallisuus)).
6. Skannaa qr koodi, tai kirjoita ip manuaalisesti. Voit myös painaa "a", jos android laite on yhdistetty USB:llä ja usb vianetsintä on laitettu päälle androidin järjestelmäasetuksista.

Backend API:t :

Media-api: https://media-api-71zl.onrender.com/api/v1 | https://github.com/Danskuvv/media-api

Auth-api: https://auth-api-07r2.onrender.com/api/v1 | https://github.com/Danskuvv/auth-api

Upload-api: https://upload-api-idxk.onrender.com/api/v1 | https://github.com/Danskuvv/upload-api


linkki API-dokumentaatioon (apidoc) (Puuttuu vielä, työn alla)
-https://auth-api-07r2.onrender.com
-
-


Tietokannan kuvaus
![image](https://github.com/Danskuvv/react-native/assets/111982581/03177aac-2dd3-413b-8c3a-a5439d29dd0d)

listaus ja kuvaus kaikista toiminnallisuuksista, mitä olet toteuttanut

-Käyttäjän rekisteröityminen: Käyttäjä voi rekisteröityä sovellukseen luomalla uudet tunnukset käyttäjätunnuksella, sähköpostilla ja salasanalla.
-Käyttäjän kirjautuminen: Käyttäjä voi kirjautua sisään käyttäjänimellä ja salasanalla
-Julkaisut listassa: Käyttäjä näkee ihmisten julkaisuja etusivulla pystysuunnassa selattavissa. Videot soivat etusivua scrollatessa automaattisesti, mutta ilman ääntä.
-Yksittäiset julkaisusivut: Käyttäjä voi klikata julkaisuja, jolloin niitä voi tarkastella yksityiskohtaisesti ja saa enemmän toimintoja saataville.
-Julkaisun muokkaus: Julkaisun sivulla julkaisun omistaja voi muokata julkaisun otsikkoa ja kuvausta, painamalla ensin ... ja valitsemalla modify.
-Julkaisun poisto: Julkaisun sivulla julkaisun omistaja voi poistaa julkaisun, painalla ensin ... ja valitsemalla delete. (rikki ainakin vielä)
-Julkaisusta tykkääminen ja tykkäyksen poisto: Julkaisun sivulla kuka tahansa voi tykätä julkaisusta, ja perua tykkäyksen
-Julkaisun kommentoiti: Julkaisun sivulla kuka tahansa voi kommentoida julkaisua.
-Mute nappi. Videojulkaisuilla on yksittäisillä sivuillaan nappi, josta voi vaimentaa/laittaa äänet päälle videoon.
-Kuvien ja videoiden julkaisu: Kuka tahansa voi julkaista kuvan tai videon alustalle, sisältäen otsikon ja halutessa kuvauksen.
-Profiilisivu: Käyttäjä näkee oman profiilinsa.
-Omien julkaisujen tarkastelu: Omia julkaisuja voi tarkastella profiilisivulta painamalla My Files nappia.
-Käyttäjän uloskirjautuminen: Käyttäjä voi kirjautua ulos profiilisivulta.

Tiedossa olevat bugit/ongelmat:

-Tiedostojen poisto on rikki.

-Joskus AUTH-API:ssa ja MEDIA-API:ssa on ongelma (ECONNRESET), joka vaatii uudelleen kirjautumisen, tai muutaman kirjautumisyrityksen. Ei ikinä tapahtunut lokaalisti, joten todennäköisesti ongelma Render hostauksen puolella. Yleensä korjautuu sillä, että kokeilee kirjautua esim olemattomilla tunnuksilla, ja sitten spammii kirjautumisnappia muutaman kerran oikeilla tunnuksilla. Silloin menee läpi.

-Expo-go:ssa koodin sovellus ei joskus aukea ollenkaan ja antaa erroria "Uncaught JavaScript error. Could not connect to...".
En tiedä mistä johtuu, kaikki keinot on testattu. Ei ole omasta koodista kiinni, koska sovellus ei edes lataa koodia. Ongelman voi ratkaista käyttämällä npm startin sijaan npm run tunnel, joka tekee julkisen URL:n lani URL:n sijaan.

Referenssit, käytetyt tutoriaalit, grafiikkakirjastot, tms.:
- Aika monta artikkelia ja muutama youtube video.
- Tiedostot tallennettu AWS S3 buckettiin.
- Käytetty aws s3 yhteyden luomisessa apuna AWS docseja.
- API:t hostattu [Render.com sivustolla.](https://render.com)
- Database hostattu [Freesql sivustolla](https://www.freesqldatabase.com)



Tiedoksi:
Jokus palvelimet sammuvat/menevät lepotilaan. Kun silloin tekee pyynnön palvelimelle, esim yrittää kirjautua tai hakee mediatiedostoja tai yrittää tehdä julkaisun, palvelimilla saattaa kestää ~5 minuuttia käynnistyä. Sen takia ennen kuin käynnistät sovelluksen npm start komennolla, klikkaa API URL:liä ylhäältä, ja odota että api sivu lataa jotta ongelmia/turhaa odotusta ei tule kun käynnistää sovelluksen.
