create view public.user_stats as
select
  u.id,
  u.active_plan,
  (
    select
      count(projects.id) as count
    from
      projects
    where
      projects.owner_user_id = u.id) as total_projects,
  (
    select
      count(deployments.id) as count
    from
      deployments
    where
      deployments.owner_user_id = u.id) as total_deployments
from
  users u;
