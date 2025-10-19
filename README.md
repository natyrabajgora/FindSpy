# FindSpy# FindSpy

Një lojë e thjeshtë “Spy” me 🔍 React Native + Expo — zgjedh numrin e lojtarëve dhe spy, secili sheh rolin, pastaj zbulohet spy-i.


## 👥 Anëtarët e Grupit

- **Vesa Hadergjonaj**
- **Natyr Bajgora**
- **Leon Troni**
- **Erion Troni**


## 🎮 FLOW I LOJËS

###  1 **Home Screen** → `app/index.tsx`
Ekrani i parë kur hapet aplikacioni.

#### Çfarë bën:
- Shfaq ilustrimin (`spy.jpg`), titullin **SPY**, dhe përshkrimin.
- Ka tre butona:
  -  **NEW GAME** → të dërgon te `/setup`
  -  **LOG IN** → placeholder (për versionet e ardhshme)
  -  **HOW TO PLAY** → të çon në faqen e udhëzimeve (`/howtoplay`)
- Navigimi bëhet me `router.push()` nga `expo-router`.

#### Përdor:
`SafeAreaView`, `Image`, `Pressable`, `StatusBar`, `router.push()`.

📂 **File:** `app/index.tsx`

---

### 2 **Setup Screen** (`app/index.tsx`)
- Kjo është faqja e parë që hapet.
- Lojtari zgjedh:
  - Numrin e lojtarëve (**3 – 8**)
  - Numrin e spive (**1 – 3**, por gjithmonë më pak se lojtarët)
  - Kategori
  - Kohëzgjatje.
- UI përbëhet nga karta me butona `+` dhe `-` për çdo opsion.
- Butoni **Start Game ▶** çon te `/cards`, duke kaluar `players` dhe `spies` si parametra.

#### Përdor:
`SafeAreaView`, `TouchableOpacity`, `Text`, `View`, `useState`, `StyleSheet`, `Link`, `useState`.

📂 **File:** `app/index.tsx`

---

### 3 **Cards Screen** (`app/cards.tsx`)
- Ky është thelbi i lojës.
- Aty secili lojtar në rend e prek kartën për të zbuluar rolin:
  - nëse është **Spy** → i del teksti **“Spy”** me të kuqe,
  - nëse **nuk është Spy** → i del një **fjalë e fshehtë** (e njëjtë për të gjithë të tjerët).
- Pas çdo “Reveal”, lojtari shtyp **Next Player**, dhe loja kalon te lojtari tjetër.
- Kur lojtari i fundit përfundon, del **ekrani TIMER**, me butonin:
  - ⏱ **Reveal Spy** (shkon te /reveal)
- Gjatë lojës fjalët përzgjidhen nga një listë `WORDS` e paracaktuar (p.sh. “Beach”, “Bar”, “Cinema”...).
- “Spy”-t zgjidhen rastësisht me `Set` (`spySet.has(current)` kontrollon nëse lojtari është spiun).

#### Përdor:
`SafeAreaView`, `View`, `Text`, `Pressable`, `StyleSheet`, `useState`, `useMemo`, `useLocalSearchParams`, `router`, `Link`

📂 **File:** `app/cards.tsx`

---

### 4 **Reveal Screen** (`app/reveal.tsx`)
- Hapet pasi përfundon loja (nga “Reveal Spy”).
- Shfaqet ekrani:
  - Teksti: **“The Spy is…”**
  - Placeholder për emrin e lojtarit (`Player …`)
  - Butoni **Start New Game**, që të kthen te faqja e parë (`/`)
- Ky screen është statik (s’është funksional për momentin, thjesht UI).

#### Përdor:
`SafeAreaView`, `View`, `Text`, `Pressable`, `StyleSheet`, `Link`, `FlatList`.

📂 **File:** `app/reveal.tsx`

---

### 5 **Login Screen** → `app/login.tsx`
- Mock login (validon input-et dhe bën push në `/setup` për kredenciale demo).

#### Përdor:
`SafeAreaView`, `Text`, `TextInput`, `Pressable`, `Alert`, `View`, `StyleSheet`, `useState`, `useRouter`  

📂 **File:** `app/login.tsx`

---

##  Si funksionon

1. **Setup**
   - Përdor `useState` për të ruajtur `players` dhe `spy`.
   - `+ / -` kontrollojnë limitet (min 3 lojtarë, min 1 spy).
   - Kur shtyp **Start Game**, parametrot dërgohen në `/cards`.

2. **Cards**
   - `useLocalSearchParams()` i merr `players` dhe `spies` nga URL.
   - `pickRandom(WORDS)` zgjedh fjalën sekrete.
   - `spySet` krijohet përzgjedhje rastësisht nga lojtarët.
   - `handleReveal()` tregon rolin për çdo lojtar.
   - `handleNext()` kalon në lojtarin tjetër derisa të përfundojnë të gjithë.

3. **Reveal**
   - Ekran i thjeshtë me mesazh “The Spy is …” dhe butonin për rifillim të lojës.

---


## 🚀 Quick Start

```bash
# Instalimi
npm install

# Nisja e app-it
npm run start
# Pastaj:
#  a → Android emulator
#  i → iOS simulator
#  w → Web version
