import { ThemeProvider } from '@/components/theme-provider';
import { Routes } from '@/routes';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        <Routes />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;