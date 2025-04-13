const { render, screen, waitFor } = require('@testing-library/react');
const { BrowserRouter } = require('react-router-dom');
const { I18nextProvider } = require('react-i18next');
const i18n = require('../src/i18n/i18n');
const HomePage = require('../src/pages/HomePage').default;
const CareerPathsPage = require('../src/pages/CareerPathsPage').default;

// Mock API calls
jest.mock('../src/services/api', () => ({
  getCareerCategories: jest.fn().mockResolvedValue({
    data: [
      { id: 1, name: 'Sieci komputerowe', description: 'Opis sieci' },
      { id: 2, name: 'Programowanie', description: 'Opis programowania' }
    ]
  }),
  getCareerPaths: jest.fn().mockResolvedValue({
    data: [
      { 
        id: 1, 
        category_id: 1, 
        title: 'Inżynier sieci', 
        description: 'Opis ścieżki',
        difficulty_level: 4
      },
      {
        id: 2,
        category_id: 2,
        title: 'Frontend Developer',
        description: 'Opis ścieżki',
        difficulty_level: 3
      }
    ]
  })
}));

describe('Frontend Components', () => {
  describe('HomePage', () => {
    it('renders without crashing', () => {
      render(
        <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <HomePage />
          </I18nextProvider>
        </BrowserRouter>
      );
      
      // Check if main elements are rendered
      expect(screen.getByText(/SkillChain/i)).toBeInTheDocument();
    });
  });

  describe('CareerPathsPage', () => {
    it('renders and displays career paths', async () => {
      render(
        <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <CareerPathsPage />
          </I18nextProvider>
        </BrowserRouter>
      );
      
      // Wait for API data to load
      await waitFor(() => {
        expect(screen.getByText(/Inżynier sieci/i)).toBeInTheDocument();
        expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
      });
    });
  });
});
