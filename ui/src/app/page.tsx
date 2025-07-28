import { Suspense } from 'react';
import { DashboardHomepage } from '@/components/dashboard/DashboardHomepage';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-sky-50">
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardHomepage />
      </Suspense>
    </main>
  );
} 