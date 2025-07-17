/**
 * 🗄️ Database Simulation - Gestion des données locales (EMAIL MODIFIÉ)
 */

class DatabaseManager {
    constructor() {
        this.initializeDatabase();
    }

    /**
     * Initialise la base de données avec des données par défaut
     */
    initializeDatabase() {
        // Clients par défaut
        if (!localStorage.getItem('clients')) {
            const defaultClients = [
                {
                    id: 'client_1',
                    name: 'TechCorp SARL',
                    email: 'contact@techcorp.fr',
                    phone: '+33 1 23 45 67 89',
                    address: '10 Avenue des Champs\n75008 Paris',
                    sector: 'e-commerce',
                    createdAt: '2024-01-15'
                },
                {
                    id: 'client_2',
                    name: 'Design Studio',
                    email: 'hello@designstudio.fr',
                    phone: '+33 1 98 76 54 32',
                    address: '25 Rue de la Créativité\n69000 Lyon',
                    sector: 'service',
                    createdAt: '2024-02-10'
                },
                {
                    id: 'client_3',
                    name: 'Association EcoVert',
                    email: 'info@ecovert.org',
                    phone: '+33 4 56 78 90 12',
                    address: '5 Place de l\'Environnement\n13000 Marseille',
                    sector: 'association',
                    createdAt: '2024-02-20'
                }
            ];
            localStorage.setItem('clients', JSON.stringify(defaultClients));
        }

        // Devis d'exemple avec abonnements
        if (!localStorage.getItem('quotes')) {
            const defaultQuotes = [
                {
                    id: 'quote_1',
                    quoteNumber: 'DEV20240315-001',
                    clientId: 'client_1',
                    client: {
                        id: 'client_1',
                        name: 'TechCorp SARL',
                        email: 'contact@techcorp.fr'
                    },
                    services: [
                        {
                            id: 'site-vitrine',
                            name: 'Site vitrine responsive',
                            description: 'Création complète d\'un site vitrine adaptatif avec 5-8 pages',
                            price: 1800,
                            duration: 10,
                            isRecurring: false,
                            recurringType: null
                        },
                        {
                            id: 'maintenance-mensuelle',
                            name: 'Maintenance mensuelle',
                            description: 'Support technique et mises à jour mensuelles',
                            price: 150,
                            duration: 0,
                            isRecurring: true,
                            recurringType: 'monthly'
                        }
                    ],
                    subtotalHT: 1800,
                    vatAmount: 360,
                    totalTTC: 2160,
                    recurringSubtotalHT: 150,
                    recurringVatAmount: 30,
                    recurringTotalTTC: 180,
                    status: 'pending',
                    createdAt: '2024-03-15',
                    validityDays: 30,
                    deliveryDelay: 10,
                    customDeliveryDelay: false
                },
                {
                    id: 'quote_2',
                    quoteNumber: 'DEV20240310-002',
                    clientId: 'client_2',
                    client: {
                        id: 'client_2',
                        name: 'Design Studio',
                        email: 'hello@designstudio.fr'
                    },
                    services: [
                        {
                            id: 'landing-page',
                            name: 'Landing page optimisée',
                            description: 'Page d\'atterrissage optimisée pour la conversion',
                            price: 720,
                            duration: 5,
                            isRecurring: false,
                            recurringType: null
                        }
                    ],
                    subtotalHT: 720,
                    vatAmount: 144,
                    totalTTC: 864,
                    recurringSubtotalHT: 0,
                    recurringVatAmount: 0,
                    recurringTotalTTC: 0,
                    status: 'accepted',
                    createdAt: '2024-03-10',
                    validityDays: 30,
                    deliveryDelay: 5,
                    customDeliveryDelay: false
                }
            ];
            localStorage.setItem('quotes', JSON.stringify(defaultQuotes));
        }

        // Paramètres par défaut (EMAIL MODIFIÉ)
        if (!localStorage.getItem('settings')) {
            const defaultSettings = {
                company: {
                    name: 'IAassiste',
                    address: '123 Rue de la Tech\n75001 Paris, France',
                    email: 'iaassiste@gmail.com', // 📧 EMAIL MODIFIÉ
                    phone: '+33 1 23 45 67 89',
                    siret: '12345678901234',
                    tva: 'FR12345678901'
                },
                defaults: {
                    validityDays: 30,
                    vatRate: 0.20,
                    paymentTerms: '30j'
                }
            };
            localStorage.setItem('settings', JSON.stringify(defaultSettings));
        }
    }

    getClients() {
        return JSON.parse(localStorage.getItem('clients') || '[]');
    }

    addClient(clientData) {
        const clients = this.getClients();
        const newClient = {
            id: 'client_' + Date.now(),
            ...clientData,
            createdAt: new Date().toISOString()
        };
        clients.push(newClient);
        localStorage.setItem('clients', JSON.stringify(clients));
        return newClient;
    }

    updateClient(clientId, clientData) {
        const clients = this.getClients();
        const index = clients.findIndex(c => c.id === clientId);
        if (index !== -1) {
            clients[index] = { ...clients[index], ...clientData };
            localStorage.setItem('clients', JSON.stringify(clients));
            return clients[index];
        }
        return null;
    }

    getClientById(clientId) {
        const clients = this.getClients();
        return clients.find(c => c.id === clientId);
    }

    getQuotes() {
        return JSON.parse(localStorage.getItem('quotes') || '[]');
    }

    addQuote(quoteData) {
        const quotes = this.getQuotes();
        const newQuote = {
            id: 'quote_' + Date.now(),
            quoteNumber: this.generateQuoteNumber(),
            ...quoteData,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        quotes.push(newQuote);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        return newQuote;
    }

    updateQuote(quoteId, quoteData) {
        const quotes = this.getQuotes();
        const index = quotes.findIndex(q => q.id === quoteId);
        if (index !== -1) {
            quotes[index] = { ...quotes[index], ...quoteData };
            localStorage.setItem('quotes', JSON.stringify(quotes));
            return quotes[index];
        }
        return null;
    }

    getQuoteById(quoteId) {
        const quotes = this.getQuotes();
        return quotes.find(q => q.id === quoteId);
    }

    updateQuoteStatus(quoteId, status) {
        return this.updateQuote(quoteId, { status: status });
    }

    getStatistics() {
        const quotes = this.getQuotes();
        
        const totalRecurringRevenue = quotes
            .filter(q => q.status === 'accepted')
            .reduce((sum, q) => sum + (q.recurringTotalTTC || 0), 0);
        
        return {
            total: quotes.length,
            pending: quotes.filter(q => q.status === 'pending').length,
            accepted: quotes.filter(q => q.status === 'accepted').length,
            rejected: quotes.filter(q => q.status === 'rejected').length,
            expired: quotes.filter(q => q.status === 'expired').length,
            totalAmount: quotes.reduce((sum, q) => sum + (q.totalTTC || 0), 0),
            pendingAmount: quotes
                .filter(q => q.status === 'pending')
                .reduce((sum, q) => sum + (q.totalTTC || 0), 0),
            acceptedAmount: quotes
                .filter(q => q.status === 'accepted')
                .reduce((sum, q) => sum + (q.totalTTC || 0), 0),
            recurringRevenue: totalRecurringRevenue
        };
    }

    generateQuoteNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        const quotes = this.getQuotes();
        const todayQuotes = quotes.filter(q => 
            q.quoteNumber && q.quoteNumber.includes(`DEV${year}${month}${day}`)
        );
        
        const nextSequence = String(todayQuotes.length + 1).padStart(3, '0');
        
        return `DEV${year}${month}${day}-${nextSequence}`;
    }

    cleanExpiredQuotes() {
        const quotes = this.getQuotes();
        let updated = false;

        quotes.forEach(quote => {
            if (quote.status === 'pending') {
                const createdDate = new Date(quote.createdAt);
                const validityDate = new Date(createdDate);
                validityDate.setDate(validityDate.getDate() + quote.validityDays);
                
                if (validityDate < new Date()) {
                    quote.status = 'expired';
                    updated = true;
                }
            }
        });

        if (updated) {
            localStorage.setItem('quotes', JSON.stringify(quotes));
        }

        return updated;
    }

    exportData() {
        return {
            clients: this.getClients(),
            quotes: this.getQuotes(),
            settings: JSON.parse(localStorage.getItem('settings') || '{}'),
            emailLogs: JSON.parse(localStorage.getItem('emailLogs') || '[]'),
            scheduledReminders: JSON.parse(localStorage.getItem('scheduledReminders') || '[]'),
            exportDate: new Date().toISOString()
        };
    }

    importData(data) {
        try {
            if (data.clients) localStorage.setItem('clients', JSON.stringify(data.clients));
            if (data.quotes) localStorage.setItem('quotes', JSON.stringify(data.quotes));
            if (data.settings) localStorage.setItem('settings', JSON.stringify(data.settings));
            if (data.emailLogs) localStorage.setItem('emailLogs', JSON.stringify(data.emailLogs));
            if (data.scheduledReminders) localStorage.setItem('scheduledReminders', JSON.stringify(data.scheduledReminders));
            
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    resetDatabase() {
        localStorage.removeItem('clients');
        localStorage.removeItem('quotes');
        localStorage.removeItem('settings');
        localStorage.removeItem('emailLogs');
        localStorage.removeItem('scheduledReminders');
        this.initializeDatabase();
    }
}

window.DatabaseManager = DatabaseManager;
/**
 * 🤖 AI Engine - Système d'IA pour suggestion de prestations
 */

class AIEngine {
    constructor() {
        this.serviceDatabase = {
            'creation': [
                {
                    id: 'site-vitrine',
                    name: 'Site vitrine responsive',
                    description: 'Création complète d\'un site vitrine adaptatif avec 5-8 pages',
                    basePrice: 1500,
                    duration: 10,
                    tags: ['responsive', 'vitrine', 'entreprise'],
                    isRecurring: false,
                    recurringType: null
                },
                {
                    id: 'landing-page',
                    name: 'Landing page optimisée',
                    description: 'Page d\'atterrissage optimisée pour la conversion',
                    basePrice: 800,
                    duration: 5,
                    tags: ['conversion', 'marketing', 'startup'],
                    isRecurring: false,
                    recurringType: null
                },
                {
                    id: 'site-ecommerce',
                    name: 'Site e-commerce',
                    description: 'Boutique en ligne complète avec gestion produits',
                    basePrice: 3500,
                    duration: 20,
                    tags: ['ecommerce', 'boutique', 'vente'],
                    isRecurring: false,
                    recurringType: null
                }
            ],
            'integration': [
                {
                    id: 'integration-maquette',
                    name: 'Intégration de maquettes',
                    description: 'Intégration HTML/CSS de maquettes graphiques',
                    basePrice: 600,
                    duration: 4,
                    tags: ['integration', 'maquette', 'html', 'css'],
                    isRecurring: false,
                    recurringType: null
                },
                {
                    id: 'responsive-adaptation',
                    name: 'Adaptation responsive',
                    description: 'Adaptation mobile et tablette d\'un site existant',
                    basePrice: 900,
                    duration: 6,
                    tags: ['responsive', 'mobile', 'adaptation'],
                    isRecurring: false,
                    recurringType: null
                }
            ],
            'optimization': [
                {
                    id: 'seo-technique',
                    name: 'Optimisation SEO technique',
                    description: 'Amélioration des performances et référencement technique',
                    basePrice: 750,
                    duration: 5,
                    tags: ['seo', 'performance', 'optimisation'],
                    isRecurring: false,
                    recurringType: null
                },
                {
                    id: 'accessibilite',
                    name: 'Mise en conformité accessibilité',
                    description: 'Amélioration de l\'accessibilité selon RGAA/WCAG',
                    basePrice: 1200,
                    duration: 8,
                    tags: ['accessibilite', 'rgaa', 'wcag'],
                    isRecurring: false,
                    recurringType: null
                }
            ],
            'subscriptions': [
                {
                    id: 'maintenance-mensuelle',
                    name: 'Maintenance mensuelle',
                    description: 'Support technique et mises à jour mensuelles',
                    basePrice: 150,
                    duration: 0,
                    tags: ['maintenance', 'support', 'mensuel'],
                    isRecurring: true,
                    recurringType: 'monthly'
                },
                {
                    id: 'maintenance-premium',
                    name: 'Maintenance Premium',
                    description: 'Support prioritaire, sauvegardes quotidiennes, monitoring 24/7',
                    basePrice: 350,
                    duration: 0,
                    tags: ['maintenance', 'premium', 'monitoring'],
                    isRecurring: true,
                    recurringType: 'monthly'
                },
                {
                    id: 'hotline-support',
                    name: 'Support Hotline',
                    description: 'Support technique prioritaire et corrections urgentes',
                    basePrice: 500,
                    duration: 0,
                    tags: ['support', 'urgence', 'hotline'],
                    isRecurring: true,
                    recurringType: 'monthly'
                },
                {
                    id: 'content-management',
                    name: 'Gestion de contenu',
                    description: 'Mise à jour mensuelle du contenu et des actualités',
                    basePrice: 200,
                    duration: 0,
                    tags: ['contenu', 'actualisation', 'cms'],
                    isRecurring: true,
                    recurringType: 'monthly'
                },
                {
                    id: 'seo-monitoring',
                    name: 'Suivi SEO mensuel',
                    description: 'Monitoring SEO, rapport mensuel et optimisations',
                    basePrice: 250,
                    duration: 0,
                    tags: ['seo', 'monitoring', 'rapport'],
                    isRecurring: true,
                    recurringType: 'monthly'
                },
                {
                    id: 'analytics-reporting',
                    name: 'Reporting Analytics',
                    description: 'Rapport mensuel détaillé des performances du site',
                    basePrice: 120,
                    duration: 0,
                    tags: ['analytics', 'rapport', 'performance'],
                    isRecurring: true,
                    recurringType: 'monthly'
                }
            ]
        };

        this.clientProfiles = {
            'e-commerce': {
                priority: ['site-ecommerce', 'responsive-adaptation', 'seo-technique', 'maintenance-premium', 'analytics-reporting'],
                multiplier: 1.2
            },
            'service': {
                priority: ['site-vitrine', 'landing-page', 'seo-technique', 'maintenance-mensuelle', 'content-management'],
                multiplier: 1.0
            },
            'startup': {
                priority: ['landing-page', 'site-vitrine', 'maintenance-mensuelle', 'seo-monitoring'],
                multiplier: 0.9
            },
            'association': {
                priority: ['site-vitrine', 'accessibilite', 'maintenance-mensuelle', 'content-management'],
                multiplier: 0.8
            },
            'industrie': {
                priority: ['site-vitrine', 'seo-technique', 'accessibilite', 'maintenance-premium'],
                multiplier: 1.1
            }
        };
    }

    async analyzeClientAndSuggestServices(clientData) {
        await this.simulateAIThinking(2000);

        const sector = clientData.sector || 'service';
        const profile = this.clientProfiles[sector] || this.clientProfiles['service'];
        
        let suggestions = [];

        for (const serviceId of profile.priority) {
            const service = this.findServiceById(serviceId);
            if (service) {
                suggestions.push({
                    ...service,
                    price: Math.round(service.basePrice * profile.multiplier),
                    confidence: this.calculateConfidence(service, clientData),
                    reason: this.generateReason(service, sector)
                });
            }
        }

        const complementaryServices = this.getComplementaryServices(suggestions, sector);
        suggestions = [...suggestions, ...complementaryServices];

        suggestions.sort((a, b) => b.confidence - a.confidence);

        return suggestions.slice(0, 8);
    }

    async simulateAIThinking(delay = 1500) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    findServiceById(serviceId) {
        for (const category of Object.values(this.serviceDatabase)) {
            const service = category.find(s => s.id === serviceId);
            if (service) return service;
        }
        return null;
    }

    calculateConfidence(service, clientData) {
        let confidence = 0.5;

        const sector = clientData.sector || 'service';
        if (service.tags.includes(sector)) {
            confidence += 0.3;
        }

        if (service.isRecurring) {
            if (['e-commerce', 'service'].includes(sector)) {
                confidence += 0.2;
            } else {
                confidence += 0.1;
            }
        }

        const popularServices = ['site-vitrine', 'responsive-adaptation', 'seo-technique', 'maintenance-mensuelle'];
        if (popularServices.includes(service.id)) {
            confidence += 0.2;
        }

        confidence += (Math.random() - 0.5) * 0.2;

        return Math.min(Math.max(confidence, 0), 1);
    }

    generateReason(service, sector) {
        const reasons = {
            'site-vitrine': `Essentiel pour votre présence digitale en tant qu'entreprise du secteur ${sector}`,
            'landing-page': `Idéal pour maximiser vos conversions et campagnes marketing`,
            'site-ecommerce': `Parfait pour développer vos ventes en ligne`,
            'seo-technique': `Crucial pour améliorer votre visibilité sur Google`,
            'accessibilite': `Important pour l'inclusion et la conformité légale`,
            'maintenance-mensuelle': `Indispensable pour maintenir votre site à jour et sécurisé`,
            'maintenance-premium': `Recommandé pour une tranquillité totale et un support prioritaire`,
            'hotline-support': `Essentiel pour une réactivité maximale en cas d'urgence`,
            'content-management': `Parfait pour maintenir votre site dynamique et actuel`,
            'seo-monitoring': `Crucial pour suivre et améliorer votre positionnement`,
            'analytics-reporting': `Indispensable pour mesurer les performances de votre site`
        };

        return reasons[service.id] || `Service recommandé pour votre profil d'entreprise`;
    }

    getComplementaryServices(selectedServices, sector) {
        const complementary = [];
        const selectedIds = selectedServices.map(s => s.id);

        if (selectedIds.includes('site-vitrine') && !selectedIds.includes('maintenance-mensuelle')) {
            const maintenance = this.findServiceById('maintenance-mensuelle');
            if (maintenance) {
                complementary.push({
                    ...maintenance,
                    price: maintenance.basePrice,
                    confidence: 0.8,
                    reason: 'Recommandé pour maintenir votre nouveau site'
                });
            }
        }

        if (selectedIds.includes('site-ecommerce') && !selectedIds.includes('maintenance-premium')) {
            const maintenancePremium = this.findServiceById('maintenance-premium');
            if (maintenancePremium) {
                complementary.push({
                    ...maintenancePremium,
                    price: maintenancePremium.basePrice,
                    confidence: 0.9,
                    reason: 'Essentiel pour la sécurité de votre boutique en ligne'
                });
            }
        }

        if (selectedIds.includes('seo-technique') && !selectedIds.includes('seo-monitoring')) {
            const seoMonitoring = this.findServiceById('seo-monitoring');
            if (seoMonitoring) {
                complementary.push({
                    ...seoMonitoring,
                    price: seoMonitoring.basePrice,
                    confidence: 0.7,
                    reason: 'Complément idéal pour suivre vos optimisations SEO'
                });
            }
        }

        const hasSubscription = selectedServices.some(s => s.isRecurring);
        if (!hasSubscription) {
            const basicMaintenance = this.findServiceById('maintenance-mensuelle');
            if (basicMaintenance && !selectedIds.includes('maintenance-mensuelle')) {
                complementary.push({
                    ...basicMaintenance,
                    price: basicMaintenance.basePrice,
                    confidence: 0.6,
                    reason: 'Recommandé pour tous les sites web'
                });
            }
        }

        return complementary;
    }

    calculateCustomPrice(basePrice, clientData, complexity = 'normal') {
        let multiplier = 1;

        const sector = clientData.sector || 'service';
        const profile = this.clientProfiles[sector];
        if (profile) {
            multiplier *= profile.multiplier;
        }

        const complexityMultipliers = {
            'simple': 0.8,
            'normal': 1.0,
            'complexe': 1.3,
            'expert': 1.6
        };

        multiplier *= complexityMultipliers[complexity] || 1;

        return Math.round(basePrice * multiplier);
    }

    validateCustomService(serviceName, price, duration, isRecurring = false) {
        const validation = {
            isValid: true,
            warnings: [],
            suggestions: {}
        };

        if (!isRecurring) {
            if (price < 100) {
                validation.warnings.push('Prix potentiellement trop bas pour une prestation web');
                validation.suggestions.price = 150;
            }
            if (price > 10000) {
                validation.warnings.push('Prix élevé - considérez décomposer en plusieurs prestations');
            }
        } else {
            if (price < 50) {
                validation.warnings.push('Prix mensuel potentiellement trop bas');
                validation.suggestions.price = 100;
            }
            if (price > 1000) {
                validation.warnings.push('Prix mensuel très élevé - vérifiez la valeur proposée');
            }
        }

        if (!isRecurring) {
            if (duration < 1) {
                validation.warnings.push('Durée minimum recommandée : 1 jour');
                validation.suggestions.duration = 1;
            }
            if (duration > 30) {
                validation.warnings.push('Durée longue - considérez découper le projet');
            }

            const dailyRate = price / duration;
            if (dailyRate < 300) {
                validation.warnings.push(`Taux journalier bas: ${dailyRate.toFixed(0)}€/jour`);
            }
        } else {
            if (duration > 0) {
                validation.warnings.push('Les abonnements n\'ont pas de durée en jours');
                validation.suggestions.duration = 0;
            }
        }

        return validation;
    }
}

window.AIEngine = AIEngine;
/**
 * 📄 PDF Generator - Génération de devis en PDF (EMAIL MODIFIÉ)
 */

class PDFGenerator {
    constructor() {
        this.companyInfo = {
            name: 'IAassiste',
            address: '123 Rue de la Tech\n75001 Paris, France',
            email: 'iaassiste@gmail.com', // 📧 EMAIL MODIFIÉ
            phone: '+33 1 23 45 67 89',
            siret: '12345678901234',
            tva: 'FR12345678901'
        };
    }

    generateQuoteHTML(quoteData) {
        const quoteNumber = this.generateQuoteNumber();
        const validityDate = this.calculateValidityDate(quoteData.validityDays);
        
        const oneTimeServices = quoteData.services.filter(s => !s.isRecurring);
        const recurringServices = quoteData.services.filter(s => s.isRecurring);
        
        return `
            <div id="pdfPreview" class="pdf-content">
                <div class="pdf-header">
                    <div class="pdf-company">
                        <h1>IAassiste</h1>
                        <p>Développement Web & Intégration HTML/CSS</p>
                        <p>${this.companyInfo.address}</p>
                        <p>Email: ${this.companyInfo.email}</p>
                        <p>Tél: ${this.companyInfo.phone}</p>
                        <p>SIRET: ${this.companyInfo.siret}</p>
                        <p>TVA: ${this.companyInfo.tva}</p>
                    </div>
                    <div class="pdf-quote-info">
                        <h2>DEVIS N° ${quoteNumber}</h2>
                        <p><strong>Date:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
                        <p><strong>Validité:</strong> ${validityDate}</p>
                        ${oneTimeServices.length > 0 ? `<p><strong>Délai:</strong> ${quoteData.deliveryDelay} jours</p>` : ''}
                    </div>
                </div>

                <div class="pdf-client">
                    <h3>Client:</h3>
                    <p><strong>${quoteData.client.name}</strong></p>
                    <p>${quoteData.client.email}</p>
                    ${quoteData.client.phone ? `<p>${quoteData.client.phone}</p>` : ''}
                    ${quoteData.client.address ? `<p>${quoteData.client.address}</p>` : ''}
                </div>

                <div class="pdf-project">
                    <h3>Objet du devis:</h3>
                    <p>${quoteData.projectDescription || 'Prestations de développement web'}</p>
                </div>

                ${oneTimeServices.length > 0 ? `
                <div class="pdf-services">
                    <h3>Prestations ponctuelles:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Prestation</th>
                                <th>Description</th>
                                <th>Durée</th>
                                <th>Prix HT</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${oneTimeServices.map(service => `
                                <tr>
                                    <td><strong>${service.name}</strong></td>
                                    <td>${service.description}</td>
                                    <td>${service.duration} jour${service.duration > 1 ? 's' : ''}</td>
                                    <td>${service.price.toFixed(2)} €</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <div class="pdf-total-section">
                        <p>Sous-total prestations ponctuelles HT: <strong>${quoteData.subtotalHT.toFixed(2)} €</strong></p>
                        <p>TVA (20%): <strong>${quoteData.vatAmount.toFixed(2)} €</strong></p>
                        <p style="font-size: 1.1em; color: #667eea;">Total prestations ponctuelles TTC: <strong>${quoteData.totalTTC.toFixed(2)} €</strong></p>
                    </div>
                </div>
                ` : ''}

                ${recurringServices.length > 0 ? `
                <div class="pdf-subscriptions">
                    <h3>Abonnements mensuels:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Description</th>
                                <th>Fréquence</th>
                                <th>Prix mensuel HT</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${recurringServices.map(service => `
                                <tr>
                                    <td><strong>${service.name}</strong></td>
                                    <td>${service.description}</td>
                                    <td>Mensuel</td>
                                    <td>${service.price.toFixed(2)} € /mois</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <div class="pdf-total-section">
                        <p>Sous-total abonnements mensuels HT: <strong>${(quoteData.recurringSubtotalHT || 0).toFixed(2)} € /mois</strong></p>
                        <p>TVA (20%): <strong>${(quoteData.recurringVatAmount || 0).toFixed(2)} € /mois</strong></p>
                        <p style="font-size: 1.1em; color: #28a745;">Total abonnements mensuels TTC: <strong>${(quoteData.recurringTotalTTC || 0).toFixed(2)} € /mois</strong></p>
                    </div>
                </div>
                ` : ''}

                ${oneTimeServices.length > 0 && recurringServices.length > 0 ? `
                <div class="pdf-grand-total">
                    <h3>Récapitulatif global:</h3>
                    <p><strong>Montant initial:</strong> ${quoteData.totalTTC.toFixed(2)} € TTC</p>
                    <p><strong>Puis chaque mois:</strong> ${(quoteData.recurringTotalTTC || 0).toFixed(2)} € TTC</p>
                    <p><em>Montant annuel total (1ère année): ${(quoteData.totalTTC + (quoteData.recurringTotalTTC || 0) * 12).toFixed(2)} € TTC</em></p>
                </div>
                ` : ''}

                <div class="pdf-conditions">
                    <h3>Conditions:</h3>
                    <h4>Modalités de paiement:</h4>
                    <p>${this.getPaymentTermsText(quoteData.paymentTerms)}</p>
                    ${recurringServices.length > 0 ? `
                        <p><strong>Abonnements:</strong> Facturation mensuelle, prélèvement automatique le 1er de chaque mois. 
                        Résiliation possible avec préavis de 30 jours.</p>
                    ` : ''}
                    
                    <h4>Délais et livraison:</h4>
                    ${oneTimeServices.length > 0 ? `
                        <p>Les travaux débuteront dès réception de l'acompte et du cahier des charges validé. 
                        Délai indicatif de réalisation: ${quoteData.deliveryDelay} jours ouvrés.</p>
                    ` : ''}
                    ${recurringServices.length > 0 ? `
                        <p>Les services d'abonnement démarrent dès la signature du contrat et sont facturés mensuellement.</p>
                    ` : ''}
                    
                    ${quoteData.specificConditions ? `
                        <h4>Conditions particulières:</h4>
                        <p>${quoteData.specificConditions}</p>
                    ` : ''}
                    
                    <h4>Conditions générales:</h4>
                    <p><strong>Validité:</strong> Ce devis est valable ${quoteData.validityDays} jours à compter de sa date d'émission.</p>
                    <p><strong>Propriété intellectuelle:</strong> Les développements réalisés deviennent propriété du client après paiement intégral.</p>
                    <p><strong>Garantie:</strong> Les développements sont garantis 3 mois contre tout vice de réalisation.</p>
                    <p><strong>Révisions:</strong> 2 cycles de révisions mineures inclus par prestation ponctuelle.</p>
                    ${recurringServices.length > 0 ? `
                        <p><strong>Services récurrents:</strong> Engagement minimum de 3 mois pour les abonnements. Résiliation possible par courrier recommandé avec préavis de 30 jours.</p>
                    ` : ''}
                    <p><strong>Pénalités de retard:</strong> En cas de retard de paiement, des pénalités de 3 fois le taux d'intérêt légal seront appliquées (art. L.441-10 du Code de commerce).</p>
                    <p><strong>Confidentialité:</strong> IAassiste s'engage à maintenir la confidentialité de toutes les informations échangées.</p>
                    
                    <p style="margin-top: 2rem;"><strong>Pour acceptation:</strong></p>
                    <p>Bon pour accord, lu et approuvé<br>
                    Date: ________________<br>
                    Signature précédée de la mention "Bon pour accord":</p>
                    <div style="height: 80px; border: 1px solid #ccc; margin-top: 10px;"></div>
                </div>
            </div>
        `;
    }

    generateQuoteNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        return `DEV${year}${month}${day}-${random}`;
    }

    calculateValidityDate(validityDays) {
        const date = new Date();
        date.setDate(date.getDate() + validityDays);
        return date.toLocaleDateString('fr-FR');
    }

    getPaymentTermsText(paymentTerms) {
        const terms = {
            '30j': '30% d\'acompte à la commande, solde de 70% à la livraison.',
            '50j': '50% d\'acompte à la commande, solde de 50% à la livraison.',
            'integral': 'Paiement intégral à la commande.',
            'custom': 'Modalités personnalisées selon accord préalable.'
        };

        return terms[paymentTerms] || terms['30j'];
    }

    async generatePDF(quoteData) {
        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const element = document.getElementById('pdfPreview');
            
            if (!element) {
                throw new Error('Élément PDF non trouvé');
            }

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                width: element.scrollWidth,
                height: element.scrollHeight
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            const fileName = `Devis_${this.generateQuoteNumber()}_${quoteData.client.name.replace(/\s+/g, '_')}.pdf`;
            pdf.save(fileName);

            return {
                success: true,
                fileName: fileName
            };

        } catch (error) {
            console.error('Erreur génération PDF:', error);
            throw new Error('Erreur lors de la génération du PDF: ' + error.message);
        }
    }

    prepareEmailData(quoteData) {
        const quoteNumber = this.generateQuoteNumber();
        
        return {
            to: quoteData.client.email,
            subject: `Devis ${quoteNumber} - ${quoteData.client.name}`,
            body: this.generateEmailBody(quoteData, quoteNumber),
            attachments: [{
                filename: `Devis_${quoteNumber}.pdf`,
                content: 'PDF_CONTENT'
            }]
        };
    }

    generateEmailBody(quoteData, quoteNumber) {
        const hasOneTime = quoteData.services.some(s => !s.isRecurring);
        const hasRecurring = quoteData.services.some(s => s.isRecurring);
        
        let bodyText = `Bonjour ${quoteData.client.name},

Suite à notre échange, veuillez trouver ci-joint notre devis n° ${quoteNumber} pour les prestations de développement web.

Récapitulatif:
- Prestations: ${quoteData.services.length} service${quoteData.services.length > 1 ? 's' : ''}`;

        if (hasOneTime) {
            bodyText += `
- Montant initial: ${quoteData.totalTTC.toFixed(2)} € TTC`;
        }

        if (hasRecurring) {
            bodyText += `
- Abonnement mensuel: ${(quoteData.recurringTotalTTC || 0).toFixed(2)} € TTC/mois`;
        }

        if (hasOneTime) {
            bodyText += `
- Délai indicatif: ${quoteData.deliveryDelay} jours`;
        }

        bodyText += `
- Validité: ${quoteData.validityDays} jours

N'hésitez pas à nous contacter pour toute question ou précision.

Cordialement,
L'équipe IAassiste

---
IAassiste - Développement Web
${this.companyInfo.email}
${this.companyInfo.phone}`;

        return bodyText.trim();
    }
}

window.PDFGenerator = PDFGenerator;
/**
 * 📧 Email System - Gestion des emails et relances automatiques (EMAIL MODIFIÉ)
 */

class EmailSystem {
    constructor() {
        this.emailTemplates = {
            quote: {
                subject: 'Devis {quoteNumber} - {clientName}',
                body: `Bonjour {clientName},

Suite à notre échange, veuillez trouver ci-joint notre devis n° {quoteNumber} pour les prestations de développement web.

Récapitulatif:
- Prestations: {servicesCount} service{servicesPlural}
- Montant total: {totalTTC} € TTC
- Délai indicatif: {deliveryDelay} jours
- Validité: {validityDays} jours

N'hésitez pas à nous contacter pour toute question ou précision.

Cordialement,
L'équipe IAassiste

---
IAassiste - Développement Web
iaassiste@gmail.com
+33 1 23 45 67 89`
            },
            
            reminder1: {
                subject: 'Rappel - Devis {quoteNumber} en attente de validation',
                body: `Bonjour {clientName},

Nous espérons que vous allez bien.

Nous souhaitions faire un point concernant notre devis n° {quoteNumber} envoyé le {sentDate}.

Ce devis d'un montant de {totalTTC} € TTC reste valable jusqu'au {validityDate}.

Avez-vous eu l'occasion de l'examiner ? Souhaitez-vous échanger sur certains points ?

Nous restons à votre disposition pour tout complément d'information.

Cordialement,
L'équipe IAassiste

---
IAassiste - Développement Web
iaassiste@gmail.com
+33 1 23 45 67 89`
            },
            
            reminder2: {
                subject: 'Dernière relance - Devis {quoteNumber} expire bientôt',
                body: `Bonjour {clientName},

Nous vous informons que notre devis n° {quoteNumber} expire dans {daysLeft} jours (le {validityDate}).

Pour rappel:
- Montant: {totalTTC} € TTC
- Prestations: {servicesCount} service{servicesPlural}
- Délai: {deliveryDelay} jours

Si vous souhaitez donner suite à ce projet, merci de nous confirmer votre accord avant l'expiration.

Nous restons bien entendu disponibles pour adapter notre proposition si nécessaire.

Cordialement,
L'équipe IAassiste

---
IAassiste - Développement Web
iaassiste@gmail.com
+33 1 23 45 67 89`
            }
        };

        this.reminderSchedule = [
            { days: 7, template: 'reminder1' },
            { days: 2, template: 'reminder2' }
        ];
    }

    async sendEmail(emailData) {
        try {
            console.log('📧 Envoi email:', emailData);
            
            await new Promise(resolve => setTimeout(resolve, 1500));

            this.logEmailSent(emailData);

            if (emailData.type === 'quote') {
                this.scheduleReminders(emailData);
            }

            return {
                success: true,
                messageId: this.generateMessageId(),
                sentAt: new Date().toISOString()
            };

        } catch (error) {
            console.error('Erreur envoi email:', error);
            throw new Error('Erreur lors de l\'envoi de l\'email');
        }
    }

    generateEmailFromTemplate(templateType, quoteData, options = {}) {
        const template = this.emailTemplates[templateType];
        if (!template) {
            throw new Error(`Template email non trouvé: ${templateType}`);
        }

        const variables = this.prepareTemplateVariables(quoteData, options);
        
        return {
            type: templateType,
            to: quoteData.client.email,
            subject: this.replaceVariables(template.subject, variables),
            body: this.replaceVariables(template.body, variables),
            quoteId: quoteData.id,
            clientId: quoteData.client.id
        };
    }

    prepareTemplateVariables(quoteData, options = {}) {
        const sentDate = options.sentDate || new Date();
        const validityDate = new Date(sentDate);
        validityDate.setDate(validityDate.getDate() + quoteData.validityDays);

        return {
            quoteNumber: quoteData.quoteNumber || this.generateQuoteNumber(),
            clientName: quoteData.client.name,
            servicesCount: quoteData.services.length,
            servicesPlural: quoteData.services.length > 1 ? 's' : '',
            totalTTC: quoteData.totalTTC.toFixed(2),
            deliveryDelay: quoteData.deliveryDelay,
            validityDays: quoteData.validityDays,
            sentDate: sentDate.toLocaleDateString('fr-FR'),
            validityDate: validityDate.toLocaleDateString('fr-FR'),
            daysLeft: options.daysLeft || quoteData.validityDays
        };
    }

    replaceVariables(template, variables) {
        let result = template;
        
        Object.keys(variables).forEach(key => {
            const regex = new RegExp(`{${key}}`, 'g');
            result = result.replace(regex, variables[key]);
        });

        return result;
    }

    scheduleReminders(emailData) {
        const quoteId = emailData.quoteId;
        const sentDate = new Date();

        this.reminderSchedule.forEach(reminder => {
            const reminderDate = new Date(sentDate);
            reminderDate.setDate(reminderDate.getDate() + reminder.days);

            const scheduledReminder = {
                id: this.generateReminderId(),
                quoteId: quoteId,
                type: reminder.template,
                scheduledDate: reminderDate.toISOString(),
                status: 'pending'
            };

            this.saveScheduledReminder(scheduledReminder);

            const delay = reminderDate.getTime() - Date.now();
            if (delay > 0) {
                setTimeout(() => {
                    this.executeScheduledReminder(scheduledReminder);
                }, Math.min(delay, 2147483647));
            }
        });
    }

    async executeScheduledReminder(scheduledReminder) {
        try {
            const quoteData = this.getQuoteData(scheduledReminder.quoteId);
            
            if (!quoteData || quoteData.status !== 'pending') {
                this.cancelScheduledReminder(scheduledReminder.id);
                return;
            }

            const validityDate = new Date(quoteData.sentDate);
            validityDate.setDate(validityDate.getDate() + quoteData.validityDays);
            const daysLeft = Math.ceil((validityDate - new Date()) / (1000 * 60 * 60 * 24));

            if (daysLeft <= 0) {
                this.handleExpiredQuote(quoteData);
                return;
            }

            const reminderEmail = this.generateEmailFromTemplate(
                scheduledReminder.type, 
                quoteData, 
                { daysLeft: daysLeft }
            );

            await this.sendEmail(reminderEmail);

            scheduledReminder.status = 'sent';
            scheduledReminder.sentAt = new Date().toISOString();
            this.updateScheduledReminder(scheduledReminder);

            console.log(`✅ Relance automatique envoyée pour le devis ${quoteData.quoteNumber}`);

        } catch (error) {
            console.error('Erreur lors de l\'exécution de la relance:', error);
            scheduledReminder.status = 'failed';
            scheduledReminder.error = error.message;
            this.updateScheduledReminder(scheduledReminder);
        }
    }

    handleExpiredQuote(quoteData) {
        quoteData.status = 'expired';
        this.updateQuoteStatus(quoteData.id, 'expired');
        console.log(`⏰ Devis ${quoteData.quoteNumber} expiré`);
    }

    cancelRemindersForQuote(quoteId) {
        const scheduledReminders = this.getScheduledRemindersForQuote(quoteId);
        
        scheduledReminders.forEach(reminder => {
            if (reminder.status === 'pending') {
                reminder.status = 'cancelled';
                this.updateScheduledReminder(reminder);
            }
        });

        console.log(`❌ Relances annulées pour le devis ${quoteId}`);
    }

    saveScheduledReminder(reminder) {
        const reminders = this.getStoredReminders();
        reminders.push(reminder);
        localStorage.setItem('scheduledReminders', JSON.stringify(reminders));
    }

    getStoredReminders() {
        const stored = localStorage.getItem('scheduledReminders');
        return stored ? JSON.parse(stored) : [];
    }

    updateScheduledReminder(updatedReminder) {
        const reminders = this.getStoredReminders();
        const index = reminders.findIndex(r => r.id === updatedReminder.id);
        
        if (index !== -1) {
            reminders[index] = updatedReminder;
            localStorage.setItem('scheduledReminders', JSON.stringify(reminders));
        }
    }

    getScheduledRemindersForQuote(quoteId) {
        const reminders = this.getStoredReminders();
        return reminders.filter(r => r.quoteId === quoteId);
    }

    generateMessageId() {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    generateReminderId() {
        return `rem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    generateQuoteNumber() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        return `DEV${year}${month}${day}-${random}`;
    }

    logEmailSent(emailData) {
        const logs = JSON.parse(localStorage.getItem('emailLogs') || '[]');
        logs.push({
            ...emailData,
            sentAt: new Date().toISOString()
        });
        localStorage.setItem('emailLogs', JSON.stringify(logs));
    }

    getEmailLogs() {
        return JSON.parse(localStorage.getItem('emailLogs') || '[]');
    }

    getQuoteData(quoteId) {
        const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        return quotes.find(q => q.id === quoteId);
    }

    updateQuoteStatus(quoteId, status) {
        const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        const quote = quotes.find(q => q.id === quoteId);
        if (quote) {
            quote.status = status;
            localStorage.setItem('quotes', JSON.stringify(quotes));
        }
    }

    cancelScheduledReminder(reminderId) {
        const reminders = this.getStoredReminders();
        const reminder = reminders.find(r => r.id === reminderId);
        if (reminder) {
            reminder.status = 'cancelled';
            this.updateScheduledReminder(reminder);
        }
    }
}

window.EmailSystem = EmailSystem;
/**
 * ⚡ Application principale - Générateur de Devis IAassiste
 */

class QuoteGenerator {
    constructor() {
        this.db = new DatabaseManager();
        this.ai = new AIEngine();
        this.pdfGenerator = new PDFGenerator();
        this.emailSystem = new EmailSystem();

        this.currentStep = 1;
        this.currentQuoteData = {
            client: null,
            services: [],
            subtotalHT: 0,
            vatAmount: 0,
            totalTTC: 0,
            recurringSubtotalHT: 0,
            recurringVatAmount: 0,
            recurringTotalTTC: 0,
            validityDays: 30,
            deliveryDelay: 0,
            customDeliveryDelay: false,
            paymentTerms: '30j',
            projectDescription: '',
            specificConditions: ''
        };

        this.initializeApp();
        this.bindEvents();
        this.loadDashboard();
    }

    initializeApp() {
        this.db.cleanExpiredQuotes();
        this.loadClientSelector();
        console.log('✅ Application IAassiste initialisée');
    }

    bindEvents() {
        document.getElementById('newQuoteBtn').addEventListener('click', () => {
            this.showQuoteForm();
        });

        document.getElementById('backToDashboard').addEventListener('click', () => {
            this.showDashboard();
        });

        document.getElementById('clientSelect').addEventListener('change', (e) => {
            this.handleClientSelection(e.target.value);
        });

        document.getElementById('addNewClient').addEventListener('click', () => {
            this.toggleNewClientForm();
        });

        document.getElementById('prevStep').addEventListener('click', () => {
            this.previousStep();
        });

        document.getElementById('nextStep').addEventListener('click', () => {
            this.nextStep();
        });

        document.getElementById('addCustomService').addEventListener('click', () => {
            this.addCustomService();
        });

        document.getElementById('generateQuote').addEventListener('click', (e) => {
            e.preventDefault();
            this.generateQuote();
        });

        document.getElementById('closePdfModal').addEventListener('click', () => {
            this.closePdfModal();
        });

        document.getElementById('downloadPdf').addEventListener('click', () => {
            this.downloadPdf();
        });

        document.getElementById('sendQuote').addEventListener('click', () => {
            this.sendQuoteByEmail();
        });

        document.getElementById('editQuote').addEventListener('click', () => {
            this.closePdfModal();
        });

        this.bindCalculationEvents();
    }

    bindCalculationEvents() {
        document.getElementById('quoteValidityDays').addEventListener('input', () => {
            this.updateQuoteData();
        });

        document.getElementById('projectDescription').addEventListener('input', () => {
            this.updateQuoteData();
        });

        document.getElementById('paymentTerms').addEventListener('change', () => {
            this.updateQuoteData();
        });

        document.getElementById('specificConditions').addEventListener('input', () => {
            this.updateQuoteData();
        });

        document.getElementById('deliveryDelay').addEventListener('input', (e) => {
            const newDelay = parseInt(e.target.value) || 0;
            this.currentQuoteData.deliveryDelay = newDelay;
            this.currentQuoteData.customDeliveryDelay = true;
        });

        document.getElementById('deliveryDelay').addEventListener('dblclick', () => {
            this.resetDeliveryDelay();
        });
    }

    resetDeliveryDelay() {
        this.currentQuoteData.customDeliveryDelay = false;
        this.calculateTotals();
        
        const deliveryField = document.getElementById('deliveryDelay');
        const originalBg = deliveryField.style.backgroundColor;
        deliveryField.style.backgroundColor = '#e6fffa';
        deliveryField.title = 'Délai recalculé automatiquement (double-clic pour réinitialiser)';
        
        setTimeout(() => {
            deliveryField.style.backgroundColor = originalBg;
        }, 1000);
    }

    showDashboard() {
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('quoteForm').classList.add('hidden');
        this.loadDashboard();
    }

    showQuoteForm() {
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('quoteForm').classList.remove('hidden');
        this.resetForm();
    }

    loadDashboard() {
        const stats = this.db.getStatistics();
        const quotes = this.db.getQuotes();

        document.getElementById('totalQuotes').textContent = stats.total;
        document.getElementById('pendingQuotes').textContent = stats.pending;
        document.getElementById('acceptedQuotes').textContent = stats.accepted;
        
        const totalDisplay = stats.totalAmount.toFixed(0) + '€';
        if (stats.recurringRevenue > 0) {
            document.getElementById('totalAmount').innerHTML = 
                `${totalDisplay}<br><small>+${stats.recurringRevenue.toFixed(0)}€/mois</small>`;
        } else {
            document.getElementById('totalAmount').textContent = totalDisplay;
        }

        this.updateQuotesTable(quotes);
    }

    updateQuotesTable(quotes) {
        const tbody = document.getElementById('quotesTableBody');
        tbody.innerHTML = '';

        quotes.slice(-10).reverse().forEach(quote => {
            const row = document.createElement('tr');
            
            const serviceText = quote.services.length + ' service' + (quote.services.length > 1 ? 's' : '');
            const hasRecurring = quote.services.some(s => s.isRecurring);
            
            row.innerHTML = `
                <td><strong>${quote.quoteNumber}</strong></td>
                <td>${quote.client.name}</td>
                <td>${serviceText}${hasRecurring ? ' <span style="color: #28a745;">📅</span>' : ''}</td>
                <td>
                    ${quote.totalTTC.toFixed(2)} €
                    ${quote.recurringTotalTTC > 0 ? `<br><small>+${quote.recurringTotalTTC.toFixed(2)}€/mois</small>` : ''}
                </td>
                <td><span class="status ${quote.status}">${this.getStatusText(quote.status)}</span></td>
                <td>${new Date(quote.createdAt).toLocaleDateString('fr-FR')}</td>
                <td>
                    <button class="btn-link" onclick="app.viewQuote('${quote.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-link" onclick="app.editQuote('${quote.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    ${quote.status === 'pending' ? `
                        <button class="btn-link" onclick="app.sendReminder('${quote.id}')">
                            <i class="fas fa-bell"></i>
                        </button>
                    ` : ''}
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    getStatusText(status) {
        const statusTexts = {
            pending: 'En attente',
            accepted: 'Accepté',
            rejected: 'Rejeté',
            expired: 'Expiré'
        };
        return statusTexts[status] || status;
    }

    loadClientSelector() {
        const clients = this.db.getClients();
        const select = document.getElementById('clientSelect');
        
        while (select.children.length > 1) {
            select.removeChild(select.lastChild);
        }

        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = client.name;
            select.appendChild(option);
        });
    }

    async handleClientSelection(clientId) {
        if (!clientId) {
            this.currentQuoteData.client = null;
            return;
        }

        const client = this.db.getClientById(clientId);
        if (client) {
            this.currentQuoteData.client = client;
            
            if (this.currentStep === 1) {
                this.prepareAIAnalysis();
            }
        }
    }

    toggleNewClientForm() {
        const form = document.getElementById('newClientForm');
        form.classList.toggle('hidden');
    }

    async prepareAIAnalysis() {
        const thinking = document.getElementById('aiThinking');
        const suggestions = document.getElementById('aiSuggestions');
        
        thinking.classList.remove('hidden');
        suggestions.classList.add('hidden');

        try {
            const suggestedServices = await this.ai.analyzeClientAndSuggestServices(
                this.currentQuoteData.client
            );

            this.displayServiceSuggestions(suggestedServices);
            
            thinking.classList.add('hidden');
            suggestions.classList.remove('hidden');

        } catch (error) {
            console.error('Erreur analyse IA:', error);
            thinking.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erreur lors de l\'analyse IA';
        }
    }

    displayServiceSuggestions(services) {
        const container = document.getElementById('suggestedServices');
        container.innerHTML = '';

        const oneTimeServices = services.filter(s => !s.isRecurring);
        const recurringServices = services.filter(s => s.isRecurring);

        if (oneTimeServices.length > 0) {
            const oneTimeSection = document.createElement('div');
            oneTimeSection.className = 'service-section';
            oneTimeSection.innerHTML = '<h4><i class="fas fa-code"></i> Prestations ponctuelles</h4>';
            
            oneTimeServices.forEach(service => {
                const serviceEl = this.createServiceElement(service);
                oneTimeSection.appendChild(serviceEl);
            });
            
            container.appendChild(oneTimeSection);
        }

        if (recurringServices.length > 0) {
            const recurringSection = document.createElement('div');
            recurringSection.className = 'service-section';
            recurringSection.innerHTML = '<h4><i class="fas fa-calendar-alt"></i> Abonnements mensuels</h4>';
            
            recurringServices.forEach(service => {
                const serviceEl = this.createServiceElement(service);
                recurringSection.appendChild(serviceEl);
            });
            
            container.appendChild(recurringSection);
        }
    }

    createServiceElement(service) {
        const serviceEl = document.createElement('div');
        serviceEl.className = 'service-suggestion';
        serviceEl.dataset.serviceId = service.id;
        
        const priceDisplay = service.isRecurring ? 
            `${service.price} € HT/mois` : 
            `${service.price} € HT`;
            
        const durationDisplay = service.isRecurring ? 
            'Abonnement mensuel' : 
            `${service.duration} jour${service.duration > 1 ? 's' : ''}`;
        
        serviceEl.innerHTML = `
            <h4>
                ${service.name}
                ${service.isRecurring ? '<span class="subscription-badge">📅 Abonnement</span>' : ''}
            </h4>
            <p>${service.description}</p>
            <p><small><strong>Recommandé car:</strong> ${service.reason}</small></p>
            <div class="service-meta">
                <span class="service-price">${priceDisplay}</span>
                <span class="service-duration">${durationDisplay}</span>
                <span class="service-confidence">Confiance: ${Math.round(service.confidence * 100)}%</span>
            </div>
        `;

        serviceEl.addEventListener('click', () => {
            this.toggleServiceSelection(serviceEl, service);
        });

        return serviceEl;
    }

    toggleServiceSelection(element, service) {
        element.classList.toggle('selected');
        
        if (element.classList.contains('selected')) {
            this.addServiceToSelection(service);
        } else {
            this.removeServiceFromSelection(service.id);
        }

        this.updateSelectedServicesList();
        this.calculateTotals();
    }

    addServiceToSelection(service) {
        const exists = this.currentQuoteData.services.find(s => s.id === service.id);
        if (!exists) {
            this.currentQuoteData.services.push({
                id: service.id,
                name: service.name,
                description: service.description,
                price: service.price,
                duration: service.duration,
                isRecurring: service.isRecurring || false,
                recurringType: service.recurringType || null
            });
        }
    }

    removeServiceFromSelection(serviceId) {
        this.currentQuoteData.services = this.currentQuoteData.services.filter(
            s => s.id !== serviceId
        );
    }

    addCustomService() {
        const name = document.getElementById('customServiceName').value.trim();
        const price = parseFloat(document.getElementById('customServicePrice').value);
        const duration = parseInt(document.getElementById('customServiceDays').value);

        if (!name || !price || isNaN(duration)) {
            alert('Veuillez remplir tous les champs du service personnalisé');
            return;
        }

        const isRecurring = duration === 0 || 
            /\b(mensuel|abonnement|subscription|monthly|maintenance)\b/i.test(name);

        const validation = this.ai.validateCustomService(name, price, duration, isRecurring);
        
        if (validation.warnings.length > 0) {
            const proceed = confirm(
                `Avertissements:\n${validation.warnings.join('\n')}\n\nContinuer ?`
            );
            if (!proceed) return;
        }

        const customService = {
            id: 'custom_' + Date.now(),
            name: name,
            description: 'Service personnalisé',
            price: price,
            duration: duration,
            isRecurring: isRecurring,
            recurringType: isRecurring ? 'monthly' : null
        };

        this.addServiceToSelection(customService);
        this.updateSelectedServicesList();
        this.calculateTotals();

        document.getElementById('customServiceName').value = '';
        document.getElementById('customServicePrice').value = '';
        document.getElementById('customServiceDays').value = '';
    }

    updateSelectedServicesList() {
        const container = document.getElementById('selectedServicesList');
        container.innerHTML = '';

        if (this.currentQuoteData.services.length === 0) {
            container.innerHTML = '<p>Aucun service sélectionné</p>';
            return;
        }

        const oneTimeServices = this.currentQuoteData.services.filter(s => !s.isRecurring);
        const recurringServices = this.currentQuoteData.services.filter(s => s.isRecurring);

        if (oneTimeServices.length > 0) {
            const oneTimeSection = document.createElement('div');
            oneTimeSection.className = 'selected-services-section';
            oneTimeSection.innerHTML = '<h4>Prestations ponctuelles</h4>';
            
            oneTimeServices.forEach(service => {
                oneTimeSection.appendChild(this.createSelectedServiceElement(service));
            });
            
            container.appendChild(oneTimeSection);
        }

        if (recurringServices.length > 0) {
            const recurringSection = document.createElement('div');
            recurringSection.className = 'selected-services-section';
            recurringSection.innerHTML = '<h4>Abonnements mensuels</h4>';
            
            recurringServices.forEach(service => {
                recurringSection.appendChild(this.createSelectedServiceElement(service));
            });
            
            container.appendChild(recurringSection);
        }
    }

    createSelectedServiceElement(service) {
        const serviceEl = document.createElement('div');
        serviceEl.className = 'selected-service';
        
        const priceDisplay = service.isRecurring ? 
            `${service.price} € HT/mois` : 
            `${service.price} € HT`;
            
        const durationDisplay = service.isRecurring ? 
            'Mensuel' : 
            `${service.duration} jour${service.duration > 1 ? 's' : ''}`;
        
        serviceEl.innerHTML = `
            <div class="selected-service-info">
                <h4>
                    ${service.name}
                    ${service.isRecurring ? '<span class="subscription-badge">📅</span>' : ''}
                </h4>
                <p>${service.description}</p>
            </div>
            <div class="selected-service-meta">
                <div class="selected-service-price">${priceDisplay}</div>
                <div class="service-duration">${durationDisplay}</div>
            </div>
            <button class="remove-service" onclick="app.removeService('${service.id}')">
                <i class="fas fa-times"></i>
            </button>
        `;

        return serviceEl;
    }

    removeService(serviceId) {
        this.removeServiceFromSelection(serviceId);
        this.updateSelectedServicesList();
        this.calculateTotals();
        
        const suggestionEl = document.querySelector(`[data-service-id="${serviceId}"]`);
        if (suggestionEl) {
            suggestionEl.classList.remove('selected');
        }
    }

    calculateTotals() {
        const oneTimeServices = this.currentQuoteData.services.filter(s => !s.isRecurring);
        const recurringServices = this.currentQuoteData.services.filter(s => s.isRecurring);
        
        const subtotalHT = oneTimeServices.reduce((sum, service) => sum + service.price, 0);
        const vatAmount = subtotalHT * 0.2;
        const totalTTC = subtotalHT + vatAmount;
        
        const recurringSubtotalHT = recurringServices.reduce((sum, service) => sum + service.price, 0);
        const recurringVatAmount = recurringSubtotalHT * 0.2;
        const recurringTotalTTC = recurringSubtotalHT + recurringVatAmount;
        
        let totalDelay = oneTimeServices.reduce((sum, service) => sum + service.duration, 0);
        
        if (!this.currentQuoteData.customDeliveryDelay) {
            this.currentQuoteData.deliveryDelay = totalDelay;
        }

        this.currentQuoteData.subtotalHT = subtotalHT;
        this.currentQuoteData.vatAmount = vatAmount;
        this.currentQuoteData.totalTTC = totalTTC;
        this.currentQuoteData.recurringSubtotalHT = recurringSubtotalHT;
        this.currentQuoteData.recurringVatAmount = recurringVatAmount;
        this.currentQuoteData.recurringTotalTTC = recurringTotalTTC;

        this.updateCalculationDisplay();
    }

    updateCalculationDisplay() {
        document.getElementById('subtotalHT').textContent = 
            this.currentQuoteData.subtotalHT.toFixed(2) + ' €';
        document.getElementById('vatAmount').textContent = 
            this.currentQuoteData.vatAmount.toFixed(2) + ' €';
        document.getElementById('totalTTC').textContent = 
            this.currentQuoteData.totalTTC.toFixed(2) + ' €';
        
        const deliveryField = document.getElementById('deliveryDelay');
        deliveryField.value = this.currentQuoteData.deliveryDelay;
        
        if (this.currentQuoteData.customDeliveryDelay) {
            deliveryField.style.backgroundColor = '#fff3cd';
            deliveryField.title = 'Délai modifié manuellement (double-clic pour réinitialiser)';
        } else {
            deliveryField.style.backgroundColor = '';
            deliveryField.title = 'Délai calculé automatiquement (double-clic pour réinitialiser)';
        }

        this.updateRecurringDisplay();
    }

    updateRecurringDisplay() {
        const recurringServices = this.currentQuoteData.services.filter(s => s.isRecurring);
        
        let recurringSection = document.getElementById('recurringTotals');
        if (!recurringSection && recurringServices.length > 0) {
            recurringSection = document.createElement('div');
            recurringSection.id = 'recurringTotals';
            recurringSection.className = 'summary-section';
            recurringSection.innerHTML = `
                <h3>Abonnements mensuels</h3>
                <div class="price-breakdown">
                    <div class="price-line">
                        <span>Sous-total abonnements HT :</span>
                        <span id="recurringSubtotalHT">0,00 €</span>
                    </div>
                    <div class="price-line">
                        <span>TVA (20%) :</span>
                        <span id="recurringVatAmount">0,00 €</span>
                    </div>
                    <div class="price-line total">
                        <span>Total abonnements TTC/mois :</span>
                        <span id="recurringTotalTTC">0,00 €</span>
                    </div>
                </div>
            `;
            
            const mainSection = document.querySelector('.summary-section');
            if (mainSection && mainSection.nextSibling) {
                mainSection.parentNode.insertBefore(recurringSection, mainSection.nextSibling);
            } else if (mainSection) {
                mainSection.parentNode.appendChild(recurringSection);
            }
        }

        if (recurringSection) {
            if (recurringServices.length > 0) {
                recurringSection.style.display = 'block';
                document.getElementById('recurringSubtotalHT').textContent = 
                    this.currentQuoteData.recurringSubtotalHT.toFixed(2) + ' €';
                document.getElementById('recurringVatAmount').textContent = 
                    this.currentQuoteData.recurringVatAmount.toFixed(2) + ' €';
                document.getElementById('recurringTotalTTC').textContent = 
                    this.currentQuoteData.recurringTotalTTC.toFixed(2) + ' €';
            } else {
                recurringSection.style.display = 'none';
            }
        }
    }

    updateQuoteData() {
        this.currentQuoteData.validityDays = parseInt(
            document.getElementById('quoteValidityDays').value
        );
        this.currentQuoteData.projectDescription = 
            document.getElementById('projectDescription').value;
        this.currentQuoteData.paymentTerms = 
            document.getElementById('paymentTerms').value;
        this.currentQuoteData.specificConditions = 
            document.getElementById('specificConditions').value;
    }

    async nextStep() {
        if (!this.validateCurrentStep()) {
            return;
        }

        if (this.currentStep === 1) {
            await this.saveNewClientIfNeeded();
            
            if (!document.getElementById('aiSuggestions').classList.contains('hidden')) {
                // Déjà fait
            } else {
                await this.prepareAIAnalysis();
            }
        }

        if (this.currentStep === 2) {
            this.calculateTotals();
        }

        this.currentStep++;
        this.updateStepDisplay();
    }

    previousStep() {
        this.currentStep--;
        this.updateStepDisplay();
    }

    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                if (!document.getElementById('clientSelect').value && 
                    document.getElementById('newClientForm').classList.contains('hidden')) {
                    alert('Veuillez sélectionner un client ou en créer un nouveau');
                    return false;
                }
                
                if (!document.getElementById('newClientForm').classList.contains('hidden')) {
                    const name = document.getElementById('clientName').value.trim();
                    const email = document.getElementById('clientEmail').value.trim();
                    
                    if (!name || !email) {
                        alert('Veuillez remplir au minimum le nom et l\'email du client');
                        return false;
                    }
                }
                return true;

            case 2:
                if (this.currentQuoteData.services.length === 0) {
                    alert('Veuillez sélectionner au moins une prestation');
                    return false;
                }
                return true;

            case 3:
                return true;
        }
        return true;
    }

    async saveNewClientIfNeeded() {
        if (!document.getElementById('newClientForm').classList.contains('hidden')) {
            const clientData = {
                name: document.getElementById('clientName').value.trim(),
                email: document.getElementById('clientEmail').value.trim(),
                phone: document.getElementById('clientPhone').value.trim(),
                sector: document.getElementById('clientSector').value,
                address: document.getElementById('clientAddress').value.trim()
            };

            const newClient = this.db.addClient(clientData);
            this.currentQuoteData.client = newClient;
            
            this.loadClientSelector();
            document.getElementById('clientSelect').value = newClient.id;
            document.getElementById('newClientForm').classList.add('hidden');
        }
    }

    updateStepDisplay() {
        document.querySelectorAll('.form-step').forEach((step, index) => {
            if (index + 1 === this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        document.querySelectorAll('.step').forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNumber === this.currentStep) {
                step.classList.add('active');
            } else if (stepNumber < this.currentStep) {
                step.classList.add('completed');
            }
        });

        const prevBtn = document.getElementById('prevStep');
        const nextBtn = document.getElementById('nextStep');
        const generateBtn = document.getElementById('generateQuote');

        prevBtn.disabled = this.currentStep === 1;

        if (this.currentStep === 3) {
            nextBtn.classList.add('hidden');
            generateBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            generateBtn.classList.add('hidden');
        }
    }

    async generateQuote() {
        try {
            if (!this.validateCurrentStep()) {
                return;
            }

            this.updateQuoteData();

            if (!this.currentQuoteData.client || this.currentQuoteData.services.length === 0) {
                alert('Données du devis incomplètes');
                return;
            }

            const quoteHTML = this.pdfGenerator.generateQuoteHTML(this.currentQuoteData);
            document.getElementById('pdfPreview').innerHTML = quoteHTML;
            document.getElementById('pdfModal').classList.remove('hidden');

        } catch (error) {
            console.error('Erreur génération devis:', error);
            alert('Erreur lors de la génération du devis: ' + error.message);
        }
    }

    closePdfModal() {
        document.getElementById('pdfModal').classList.add('hidden');
    }

    async downloadPdf() {
        try {
            const result = await this.pdfGenerator.generatePDF(this.currentQuoteData);
            
            if (result.success) {
                this.saveQuote();
                alert('PDF téléchargé avec succès !');
            }
        } catch (error) {
            console.error('Erreur téléchargement PDF:', error);
            alert('Erreur lors du téléchargement: ' + error.message);
        }
    }

    async sendQuoteByEmail() {
        try {
            const savedQuote = this.saveQuote();
            
            const emailData = this.emailSystem.generateEmailFromTemplate(
                'quote', 
                savedQuote
            );

            const result = await this.emailSystem.sendEmail(emailData);
            
            if (result.success) {
                alert('Devis envoyé avec succès !');
                this.closePdfModal();
                this.showDashboard();
            }

        } catch (error) {
            console.error('Erreur envoi email:', error);
            alert('Erreur lors de l\'envoi: ' + error.message);
        }
    }

    saveQuote() {
        const quoteData = {
            ...this.currentQuoteData,
            sentDate: new Date().toISOString()
        };

        return this.db.addQuote(quoteData);
    }

    resetForm() {
        this.currentStep = 1;
        this.currentQuoteData = {
            client: null,
            services: [],
            subtotalHT: 0,
            vatAmount: 0,
            totalTTC: 0,
            recurringSubtotalHT: 0,
            recurringVatAmount: 0,
            recurringTotalTTC: 0,
            validityDays: 30,
            deliveryDelay: 0,
            customDeliveryDelay: false,
            paymentTerms: '30j',
            projectDescription: '',
            specificConditions: ''
        };

        document.getElementById('clientSelect').value = '';
        document.getElementById('newClientForm').classList.add('hidden');
        document.getElementById('aiSuggestions').classList.add('hidden');
        document.getElementById('selectedServicesList').innerHTML = '<p>Aucun service sélectionné</p>';
        
        const recurringSection = document.getElementById('recurringTotals');
        if (recurringSection) {
            recurringSection.style.display = 'none';
        }
        
        this.updateStepDisplay();
        this.updateCalculationDisplay();
    }

    viewQuote(quoteId) {
        const quote = this.db.getQuoteById(quoteId);
        if (quote) {
            const quoteHTML = this.pdfGenerator.generateQuoteHTML(quote);
            document.getElementById('pdfPreview').innerHTML = quoteHTML;
            document.getElementById('pdfModal').classList.remove('hidden');
        }
    }

    editQuote(quoteId) {
        alert('Fonctionnalité d\'édition à venir');
    }

    async sendReminder(quoteId) {
        try {
            const quote = this.db.getQuoteById(quoteId);
            if (!quote) return;

            const reminderEmail = this.emailSystem.generateEmailFromTemplate(
                'reminder1', 
                quote
            );

            const result = await this.emailSystem.sendEmail(reminderEmail);
            
            if (result.success) {
                alert('Relance envoyée avec succès !');
            }

        } catch (error) {
            console.error('Erreur envoi relance:', error);
            alert('Erreur lors de l\'envoi de la relance');
        }
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new QuoteGenerator();
});
