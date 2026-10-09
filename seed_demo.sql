-- FICTIONAL SYNTHETIC TEACHING DATA ONLY. No real people or institution.
insert into public.equipment_categories (category_code,category_name,notes) values
('CAT-AUD','Audio Visual','Microphones, cameras, and recording accessories'),
('CAT-COM','Computing','Laptops and computing devices'),
('CAT-NET','Networking','Networking and connectivity equipment'),
('CAT-LAB','Laboratory','Basic teaching-lab instruments'),
('CAT-ACC','Accessories','Adapters and peripheral accessories')
on conflict (category_code) do nothing;

insert into public.equipment (asset_code,equipment_name,category_id,brand,model,condition_status,availability_status,purchase_year)
select x.asset,c.id,x.name,x.brand,x.model,x.condition,x.availability,x.year
from (values
('EQ-1001','Portable Projector','CAT-AUD','ViewBright','PB-210','Good','Available',2024),
('EQ-1002','Wireless Microphone Set','CAT-AUD','SoundPeak','WM-2','Good','Checked out',2023),
('EQ-1003','Teaching Laptop 14-inch','CAT-COM','Northstar','EduBook 14','Good','Checked out',2025),
('EQ-1004','USB-C Docking Station','CAT-ACC','LinkPort','Dock-7','Good','Available',2024),
('EQ-1005','Wi-Fi Access Point','CAT-NET','NetField','AP-220','Needs maintenance','Maintenance',2022),
('EQ-1006','Digital Multimeter','CAT-LAB','VoltCraft','DM-80','Good','Available',2023),
('EQ-1007','Document Camera','CAT-AUD','ViewBright','DC-11','Good','Available',2025),
('EQ-1008','Teaching Laptop 15-inch','CAT-COM','Northstar','EduBook 15','Damaged','Retired',2021)
) as x(asset,name,category,brand,model,condition,availability,year)
join public.equipment_categories c on c.category_code=x.category
on conflict (asset_code) do nothing;

insert into public.borrowers (borrower_code,full_name,department,email,borrower_type) values
('BR-2001','Nadia Example','Digital Media','nadia.example@demo.invalid','Student'),
('BR-2002','Rafi Sample','Computer Science','rafi.sample@demo.invalid','Student'),
('BR-2003','Mira Demo','Learning Services','mira.demo@demo.invalid','Staff'),
('BR-2004','Dimas Fiction','Computer Science','dimas.fiction@demo.invalid','Lecturer'),
('BR-2005','Sinta Placeholder','Engineering Lab','sinta.placeholder@demo.invalid','Student')
on conflict (borrower_code) do nothing;

insert into public.checkouts (checkout_code,equipment_id,borrower_id,checkout_date,due_date,returned_date,checkout_condition,return_condition,status,notes)
select x.code,e.id,b.id,x.out_date::date,x.due_date::date,x.return_date::date,x.out_condition,x.return_condition,x.status,x.notes
from (values
('CO-3001','EQ-1002','BR-2001','2026-10-01','2026-10-04',null,'Good',null,'Borrowed','Needed for a classroom recording exercise.'),
('CO-3002','EQ-1003','BR-2002','2026-09-25','2026-09-29','2026-09-28','Good','Good','Returned','Returned with charger.'),
('CO-3003','EQ-1005','BR-2003','2026-09-10','2026-09-12','2026-09-14','Needs maintenance','Needs maintenance','Returned','Returned late; device sent for maintenance.'),
('CO-3004','EQ-1007','BR-2004','2026-10-05','2026-10-08',null,'Good',null,'Borrowed','For a lecture demonstration.'),
('CO-3005','EQ-1004','BR-2005','2026-09-20','2026-09-22','2026-09-21','Good','Good','Returned','Returned in good condition.')
) as x(code,asset,borrower,out_date,due_date,return_date,out_condition,return_condition,status,notes)
join public.equipment e on e.asset_code=x.asset
join public.borrowers b on b.borrower_code=x.borrower
on conflict (checkout_code) do nothing;
