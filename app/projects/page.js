import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllProjects } from '@/lib/server/client/api';
import ProjectsPage from './ProjectsSection';

function serializeProjects(projects) {
  return projects.map((project) => ({
    ...project,
    _id: project._id.toString(), // Convert ObjectId to string
    createdAt: project.createdAt ? project.createdAt.toISOString() : null, // Convert Date to ISO string
  }));
}

export default async function Page() {
  const rawProjects = await fetchAllProjects();
  const projects = serializeProjects(rawProjects); // Serialize data

  return (
    <div>
      <Suspense
        fallback={
          <section className="py-12 md:py-16 bg-gradient-to-br from-background via-muted/10 to-background">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="h-64 w-full rounded-xl" />
                ))}
              </div>
            </div>
          </section>
        }
      >
        <ProjectsPage projects={projects} />
      </Suspense>
    </div>
  );
}

