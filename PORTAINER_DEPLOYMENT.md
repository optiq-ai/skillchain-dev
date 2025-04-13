# Szczegółowa instrukcja wdrożenia SkillChain w Portainerze

Ten dokument zawiera szczegółową instrukcję wdrożenia aplikacji SkillChain w środowisku Portainer przy użyciu kontenerów Docker.

## Spis treści
1. [Wymagania wstępne](#wymagania-wstępne)
2. [Struktura aplikacji](#struktura-aplikacji)
3. [Krok po kroku: Wdrożenie w Portainerze](#krok-po-kroku-wdrożenie-w-portainerze)
4. [Weryfikacja wdrożenia](#weryfikacja-wdrożenia)
5. [Rozwiązywanie problemów](#rozwiązywanie-problemów)
6. [Zarządzanie aplikacją](#zarządzanie-aplikacją)

## Wymagania wstępne

- Zainstalowany i działający Portainer
- Dostęp do repozytorium GitHub: https://github.com/optiq-ai/skillchain-dev.git
- Podstawowa znajomość Docker i Docker Compose

## Struktura aplikacji

Aplikacja SkillChain składa się z trzech głównych komponentów:

1. **Frontend** (React) - serwowany przez Nginx na porcie 3000
2. **Backend** (Node.js/Express) - API RESTful na porcie 3001
3. **Baza danych** (PostgreSQL) - na porcie 5432

Wszystkie te komponenty są zdefiniowane w pliku `docker-compose.yml` w głównym katalogu repozytorium.

## Krok po kroku: Wdrożenie w Portainerze

### 1. Logowanie do Portainera

- Otwórz przeglądarkę i przejdź do adresu Portainera (np. http://localhost:9000)
- Zaloguj się przy użyciu swoich danych uwierzytelniających

### 2. Wybór środowiska

- Po zalogowaniu wybierz środowisko, w którym chcesz wdrożyć aplikację (np. "local")
- Kliknij na wybrane środowisko, aby przejść do jego panelu zarządzania

### 3. Tworzenie nowego stosu (Stack)

- W menu bocznym kliknij "Stacks" (Stosy)
- Kliknij przycisk "Add stack" (Dodaj stos)
- Nadaj nazwę stosowi, np. "skillchain"

### 4. Konfiguracja stosu

Masz trzy opcje dodania konfiguracji stosu:

#### Opcja A: Użycie edytora webowego

- W sekcji "Build method" wybierz "Web editor"
- Skopiuj zawartość pliku `docker-compose.yml` z repozytorium GitHub i wklej ją do edytora
- Kliknij "Deploy the stack" (Wdróż stos)

#### Opcja B: Użycie repozytorium Git

- W sekcji "Build method" wybierz "Repository"
- W polu "Repository URL" wpisz: `https://github.com/optiq-ai/skillchain-dev.git`
- W polu "Compose path" wpisz: `docker-compose.yml`
- Opcjonalnie: Jeśli repozytorium jest prywatne, podaj dane uwierzytelniające
- Kliknij "Deploy the stack" (Wdróż stos)

#### Opcja C: Przesłanie pliku

- Pobierz plik `docker-compose.yml` z repozytorium GitHub
- W sekcji "Build method" wybierz "Upload"
- Kliknij "Select file" i wybierz pobrany plik `docker-compose.yml`
- Kliknij "Deploy the stack" (Wdróż stos)

### 5. Monitorowanie procesu wdrażania

- Po kliknięciu "Deploy the stack", Portainer rozpocznie proces wdrażania
- Możesz monitorować postęp w zakładce "Logs" (Logi)
- Poczekaj, aż wszystkie kontenery zostaną uruchomione (status "running")

## Weryfikacja wdrożenia

Po zakończeniu wdrażania, sprawdź czy aplikacja działa poprawnie:

1. **Sprawdź status kontenerów**:
   - W Portainerze przejdź do sekcji "Containers" (Kontenery)
   - Wszystkie trzy kontenery (frontend, backend, db) powinny mieć status "running"

2. **Dostęp do aplikacji**:
   - Frontend: Otwórz przeglądarkę i przejdź do `http://<adres-serwera>:3000`
   - Backend API: Sprawdź działanie API pod adresem `http://<adres-serwera>:3001/api/health`

3. **Sprawdź logi**:
   - W Portainerze kliknij na kontener, aby zobaczyć jego szczegóły
   - Przejdź do zakładki "Logs" (Logi), aby sprawdzić logi kontenera
   - Sprawdź, czy nie ma błędów lub ostrzeżeń

## Rozwiązywanie problemów

### Problem 1: Kontenery nie uruchamiają się

**Rozwiązanie**:
- Sprawdź logi kontenerów, aby zidentyfikować problem
- Upewnij się, że porty 3000, 3001 i 5432 są dostępne i nie są używane przez inne aplikacje
- Sprawdź, czy Docker ma wystarczające uprawnienia do tworzenia wolumenów

### Problem 2: Frontend nie może połączyć się z backendem

**Rozwiązanie**:
- Sprawdź, czy kontener backendu działa poprawnie
- Upewnij się, że zmienna środowiskowa `REACT_APP_API_URL` jest poprawnie ustawiona
- Sprawdź, czy sieć Docker `skillchain-network` została utworzona

### Problem 3: Backend nie może połączyć się z bazą danych

**Rozwiązanie**:
- Sprawdź, czy kontener bazy danych działa poprawnie
- Upewnij się, że zmienne środowiskowe dla połączenia z bazą danych są poprawnie ustawione
- Sprawdź, czy skrypty inicjalizacyjne bazy danych zostały poprawnie wykonane

## Zarządzanie aplikacją

### Zatrzymywanie aplikacji

- W Portainerze przejdź do sekcji "Stacks" (Stosy)
- Znajdź stos "skillchain"
- Kliknij przycisk "Stop" (Zatrzymaj)

### Uruchamianie aplikacji

- W Portainerze przejdź do sekcji "Stacks" (Stosy)
- Znajdź stos "skillchain"
- Kliknij przycisk "Start" (Uruchom)

### Aktualizacja aplikacji

- W Portainerze przejdź do sekcji "Stacks" (Stosy)
- Znajdź stos "skillchain"
- Kliknij przycisk "Update" (Aktualizuj)
- Jeśli używasz repozytorium Git, Portainer pobierze najnowszą wersję pliku `docker-compose.yml`
- Jeśli używasz edytora webowego lub przesłanego pliku, zaktualizuj zawartość pliku `docker-compose.yml`
- Kliknij "Update the stack" (Aktualizuj stos)

### Przeglądanie logów

- W Portainerze przejdź do sekcji "Containers" (Kontenery)
- Kliknij na kontener, którego logi chcesz zobaczyć
- Przejdź do zakładki "Logs" (Logi)
- Możesz filtrować logi i ustawić automatyczne odświeżanie

---

W przypadku dodatkowych pytań lub problemów, skontaktuj się z zespołem wsparcia lub sprawdź dokumentację Docker i Portainer.
