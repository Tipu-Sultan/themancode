import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllProjects } from '@/lib/server/client/api';
import ProjectsClient from './ProjectsClient';

// Convert MongoDB objects to plain values
function serializeProjects(projects) {
  return projects.map((project) => ({
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt ? project.createdAt.toISOString() : null,
  }));
}

export default async function ProjectsServer() {
  const rawProjects = await fetchAllProjects();
  const projects = serializeProjects(rawProjects);

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
        <ProjectsClient projects={projects} />
      </Suspense>
    </div>
  );
}