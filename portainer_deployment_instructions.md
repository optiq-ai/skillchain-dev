# Instrukcja wdrożenia aplikacji SkillChain w Portainerze

Ta instrukcja zawiera szczegółowe kroki potrzebne do wdrożenia aplikacji SkillChain w środowisku Portainer przy użyciu Docker Compose.

## Wymagania wstępne

- Serwer z zainstalowanym Dockerem
- Portainer zainstalowany i działający na serwerze
- Dostęp do interfejsu webowego Portainera

## Kroki wdrożenia

### 1. Przygotowanie plików aplikacji

1. Rozpakuj archiwum `skillchain-application.zip` na swoim komputerze lokalnym
2. Upewnij się, że masz następującą strukturę plików:
   ```
   skillchain-package/
   ├── docker-compose.yml
   ├── skillchain-frontend/
   │   ├── Dockerfile
   │   └── ... (pliki frontendu)
   ├── skillchain-backend/
   │   ├── Dockerfile
   │   ├── src/
   │   │   ├── db/
   │   │   │   ├── schema.sql
   │   │   │   └── seed.sql
   │   │   └── ... (pliki backendu)
   │   └── ... (pliki konfiguracyjne)
   ├── README.md
   └── portainer-deployment-guide.md
   ```

### 2. Wdrożenie w Portainerze

#### Opcja 1: Wdrożenie przez interfejs webowy Portainera

1. Zaloguj się do interfejsu webowego Portainera (zazwyczaj dostępny pod adresem `http://twój-serwer:9000`)
2. Przejdź do sekcji "Stacks" w menu bocznym
3. Kliknij przycisk "Add stack"
4. Nadaj nazwę stackowi, np. "skillchain"
5. W sekcji "Build method" wybierz "Web editor"
6. Skopiuj zawartość pliku `docker-compose.yml` z rozpakowanego archiwum i wklej ją do edytora
7. Kliknij przycisk "Deploy the stack"

#### Opcja 2: Wdrożenie przez repozytorium Git

1. Umieść pliki aplikacji w repozytorium Git (GitHub, GitLab, Bitbucket itp.)
2. Zaloguj się do interfejsu webowego Portainera
3. Przejdź do sekcji "Stacks" w menu bocznym
4. Kliknij przycisk "Add stack"
5. Nadaj nazwę stackowi, np. "skillchain"
6. W sekcji "Build method" wybierz "Repository"
7. Wprowadź URL repozytorium Git
8. Wprowadź ścieżkę do pliku docker-compose.yml w repozytorium
9. Wprowadź dane uwierzytelniające do repozytorium, jeśli jest prywatne
10. Kliknij przycisk "Deploy the stack"

#### Opcja 3: Wdrożenie przez przesłanie pliku docker-compose.yml

1. Zaloguj się do interfejsu webowego Portainera
2. Przejdź do sekcji "Stacks" w menu bocznym
3. Kliknij przycisk "Add stack"
4. Nadaj nazwę stackowi, np. "skillchain"
5. W sekcji "Build method" wybierz "Upload"
6. Kliknij przycisk "Select file" i wybierz plik `docker-compose.yml` z rozpakowanego archiwum
7. Kliknij przycisk "Deploy the stack"

### 3. Weryfikacja wdrożenia

1. Po wdrożeniu stacka, przejdź do sekcji "Stacks" w menu bocznym
2. Sprawdź, czy stack "skillchain" jest w stanie "Active"
3. Kliknij na nazwę stacka, aby zobaczyć szczegóły
4. Sprawdź, czy wszystkie kontenery (frontend, backend, postgres) są uruchomione

### 4. Dostęp do aplikacji

Po pomyślnym wdrożeniu, aplikacja będzie dostępna pod następującymi adresami:

- Frontend: `http://twój-serwer:3000`
- Backend API: `http://twój-serwer:3001`

### 5. Rozwiązywanie problemów

Jeśli napotkasz problemy podczas wdrażania:

1. Sprawdź logi kontenerów w Portainerze:
   - Przejdź do sekcji "Containers" w menu bocznym
   - Kliknij na nazwę kontenera, aby zobaczyć szczegóły
   - Przejdź do zakładki "Logs", aby zobaczyć logi

2. Typowe problemy i rozwiązania:
   - **Problem z połączeniem do bazy danych**: Sprawdź, czy kontener postgres jest uruchomiony i czy zmienne środowiskowe w kontenerze backend są poprawnie ustawione
   - **Problem z dostępem do frontendu**: Sprawdź, czy kontener frontend jest uruchomiony i czy port 3000 jest dostępny
   - **Problem z dostępem do backendu**: Sprawdź, czy kontener backend jest uruchomiony i czy port 3001 jest dostępny

### 6. Zarządzanie aplikacją

#### Zatrzymywanie aplikacji

1. Przejdź do sekcji "Stacks" w menu bocznym
2. Znajdź stack "skillchain"
3. Kliknij przycisk "Stop" (ikona pauzy)

#### Uruchamianie aplikacji

1. Przejdź do sekcji "Stacks" w menu bocznym
2. Znajdź stack "skillchain"
3. Kliknij przycisk "Start" (ikona play)

#### Aktualizacja aplikacji

1. Przejdź do sekcji "Stacks" w menu bocznym
2. Znajdź stack "skillchain"
3. Kliknij przycisk "Update" (ikona odświeżania)
4. Wprowadź zmiany w pliku docker-compose.yml (jeśli są potrzebne)
5. Kliknij przycisk "Update the stack"

## Uwagi końcowe

- Aplikacja SkillChain używa wolumenu Docker do przechowywania danych bazy PostgreSQL, co zapewnia trwałość danych między restartami kontenerów
- Wszystkie kontenery są skonfigurowane z opcją `restart: unless-stopped`, co oznacza, że będą automatycznie uruchamiane po restarcie serwera
- Aplikacja jest skonfigurowana do działania w sieci bridge, co zapewnia izolację od innych kontenerów na serwerze
