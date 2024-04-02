import { Project_Interface } from '@/app/lib/data';
import { Project } from './project';
import { clsx } from 'clsx';

//Component that loads data to be used by Project component
export default function ProjectsContainer ({projects}:{projects:Project_Interface[]}) {
  return (
    <div className="w-full py-3">
      <h1
        className={clsx(
          'inline-block min-h-min pt-2 pb-8 font-semibold text-[2.3rem] lg:text-5xl',
        )}
      >
        Projects
      </h1>
      <span> from Github </span>
      <div className="grid md:gap-6 gap-8 lg:grid-cols-3 md:grid-cols-2 sm:gird-cols-1">
          {projects.length === 0 ? (
            <h2>No repositories listed.</h2>
          ) : (
            projects.map((item: Project_Interface) => (
              <Project key={item.uuid} project={item} />
            ))
          )}
      </div>
    </div>
  );
};
