-- DEVELOPMENT ONLY: public anon read/write policies for a throwaway classroom project.
-- Anyone with the project URL and anon key can read/write these synthetic demo tables.
-- Never use these policies with real people, institutional data, or a production deployment.

create policy "demo read categories" on public.equipment_categories for select to anon using (true);
create policy "demo insert categories" on public.equipment_categories for insert to anon with check (true);
create policy "demo update categories" on public.equipment_categories for update to anon using (true) with check (true);

create policy "demo read equipment" on public.equipment for select to anon using (true);
create policy "demo insert equipment" on public.equipment for insert to anon with check (true);
create policy "demo update equipment" on public.equipment for update to anon using (true) with check (true);

create policy "demo read borrowers" on public.borrowers for select to anon using (true);
create policy "demo insert borrowers" on public.borrowers for insert to anon with check (true);
create policy "demo update borrowers" on public.borrowers for update to anon using (true) with check (true);

create policy "demo read checkouts" on public.checkouts for select to anon using (true);
create policy "demo insert checkouts" on public.checkouts for insert to anon with check (true);
create policy "demo update checkouts" on public.checkouts for update to anon using (true) with check (true);
