// ========== MODAL ==========
function openModal(){ const m=document.getElementById("signupModal"); if(m)m.style.display="flex";}
function closeModal(){ const m=document.getElementById("signupModal"); if(m)m.style.display="none";}
function openCreateGroup(){ const m=document.getElementById("createGroupModal"); if(m)m.style.display="flex";}
function closeCreateGroup(){ const m=document.getElementById("createGroupModal"); if(m)m.style.display="none";}

// ========== SIGNUP ==========
function signup(){
  const name=document.getElementById("name")?.value;
  const email=document.getElementById("email")?.value;
  const schedule=document.getElementById("schedule")?.value||"Any";
  if(!name||!email){ alert("Please fill all fields!"); return;}
  const user={name,email,schedule};
  let users=JSON.parse(localStorage.getItem("users")||"[]");
  users.push(user); localStorage.setItem("users",JSON.stringify(users));
  alert("Signed up successfully!"); closeModal(); loadUsers();
}

// ========== LOAD USERS ==========
function loadUsers(){
  const usersList=document.getElementById("usersList"); if(!usersList)return;
  usersList.innerHTML="";
  const users=JSON.parse(localStorage.getItem("users")||"[]");
  users.forEach(u=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`<h3>${u.name}</h3><p>${u.email}</p><p>Schedule: ${u.schedule}</p>`;
    usersList.appendChild(div);
  });
}

// ========== GROUPS ==========
function loadGroups(){
  const grid=document.getElementById("groupsGrid"); if(!grid)return;
  grid.innerHTML="";
  const groups=JSON.parse(localStorage.getItem("groups")||"[]");
  groups.forEach(g=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`<h2>${g.name}</h2><p>${g.schedule}</p><button class="btn-primary" onclick="joinGroup('${g.name}')">Join</button>`;
    grid.appendChild(div);
  });
}
function createGroup(){
  const name=document.getElementById("groupName")?.value;
  const schedule=document.getElementById("groupTimes")?.value;
  if(!name||!schedule){ alert("Fill all fields!"); return;}
  let groups=JSON.parse(localStorage.getItem("groups")||"[]");
  groups.push({name,schedule});
  localStorage.setItem("groups",JSON.stringify(groups));
  alert("Group created!"); closeCreateGroup(); loadGroups();
}
function joinGroup(name){ alert(`You joined the group: ${name}`);}
function searchGroups(){
  const search=document.getElementById("groupSearch")?.value.toLowerCase();
  const grid=document.getElementById("groupsGrid"); if(!search||!grid)return loadGroups();
  const groups=JSON.parse(localStorage.getItem("groups")||"[]");
  const filtered=groups.filter(g=>g.name.toLowerCase().includes(search)||g.schedule.toLowerCase().includes(search));
  grid.innerHTML="";
  filtered.forEach(g=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`<h2>${g.name}</h2><p>${g.schedule}</p><button class="btn-primary" onclick="joinGroup('${g.name}')">Join</button>`;
    grid.appendChild(div);
  });
}

// ========== CHAT ==========
function loadBuddyChat(buddy){
  const chatBox=document.getElementById("chatBox"); if(!chatBox||!buddy)return;
  chatBox.innerHTML="";
  const messages=[
    {user:"buddy",text:`Hey! Ready to study ${buddy}?`},
    {user:"me",text:"Yes, let's start!"}
  ];
  messages.forEach(msg=>{
    const p=document.createElement("p");
    p.textContent=msg.text;
    p.className=msg.user==="me"?"chat-me":"chat-buddy";
    chatBox.appendChild(p);
  });
}
function sendMessage(){
  const input=document.getElementById("chatInput"); if(!input||!input.value)return;
  const chatBox=document.getElementById("chatBox"); if(!chatBox)return;
  const p=document.createElement("p"); p.textContent=input.value; p.className="chat-me";
  chatBox.appendChild(p); input.value=""; chatBox.scrollTop=chatBox.scrollHeight;
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded",()=>{
  loadUsers(); loadGroups();
});
// ======= NOTICES =======
function loadNotices(){
  const list=document.getElementById("noticesList"); if(!list)return;
  list.innerHTML="";
  const notices=JSON.parse(localStorage.getItem("notices")||"[]");
  notices.forEach(n=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`<h3>${n.title}</h3><p>${n.content}</p>`;
    list.appendChild(div);
  });
}
function addNotice(){
  const title=prompt("Enter notice title:");
  const content=prompt("Enter notice content:");
  if(!title||!content){ alert("Both fields are required!"); return;}
  const notices=JSON.parse(localStorage.getItem("notices")||"[]");
  notices.push({title,content});
  localStorage.setItem("notices",JSON.stringify(notices));
  alert("Notice added!");
  loadNotices();
}

// ======= MY PAGE =======
function loadMyPage(){
  const users=JSON.parse(localStorage.getItem("users")||"[]");
  if(!users.length)return;
  const me=users[users.length-1]; // last signed-up user
  const name=document.getElementById("myName");
  const email=document.getElementById("myEmail");
  const schedule=document.getElementById("mySchedule");
  if(name) name.textContent=`Name: ${me.name}`;
  if(email) email.textContent=`Email: ${me.email}`;
  if(schedule) schedule.textContent=`Schedule: ${me.schedule}`;

  // Sample my groups
  const myGroups=document.getElementById("myGroups"); if(!myGroups)return;
  const groups=JSON.parse(localStorage.getItem("groups")||"[]");
  myGroups.innerHTML="";
  groups.forEach(g=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`<h3>${g.name}</h3><p>${g.schedule}</p>`;
    myGroups.appendChild(div);
  });
}

// Call on page load
document.addEventListener("DOMContentLoaded",()=>{
  loadUsers();
  loadGroups();
  loadNotices();
  loadMyPage();
});
