import { ThemeProvider } from '@/components/theme-provider';
import { Routes } from '@/routes';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;