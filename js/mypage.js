document.addEventListener("DOMContentLoaded", () =>
{
    const $ = id => document.getElementById(id);
    const exists = id => !!$(id);
    const myGroupsPanel = document.querySelector('.my-groups-panel');

    //subject list
    const SUBJECT_LIST = [
        "ACCT - Accounting",
        "ADSC - Applied Data Science",
        "ADVG - Adventure",
        "AGSC - Agricultural Science",
        "ANTH - Anthropology",
        "ARCH - Archaeology",
        "ARET - Architectural Engineering",
        "ASTR - Astronomy",
        "BIOL - Biology",
        "BLAW - Business Law",
        "BUSN - Business",
        "CENG - Computer Engineering",
        "CHBI - Chemical Biology",
        "CHEM - Chemistry",
        "CMNS - Communication Studies",
        "CNCS - Comp Netwk/Cybersecurity",
        "COAP - Cooking Apprentice",
        "COMP - Computing",
        "COOP - Cooperative Education",
        "CRWR - Creative Writing",
        "CYCA - Child and Youth Care",
        "DASC - Data Science",
        "ECED - Early Childhood Education",
        "ECON - Economics",
        "EDAR - Education Action Research",
        "EDCO - Education Communications",
        "EDCS - Educ Community Support",
        "EDEF - Education Foundations",
        "EDHC - Education Health & Career",
        "EDLL - Education Lang & Literacy",
        "EDMA - Education Math",
        "EDPR - Education Professional",
        "EDSC - Education Science",
        "EDSM - Education Science/Math",
        "EDSO - Education Social Studies",
        "EDTE - Education Trades Educ",
        "EDTL - Education Teach and Learn",
        "EDUC - Education",
        "ELGS - English Lang Grad Studies",
        "ENGL - English",
        "ENGR - Common Engineering",
        "ENST - Environmental Studies",
        "ENSU - Environmental Sustain",
        "ENTR - Entrepreneurship",
        "ENVS - Environmental Science",
        "EPHY - Engineering Physics",
        "ESAL - English As Second/Add Lan",
        "ESTR - Employment Skills Train",
        "EVNT - Event Management",
        "FILM - Film",
        "FIRE - Wildfire Science/Studies",
        "FNCE - Finance",
        "FNLG - First Nations Language",
        "FNST - First Nations Studies",
        "FRAN - Francais (French)",
        "GEOG - Geography",
        "GEOL - Geology",
        "GLBL - Global Competency",
        "HEAL - Health",
        "HIST - History",
        "JOUR - Journalism",
        "JUST - Police & Justice Studies",
        "LAWF - Law",
        "MATH - Mathematics",
        "MIST - Mngt Info Syst & Tech",
        "MKTG - Marketing",
        "MLAN - Modern Languages",
        "MNGT - Management",
        "MUSI - Music",
        "NRSC - Natural Resource Sciences",
        "NURS - Nursing",
        "ORGB - Organizational Behaviour",
        "PHED - Physical Education",
        "PHIL - Philosophy",
        "PHYS - Physics",
        "PNUR - Practical Nursing",
        "POLI - Political Science",
        "PSYC - Psychology",
        "RESL - Research Learning",
        "RESP - Respiratory Therapy",
        "RGEN - Regenerative Agriculture",
        "SCMN - Supply Chain Management",
        "SENG - Software Engineering",
        "SERV - Service Learning",
        "SOCI - Sociology",
        "SOCW - Social Work",
        "SPAN - Spanish",
        "SPEE - Speeches & Presentations",
        "SRCL - Service & Community Learn",
        "STAT - Statistics",
        "STSS - Study Skills",
        "TESL - Teaching ESL",
        "THTR - Theatre",
        "TMGT - Tourism Management",
        "VISA - Visual Arts",
        "VTEC - Veterinary Technology",
        "WTTP - Water Treatment Tech"
    ];
    //load user data
    const raw = localStorage.getItem("user");
    if (!raw)
    {
        alert("You must sign in first.");
        window.location.href = "signin.html";
        return;
    }

    //user variables
    let user = JSON.parse(raw);
    let editableUser = null;

    //normalize arrays
    if (!Array.isArray(user.classes))
    {
        user.classes = typeof user.classes === "string" && user.classes.trim()
            ? user.classes.split(",").map(s => s.trim()).filter(Boolean)
            : [];
    }
    if (!Array.isArray(user.timeSlots)) user.timeSlots = [];

    //getting elements
    const fullNameDisplay = $("fullNameDisplay");
    const emailDisplay = $("emailDisplay");
    const profileCircleDisplay = $("profileCircleDisplay");

    const chipContainer = $("chipContainer1");
    const classesInput = $("classesInput");
    const classListMP = $("classListMP");
    const classSearchMP = $("classSearchMP");

    const daySelectMP = $("daySelectMP");
    const timeSelectMP = $("timeSelectMP");
    const addSlotMP = $("addSlotMP");
    const timeChipsMP = $("timeChipsMP");
    const editTimeContainer = $("edit-time");

    const studyPurposeMP = $("studyPurposeMP");
    const studyPurposeInput = $("studyPurposeInput");
    const studyPurposeDisplay = $("studyPurposeDisplay");

    const editBtn = $("edit-profile-btn");
    const saveBtn = $("saveChangesBtn");

    //hidden controls when not editing
    if (editTimeContainer) editTimeContainer.style.display = "none";
    if (addSlotMP) addSlotMP.style.display = "none";
    if (studyPurposeMP) studyPurposeMP.style.display = "none";
    if (studyPurposeInput) studyPurposeInput.style.display = "none";

    //populating basic info
    if (fullNameDisplay) fullNameDisplay.textContent = user.fullName || "No Name";
    if (emailDisplay) emailDisplay.textContent = user.email || "No Email";
    if (profileCircleDisplay)
    {
        const initials = (user.fullName || "?").split(" ").map(n => n[0] || "").join("").toUpperCase();
        profileCircleDisplay.textContent = initials;
    }

    //render class chips function
    function renderClassChips()
    {
        if (!chipContainer) return;
        chipContainer.innerHTML = "";
        if (!Array.isArray(user.classes) || user.classes.length === 0)
        {
            chipContainer.innerHTML = `<p style="opacity:0.6;">No classes selected</p>`;
            return;
        }
        user.classes.forEach(c =>
        {
            const chip = document.createElement("div");
            chip.className = "chip1";
            chip.textContent = c;
            chipContainer.appendChild(chip);
        });
    }
    renderClassChips();

    //render time chips function
    function renderTimeChipsFromArray(arr)
    {
        if (timeChipsMP)
        {
            timeChipsMP.innerHTML = "";
            if (!arr || arr.length === 0)
            {
                timeChipsMP.innerHTML = `<p style="opacity:0.6;">No free time set</p>`;
                return;
            }
            arr.forEach(slot =>
            {
                const chip = document.createElement("div");
                chip.className = "chip";
                const span = document.createElement("span");
                span.textContent = slot;
                chip.appendChild(span);
                timeChipsMP.appendChild(chip);
            });
        }
    }
    renderTimeChipsFromArray(user.timeSlots);

    //populating study purpose
    if (studyPurposeMP)
    {
        studyPurposeMP.value = user.studyPurpose || "General study";
        studyPurposeMP.disabled = true;
    }
    if (studyPurposeInput)
    {
        studyPurposeInput.value = user.studyPurpose || "";
        studyPurposeInput.disabled = true;
    }
    if (studyPurposeDisplay)
    {
        studyPurposeDisplay.textContent = user.studyPurpose || "No study purpose set";
    }

    //editing state
    let editing = false;
    let editableTimeSlots = user.timeSlots.slice();
    let editableStudyPurpose = user.studyPurpose ||
        (studyPurposeMP ? studyPurposeMP.options[0].text :
            (studyPurposeInput ? studyPurposeInput.value : ""));

    //render editable time chips function
    function renderEditableTimeChips()
    {
        if (timeChipsMP)
        {
            timeChipsMP.innerHTML = "";
            if (!Array.isArray(editableTimeSlots) || editableTimeSlots.length === 0)
            {
                timeChipsMP.innerHTML = `<p style="opacity:0.6;">No free time set</p>`;
            }
            else
            {
                editableTimeSlots.forEach(slot =>
                {
                    const chip = document.createElement("div");
                    chip.className = "chip";
                    const span = document.createElement("span");
                    span.textContent = slot;
                    const btn = document.createElement("button");
                    btn.type = "button";
                    btn.textContent = "×";
                    btn.addEventListener("click", () =>
                    {
                        editableTimeSlots = editableTimeSlots.filter(s => s !== slot);
                        renderEditableTimeChips();
                    });
                    chip.appendChild(span);
                    chip.appendChild(btn);
                    timeChipsMP.appendChild(chip);
                });
            }
        }
    }

    //set editing mode function
    function setEditing(enabled)
    {
        editing = enabled;

        document.querySelector(".my-info-panel")?.classList.toggle("editing", enabled);
        document.querySelector(".my-groups-panel")?.classList.toggle("editing", enabled);

        if (enabled && !editableUser)
        {
            editableUser = JSON.parse(JSON.stringify(user));
        }

        if (!enabled)
        {
            editableUser = null;
            editableTimeSlots = Array.isArray(user.timeSlots) ? user.timeSlots.slice() : [];
            editableStudyPurpose = user.studyPurpose || (studyPurposeMP ? studyPurposeMP.options[0].text : (studyPurposeInput ? studyPurposeInput.value : ""));
        }
        if (enabled) beginClassEditing();
        else stopClassEditing();

        //free time visibility toggle
        if (editTimeContainer) editTimeContainer.style.display = enabled ? "block" : "none";
        if (addSlotMP) addSlotMP.style.display = enabled ? "inline-block" : "none";
        if (daySelectMP) daySelectMP.disabled = !enabled;
        if (timeSelectMP) timeSelectMP.disabled = !enabled;
        if (addSlotMP) addSlotMP.disabled = !enabled;

        //study purpose visibility toggle
        if (studyPurposeMP) studyPurposeMP.style.display = enabled ? "inline-block" : "none";
        if (studyPurposeInput) studyPurposeInput.style.display = enabled ? "inline-block" : "none";
        if (studyPurposeDisplay) studyPurposeDisplay.style.display = enabled ? "none" : "block";
        if (studyPurposeMP) studyPurposeMP.disabled = !enabled;
        if (studyPurposeInput) studyPurposeInput.disabled = !enabled;

        //save button visibility toggle
        if (saveBtn) saveBtn.style.display = enabled ? "inline-block" : "none";

        //populating editable fields
        if (enabled)
        {
            editableTimeSlots = Array.isArray(editableUser.timeSlots) ? editableUser.timeSlots.slice() : [];
            editableStudyPurpose = editableUser.studyPurpose || "";
            if (studyPurposeMP) studyPurposeMP.value = editableStudyPurpose;
            if (studyPurposeInput) studyPurposeInput.value = editableStudyPurpose;
            renderEditableTimeChips();
            renderEditableClassChips();
        }
        else
        {
            renderTimeChipsFromArray(user.timeSlots);
            if (studyPurposeMP) studyPurposeMP.value = user.studyPurpose || (studyPurposeMP.options[0].text);
            if (studyPurposeInput) studyPurposeInput.value = user.studyPurpose || "";
            if (studyPurposeDisplay) studyPurposeDisplay.textContent = user.studyPurpose || "No study purpose set";
        }
        if (enabled && classSearchMP) classSearchMP.focus && classSearchMP.focus();
    }
    //popup help functions
    function showPopup(popupId)
    {
        document.getElementById(popupId).hidden = false;
    }

    function closePopup(popupId)
    {
        document.getElementById(popupId).hidden = true;
    }

    document.querySelectorAll(".close-popup").forEach(btn =>
    {
        btn.addEventListener("click", () => closePopup(btn.dataset.popup));
    });

    function openEditGroupPopup(group)
    {
        const popup = document.getElementById("editGroupPopup");
        const form = document.getElementById("editGroupForm");

        form.name.value = group.name || "";
        document.getElementById("editDaySelect").value = group.day || "";
        document.getElementById("editTimeSelect").value = group.time || "";

        const chipContainer = document.getElementById("editClassChips");
        chipContainer.innerHTML = "";
        (group.classes || []).forEach(cls =>
        {
            const chip = document.createElement("div");
            chip.className = "chip1 selected";
            chip.textContent = cls;
            chipContainer.appendChild(chip);
        });

        const classSearchInput = document.getElementById("editClassSearch");
        const classList = document.getElementById("editClassList");
        classSearchInput.value = "";
        classList.innerHTML = "";

        showPopup("editGroupPopup");
    }

    // === Wire the Edit buttons ===
    document.querySelectorAll(".edit-group-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const groupId = btn.dataset.id;
            const groupData = getGroupById(groupId); // your existing function
            openEditGroupPopup(groupData);
        });
    });


    //entering edit mode, show class chips and dropdown
    function beginClassEditing()
    {
        const searchContainer = document.querySelector(".class-search");
        if (searchContainer) searchContainer.style.display = "flex";

        if (classSearchMP) classSearchMP.style.display = "block";

        classSearchMP.value = "";
        renderEditableClassChips();
    }

    //exiting edit mode, show class chips but hide dropdown
    function stopClassEditing()
    {
        classSearchMP.style.display = "none";
        classListMP.style.display = "none";
        classListMP.innerHTML = "";
        renderClassChips();
    }

    //searchable class list logic
    if (classSearchMP && classListMP && chipContainer)
    {

        //function to render editable class chips
        function renderEditableClassChips()
        {
            chipContainer.innerHTML = "";
            // prefer editable copy while editing, otherwise show live user classes
            const classes = (editing && editableUser && Array.isArray(editableUser.classes))
                ? editableUser.classes
                : (Array.isArray(user.classes) ? user.classes : []);

            if (classes.length === 0)
            {
                chipContainer.innerHTML = `<p style="opacity:0.6;">No classes selected</p>`;
                return;
            }
            classes.forEach(c =>
            {
                const chip = document.createElement("div");
                chip.className = "chip1 selected";
                chip.textContent = c;

                const removeBtn = document.createElement("button");
                removeBtn.type = "button";
                removeBtn.textContent = "×";
                removeBtn.style.marginLeft = "6px";
                removeBtn.addEventListener("click", () =>
                {
                    if (editing && editableUser && Array.isArray(editableUser.classes))
                    {
                        editableUser.classes = editableUser.classes.filter(x => x !== c);
                    }
                    else if (Array.isArray(user.classes))
                    {
                        user.classes = user.classes.filter(x => x !== c);
                    }
                    renderEditableClassChips();
                });

                chip.appendChild(removeBtn);
                chipContainer.appendChild(chip);
            });
        }

        //function to buuld class dropdown menu
        function filterClassDropdown()
        {
            const query = classSearchMP.value.toLowerCase().trim();

            classListMP.innerHTML = "";
            //hiding dropdown in normal state
            // hide dropdown if not editing
            if (!editing)
            {
                classListMP.style.display = "none";
                return;
            }

            // hide dropdown if query is empty
            if (query === "")
            {
                classListMP.style.display = "none";
                return;
            }

            // show dropdown in editing mode with query
            classListMP.style.display = "block";

            //filter subjects based on query
            const filtered = SUBJECT_LIST.filter(cls => cls.toLowerCase().includes(query));

            if (filtered.length === 0)
            {
                const emptyItem = document.createElement("div");
                emptyItem.className = "dropdown-item";
                emptyItem.textContent = "No matches found";
                emptyItem.style.opacity = "0.6";
                classListMP.appendChild(emptyItem);
                return;
            }

            //building dropdown items
            filtered.forEach(cls =>
            {
                const item = document.createElement("div");
                item.className = "dropdown-item";
                item.textContent = cls;
                item.tabIndex = 0;

                item.addEventListener("click", () =>
                {
                    // ensure editableUser exists and has classes array
                    if (!editableUser) editableUser = JSON.parse(JSON.stringify(user));
                    if (!Array.isArray(editableUser.classes)) editableUser.classes = Array.isArray(user.classes) ? user.classes.slice() : [];
                    if (!editableUser.classes.includes(cls))
                    {
                        editableUser.classes.push(cls);
                        renderEditableClassChips();
                    }
                    classSearchMP.value = "";
                    classListMP.style.display = "none";
                });

                item.addEventListener("keydown", (e) =>
                {
                    if (e.key === "Enter" || e.key === " ")
                    {
                        item.click();
                    }
                });

                classListMP.appendChild(item);
            });
        }

        //event listeners for class search input
        classSearchMP.addEventListener("input", filterClassDropdown);
        classSearchMP.addEventListener("focus", () =>
        {
            if (editing) filterClassDropdown();
        });
    }

    //edit button logic
    if (editBtn)
    {
        editBtn.addEventListener("click", () =>
        {
            if (!editing)
            {
                setEditing(true);
                editBtn.textContent = "Cancel";
            } else
            {
                setEditing(false);
                editBtn.textContent = "Edit profile";
            }
        });
    }

    //add time slot logic
    if (addSlotMP)
    {
        addSlotMP.addEventListener("click", () =>
        {
            const day = daySelectMP ? daySelectMP.value : "";
            const time = timeSelectMP ? timeSelectMP.value : "";
            if (!day || !time) { alert("Please select both a day and time!"); return; }
            const slot = `${day} ${time}`;
            if (editableTimeSlots.includes(slot)) { alert("That time slot is already added!"); return; }
            editableTimeSlots.push(slot);
            renderEditableTimeChips();
        });
    }

    //save button logic
    if (saveBtn)
    {
        saveBtn.addEventListener("click", () =>
        {
            const newStudyPurpose = studyPurposeMP ? studyPurposeMP.value :
                (studyPurposeInput ? studyPurposeInput.value : editableStudyPurpose);

            editableUser.timeSlots = editableTimeSlots.slice();
            editableUser.studyPurpose = newStudyPurpose;

            user = JSON.parse(JSON.stringify(editableUser));
            localStorage.setItem("user", JSON.stringify(user));

            //resets editableUser so it can be reused
            editableUser = null;

            renderTimeChipsFromArray(user.timeSlots);
            if (studyPurposeMP) studyPurposeMP.value = user.studyPurpose ||
                (studyPurposeMP.options[0] ? studyPurposeMP.options[0].text : "");
            if (studyPurposeInput) studyPurposeInput.value = user.studyPurpose || "";
            if (studyPurposeDisplay) studyPurposeDisplay.textContent = user.studyPurpose || "";

            setEditing(false);
            if (editBtn) editBtn.textContent = "Edit profile";
            alert("Profile updated!");
        });
    }

    //groups panel
    const groupListEl = $("groupList");
    const viewPopupEl = $("viewGroupPopup");
    const viewTitleEl = $("viewGroupTitle");
    const viewBodyEl = $("viewGroupBody");
    const editPopupEl = $("editGroupPopup");
    const editFormEl = $("editGroupForm");
    const editMembersListEl = $("editMembersList");
    const invitePopupEl = $("inviteGroupPopup");
    const inviteTitleEl = $("inviteGroupTitle");
    const inviteUserListEl = $("inviteUserList");
    const inviteConfirmBtn = $("inviteConfirmBtn");

    //helpers for persistent storage
    const loadGroups = () =>
    {
        const rawG = localStorage.getItem("groups");
        try
        {
            return rawG ? JSON.parse(rawG) : [];
        }
        catch (e)
        {
            console.error("groups parse", e); return [];
        }
    };
    const saveGroups = g => localStorage.setItem("groups", JSON.stringify(g));
    const loadUsers = () =>
    {
        const rawU = localStorage.getItem("users");
        try
        {
            return rawU ? JSON.parse(rawU) : [];
        }
        catch (e)
        {
            console.error("users parse", e); return [];
        }
    };

    //small esc helper (looked this up when I was researching optimizations)
    const esc = s => s == null ? "" : String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

    //popup show/hide
    function showPopup(id) { const e = $(id); if (e) e.hidden = false; }
    function hidePopup(id) { const e = $(id); if (e) e.hidden = true; }

    //function for creating a group item and displaying some of its info
    function createGroupItemNode(g)
    {
        const item = document.createElement("div");
        item.className = "group-item";

        const main = document.createElement("div");
        main.className = "group-main";
        const name = document.createElement("div"); name.className = "group-name"; name.textContent = g.name || "Untitled group";
        const meta = document.createElement("div"); meta.className = "group-members";
        const count = Array.isArray(g.members) ? g.members.length : 0;
        meta.textContent = `${g.course || "No class set"} · ${g.time || "Time not set"} · ${count} member${count===1?'':'s'}`;
        main.appendChild(name); main.appendChild(meta);

        const actions = document.createElement("div"); actions.className = "group-actions";
        const viewBtn = document.createElement("button"); viewBtn.type = "button"; viewBtn.className = "view-group-btn"; viewBtn.textContent = "View";
        const editBtn = document.createElement("button"); editBtn.type = "button"; editBtn.className = "edit-group-btn"; editBtn.textContent = "Edit";
        const inviteBtn = document.createElement("button"); inviteBtn.type = "button"; inviteBtn.className = "invite-group-btn"; inviteBtn.textContent = "Invite";
        actions.appendChild(viewBtn); actions.appendChild(editBtn); actions.appendChild(inviteBtn);

        //eventlisteners for group panel
        viewBtn.addEventListener("click", () => openViewPopup(g.id));
        editBtn.addEventListener("click", () => openEditPopup(g.id));
        inviteBtn.addEventListener("click", () => openInvitePopup(g.id));

        item.appendChild(main); item.appendChild(actions);
        return item;
    }

    //function to render groups the user belongs to
    function renderMyGroups()
    {
        if (!groupListEl) return;

        const groups = loadGroups();
        const mine = groups.filter(g => Array.isArray(g.members) && user && g.members.some(m => (typeof m === "string" ? m === user.email : m.email === user.email)));
        groupListEl.innerHTML = "";
        if (mine.length === 0)
        {
            groupListEl.innerHTML = `<div style="padding:12px;color:#666">You are not in any groups yet.</div>`;
            return;
        }
        mine.forEach(g => groupListEl.appendChild(createGroupItemNode(g)));
    }

    //view button popup
    function openViewPopup(groupId)
    {
        const g = loadGroups().find(x => x.id === groupId);
        if (!g) return alert("Group not found");
        viewTitleEl.textContent = g.name || "Group details";
        viewBodyEl.innerHTML = `<div style="margin-bottom:8px">
                <strong>Class:</strong> ${esc(g.course||"—")}<br/>
                <strong>Time:</strong> ${esc(g.time||"—")}<br/>
                <strong>Members:</strong> ${(Array.isArray(g.members)?g.members.length:0)}
            </div>`;
        const ul = document.createElement("ul");
        Object.assign(ul.style, {listStyle:"none", padding:0, margin:0, maxHeight:"30vh", overflowY:"auto", borderTop:"1px solid #eee", paddingTop:"8px"});
        (Array.isArray(g.members)?g.members:[]).forEach(m =>
        {
            const li = document.createElement("li");
            li.style.padding = "8px 6px";
            li.textContent = (typeof m === "string") ? m : `${m.name} — ${m.email}`;
            ul.appendChild(li);
        });
        viewBodyEl.appendChild(ul);
        showPopup("viewGroupPopup");
    }
    function beginGroupClassEditing(editableGroup) {
        const input = $("editClassSearch");
        const list = $("editClassList");
        const chips = $("editClassChips");

        if (!input || !list || !chips) return;

        function renderChips() {
            chips.innerHTML = "";
            if (!editableGroup.course) {
                chips.innerHTML = `<p style="opacity:0.6;">No class selected</p>`;
                return;
            }
            const chip = document.createElement("div");
            chip.className = "chip1 selected";
            chip.textContent = editableGroup.course;

            const btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = "×";
            btn.style.marginLeft = "6px";
            btn.addEventListener("click", () => {
                editableGroup.course = "";
                renderChips();
            });

            chip.appendChild(btn);
            chips.appendChild(chip);
        }

        renderChips();

        input.addEventListener("input", () => {
            const q = input.value.toLowerCase().trim();
            list.innerHTML = "";
            if (!q) { list.style.display = "none"; return; }

            const filtered = SUBJECT_LIST.filter(c => c.toLowerCase().includes(q));
            if (filtered.length === 0) {
                const empty = document.createElement("div");
                empty.className = "dropdown-item";
                empty.textContent = "No matches found";
                empty.style.opacity = "0.6";
                list.appendChild(empty);
                list.style.display = "block";
                return;
            }

            filtered.forEach(c => {
                const item = document.createElement("div");
                item.className = "dropdown-item";
                item.textContent = c;
                item.tabIndex = 0;
                item.addEventListener("click", () => {
                    editableGroup.course = c;
                    renderChips();
                    input.value = "";
                    list.innerHTML = "";
                    list.style.display = "none";
                });
                list.appendChild(item);
            });
            list.style.display = "block";
        });

        input.addEventListener("blur", () => setTimeout(() => list.style.display = "none", 150));
    }
    //edit button popup
    let editingGroupId = null;
    let currentEditableGroup = null;
    function openEditPopup(groupId)
    {
        const groups = loadGroups();
        const g = groups.find(x => x.id === groupId);
        if (!g) return alert("Group not found");
        editingGroupId = g.id;

        //populate form fields (name,course,time)
        if (editFormEl)
        {
            editFormEl.name.value = g.name || "";
            editFormEl.course.value = g.course || "";
            editFormEl.time.value = g.time || "";
        }

        currentEditableGroup = { ...g };
        beginGroupClassEditing(currentEditableGroup);

        myGroupsPanel.classList.add('editing');

        //populate day/time selects from g.time if possible
        const daySel = $("editDaySelect");
        const timeSel = $("editTimeSelect");
        if (daySel && timeSel)
        {
            let day = "";
            let time = "";
            if (g.time && typeof g.time === "string")
            {
                const parts = g.time.split(/\s+/);
                if (parts.length >= 2) {
                    day = parts[0];
                    time = parts.slice(1).join(" ");
                }
                else
                {
                    // fallback: try to parse "Mon 9-11" or "Mon 9-11"
                    const m = g.time.match(/^([A-Za-z]+)\s+(.+)$/);
                    if (m) { day = m[1]; time = m[2]; }
                    else { time = g.time; }
                }
            }
            daySel.value = day || "";
            timeSel.value = time || "";

            if (editFormEl) editFormEl.time.value = (day && time) ? `${day} ${time}` : (g.time || "");
        }

        //populate group member list
        if (editMembersListEl)
        {
            editMembersListEl.innerHTML = "";
            (Array.isArray(g.members) ? g.members : []).forEach(m =>
            {
                const row = document.createElement("div");

                row.style.display = "flex"; row.style.justifyContent = "space-between"; row.style.alignItems = "center"; row.style.padding = "6px 0";
                const text = document.createElement("div");
                text.textContent = (typeof m === "string") ? m : `${m.name} — ${m.email}`;
                const rm = document.createElement("button");
                rm.type = "button";
                rm.textContent = "Remove";

                rm.addEventListener("click", () =>
                {
                    const gs = loadGroups();
                    const gi = gs.findIndex(x => x.id === g.id);
                    if (gi === -1) return;
                    gs[gi].members = gs[gi].members.filter(mm => (typeof mm === "string" ? mm !== m : mm.email !== (m.email || m)));
                    saveGroups(gs);
                    renderMyGroups();
                    if (row.parentNode) row.parentNode.removeChild(row);
                });

                row.appendChild(text);
                row.appendChild(rm);
                editMembersListEl.appendChild(row);
            });
        }

        showPopup("editGroupPopup");

        const editSearch = $("editClassSearch");
        if (editSearch) editSearch.focus && editSearch.focus();
    }

    if (editFormEl)
    {
        editFormEl.addEventListener("submit", ev =>
        {
            ev.preventDefault();
            if (!editingGroupId) return;
            const gs = loadGroups();
            const idx = gs.findIndex(x => x.id === editingGroupId);
            if (idx === -1) return alert("Group not found");
            gs[idx].name = editFormEl.name.value.trim();
            gs[idx].course = currentEditableGroup ? currentEditableGroup.course : "";
            gs[idx].time = editFormEl.time.value.trim();
            saveGroups(gs);
            renderMyGroups();
            editingGroupId = null;
            hidePopup("editGroupPopup");
            currentEditableGroup = null;

            myGroupsPanel.classList.remove('editing');
        });
    }

    //invite popup
    let invitingGroupId = null;
    function openInvitePopup(groupId)
    {
        invitingGroupId = groupId;
        const g = loadGroups().find(x => x.id === groupId);
        if (!g) return alert("Group not found");
        inviteTitleEl.textContent = `Invite to ${g.name || "group"}`;
        inviteUserListEl.innerHTML = "";
        const users = loadUsers();
        const existing = new Set((Array.isArray(g.members)?g.members:[]).map(m => (typeof m === "string" ? m : m.email)));
        users.forEach(u =>
        {
            const row = document.createElement("label");
            row.style.display = "flex"; row.style.alignItems = "center"; row.style.gap = "8px";
            const cb = document.createElement("input"); cb.type = "checkbox"; cb.value = u.email;
            const span = document.createElement("span"); span.textContent = `${u.name} (${u.email})`;
            if (existing.has(u.email) || (user && u.email === user.email)) { cb.disabled = true; span.style.opacity = "0.6"; }
            row.appendChild(cb); row.appendChild(span); inviteUserListEl.appendChild(row);
        });
        showPopup("inviteGroupPopup");
    }

    if (inviteConfirmBtn)
    {
        inviteConfirmBtn.addEventListener("click", () =>
        {
            if (!invitingGroupId) return;
            const checked = Array.from(inviteUserListEl.querySelectorAll("input[type=checkbox]:checked")).map(i => i.value);
            if (checked.length === 0) { alert("Select at least one person"); return; }
            const gs = loadGroups();
            const idx = gs.findIndex(x => x.id === invitingGroupId);
            if (idx === -1) return alert("Group not found");
            if (!Array.isArray(gs[idx].members)) gs[idx].members = [];
            const usersMap = new Map(loadUsers().map(u => [u.email, u]));
            checked.forEach(email =>
            {
                const u = usersMap.get(email);
                if (!u) return;
                if (!gs[idx].members.some(mm => (typeof mm === "string" ? mm === email : mm.email === email)))
                {
                    gs[idx].members.push({ name: u.name, email: u.email });
                }
            });
            saveGroups(gs);
            renderMyGroups();
            hidePopup("inviteGroupPopup");
            invitingGroupId = null;
            alert("Invites added (simulated).");
        });
    }


    const editDay = $("editDaySelect");
    const editTime = $("editTimeSelect");
    const hiddenTimeInput = $("editTimeInput");


    if (editDay && editTime)
    {
        function syncHiddenTime()
        {
            const d = editDay.value || "";
            const t = editTime.value || "";
            if (hiddenTimeInput)
            {
                hiddenTimeInput.value = (d && t) ? `${d} ${t}` : (d || t || "");
            }
        }
        editDay.addEventListener("change", syncHiddenTime);
        editTime.addEventListener("change", syncHiddenTime);

        syncHiddenTime();
    }

    document.querySelectorAll(".close-popup").forEach(b => b.addEventListener("click", e =>
    {
        const id = e.currentTarget.dataset.popup;
        if (id) hidePopup(id);

        myGroupsPanel.classList.remove('editing')
    }));

    //initial render
    renderMyGroups();
    //reverting changes on cancel
    setEditing(false);
});
