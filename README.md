# SkillChain - Instrukcja uruchomienia aplikacji

Ten dokument zawiera instrukcje dotyczące uruchomienia aplikacji SkillChain w środowisku lokalnym oraz za pomocą Portainera.

## Informacje o aplikacji
- **Wersja:** 1.0.0
- **Autorzy:** Szamani.AI
- **Kontakt:** ai@optiq.net.pl

## Uruchomienie lokalne

### Wymagania wstępne
- Node.js (wersja 20 lub nowsza)
- PostgreSQL (wersja 14 lub nowsza)
- npm lub yarn

### Kroki uruchomienia

#### 1. Konfiguracja bazy danych
1. Utwórz bazę danych PostgreSQL o nazwie `skillchain`
2. Wykonaj skrypt `skillchain-backend/src/db/schema.sql` w bazie danych
3. Wykonaj skrypt `skillchain-backend/src/db/seed.sql` w bazie danych

#### 2. Uruchomienie backendu
1. Przejdź do katalogu `skillchain-backend`
2. Zainstaluj zależności: `npm install`
3. Skonfiguruj plik `.env` z odpowiednimi parametrami połączenia do bazy danych
4. Uruchom serwer: `node src/server.js`
5. Backend będzie dostępny pod adresem: http://localhost:3001

#### 3. Uruchomienie frontendu
1. Przejdź do katalogu `skillchain-frontend`
2. Zainstaluj zależności: `npm install --legacy-peer-deps`
3. Uruchom aplikację: `npm start`
4. Frontend będzie dostępny pod adresem: http://localhost:3000

## Uruchomienie za pomocą Docker Compose

### Wymagania wstępne
- Docker
- Docker Compose

### Kroki uruchomienia
1. Upewnij się, że masz wszystkie pliki aplikacji w odpowiedniej strukturze
2. Uruchom aplikację za pomocą Docker Compose: `docker-compose up -d`
3. Aplikacja będzie dostępna pod adresem:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Uruchomienie za pomocą Portainera

Szczegółowe instrukcje znajdują się w pliku `portainer-deployment-guide.md`.

## Struktura aplikacji

### Frontend (React)
- Wielojęzyczny interfejs (polski, angielski, niemiecki, ukraiński)
- Responsywny design
- Strony:
  - Strona główna
  - Ścieżki kariery
  - Szczegóły ścieżki kariery
  - Umiejętności
  - Certyfikaty
  - Ustawienia

### Backend (Node.js/Express)
- RESTful API
- Punkty końcowe dla:
  - Ścieżek kariery
  - Umiejętności
  - Certyfikatów
  - Ustawień

### Baza danych (PostgreSQL)
- Schemat z obsługą wielu języków
- Tabele dla:
  - Ścieżek kariery
  - Stanowisk
  - Umiejętności
  - Certyfikatów
  - Zasobów edukacyjnych

## Rozwiązywanie problemów

- Jeśli frontend nie może połączyć się z backendem, sprawdź czy backend jest uruchomiony i dostępny pod odpowiednim adresem
- Jeśli backend nie może połączyć się z bazą danych, sprawdź parametry połączenia w pliku `.env`
- W przypadku problemów z Dockerem, sprawdź logi kontenerów: `docker-compose logs`
