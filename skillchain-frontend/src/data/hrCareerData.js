const hrCareerData = {
  id: "hr",
  title: "Zasoby Ludzkie (HR)",
  titleEn: "Human Resources",
  description: "Ścieżki kariery w dziedzinie zarządzania zasobami ludzkimi, od poziomu początkującego do dyrektora HR",
  descriptionEn: "Career paths in human resources management, from entry level to HR Director",
  icon: "users",
  color: "#8E44AD",
  levels: [
    {
      id: "entry-level",
      title: "Poziom początkujący (Entry-Level)",
      titleEn: "Entry Level",
      positions: [
        "Asystent HR",
        "Rekruter junior",
        "Specjalista ds. administracji personalnej"
      ],
      skills: [
        "Podstawowa znajomość prawa pracy",
        "Umiejętności administracyjne",
        "Podstawowa znajomość procesów HR",
        "Umiejętności komunikacyjne",
        "Obsługa systemów HRIS",
        "Organizacja dokumentacji pracowniczej",
        "Podstawowa znajomość rekrutacji",
        "Umiejętność pracy w zespole",
        "Dyskrecja i poufność",
        "Umiejętności organizacyjne"
      ],
      certifications: [
        "Licencjat/magisterium w dziedzinie zarządzania zasobami ludzkimi, psychologii, zarządzania lub pokrewnych",
        "Kursy wprowadzające do HR"
      ]
    },
    {
      id: "junior",
      title: "Poziom młodszy (Junior)",
      titleEn: "Junior Level",
      positions: [
        "Specjalista HR",
        "Rekruter",
        "Specjalista ds. wynagrodzeń i benefitów"
      ],
      skills: [
        "Znajomość prawa pracy",
        "Prowadzenie procesów rekrutacyjnych",
        "Administracja kadrowo-płacowa",
        "Obsługa systemów HR",
        "Znajomość procesów onboardingu",
        "Podstawowa znajomość systemów wynagrodzeń",
        "Umiejętność prowadzenia rozmów rekrutacyjnych",
        "Podstawowa znajomość employer brandingu",
        "Umiejętność rozwiązywania konfliktów",
        "Znajomość metod selekcji kandydatów"
      ],
      certifications: [
        "Certyfikat Specjalisty ds. Kadr i Płac",
        "Certyfikat Rekrutera",
        "Kursy z zakresu prawa pracy"
      ]
    },
    {
      id: "specialist",
      title: "Poziom specjalisty (Specialist)",
      titleEn: "Specialist Level",
      positions: [
        "Starszy specjalista HR",
        "Specjalista ds. rozwoju i szkoleń",
        "Specjalista ds. employer brandingu"
      ],
      skills: [
        "Zaawansowana znajomość prawa pracy",
        "Projektowanie i prowadzenie szkoleń",
        "Zarządzanie talentami",
        "Tworzenie i realizacja strategii employer brandingu",
        "Projektowanie systemów ocen pracowniczych",
        "Analiza danych HR",
        "Zarządzanie budżetem HR",
        "Znajomość systemów motywacyjnych",
        "Umiejętność prowadzenia warsztatów",
        "Znajomość metod rozwoju pracowników"
      ],
      certifications: [
        "Certyfikat Trenera",
        "Certyfikat z zakresu zarządzania talentami",
        "Certyfikat z zakresu employer brandingu"
      ]
    },
    {
      id: "manager",
      title: "Poziom kierowniczy (Manager)",
      titleEn: "Management Level",
      positions: [
        "Kierownik HR",
        "Kierownik ds. rekrutacji",
        "Kierownik ds. rozwoju i szkoleń"
      ],
      skills: [
        "Zarządzanie zespołem HR",
        "Tworzenie strategii HR",
        "Zarządzanie projektami HR",
        "Projektowanie systemów wynagrodzeń",
        "Zarządzanie zmianą",
        "Znajomość trendów HR",
        "Umiejętności przywódcze",
        "Zarządzanie budżetem działu",
        "Umiejętność negocjacji",
        "Znajomość zarządzania wydajnością"
      ],
      certifications: [
        "Certyfikat Menedżera HR",
        "Certyfikat z zakresu zarządzania projektami (np. PRINCE2, PMP)",
        "Certyfikat z zakresu zarządzania zmianą"
      ]
    },
    {
      id: "director",
      title: "Poziom dyrektorski (Director)",
      titleEn: "Director Level",
      positions: [
        "Dyrektor HR",
        "Dyrektor ds. talentów",
        "Dyrektor ds. wynagrodzeń i benefitów"
      ],
      skills: [
        "Strategiczne zarządzanie HR",
        "Tworzenie polityki personalnej firmy",
        "Zarządzanie transformacją organizacyjną",
        "Projektowanie kultury organizacyjnej",
        "Zarządzanie relacjami z zarządem",
        "Znajomość trendów biznesowych",
        "Umiejętność podejmowania strategicznych decyzji",
        "Zarządzanie wieloma zespołami HR",
        "Umiejętność budowania relacji z kluczowymi interesariuszami",
        "Znajomość zarządzania ryzykiem HR"
      ],
      certifications: [
        "MBA ze specjalizacją HR",
        "Certyfikat SHRM-SCP lub SPHR",
        "Certyfikat z zakresu strategicznego zarządzania HR"
      ]
    },
    {
      id: "executive",
      title: "Poziom wykonawczy (Executive)",
      titleEn: "Executive Level",
      positions: [
        "Dyrektor personalny (CHRO)",
        "Wiceprezes ds. HR",
        "Globalny dyrektor HR"
      ],
      skills: [
        "Strategiczne przywództwo",
        "Kształtowanie kultury organizacyjnej na poziomie globalnym",
        "Zarządzanie transformacją biznesową",
        "Znajomość globalnych trendów HR",
        "Umiejętność współpracy na poziomie C-level",
        "Znajomość zarządzania talentami na poziomie globalnym",
        "Umiejętność budowania długoterminowej strategii HR",
        "Znajomość zarządzania ryzykiem na poziomie organizacji",
        "Umiejętność zarządzania kryzysowego",
        "Znajomość międzynarodowego prawa pracy"
      ],
      certifications: [
        "Executive MBA",
        "Doświadczenie w zarządzaniu HR na poziomie międzynarodowym",
        "Uznanie w branży HR"
      ]
    }
  ],
  specializations: [
    {
      id: "recruitment",
      title: "Rekrutacja i selekcja",
      titleEn: "Recruitment and Selection",
      description: "Pozyskiwanie i selekcja talentów dla organizacji",
      skills: [
        "Sourcing kandydatów",
        "Prowadzenie rozmów rekrutacyjnych",
        "Ocena kompetencji",
        "Employer branding",
        "Zarządzanie ATS (Applicant Tracking System)",
        "Tworzenie ogłoszeń o pracę",
        "Znajomość metod selekcji",
        "Budowanie relacji z kandydatami",
        "Znajomość rynku pracy",
        "Headhunting"
      ]
    },
    {
      id: "training-development",
      title: "Szkolenia i rozwój",
      titleEn: "Training and Development",
      description: "Projektowanie i realizacja programów szkoleniowych i rozwojowych",
      skills: [
        "Analiza potrzeb szkoleniowych",
        "Projektowanie szkoleń",
        "Prowadzenie szkoleń",
        "Ewaluacja efektywności szkoleń",
        "Zarządzanie talentami",
        "Tworzenie ścieżek kariery",
        "Coaching i mentoring",
        "E-learning",
        "Zarządzanie wiedzą",
        "Rozwój przywództwa"
      ]
    },
    {
      id: "compensation-benefits",
      title: "Wynagrodzenia i benefity",
      titleEn: "Compensation and Benefits",
      description: "Projektowanie i zarządzanie systemami wynagrodzeń i świadczeń pracowniczych",
      skills: [
        "Projektowanie systemów wynagrodzeń",
        "Analiza rynku płac",
        "Zarządzanie benefitami",
        "Budżetowanie wynagrodzeń",
        "Znajomość przepisów podatkowych",
        "Tworzenie polityki wynagrodzeń",
        "Zarządzanie systemami motywacyjnymi",
        "Analiza efektywności systemów wynagrodzeń",
        "Znajomość systemów kafeteryjnych",
        "Znajomość międzynarodowych systemów wynagrodzeń"
      ]
    },
    {
      id: "hr-administration",
      title: "Administracja kadrowa",
      titleEn: "HR Administration",
      description: "Zarządzanie dokumentacją pracowniczą i procesami administracyjnymi HR",
      skills: [
        "Znajomość prawa pracy",
        "Prowadzenie dokumentacji pracowniczej",
        "Obsługa systemów HRIS",
        "Administracja procesów kadrowych",
        "Raportowanie danych HR",
        "Znajomość przepisów BHP",
        "Zarządzanie czasem pracy",
        "Znajomość przepisów RODO w kontekście HR",
        "Administracja świadczeń pracowniczych",
        "Zarządzanie procesami onboardingu i offboardingu"
      ]
    },
    {
      id: "employee-relations",
      title: "Relacje pracownicze",
      titleEn: "Employee Relations",
      description: "Budowanie i utrzymywanie pozytywnych relacji między pracownikami a organizacją",
      skills: [
        "Zarządzanie konfliktami",
        "Mediacje pracownicze",
        "Budowanie zaangażowania pracowników",
        "Komunikacja wewnętrzna",
        "Zarządzanie kulturą organizacyjną",
        "Badanie satysfakcji pracowników",
        "Zarządzanie zmianą",
        "Znajomość prawa pracy w kontekście relacji pracowniczych",
        "Zarządzanie różnorodnością",
        "Budowanie wellbeingu pracowników"
      ]
    },
    {
      id: "hr-analytics",
      title: "Analityka HR",
      titleEn: "HR Analytics",
      description: "Analiza danych HR w celu podejmowania decyzji opartych na danych",
      skills: [
        "Analiza danych HR",
        "Raportowanie HR",
        "Znajomość narzędzi analitycznych",
        "Prognozowanie trendów HR",
        "Mierzenie efektywności procesów HR",
        "Analiza wskaźników HR (KPI)",
        "Znajomość metod statystycznych",
        "Wizualizacja danych",
        "Znajomość systemów HRIS",
        "Umiejętność przekładania danych na rekomendacje biznesowe"
      ]
    }
  ],
  tools: [
    {
      id: "hr-systems",
      title: "Systemy HR",
      titleEn: "HR Systems",
      items: [
        "Workday",
        "SAP SuccessFactors",
        "Oracle HCM",
        "ADP",
        "BambooHR",
        "Cornerstone",
        "Peoplesoft",
        "Sage HR",
        "Zoho People",
        "Personio"
      ]
    },
    {
      id: "recruitment-tools",
      title: "Narzędzia rekrutacyjne",
      titleEn: "Recruitment Tools",
      items: [
        "LinkedIn Recruiter",
        "Taleo",
        "Greenhouse",
        "Lever",
        "SmartRecruiters",
        "Workable",
        "Indeed",
        "eRecruiter",
        "Bullhorn",
        "HireVue"
      ]
    },
    {
      id: "analytics-tools",
      title: "Narzędzia analityczne",
      titleEn: "Analytics Tools",
      items: [
        "Tableau",
        "Power BI",
        "Google Analytics",
        "Excel (zaawansowany)",
        "R",
        "Python",
        "SPSS",
        "Visier",
        "Qlik",
        "Domo"
      ]
    },
    {
      id: "communication-tools",
      title: "Narzędzia komunikacyjne",
      titleEn: "Communication Tools",
      items: [
        "Microsoft Teams",
        "Slack",
        "Zoom",
        "Google Workspace",
        "Asana",
        "Trello",
        "Monday.com",
        "Confluence",
        "SharePoint",
        "Yammer"
      ]
    }
  ],
  certifications: [
    {
      id: "professional-certifications",
      title: "Certyfikaty zawodowe",
      titleEn: "Professional Certifications",
      items: [
        "SHRM-CP/SHRM-SCP (Society for Human Resource Management)",
        "PHR/SPHR (Professional in Human Resources)",
        "CIPD (Chartered Institute of Personnel and Development)",
        "HRCI (HR Certification Institute)",
        "CHRP (Certified Human Resources Professional)",
        "GPHR (Global Professional in Human Resources)",
        "HRPM (Human Resource Professional Manager)",
        "CCP (Certified Compensation Professional)",
        "CEBS (Certified Employee Benefit Specialist)",
        "CPLP (Certified Professional in Learning & Performance)"
      ]
    },
    {
      id: "specialized-certifications",
      title: "Certyfikaty specjalistyczne",
      titleEn: "Specialized Certifications",
      items: [
        "Certyfikat Trenera",
        "Certyfikat Coacha (ICF)",
        "Certyfikat z zakresu zarządzania talentami",
        "Certyfikat Rekrutera",
        "Certyfikat Specjalisty ds. Wynagrodzeń",
        "Certyfikat z zakresu prawa pracy",
        "Certyfikat z zakresu zarządzania zmianą",
        "Certyfikat z zakresu mediacji pracowniczych",
        "Certyfikat z zakresu zarządzania różnorodnością",
        "Certyfikat z zakresu HR Analytics"
      ]
    }
  ]
};

export default hrCareerData;
