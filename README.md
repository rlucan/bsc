## BSC
- repo obsahuje řešení [Úkolu pro uchazeče o pozici FE developer v BSC.](http://lucan.cz/FE_ukol_2020.docx)
- úlohu jsem se pokusil vyřešit primárně v angularu 9, nicméně přikládám i 
neúplnou cvičnou verzi ve vue.js (v ní chybí hlavně testy)
- společné znaky:
    - soustředil jsem se hlavně na algoritmickou část a na věci, související s jednotlivými 
      frameworky. Nevěnoval jsem příliš pozornosti samotnému vzhledu aplikace - nejsem 
      designer. Částečně jsem se inspiroval u google keep (seznam poznámek v kartách, detail
      poznámky a její editace v dialogu, ...).
    - obě aplikace jsou řízené URL, takže např. `http://localhost:9000/note/1/edit` rovnou 
      otevře editaci poznámky číslo 1.  
    - do API komunikace vstupuje interceptor, který
        - definuje base URL
        - poskytuje základní error handling
        - a hlavně zpožďuje API requesty, aby nezanikaly "loading" efekty :-)   

---
  
## Angular
- angular v9
- angular material design komponenty
- lokalizace pomocí ngx-translate
    - en, cs, ru
    - poslední volba jazyka uložená v localStorage
- NgRx state management

### setup
1. `cd ng`
2. `npm install -g @angular/cli` - globální instalace angular CLI, pokud není již přítomno
3. `npm install` - instalace dependencies  
4. `ng serve --port 9000 -o`

### testy
- `ng test` 
    - vzhledem k tomu, že ng komponenty v zásadě jen zabalují funkčnost, 
    která je primárně schována v NgRx, nebylo moc co testovat v komponentách
    a tak jsou dva základní unit testy definované nad state managementem
    
-  `ng e2e`
    - tři komplexnější e2e testy. 

---

## Vue.js
- vč. podpory typescriptu
- vuetify material design implementace
- lokalizace pomocí vue-i18n
    - en, cs, ru
- základní "state management" ve třídě State, bez akcí a reducerů, nicméně
zachovávající immutable princip

### setup
1. `cd vue`
2. `npm install`
3. `npm run serve -- --port 9000 --open`

### testy

- TBD :-)

