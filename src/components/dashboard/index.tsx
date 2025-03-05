import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { MainContent } from './main-content';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}