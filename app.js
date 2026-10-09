const SUPABASE_URL="https://YOUR_PROJECT.supabase.co";
const SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY";
const demoMode=SUPABASE_URL.includes("YOUR_PROJECT")||SUPABASE_ANON_KEY.includes("YOUR_SUPABASE");
const db=(!demoMode&&window.supabase)?window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY):null;
const sample={
 categories:[
 {id:1,category_code:"CAT-AUD",category_name:"Audio Visual",notes:"Recording and presentation equipment"},
 {id:2,category_code:"CAT-COM",category_name:"Computing",notes:"Computing devices"},
 {id:3,category_code:"CAT-NET",category_name:"Networking",notes:"Connectivity equipment"},
 {id:4,category_code:"CAT-LAB",category_name:"Laboratory",notes:"Teaching lab equipment"},
 {id:5,category_code:"CAT-ACC",category_name:"Accessories",notes:"Adapters and peripherals"}],
 equipment:[
 {id:1,asset_code:"EQ-1001",equipment_name:"Portable Projector",category_id:1,brand:"ViewBright",model:"PB-210",condition_status:"Good",availability_status:"Available",purchase_year:2024},
 {id:2,asset_code:"EQ-1002",equipment_name:"Wireless Microphone Set",category_id:1,brand:"SoundPeak",model:"WM-2",condition_status:"Good",availability_status:"Checked out",purchase_year:2023},
 {id:3,asset_code:"EQ-1003",equipment_name:"Teaching Laptop 14-inch",category_id:2,brand:"Northstar",model:"EduBook 14",condition_status:"Good",availability_status:"Checked out",purchase_year:2025},
 {id:4,asset_code:"EQ-1004",equipment_name:"USB-C Docking Station",category_id:5,brand:"LinkPort",model:"Dock-7",condition_status:"Good",availability_status:"Available",purchase_year:2024},
 {id:5,asset_code:"EQ-1005",equipment_name:"Wi-Fi Access Point",category_id:3,brand:"NetField",model:"AP-220",condition_status:"Needs maintenance",availability_status:"Maintenance",purchase_year:2022},
 {id:6,asset_code:"EQ-1006",equipment_name:"Digital Multimeter",category_id:4,brand:"VoltCraft",model:"DM-80",condition_status:"Good",availability_status:"Available",purchase_year:2023},
 {id:7,asset_code:"EQ-1007",equipment_name:"Document Camera",category_id:1,brand:"ViewBright",model:"DC-11",condition_status:"Good",availability_status:"Available",purchase_year:2025},
 {id:8,asset_code:"EQ-1008",equipment_name:"Teaching Laptop 15-inch",category_id:2,brand:"Northstar",model:"EduBook 15",condition_status:"Damaged",availability_status:"Retired",purchase_year:2021}],
 borrowers:[
 {id:1,borrower_code:"BR-2001",full_name:"Nadia Example",department:"Digital Media",email:"nadia.example@demo.invalid",borrower_type:"Student",active:true},
 {id:2,borrower_code:"BR-2002",full_name:"Rafi Sample",department:"Computer Science",email:"rafi.sample@demo.invalid",borrower_type:"Student",active:true},
 {id:3,borrower_code:"BR-2003",full_name:"Mira Demo",department:"Learning Services",email:"mira.demo@demo.invalid",borrower_type:"Staff",active:true},
 {id:4,borrower_code:"BR-2004",full_name:"Dimas Fiction",department:"Computer Science",email:"dimas.fiction@demo.invalid",borrower_type:"Lecturer",active:true},
 {id:5,borrower_code:"BR-2005",full_name:"Sinta Placeholder",department:"Engineering Lab",email:"sinta.placeholder@demo.invalid",borrower_type:"Student",active:true}],
 checkouts:[
 {id:1,checkout_code:"CO-3001",equipment_id:2,borrower_id:1,checkout_date:"2026-10-01",due_date:"2026-10-04",returned_date:null,checkout_condition:"Good",return_condition:null,status:"Borrowed",notes:"For a classroom recording exercise."},
 {id:2,checkout_code:"CO-3002",equipment_id:3,borrower_id:2,checkout_date:"2026-09-25",due_date:"2026-09-29",returned_date:"2026-09-28",checkout_condition:"Good",return_condition:"Good",status:"Returned",notes:"Returned with charger."},
 {id:3,checkout_code:"CO-3003",equipment_id:5,borrower_id:3,checkout_date:"2026-09-10",due_date:"2026-09-12",returned_date:"2026-09-14",checkout_condition:"Needs maintenance",return_condition:"Needs maintenance",status:"Returned",notes:"Returned late; device sent for maintenance."},
 {id:4,checkout_code:"CO-3004",equipment_id:7,borrower_id:4,checkout_date:"2026-10-05",due_date:"2026-10-08",returned_date:null,checkout_condition:"Good",return_condition:null,status:"Borrowed",notes:"For a lecture demonstration."},
 {id:5,checkout_code:"CO-3005",equipment_id:4,borrower_id:5,checkout_date:"2026-09-20",due_date:"2026-09-22",returned_date:"2026-09-21",checkout_condition:"Good",return_condition:"Good",status:"Returned",notes:"Returned in good condition."}]
};
let state=structuredClone(sample),page="dashboard",modalType=null;
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const equip=id=>state.equipment.find(x=>String(x.id)===String(id));
const borrower=id=>state.borrowers.find(x=>String(x.id)===String(id));
const category=id=>state.categories.find(x=>String(x.id)===String(id));
const date=d=>d?new Date(d+"T00:00:00").toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}):"—";
function note(s,error=false){$("notice").textContent=s;$("notice").classList.toggle("error",error)}
async function load(){
 if(db){try{
  const [c,e,b,t]=await Promise.all([db.from("equipment_categories").select("*").order("category_name"),db.from("equipment").select("*").order("asset_code"),db.from("borrowers").select("*").order("full_name"),db.from("checkouts").select("*").order("checkout_date",{ascending:false})]);
  for(const x of [c,e,b,t])if(x.error)throw x.error;
  state={categories:c.data,equipment:e.data,borrowers:b.data,checkouts:t.data};note("Connected to Supabase. Live records loaded.");
 }catch(err){state=structuredClone(sample);note("Supabase load failed: "+err.message+". Showing synthetic local sample data.",true)}}
 else{state=structuredClone(sample);note("Demo mode: synthetic local records. Configure Supabase URL and anon key in app.js to connect a database.")}
 render()
}
function table(heads,rows){return rows.length?`<table><thead><tr>${heads.map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table>`:'<div class="empty">No records found.</div>'}
function pill(s){let cls=(s==="Available"||s==="Returned"||s==="Good"||s==="Student"||s==="Staff"||s==="Lecturer")?"good":(["Borrowed","Overdue","Needs maintenance"].includes(s)?"warn":"bad");return `<span class="pill pill-${cls}">${esc(s)}</span>`}
function renderDashboard(){
 $("stat-assets").textContent=state.equipment.length;
 $("stat-active").textContent=state.checkouts.filter(x=>x.status==="Borrowed").length;
 $("stat-overdue").textContent=state.checkouts.filter(x=>x.status==="Overdue").length;
 $("stat-maintenance").textContent=state.equipment.filter(x=>x.availability_status==="Maintenance"||x.condition_status==="Needs maintenance").length;
 const rows=[...state.checkouts].sort((a,b)=>b.checkout_date.localeCompare(a.checkout_date)).slice(0,5);
 $("recent-table").innerHTML=table(["Transaction","Borrower","Equipment","Due date","Status"],rows.map(x=>`<tr><td class="primary-cell">${esc(x.checkout_code)}</td><td>${esc(borrower(x.borrower_id)?.full_name||"Unknown")}</td><td>${esc(equip(x.equipment_id)?.equipment_name||"Unknown")}</td><td>${date(x.due_date)}</td><td>${pill(x.status)}</td></tr>`));
 const statuses=["Available","Checked out","Maintenance","Retired"];
 $("availability").innerHTML=statuses.map(s=>`<div class="avail-item"><span>${s}</span><strong>${state.equipment.filter(e=>e.availability_status===s).length}</strong></div>`).join("")
}
function renderEquipment(){
 const q=($("equipment-search")?.value||"").toLowerCase();
 const arr=state.equipment.filter(x=>`${x.asset_code} ${x.equipment_name} ${x.brand} ${x.model}`.toLowerCase().includes(q));
 $("equipment-table").innerHTML=table(["Asset","Equipment","Category","Brand / model","Condition","Availability",""],arr.map(x=>`<tr><td class="primary-cell">${esc(x.asset_code)}</td><td>${esc(x.equipment_name)}</td><td>${esc(category(x.category_id)?.category_name||"—")}</td><td>${esc(x.brand||"—")}<span class="sub">${esc(x.model||"")}</span></td><td>${pill(x.condition_status)}</td><td>${pill(x.availability_status)}</td><td><button class="small-btn" data-edit="equipment" data-id="${x.id}">Edit</button></td></tr>`))
}
function renderCheckouts(){
 const q=($("checkout-search")?.value||"").toLowerCase(),s=$("checkout-filter")?.value||"";
 const arr=[...state.checkouts].filter(x=>(!s||x.status===s)&&`${x.checkout_code} ${borrower(x.borrower_id)?.full_name||""} ${equip(x.equipment_id)?.equipment_name||""} ${equip(x.equipment_id)?.asset_code||""}`.toLowerCase().includes(q)).sort((a,b)=>b.checkout_date.localeCompare(a.checkout_date));
 $("checkout-table").innerHTML=table(["Checkout","Borrower","Equipment","Checkout date","Due date","Returned","Status",""],arr.map(x=>`<tr><td class="primary-cell">${esc(x.checkout_code)}</td><td>${esc(borrower(x.borrower_id)?.full_name||"Unknown")}<span class="sub">${esc(borrower(x.borrower_id)?.borrower_code||"")}</span></td><td>${esc(equip(x.equipment_id)?.equipment_name||"Unknown")}</td><td>${date(x.checkout_date)}</td><td>${date(x.due_date)}</td><td>${date(x.returned_date)}</td><td>${pill(x.status)}</td><td><button class="small-btn" data-edit="checkout" data-id="${x.id}">Edit</button></td></tr>`))
}
function renderBorrowers(){$("borrower-table").innerHTML=table(["Borrower code","Name","Department","Email","Type","Status",""],state.borrowers.map(x=>`<tr><td class="primary-cell">${esc(x.borrower_code)}</td><td>${esc(x.full_name)}</td><td>${esc(x.department)}</td><td>${esc(x.email||"—")}</td><td>${pill(x.borrower_type)}</td><td>${x.active?"Active":"Inactive"}</td><td><button class="small-btn" data-edit="borrower" data-id="${x.id}">Edit</button></td></tr>`))}
function renderCategories(){$("category-table").innerHTML=table(["Code","Category","Notes","Equipment count"],state.categories.map(x=>`<tr><td class="primary-cell">${esc(x.category_code)}</td><td>${esc(x.category_name)}</td><td>${esc(x.notes||"")}</td><td>${state.equipment.filter(e=>String(e.category_id)===String(x.id)).length}</td></tr>`))}
function render(){renderDashboard();renderEquipment();renderCheckouts();renderBorrowers();renderCategories();showPage(page)}
function showPage(p){page=p;document.querySelectorAll(".page").forEach(x=>x.classList.add("hidden"));$("page-"+p).classList.remove("hidden");document.querySelectorAll(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.page===p));$("page-title").textContent=({dashboard:"Dashboard",analysis:"Business Analysis",equipment:"Equipment",checkouts:"Checkouts",borrowers:"Borrowers",categories:"Categories"})[p];const toggle=$("toggle-analysis");toggle.textContent=p==="analysis"?"▦ Back to Dashboard":"▥ Business Analysis";toggle.classList.toggle("primary",p==="analysis");toggle.classList.toggle("ghost",p!=="analysis")}
function fld(name,label,type="text",value="",opts=null,full=false,required=true){const control=opts?`<select name="${name}" ${required?"required":""}>${opts.map(o=>`<option value="${esc(o.value)}" ${String(o.value)===String(value)?"selected":""}>${esc(o.label)}</option>`).join("")}</select>`:`<input name="${name}" type="${type}" value="${esc(value)}" ${required?"required":""}>`;return `<div class="field ${full?"full":""}"><label>${label}</label>${control}</div>`}
function openForm(type,id=null){
 if(demoMode){note("Local demo is read-only. Connect Supabase to enable saving.",true);return}
 modalType=type;const list=({equipment:state.equipment,checkout:state.checkouts,borrower:state.borrowers})[type];const x=id?list.find(a=>String(a.id)===String(id)):{};
 let f="";
 if(type==="equipment"){
  f+=fld("asset_code","Asset code","text",x.asset_code||"EQ-"+Date.now().toString().slice(-4));
  f+=fld("equipment_name","Equipment name","text",x.equipment_name||"");
  f+=fld("category_id","Category","text",x.category_id||state.categories[0]?.id,state.categories.map(c=>({value:c.id,label:c.category_name})));
  f+=fld("brand","Brand","text",x.brand||"",null,false,false);
  f+=fld("model","Model","text",x.model||"",null,false,false);
  f+=fld("condition_status","Condition","text",x.condition_status||"Good",["Good","Needs maintenance","Damaged"].map(v=>({value:v,label:v})));
  f+=fld("availability_status","Availability","text",x.availability_status||"Available",["Available","Checked out","Maintenance","Retired"].map(v=>({value:v,label:v})));
  f+=fld("purchase_year","Purchase year","number",x.purchase_year||2026);
 }else if(type==="borrower"){
  f+=fld("borrower_code","Borrower code","text",x.borrower_code||"BR-"+Date.now().toString().slice(-4));
  f+=fld("full_name","Full name","text",x.full_name||"");
  f+=fld("department","Department","text",x.department||"");
  f+=fld("email","Email","email",x.email||"",null,false,false);
  f+=fld("borrower_type","Borrower type","text",x.borrower_type||"Student",["Student","Staff","Lecturer"].map(v=>({value:v,label:v})));
 }else{
  f+=fld("checkout_code","Checkout code","text",x.checkout_code||"CO-"+Date.now().toString().slice(-5));
  f+=fld("equipment_id","Equipment","text",x.equipment_id||state.equipment[0]?.id,state.equipment.map(e=>({value:e.id,label:e.asset_code+" — "+e.equipment_name})),true);
  f+=fld("borrower_id","Borrower","text",x.borrower_id||state.borrowers[0]?.id,state.borrowers.map(b=>({value:b.id,label:b.borrower_code+" — "+b.full_name})),true);
  f+=fld("checkout_date","Checkout date","date",x.checkout_date||new Date().toISOString().slice(0,10));
  f+=fld("due_date","Due date","date",x.due_date||new Date(Date.now()+7*86400000).toISOString().slice(0,10));
  f+=fld("returned_date","Returned date","date",x.returned_date||"",null,false,false);
  f+=fld("checkout_condition","Condition at checkout","text",x.checkout_condition||"Good",["Good","Needs maintenance","Damaged"].map(v=>({value:v,label:v})));
  f+=fld("return_condition","Condition at return","text",x.return_condition||"",["","Good","Needs maintenance","Damaged"].map(v=>({value:v,label:v})),false,false);
  f+=fld("status","Status","text",x.status||"Borrowed",["Borrowed","Returned","Overdue"].map(v=>({value:v,label:v})));
  f+=fld("notes","Notes","text",x.notes||"",null,true,false);
 }
 $("modal-title").textContent=(id?"Edit ":"Add ")+({equipment:"equipment",checkout:"checkout",borrower:"borrower"}[type]);
 $("fields").innerHTML=f;$("record-form").dataset.id=id||"";$("modal").showModal()
}
async function save(e){
 e.preventDefault();const type=modalType,id=$("record-form").dataset.id;const data=Object.fromEntries(new FormData($("record-form")).entries());
 if(type==="equipment"){data.category_id=Number(data.category_id);data.purchase_year=Number(data.purchase_year)}
 if(type==="checkout"){data.equipment_id=Number(data.equipment_id);data.borrower_id=Number(data.borrower_id);data.returned_date=data.returned_date||null;data.return_condition=data.return_condition||null}
 const tableName=({equipment:"equipment",checkout:"checkouts",borrower:"borrowers"})[type];
 try{let query=id?db.from(tableName).update(data).eq("id",id):db.from(tableName).insert(data);const {error}=await query;if(error)throw error;$("modal").close();await load();note("Record saved to Supabase.")}catch(err){note("Save failed: "+err.message,true)}
}
document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
$("toggle-analysis").addEventListener("click",()=>showPage(page==="analysis"?"dashboard":"analysis"));
document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.goto)));
$("refresh").addEventListener("click",load);$("equipment-search").addEventListener("input",renderEquipment);$("checkout-search").addEventListener("input",renderCheckouts);$("checkout-filter").addEventListener("change",renderCheckouts);
$("add-equipment").addEventListener("click",()=>openForm("equipment"));$("add-checkout").addEventListener("click",()=>openForm("checkout"));$("add-borrower").addEventListener("click",()=>openForm("borrower"));
$("close-modal").addEventListener("click",()=>$("modal").close());$("cancel").addEventListener("click",()=>$("modal").close());$("record-form").addEventListener("submit",save);
document.body.addEventListener("click",e=>{const b=e.target.closest("[data-edit]");if(b)openForm(b.dataset.edit,b.dataset.id)});
load();
