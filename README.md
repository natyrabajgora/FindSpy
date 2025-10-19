# 🎮 **FindSpy – Multiplayer Spy Game**

## 📘 **Project Overview**

**FindSpy** është një aplikacion mobil ndërtuar me **React Native** dhe **Expo**, që simolon një lojë interaktive të tipit “Spy”.  
Lojtarët zgjedhin numrin e pjesëmarrësve dhe spiunëve, secili merr një rol përkatës, dhe në fund zbulohet kush është spiuni.  
Qëllimi kryesor është të krijohet një përvojë argëtuese ndërvepruese me një ndërfaqe të thjeshtë, intuitive dhe të përshtatshme për pajisje mobile.

---

## 🎯 **Objectives**

- Zhvillimi i një aplikacioni me **React Native** dhe **Expo** për platforma mobile (Android/iOS).  
- Përdorimi i **state management** me React Hooks.  
- Implementimi i **navigimit ndërfaqësor** me `expo-router`.  
- Testimi i konceptit të lojës përmes një rrjedhe të qartë dhe funksionale të ekraneve.

---

## ⚙️ **System Features**

| Nr | Përshkrimi i Funksionalitetit | Lokacioni në Kod |
|----|-------------------------------|------------------|
| 1 | **Home Screen** – Ekrani fillestar me opsionet *New Game*, *Login* dhe *How To Play*. | `app/index.tsx` |
| 2 | **Setup Screen** – Konfigurimi i lojës (numri i lojtarëve, spiunëve, kategoria, kohëzgjatja). | `app/setup.tsx` |
| 3 | **Cards Screen** – Pjesa kryesore e lojës ku lojtarët zbulojnë rolin e tyre. | `app/cards.tsx` |
| 4 | **Reveal Screen** – Shfaq spiunin në fund të lojës dhe mundëson fillimin e një loje të re. | `app/reveal.tsx` |
| 5 | **Login Screen** – Mock-login për demonstrim të funksionalitetit të autentikimit. | `app/login.tsx` |

---

## 🧭 **Game Flow**

### 1️⃣ Home Screen
- Hapet kur ekzekutohet aplikacioni.  
- Shfaq ilustrimin e lojës, titullin dhe përshkrimin përmbledhës.  
- Butonat kryesorë:
  - *NEW GAME* → dërgon përdoruesin në ekranin e konfigurimit.  
  - *LOG IN* → placeholder për versionet e ardhshme.  
  - *HOW TO PLAY* → dërgon në ekranin e udhëzimeve.  
- Navigimi realizohet me `router.push()` nga `expo-router`.

### 2️⃣ Setup Screen
- Lojtari zgjedh:
  - Numrin e lojtarëve (3–8)
  - Numrin e spiunëve (1–3)
  - Kategorinë e fjalëve
  - Kohëzgjatjen e lojës  
- Përdoren komponente interaktive (`TouchableOpacity`, `useState`) për përzgjedhje dinamike.  
- Butoni *Start Game ▶* e dërgon lojtarin te ekrani i kartave (`/cards`) duke kaluar parametrat përmes URL-së.

### 3️⃣ Cards Screen
- Çdo lojtar shikon kartën e vet:
  - Nëse është **Spy**, shfaqet fjala *Spy* me ngjyrë të kuqe.  
  - Nëse **nuk është Spy**, shfaqet fjala sekrete (e përbashkët për të tjerët).  
- Lojtarët kalojnë në rend me *Next Player*.  
- Pas lojtarit të fundit, del opsioni *Reveal Spy*.  
- Përdoren `useLocalSearchParams`, `useMemo` dhe `useState` për menaxhim të parametrave dhe gjendjes së lojës.

### 4️⃣ Reveal Screen
- Ekrani përfundimtar i lojës.  
- Shfaq spiunin (“The Spy is...”) dhe ofron butonin *Start New Game* që kthen përdoruesin në faqen fillestare.

### 5️⃣ Login Screen
- Implementim bazë i inputeve për emër përdoruesi dhe fjalëkalim.  
- Përdoret për demonstrim të validimit dhe menaxhimit të inputeve.

---

## 🧩 **Technologies Used**

**React Native**

**Expo** 

**JavaScript/TypeScript** 

**Expo Router** 

**React Hooks** 


---

## 👥 **Development Team**


**Vesa Hadergjonaj** 

**Natyra Bajgora** 

**Leon Troni** 

**Erion Troni** 

---

## 🚀 **Installation & Setup**

### **Kërkesat**
- Node.js  
- npm ose yarn  
- Expo CLI

### **Hapat për nisje**
```bash
# Klono repository-n
git clone https://github.com/username/FindSpy.git
cd FindSpy

# Instalo varësitë
npm install

# Nise aplikacionin
npm run start


