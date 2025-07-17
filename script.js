/**
 * 🤖 AI Engine - Système d'IA pour suggestion de prestations (MODIFIÉ)
 */

class AIEngine {
    constructor() {
        this.serviceDatabase = {
            // Services web par catégorie (MODIFIÉ)
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
            // NOUVEAU : Services d'abonnement
            'subscriptions': [
                {
                    id: 'maintenance-mensuelle',
                    name: 'Maintenance mensuelle',
                    description: 'Support technique et mises à jour mensuelles',
                    basePrice: 150,
                    duration: 0, // Pas de durée pour les abonnements
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

    /**
     * Analyse le profil client et suggère des prestations (MODIFIÉ)
     */
    async analyzeClientAndSuggestServices(clientData) {
        await this.simulateAIThinking(2000);

        const sector = clientData.sector || 'service';
        const profile = this.clientProfiles[sector] || this.clientProfiles['service'];
        
        let suggestions = [];

        // Récupération des services prioritaires
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

        // Ajout de services complémentaires basés sur l'IA
        const complementaryServices = this.getComplementaryServices(suggestions, sector);
        suggestions = [...suggestions, ...complementaryServices];

        // Tri par confiance décroissante
        suggestions.sort((a, b) => b.confidence - a.confidence);

        // Limitation à 8 suggestions maximum (incluant abonnements)
        return suggestions.slice(0, 8);
    }

    // Reste des méthodes inchangé jusqu'à getComplementaryServices...

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

        // NOUVEAU : Bonus pour les abonnements selon le secteur
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

    /**
     * Trouve des services complémentaires intelligents (MODIFIÉ)
     */
    getComplementaryServices(selectedServices, sector) {
        const complementary = [];
        const selectedIds = selectedServices.map(s => s.id);

        // Logique de complémentarité pour les abonnements
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

        // Si aucun abonnement n'est sélectionné, proposer au moins la maintenance de base
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

    /**
     * Valide et enrichit une prestation personnalisée (MODIFIÉ)
     */
    validateCustomService(serviceName, price, duration, isRecurring = false) {
        const validation = {
            isValid: true,
            warnings: [],
            suggestions: {}
        };

        // Validation du prix
        if (!isRecurring) {
            if (price < 100) {
                validation.warnings.push('Prix potentiellement trop bas pour une prestation web');
                validation.suggestions.price = 150;
            }
            if (price > 10000) {
                validation.warnings.push('Prix élevé - considérez décomposer en plusieurs prestations');
            }
        } else {
            // Validation pour les abonnements
            if (price < 50) {
                validation.warnings.push('Prix mensuel potentiellement trop bas');
                validation.suggestions.price = 100;
            }
            if (price > 1000) {
                validation.warnings.push('Prix mensuel très élevé - vérifiez la valeur proposée');
            }
        }

        // Validation de la durée
        if (!isRecurring) {
            if (duration < 1) {
                validation.warnings.push('Durée minimum recommandée : 1 jour');
                validation.suggestions.duration = 1;
            }
            if (duration > 30) {
                validation.warnings.push('Durée longue - considérez découper le projet');
            }

            // Calcul du taux journalier
            const dailyRate = price / duration;
            if (dailyRate < 300) {
                validation.warnings.push(`Taux journalier bas: ${dailyRate.toFixed(0)}€/jour`);
            }
        } else {
            // Pour les abonnements, la durée doit être 0
            if (duration > 0) {
                validation.warnings.push('Les abonnements n\'ont pas de durée en jours');
                validation.suggestions.duration = 0;
            }
        }

        return validation;
    }
}

window.AIEngine = AIEngine;
