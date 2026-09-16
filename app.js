// ===== EFFORTLESS AI SALES OS =====
// Complete application logic with local storage and lead intelligence

// ===== CONFIGURATION & SCORING RULES =====
const SCORING_RULES = {
    VERY_STRONG_SIGNALS: [
        'hiring appointment setters',
        'hiring sales representatives',
        'hiring sdrs',
        'looking for lead generation',
        'looking for sales development',
        'asking for appointments',
        'asking for more clients',
        'launching a new service',
        'expanding into a new market',
        'opening a new location',
        'needs sales reps',
        'needs appointment setters',
        'sales hiring',
        'expanding sales',
        'new sales team',
        'lead gen needed'
    ],
    MEDIUM_SIGNALS: [
        'running advertising',
        'growing team',
        'active social media',
        'new website',
        'recently expanded',
        'increasing marketing activity',
        'new office',
        'hiring',
        'growing business',
        'expanding operations',
        'new marketing',
        'social media active'
    ],
    WEAK_SIGNALS: [
        'generic business listing',
        'old inactive social media',
        'no obvious growth signal',
        'small business',
        'local business'
    ]
};

// ===== DEMO DATA =====
const DEMO_LEADS = [
    {
        first_name: 'John',
        last_name: 'Smith',
        company: 'Digital Growth Agency',
        email: 'john@digitalgrowth.com',
        phone: '555-0101',
        website: 'digitalgrowth.com',
        facebook: 'facebook.com/digitalgrowth',
        industry: 'Marketing Agency',
        location: 'New York',
        signal: 'Hiring appointment setters - Need to scale sales team'
    },
    {
        first_name: 'Sarah',
        last_name: 'Johnson',
        company: 'TechStartup Solutions',
        email: 'sarah@techstartupsol.com',
        phone: '555-0102',
        website: 'techstartupsol.com',
        facebook: 'facebook.com/techstartupsolutions',
        industry: 'Software Development',
        location: 'San Francisco',
        signal: 'Launching new service - Looking for lead generation partners'
    },
    {
        first_name: 'Michael',
        last_name: 'Chen',
        company: 'Revenue Boost Consulting',
        email: 'michael@revenueboost.com',
        phone: '555-0103',
        website: 'revenueboost.com',
        facebook: 'facebook.com/revenueboost',
        industry: 'Business Consulting',
        location: 'Austin',
        signal: 'Expanding into new market - Asking for more qualified leads'
    },
    {
        first_name: 'Emma',
        last_name: 'Williams',
        company: 'Sales Force Academy',
        email: 'emma@salesforceacad.com',
        phone: '555-0104',
        website: 'salesforceacad.com',
        facebook: 'facebook.com/salesforceacad',
        industry: 'Sales Training',
        location: 'Boston',
        signal: 'Hiring sales representatives - Active social media presence'
    },
    {
        first_name: 'David',
        last_name: 'Martinez',
        company: 'Marketing Masters LLC',
        email: 'david@marketingmasters.com',
        phone: '555-0105',
        website: 'marketingmasters.com',
        facebook: 'facebook.com/marketingmasters',
        industry: 'Digital Marketing',
        location: 'Los Angeles',
        signal: 'Running advertising campaigns - Looking for sales development'
    },
    {
        first_name: 'Lisa',
        last_name: 'Anderson',
        company: 'Enterprise Solutions Inc',
        email: 'lisa@enterprisesol.com',
        phone: '555-0106',
        website: 'enterprisesol.com',
        facebook: 'facebook.com/enterprisesol',
        industry: 'Enterprise Software',
        location: 'Chicago',
        signal: 'Opening new location - Asking for appointments with decision makers'
    },
    {
        first_name: 'Robert',
        last_name: 'Thompson',
        company: 'Growth Hacking Pro',
        email: 'robert@growthhackingpro.com',
        phone: '555-0107',
        website: 'growthhackingpro.com',
        facebook: 'facebook.com/growthhackingpro',
        industry: 'Growth Marketing',
        location: 'Seattle',
        signal: 'Recently launched new website - Actively hiring SDRs'
    },
    {
        first_name: 'Jessica',
        last_name: 'Brown',
        company: 'Client Success Group',
        email: 'jessica@clientsuccess.com',
        phone: '555-0108',
        website: 'clientsuccess.com',
        facebook: 'facebook.com/clientsuccess',
        industry: 'Business Services',
        location: 'Denver',
        signal: 'Growing team - Increasing marketing activity significantly'
    },
    {
        first_name: 'James',
        last_name: 'Wilson',
        company: 'Velocity Sales Corp',
        email: 'james@velocitysales.com',
        phone: '555-0109',
        website: 'velocitysales.com',
        facebook: 'facebook.com/velocitysales',
        industry: 'Sales Solutions',
        location: 'Miami',
        signal: 'Expanding sales operations - Hiring appointment setters'
    },
    {
        first_name: 'Michelle',
        last_name: 'Garcia',
        company: 'Innovation Labs Digital',
        email: 'michelle@innovationlabs.com',
        phone: '555-0110',
        website: 'innovationlabs.com',
        facebook: 'facebook.com/innovationlabs',
        industry: 'Tech Consulting',
        location: 'Austin',
        signal: 'Launching new service division - Needs more qualified leads'
    }
];

// ===== MESSAGE TEMPLATES =====
const MESSAGE_TEMPLATES = {
    HIRING_APPOINTMENT_SETTERS: (firstName, company, industry) => `Hey ${firstName}, noticed ${company} is actively hiring appointment setters. Usually that means the sales team is scaling. I help ${industry.toLowerCase()} agencies turn more conversations into qualified meetings. Worth a quick chat?`,
    
    HIRING_SALES_REPS: (firstName, company, industry) => `Hi ${firstName}, saw that ${company} is hiring sales reps - that's a growth signal! I specialize in helping ${industry.toLowerCase()} teams accelerate their pipeline. Could be a good fit to discuss?`,
    
    LEAD_GENERATION: (firstName, company, industry) => `${firstName}, noticed ${company} is looking to scale their lead generation. I've helped similar ${industry.toLowerCase()} companies increase their lead flow by 40%+. Would you be open to a quick conversation?`,
    
    EXPANDING_MARKET: (firstName, company, industry) => `Hey ${firstName}, saw that ${company} is expanding into new markets. That's typically when teams need extra sales support. I help ${industry.toLowerCase()} scale faster. Quick call?`,
    
    LAUNCHING_SERVICE: (firstName, company, industry) => `${firstName}, congrats on the new service launch at ${company}! Usually this means you're looking for clients. I work with ${industry.toLowerCase()} teams to find and close deals. Let's connect?`,
    
    DEFAULT: (firstName, company, industry) => `Hi ${firstName}, I came across ${company} and thought there might be a good fit. I help ${industry.toLowerCase()} companies grow their sales. Worth a quick conversation?`
};

// ===== STATE MANAGEMENT =====
let appState = {
    leads: [],
    campaigns: [],
    appointments: [],
    revenue: [],
    conversations: [],
    currentLeadId: null
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadAppState();
    initializeEventListeners();
    showDashboard();
    updateDashboard();
    
    // If no leads, show the demo button more prominently
    if (appState.leads.length === 0) {
        document.getElementById('loadDemoBtn').style.display = 'block';
    }
});

// ===== STORAGE MANAGEMENT =====
function saveAppState() {
    localStorage.setItem('salesOsState', JSON.stringify(appState));
}

function loadAppState() {
    const saved = localStorage.getItem('salesOsState');
    if (saved) {
        appState = JSON.parse(saved);
    }
}

function resetData() {
    if (confirm('⚠️ This will clear ALL data. Are you sure?')) {
        appState = {
            leads: [],
            campaigns: [],
            appointments: [],
            revenue: [],
            conversations: [],
            currentLeadId: null
        };
        localStorage.removeItem('salesOsState');
        location.reload();
    }
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const screenId = btn.dataset.screen;
            showScreen(screenId);
        });
    });

    // Dashboard
    document.getElementById('newCampaignBtn').addEventListener('click', () => showScreen('campaignsScreen'));
    document.getElementById('loadDemoBtn').addEventListener('click', loadDemoLeads);
    document.getElementById('resetBtn').addEventListener('click', resetData);

    // Leads
    document.getElementById('csvInput').addEventListener('change', handleCsvUpload);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderLeads();
        });
    });
    document.getElementById('searchInput').addEventListener('input', renderLeads);
    document.getElementById('backBtn').addEventListener('click', showScreen('leadsScreen'));

    // Campaigns
    document.getElementById('newCampaignBtn').addEventListener('click', toggleCampaignForm);
    document.getElementById('createCampaignBtn').addEventListener('click', createCampaign);
    document.getElementById('cancelCampaignBtn').addEventListener('click', () => {
        document.getElementById('newCampaignForm').classList.add('hidden');
    });

    // Inbox
    document.getElementById('newConversationBtn').addEventListener('click', toggleConversationForm);
    document.getElementById('logConversationBtn').addEventListener('click', logConversation);
    document.getElementById('cancelConversationBtn').addEventListener('click', () => {
        document.getElementById('newConversationForm').classList.add('hidden');
    });

    // Appointments
    document.getElementById('newAppointmentBtn').addEventListener('click', toggleAppointmentForm);
    document.getElementById('createAppointmentBtn').addEventListener('click', createAppointment);
    document.getElementById('cancelAppointmentBtn').addEventListener('click', () => {
        document.getElementById('newAppointmentForm').classList.add('hidden');
    });

    // Revenue
    document.getElementById('newRevenueBtn').addEventListener('click', toggleRevenueForm);
    document.getElementById('createRevenueBtn').addEventListener('click', createRevenue);
    document.getElementById('cancelRevenueBtn').addEventListener('click', () => {
        document.getElementById('newRevenueForm').classList.add('hidden');
    });
}

// ===== SCREEN MANAGEMENT =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    // Update nav
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.screen === screenId) {
            btn.classList.add('active');
        }
    });

    // Trigger screen-specific logic
    if (screenId === 'leadsScreen') renderLeads();
    if (screenId === 'campaignsScreen') renderCampaigns();
    if (screenId === 'inboxScreen') renderConversations();
    if (screenId === 'appointmentsScreen') renderAppointments();
    if (screenId === 'revenueScreen') renderRevenue();
}

function showDashboard() {
    showScreen('dashboardScreen');
}

// ===== LEAD INTELLIGENCE ENGINE =====
function calculateLeadScore(lead) {
    let score = 0;
    const signal = (lead.signal || '').toLowerCase();

    // Check very strong signals (50 points each)
    SCORING_RULES.VERY_STRONG_SIGNALS.forEach(s => {
        if (signal.includes(s)) score += 50;
    });

    // Check medium signals (25 points each)
    SCORING_RULES.MEDIUM_SIGNALS.forEach(s => {
        if (signal.includes(s)) score += 25;
    });

    // Company name bonus
    if (lead.company && lead.company.length > 0) score += 10;

    // Website bonus
    if (lead.website && lead.website.length > 0) score += 5;

    // Cap at 100
    return Math.min(score, 100);
}

function getTemperature(score) {
    if (score >= 70) return 'HOT';
    if (score >= 40) return 'WARM';
    return 'COLD';
}

function getStrongestSignal(lead) {
    const signal = (lead.signal || '').toLowerCase();
    
    for (let s of SCORING_RULES.VERY_STRONG_SIGNALS) {
        if (signal.includes(s)) return s;
    }
    
    for (let s of SCORING_RULES.MEDIUM_SIGNALS) {
        if (signal.includes(s)) return s;
    }
    
    return lead.signal || 'Unknown';
}

function getWhyMatters(lead) {
    const signal = getStrongestSignal(lead);
    
    if (signal.includes('hiring')) {
        return `${lead.company} is actively hiring for sales roles, indicating aggressive expansion of their sales capacity.`;
    }
    if (signal.includes('lead')) {
        return `${lead.company} is actively seeking lead generation solutions, a perfect target for sales outreach services.`;
    }
    if (signal.includes('expanding') || signal.includes('market')) {
        return `${lead.company} is in growth mode and expanding operations, making them ideal for partnership discussions.`;
    }
    if (signal.includes('launching')) {
        return `${lead.company} is launching new services/products and will need clients to grow revenue.`;
    }
    if (signal.includes('social media') || signal.includes('advertising')) {
        return `${lead.company} shows active marketing engagement, indicating they're open to business development conversations.`;
    }
    
    return `${lead.company} shows characteristics of an actively growing business with sales needs.`;
}

function getLikelyProblem(lead) {
    const industry = lead.industry || 'their industry';
    
    if (getStrongestSignal(lead).includes('hiring')) {
        return `Struggling to fill the sales pipeline fast enough without more appointment setters or SDRs on the team.`;
    }
    if (getStrongestSignal(lead).includes('lead')) {
        return `Not generating enough qualified leads to keep the sales team busy and growing revenue targets.`;
    }
    if (getStrongestSignal(lead).includes('expanding')) {
        return `Need to scale sales operations quickly in new markets but don't have established processes or resources yet.`;
    }
    if (getStrongestSignal(lead).includes('launching')) {
        return `Have a new product/service but lack the customer acquisition channel to get initial traction.`;
    }
    
    return `Growing but not fast enough to reach revenue targets without additional sales support.`;
}

function getRecommendedOffer(lead) {
    if (getStrongestSignal(lead).includes('hiring appointment')) {
        return 'Appointment-setting or lead qualification services to help their new team ramp up faster.';
    }
    if (getStrongestSignal(lead).includes('lead')) {
        return 'High-quality, targeted B2B leads in their industry with built-in appointment setting.';
    }
    if (getStrongestSignal(lead).includes('expanding')) {
        return 'Market research and warm introductions in their new geographic or vertical expansion.';
    }
    if (getStrongestSignal(lead).includes('launching')) {
        return 'Beta customer outreach and early adoption strategy for their new product/service.';
    }
    
    return 'Sales development and lead generation partnership.';
}

function getRecommendedChannel(lead) {
    if (lead.facebook && lead.facebook.length > 2) return 'LinkedIn + Email';
    if (lead.phone && lead.phone.length > 5) return 'Phone call';
    return 'Email';
}

// ===== PERSONALIZED MESSAGE GENERATION =====
function generatePersonalizedMessage(lead) {
    const firstName = lead.first_name || 'there';
    const company = lead.company || 'your company';
    const industry = lead.industry || 'your industry';
    const signal = getStrongestSignal(lead).toLowerCase();

    if (signal.includes('hiring appointment')) {
        return MESSAGE_TEMPLATES.HIRING_APPOINTMENT_SETTERS(firstName, company, industry);
    }
    if (signal.includes('hiring sales') || signal.includes('hiring rep')) {
        return MESSAGE_TEMPLATES.HIRING_SALES_REPS(firstName, company, industry);
    }
    if (signal.includes('lead generation') || signal.includes('lead gen')) {
        return MESSAGE_TEMPLATES.LEAD_GENERATION(firstName, company, industry);
    }
    if (signal.includes('expanding') || signal.includes('market')) {
        return MESSAGE_TEMPLATES.EXPANDING_MARKET(firstName, company, industry);
    }
    if (signal.includes('launching')) {
        return MESSAGE_TEMPLATES.LAUNCHING_SERVICE(firstName, company, industry);
    }

    return MESSAGE_TEMPLATES.DEFAULT(firstName, company, industry);
}

// ===== DEMO DATA LOADING =====
function loadDemoLeads() {
    appState.leads = DEMO_LEADS.map((lead, idx) => ({
        ...lead,
        id: 'lead_' + idx,
        status: idx < 2 ? 'QUALIFIED' : 'NEW',
        score: calculateLeadScore(lead)
    }));

    saveAppState();
    updateDashboard();
    renderLeads();
    document.getElementById('loadDemoBtn').style.display = 'none';
    showScreen('dashboardScreen');
}

// ===== CSV UPLOAD =====
function handleCsvUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const csv = event.target.result;
            const lines = csv.split('\n');
            const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;

                const values = lines[i].split(',').map(v => v.trim());
                const lead = {};

                headers.forEach((header, idx) => {
                    lead[header] = values[idx] || '';
                });

                if (lead.company || lead.email) {
                    lead.id = 'lead_' + Date.now() + Math.random();
                    lead.status = lead.status || 'NEW';
                    lead.score = calculateLeadScore(lead);
                    appState.leads.push(lead);
                }
            }

            saveAppState();
            updateDashboard();
            renderLeads();
            alert('✅ CSV uploaded successfully!');
        } catch (error) {
            alert('❌ Error parsing CSV: ' + error.message);
        }
    };

    reader.readAsText(file);
    e.target.value = '';
}

// ===== DASHBOARD UPDATE =====
function updateDashboard() {
    const hotLeads = appState.leads.filter(l => getTemperature(l.score) === 'HOT');
    const replies = appState.leads.filter(l => l.status === 'REPLIED').length;
    const appointments = appState.appointments.length;
    const won = appState.leads.filter(l => l.status === 'WON').length;
    const wonRevenue = appState.revenue
        .filter(r => r.status === 'WON')
        .reduce((sum, r) => sum + parseFloat(r.deal_value || 0), 0);

    document.getElementById('hotLeadsCount').textContent = hotLeads.length;
    document.getElementById('totalLeadsCount').textContent = appState.leads.length;
    document.getElementById('repliesCount').textContent = replies;
    document.getElementById('appointmentsCount').textContent = appointments;
    document.getElementById('wonCount').textContent = won;
    document.getElementById('pipelineValue').textContent = '$' + 
        appState.leads
            .filter(l => ['QUALIFIED', 'CONTACTED', 'REPLIED', 'INTERESTED', 'APPOINTMENT', 'PROPOSAL'].includes(l.status))
            .length * 5000;

    // Render hot leads list
    const hotLeadsList = document.getElementById('hotLeadsList');
    if (hotLeads.length === 0) {
        hotLeadsList.innerHTML = '<p class="empty-state">No hot leads yet. Upload contacts or load demo data.</p>';
    } else {
        hotLeadsList.innerHTML = hotLeads.map(lead => `
            <div class="lead-card" onclick="openLeadDetail('${lead.id}')">
                <div class="lead-card-header">
                    <div class="lead-card-title">${lead.company}</div>
                    <div class="lead-card-score">🔥 ${lead.score}</div>
                </div>
                <div class="lead-card-meta">
                    <span>${lead.first_name} ${lead.last_name}</span>
                    <span>${lead.email}</span>
                </div>
            </div>
        `).join('');
    }
}

// ===== LEADS SCREEN =====
function renderLeads() {
    const filter = document.querySelector('.filter-btn.active').dataset.filter;
    const search = document.getElementById('searchInput').value.toLowerCase();

    let filtered = appState.leads;

    if (filter !== 'all') {
        filtered = filtered.filter(l => getTemperature(l.score) === filter);
    }

    if (search) {
        filtered = filtered.filter(l =>
            (l.first_name + ' ' + l.last_name).toLowerCase().includes(search) ||
            (l.company || '').toLowerCase().includes(search) ||
            (l.email || '').toLowerCase().includes(search)
        );
    }

    const leadsList = document.getElementById('leadsList');

    if (filtered.length === 0) {
        leadsList.innerHTML = '<p class="empty-state">No leads match your filters.</p>';
        return;
    }

    leadsList.innerHTML = filtered.map(lead => {
        const temp = getTemperature(lead.score);
        const tempClass = temp === 'HOT' ? 'temperature-hot' : temp === 'WARM' ? 'temperature-warm' : 'temperature-cold';

        return `
            <div class="lead-card" onclick="openLeadDetail('${lead.id}')">
                <div class="lead-card-header">
                    <div class="lead-card-title">${lead.company || 'Unknown'}</div>
                    <div class="lead-card-score">${lead.score}/100</div>
                </div>
                <div class="lead-card-meta">
                    <span><strong>${lead.first_name} ${lead.last_name}</strong></span>
                    <span class="lead-card-temperature ${tempClass}">${temp}</span>
                </div>
                <div class="lead-card-meta">
                    <span>${lead.industry || 'N/A'}</span>
                    <span>${lead.email}</span>
                </div>
            </div>
        `;
    }).join('');
}

// ===== LEAD DETAIL =====
function openLeadDetail(leadId) {
    const lead = appState.leads.find(l => l.id === leadId);
    if (!lead) return;

    appState.currentLeadId = leadId;
    const score = lead.score || calculateLeadScore(lead);
    const temp = getTemperature(score);

    document.getElementById('detailCompany').textContent = lead.company || 'Unknown Company';
    document.getElementById('detailContact').textContent = `${lead.first_name} ${lead.last_name}`;
    document.getElementById('detailScore').textContent = score;
    document.getElementById('detailScoreBar').style.width = (score) + '%';
    
    const tempColor = temp === 'HOT' ? '#ff6b35' : temp === 'WARM' ? '#ffc107' : '#64c8ff';
    document.getElementById('detailTemperature').textContent = temp;
    document.getElementById('detailTemperature').style.background = 'rgba(' + 
        (temp === 'HOT' ? '255,107,53' : temp === 'WARM' ? '255,193,7' : '100,200,255') + ',0.1)';
    document.getElementById('detailTemperature').style.color = tempColor;

    document.getElementById('detailSignal').textContent = getStrongestSignal(lead);
    document.getElementById('detailWhy').textContent = getWhyMatters(lead);
    document.getElementById('detailProblem').textContent = getLikelyProblem(lead);
    document.getElementById('detailOffer').textContent = getRecommendedOffer(lead);
    document.getElementById('detailChannel').textContent = getRecommendedChannel(lead);

    // Contact info
    if (lead.email) {
        document.getElementById('detailEmail').href = 'mailto:' + lead.email;
        document.getElementById('detailEmail').textContent = lead.email;
    }
    if (lead.phone) {
        document.getElementById('detailPhone').textContent = lead.phone;
    }
    if (lead.website) {
        document.getElementById('detailWebsite').href = 'https://' + lead.website.replace('https://', '').replace('http://', '');
        document.getElementById('detailWebsite').textContent = lead.website;
    }
    if (lead.facebook) {
        document.getElementById('detailFacebook').href = lead.facebook.startsWith('http') ? lead.facebook : 'https://facebook.com/' + lead.facebook;
        document.getElementById('detailFacebook').textContent = 'Facebook';
    }

    // Status
    document.getElementById('statusSelect').value = lead.status || 'NEW';
    document.getElementById('statusSelect').addEventListener('change', (e) => {
        lead.status = e.target.value;
        saveAppState();
        updateDashboard();
    });

    showScreen('leadDetailScreen');
}

// ===== CAMPAIGNS =====
function toggleCampaignForm() {
    const form = document.getElementById('newCampaignForm');
    form.classList.toggle('hidden');
}

function createCampaign() {
    const name = document.getElementById('campaignName').value;
    const description = document.getElementById('campaignDescription').value;

    if (!name) {
        alert('Please enter a campaign name');
        return;
    }

    const campaign = {
        id: 'camp_' + Date.now(),
        name,
        description,
        created_at: new Date().toISOString(),
        leads_count: 0
    };

    appState.campaigns.push(campaign);
    saveAppState();

    document.getElementById('campaignName').value = '';
    document.getElementById('campaignDescription').value = '';
    document.getElementById('newCampaignForm').classList.add('hidden');

    renderCampaigns();
    alert('✅ Campaign created!');
}

function renderCampaigns() {
    const list = document.getElementById('campaignsList');

    if (appState.campaigns.length === 0) {
        list.innerHTML = '<p class="empty-state">No campaigns yet. Create one to get started!</p>';
        return;
    }

    list.innerHTML = appState.campaigns.map(camp => `
        <div class="campaign-card">
            <div class="campaign-name">${camp.name}</div>
            <div class="campaign-description">${camp.description}</div>
            <div class="campaign-stats">
                <span>Leads: ${camp.leads_count || 0}</span>
                <span>${new Date(camp.created_at).toLocaleDateString()}</span>
            </div>
        </div>
    `).join('');
}

// ===== INBOX / CONVERSATIONS =====
function toggleConversationForm() {
    const form = document.getElementById('newConversationForm');
    form.classList.toggle('hidden');

    if (!form.classList.contains('hidden')) {
        const select = document.getElementById('conversationLeadSelect');
        select.innerHTML = appState.leads.map(l => 
            `<option value="${l.id}">${l.company} - ${l.first_name} ${l.last_name}</option>`
        ).join('');
    }
}

function logConversation() {
    const leadId = document.getElementById('conversationLeadSelect').value;
    const message = document.getElementById('conversationMessage').value;
    const intent = document.getElementById('conversationIntent').value;

    if (!leadId || !message) {
        alert('Please select a lead and enter a message');
        return;
    }

    const lead = appState.leads.find(l => l.id === leadId);
    if (!lead) return;

    const conversation = {
        id: 'conv_' + Date.now(),
        lead_id: leadId,
        company: lead.company,
        contact: lead.first_name + ' ' + lead.last_name,
        message,
        intent,
        created_at: new Date().toISOString()
    };

    appState.conversations.push(conversation);
    
    // Update lead status based on intent
    if (intent === 'READY_TO_BOOK') lead.status = 'APPOINTMENT';
    else if (intent === 'INTERESTED') lead.status = 'INTERESTED';
    else if (intent === 'QUESTION') lead.status = 'REPLIED';

    saveAppState();
    updateDashboard();

    document.getElementById('conversationMessage').value = '';
    document.getElementById('newConversationForm').classList.add('hidden');

    renderConversations();
    alert('✅ Conversation logged!');
}

function renderConversations() {
    const list = document.getElementById('conversationsList');

    if (appState.conversations.length === 0) {
        list.innerHTML = '<p class="empty-state">No conversations yet.</p>';
        return;
    }

    list.innerHTML = appState.conversations.map(conv => `
        <div class="conversation-card">
            <div class="conversation-header">
                <div>
                    <div class="conversation-company">${conv.company}</div>
                    <div class="conversation-message">"${conv.message.substring(0, 60)}..."</div>
                </div>
                <div class="conversation-intent">${conv.intent}</div>
            </div>
        </div>
    `).join('');
}

// ===== APPOINTMENTS =====
function toggleAppointmentForm() {
    const form = document.getElementById('newAppointmentForm');
    form.classList.toggle('hidden');

    if (!form.classList.contains('hidden')) {
        const select = document.getElementById('appointmentLeadSelect');
        select.innerHTML = appState.leads.map(l => 
            `<option value="${l.id}">${l.company} - ${l.first_name} ${l.last_name}</option>`
        ).join('');
    }
}

function createAppointment() {
    const leadId = document.getElementById('appointmentLeadSelect').value;
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const value = document.getElementById('appointmentValue').value;

    if (!leadId || !date || !time) {
        alert('Please fill in all fields');
        return;
    }

    const lead = appState.leads.find(l => l.id === leadId);
    if (!lead) return;

    const appointment = {
        id: 'apt_' + Date.now(),
        lead_id: leadId,
        company: lead.company,
        contact: lead.first_name + ' ' + lead.last_name,
        date,
        time,
        value,
        status: 'UPCOMING',
        created_at: new Date().toISOString()
    };

    appState.appointments.push(appointment);
    lead.status = 'APPOINTMENT';
    saveAppState();
    updateDashboard();

    document.getElementById('appointmentDate').value = '';
    document.getElementById('appointmentTime').value = '';
    document.getElementById('appointmentValue').value = '';
    document.getElementById('newAppointmentForm').classList.add('hidden');

    renderAppointments();
    alert('✅ Appointment scheduled!');
}

function renderAppointments() {
    const list = document.getElementById('appointmentsList');

    if (appState.appointments.length === 0) {
        list.innerHTML = '<p class="empty-state">No appointments yet.</p>';
        return;
    }

    list.innerHTML = appState.appointments.map(apt => `
        <div class="appointment-card">
            <div class="appointment-header">
                <div class="appointment-company">${apt.company}</div>
                <div class="appointment-time">${apt.date} ${apt.time}</div>
            </div>
            <div class="appointment-details">
                <span>${apt.contact}</span>
                <span>Deal: $${apt.value || '0'}</span>
            </div>
        </div>
    `).join('');
}

// ===== REVENUE =====
function toggleRevenueForm() {
    const form = document.getElementById('newRevenueForm');
    form.classList.toggle('hidden');

    if (!form.classList.contains('hidden')) {
        const select = document.getElementById('revenueLeadSelect');
        select.innerHTML = appState.leads.map(l => 
            `<option value="${l.id}">${l.company} - ${l.first_name} ${l.last_name}</option>`
        ).join('');
    }
}

function createRevenue() {
    const leadId = document.getElementById('revenueLeadSelect').value;
    const dealValue = parseFloat(document.getElementById('dealValue').value);
    const commissionPercent = parseFloat(document.getElementById('commissionPercent').value);
    const status = document.getElementById('dealStatus').value;

    if (!leadId || !dealValue || dealValue <= 0) {
        alert('Please enter a valid deal value');
        return;
    }

    const lead = appState.leads.find(l => l.id === leadId);
    if (!lead) return;

    const revenue = {
        id: 'rev_' + Date.now(),
        lead_id: leadId,
        company: lead.company,
        deal_value: dealValue,
        commission_percent: commissionPercent,
        commission_value: (dealValue * commissionPercent / 100).toFixed(2),
        status,
        created_at: new Date().toISOString()
    };

    appState.revenue.push(revenue);
    if (status === 'WON') lead.status = 'WON';

    saveAppState();
    updateDashboard();

    document.getElementById('dealValue').value = '';
    document.getElementById('commissionPercent').value = '15';
    document.getElementById('newRevenueForm').classList.add('hidden');

    renderRevenue();
    alert('✅ Deal recorded!');
}

function renderRevenue() {
    const list = document.getElementById('revenueList');
    const expectedRevenue = appState.revenue
        .filter(r => r.status !== 'LOST')
        .reduce((sum, r) => sum + parseFloat(r.deal_value), 0);
    const wonRevenue = appState.revenue
        .filter(r => r.status === 'WON')
        .reduce((sum, r) => sum + parseFloat(r.deal_value), 0);
    const expectedCommission = appState.revenue
        .filter(r => r.status !== 'LOST')
        .reduce((sum, r) => sum + parseFloat(r.commission_value), 0);

    document.getElementById('expectedRevenue').textContent = '$' + expectedRevenue.toFixed(0);
    document.getElementById('wonRevenue').textContent = '$' + wonRevenue.toFixed(0);
    document.getElementById('expectedCommission').textContent = '$' + expectedCommission.toFixed(0);

    if (appState.revenue.length === 0) {
        list.innerHTML = '<p class="empty-state">No revenue records yet.</p>';
        return;
    }

    list.innerHTML = appState.revenue.map(rev => `
        <div class="revenue-item">
            <div class="revenue-item-header">
                <div class="revenue-item-company">${rev.company}</div>
                <div class="revenue-item-status ${rev.status.toLowerCase()}">
                    ${rev.status}
                </div>
            </div>
            <div class="revenue-item-details">
                <span>Deal: $${parseFloat(rev.deal_value).toFixed(0)}</span>
                <span>Commission: $${rev.commission_value}</span>
            </div>
        </div>
    `).join('');
}