// ===== VARIÁVEIS GLOBAIS =====
let revenueChart = null;
let trafficChart = null;

// ===== FUNÇÕES DO DASHBOARD =====

// 1. Data atual
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('pt-BR', options);
    }
}

// 2. Gráficos
function initCharts() {
    // Gráfico de Receita (Chart.js)
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx && typeof Chart !== 'undefined') {
        revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Receita (R$)',
                    data: [32000, 28000, 35000, 41000, 38000, 42580, 45000, 48000, 52000, 55000, 58000, 62000],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Gráfico de Tráfego (ApexCharts)
    const trafficElement = document.getElementById('trafficChart');
    if (trafficElement && typeof ApexCharts !== 'undefined') {
        trafficChart = new ApexCharts(trafficElement, {
            series: [35, 25, 20, 12, 8],
            chart: {
                type: 'donut',
                height: 300
            },
            labels: ['Direto', 'Google', 'Redes Sociais', 'Email', 'Referência'],
            colors: ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#ef4444'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        });
        trafficChart.render();
    }
}

// 3. Dados da tabela
function loadTableData() {
    const ordersTable = document.getElementById('ordersTable');
    const topProducts = document.getElementById('topProducts');
    
    if (ordersTable) {
        const orders = [
            { cliente: 'João Silva', data: '15/03/2024', valor: 'R$ 1.250,00', status: 'completed' },
            { cliente: 'Maria Santos', data: '14/03/2024', valor: 'R$ 890,00', status: 'pending' },
            { cliente: 'Pedro Costa', data: '13/03/2024', valor: 'R$ 2.150,00', status: 'completed' },
            { cliente: 'Ana Oliveira', data: '12/03/2024', valor: 'R$ 540,00', status: 'cancelled' },
            { cliente: 'Carlos Souza', data: '11/03/2024', valor: 'R$ 1.780,00', status: 'completed' }
        ];
        
        ordersTable.innerHTML = orders.map(order => `
            <tr>
                <td>${order.cliente}</td>
                <td>${order.data}</td>
                <td>${order.valor}</td>
                <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
                <td class="table-actions">
                    <button class="action-btn"><i class="fas fa-eye"></i></button>
                    <button class="action-btn"><i class="fas fa-edit"></i></button>
                </td>
            </tr>
        `).join('');
    }
    
    if (topProducts) {
        const products = [
            { nome: 'Produto Premium', categoria: 'Eletrônicos', valor: 'R$ 42.580' },
            { nome: 'Serviço Básico', categoria: 'Serviços', valor: 'R$ 28.430' },
            { nome: 'Software Pro', categoria: 'Software', valor: 'R$ 19.750' },
            { nome: 'Assinatura Gold', categoria: 'Assinatura', valor: 'R$ 15.920' }
        ];
        
        topProducts.innerHTML = products.map(product => `
            <div class="product-item">
                <div class="product-icon">
                    <i class="fas fa-box"></i>
                </div>
                <div class="product-info">
                    <h5>${product.nome}</h5>
                    <p>${product.categoria}</p>
                </div>
                <div class="product-stats">
                    <div class="value">${product.valor}</div>
                    <div class="change">+12.5%</div>
                </div>
            </div>
        `).join('');
    }
}

// 4. Atividade recente
function loadActivityFeed() {
    const activityFeed = document.getElementById('activityFeed');
    if (activityFeed) {
        const activities = [
            { icon: 'user-plus', title: 'Novo usuário registrado', desc: 'Maria Silva se cadastrou', time: '2 min atrás' },
            { icon: 'shopping-cart', title: 'Novo pedido realizado', desc: 'Pedido #2845 foi criado', time: '15 min atrás' },
            { icon: 'chart-line', title: 'Meta atingida', desc: 'Meta de vendas do mês', time: '1 hora atrás' },
            { icon: 'bell', title: 'Notificação enviada', desc: 'Promoção especial para clientes', time: '2 horas atrás' }
        ];
        
        activityFeed.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <h5>${activity.title}</h5>
                    <p>${activity.desc}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }
}

// 5. Funções auxiliares
function getStatusText(status) {
    const statusMap = {
        'completed': 'Concluído',
        'pending': 'Pendente',
        'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
}

// 6. Event Listeners
function setupEventListeners() {
    // Menu toggle (mobile)
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Botões de período do gráfico
    document.querySelectorAll('.chart-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-action-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const period = this.dataset.period;
            updateChartPeriod(period);
        });
    });
    
    // Botão de busca
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');
    
    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
        });
    }
    
    if (closeSearch && searchOverlay) {
        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
    }
    
    // Tema
    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.theme-option').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const theme = this.dataset.theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    });
    
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.querySelector(`[data-theme="${savedTheme}"]`)?.classList.add('active');
}

// 7. Atualizar período do gráfico
function updateChartPeriod(period) {
    if (!revenueChart) return;
    
    let data = [];
    let labels = [];
    
    switch(period) {
        case 'month':
            labels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
            data = [8500, 9200, 10200, 11500];
            break;
        case 'quarter':
            labels = ['Jan-Mar', 'Abr-Jun', 'Jul-Set', 'Out-Dez'];
            data = [28500, 32000, 35500, 42000];
            break;
        case 'year':
        default:
            labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
            data = [32000, 28000, 35000, 41000, 38000, 42580, 45000, 48000, 52000, 55000, 58000, 62000];
    }
    
    revenueChart.data.labels = labels;
    revenueChart.data.datasets[0].data = data;
    revenueChart.update();
}

// 8. Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    initCharts();
    loadTableData();
    loadActivityFeed();
    setupEventListeners();
    
    console.log('✅ Dashboard inicializado com sucesso!');
});