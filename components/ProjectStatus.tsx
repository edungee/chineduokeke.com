import { Badge } from '@/components/ui/badge';

export function ProjectStatus({ stage }: { stage: string }) {
  const label = stage.split(' — ')[0];
  const value = label.toLowerCase();
  const colour = /^(live|published|completed|shipped)$/.test(value)
    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
    : /^(building|in development)/.test(value)
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
      : /^(discovery|pre-validation|exploring)/.test(value)
        ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
        : 'bg-secondary text-secondary-foreground';

  return <Badge variant="secondary" className={`max-w-full whitespace-normal text-left font-normal ${colour}`}>
    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
    {label}
  </Badge>;
}
