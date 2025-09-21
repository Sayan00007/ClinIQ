// MedAI Platform JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    console.log('MedAI Platform Loading...');
    
    // Initialize all functionality
    initNavigation();
    initFeatureCards();
    initPricingCalculator();
    initDemoFunctionality();
    initModal();
    initCTAButtons();
    initSmoothScrolling();
    
    console.log('MedAI Platform Loaded Successfully');
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Feature cards modal functionality
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    const modal = document.getElementById('feature-modal');
    
    if (!modal) {
        console.error('Modal not found');
        return;
    }
    
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    const featureDetails = {
        'image-analysis': {
            title: 'AI Medical Image Analysis',
            content: `
                <div class="feature-detail">
                    <h4>Advanced AI Image Processing</h4>
                    <p>Our state-of-the-art computer vision algorithms can analyze various medical imaging modalities with unprecedented accuracy:</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
                        <div style="background: var(--color-bg-1); padding: 16px; border-radius: 8px;">
                            <h5>🩻 X-Ray Analysis</h5>
                            <ul>
                                <li>Pneumonia detection: 96.2% accuracy</li>
                                <li>Fracture identification: 94.8% accuracy</li>
                                <li>Cardiac abnormalities: 93.5% accuracy</li>
                            </ul>
                        </div>
                        <div style="background: var(--color-bg-3); padding: 16px; border-radius: 8px;">
                            <h5>🧠 MRI Processing</h5>
                            <ul>
                                <li>Brain tumor detection: 97.1% accuracy</li>
                                <li>Multiple sclerosis: 95.3% accuracy</li>
                                <li>Stroke identification: 94.7% accuracy</li>
                            </ul>
                        </div>
                        <div style="background: var(--color-bg-5); padding: 16px; border-radius: 8px;">
                            <h5>🫁 CT Scan Analysis</h5>
                            <ul>
                                <li>Lung nodule detection: 96.8% accuracy</li>
                                <li>Pulmonary embolism: 95.1% accuracy</li>
                                <li>Abdominal pathology: 93.9% accuracy</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style="margin-top: 24px;">
                        <h4>Key Benefits</h4>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="font-size: 1.5em;">⚡</span>
                                <div>
                                    <strong>Instant Results</strong>
                                    <p style="margin: 0; color: var(--color-text-secondary);">Get AI analysis results in under 30 seconds</p>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="font-size: 1.5em;">🎯</span>
                                <div>
                                    <strong>High Accuracy</strong>
                                    <p style="margin: 0; color: var(--color-text-secondary);">95%+ accuracy across all imaging modalities</p>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="font-size: 1.5em;">🔄</span>
                                <div>
                                    <strong>24/7 Availability</strong>
                                    <p style="margin: 0; color: var(--color-text-secondary);">AI never sleeps - analyze images anytime</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'decision-support': {
            title: 'Clinical Decision Support System',
            content: `
                <div class="feature-detail">
                    <h4>Evidence-Based Clinical Guidance</h4>
                    <p>Our Clinical Decision Support System provides real-time, evidence-based recommendations to enhance diagnostic accuracy and treatment decisions.</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
                        <div style="background: var(--color-bg-2); padding: 16px; border-radius: 8px;">
                            <h5>📊 Risk Assessment</h5>
                            <ul>
                                <li>Cardiovascular risk stratification</li>
                                <li>Sepsis early warning system</li>
                                <li>Fall risk prediction</li>
                            </ul>
                        </div>
                        <div style="background: var(--color-bg-4); padding: 16px; border-radius: 8px;">
                            <h5>💊 Treatment Recommendations</h5>
                            <ul>
                                <li>Drug interaction checking</li>
                                <li>Dosage optimization</li>
                                <li>Alternative therapy suggestions</li>
                            </ul>
                        </div>
                        <div style="background: var(--color-bg-6); padding: 16px; border-radius: 8px;">
                            <h5>📋 Guideline Compliance</h5>
                            <ul>
                                <li>Latest clinical guidelines</li>
                                <li>Protocol adherence checking</li>
                                <li>Quality measure tracking</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-around; margin-top: 24px; text-align: center;">
                        <div>
                            <span style="font-size: 2em; font-weight: bold; color: var(--color-primary);">78%</span>
                            <p style="margin: 4px 0 0 0; color: var(--color-text-secondary);">Reduction in diagnostic errors</p>
                        </div>
                        <div>
                            <span style="font-size: 2em; font-weight: bold; color: var(--color-primary);">45%</span>
                            <p style="margin: 4px 0 0 0; color: var(--color-text-secondary);">Faster treatment decisions</p>
                        </div>
                        <div>
                            <span style="font-size: 2em; font-weight: bold; color: var(--color-primary);">92%</span>
                            <p style="margin: 4px 0 0 0; color: var(--color-text-secondary);">Physician satisfaction</p>
                        </div>
                    </div>
                </div>
            `
        },
        'emr-integration': {
            title: 'EMR/EHR Integration',
            content: `
                <div class="feature-detail">
                    <h4>Seamless Workflow Integration</h4>
                    <p>Connect with over 95% of existing EMR systems through our advanced integration platform.</p>
                    
                    <div style="margin: 20px 0;">
                        <h5>🏥 Major EMR Systems</h5>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
                            <span class="status status--info">Epic</span>
                            <span class="status status--info">Cerner</span>
                            <span class="status status--info">Allscripts</span>
                            <span class="status status--info">athenahealth</span>
                            <span class="status status--info">NextGen</span>
                            <span class="status status--info">eClinicalWorks</span>
                        </div>
                        
                        <h5>🔗 Integration Standards</h5>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
                            <span class="status status--success">FHIR R4</span>
                            <span class="status status--success">HL7 v2.x</span>
                            <span class="status status--success">DICOM</span>
                            <span class="status status--success">REST APIs</span>
                            <span class="status status--success">OAuth 2.0</span>
                        </div>
                    </div>
                    
                    <div style="margin-top: 24px;">
                        <h5>Integration Workflow</h5>
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--color-bg-1); border-radius: 8px;">
                                <span style="background: var(--color-primary); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</span>
                                <div>
                                    <strong>Data Ingestion</strong>
                                    <p style="margin: 0; color: var(--color-text-secondary);">Automatically pull patient data and imaging studies</p>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--color-bg-3); border-radius: 8px;">
                                <span style="background: var(--color-primary); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</span>
                                <div>
                                    <strong>AI Analysis</strong>
                                    <p style="margin: 0; color: var(--color-text-secondary);">Process data through appropriate AI models</p>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--color-bg-5); border-radius: 8px;">
                                <span style="background: var(--color-primary); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</span>
                                <div>
                                    <strong>Results Integration</strong>
                                    <p style="margin: 0; color: var(--color-text-secondary);">Push findings back to EMR as structured data</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'compliance': {
            title: 'Regulatory Compliance & Security',
            content: `
                <div class="feature-detail">
                    <h4>Enterprise-Grade Security & Compliance</h4>
                    <p>Built from the ground up with healthcare compliance and security as core principles.</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 20px 0;">
                        <div style="background: var(--color-bg-1); padding: 16px; border-radius: 8px;">
                            <h5>🛡️ HIPAA Compliance</h5>
                            <ul>
                                <li>End-to-end encryption</li>
                                <li>Audit logging & monitoring</li>
                                <li>Access controls & authentication</li>
                                <li>Business Associate Agreements</li>
                            </ul>
                        </div>
                        
                        <div style="background: var(--color-bg-3); padding: 16px; border-radius: 8px;">
                            <h5>✅ FDA Clearance</h5>
                            <ul>
                                <li>Class II medical device status</li>
                                <li>510(k) clearance for AI algorithms</li>
                                <li>Clinical validation studies</li>
                                <li>Post-market surveillance</li>
                            </ul>
                        </div>
                        
                        <div style="background: var(--color-bg-5); padding: 16px; border-radius: 8px;">
                            <h5>🔒 Security Certifications</h5>
                            <ul>
                                <li>SOC 2 Type II compliant</li>
                                <li>ISO 27001 certified</li>
                                <li>HITRUST CSF validated</li>
                                <li>FedRAMP authorized</li>
                            </ul>
                        </div>
                        
                        <div style="background: var(--color-bg-7); padding: 16px; border-radius: 8px;">
                            <h5>🌍 International Standards</h5>
                            <ul>
                                <li>GDPR compliant (EU)</li>
                                <li>Health Canada approved</li>
                                <li>CE marking (Europe)</li>
                                <li>TGA approved (Australia)</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style="margin-top: 24px;">
                        <h5>Advanced Security Features</h5>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                            <div style="display: flex; align-items: center; gap: 8px; padding: 8px; background: var(--color-secondary); border-radius: 8px;">
                                <span>🔐</span>
                                <span>Zero-trust architecture</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; padding: 8px; background: var(--color-secondary); border-radius: 8px;">
                                <span>🛡️</span>
                                <span>Multi-factor authentication</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; padding: 8px; background: var(--color-secondary); border-radius: 8px;">
                                <span>🔍</span>
                                <span>Continuous monitoring</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; padding: 8px; background: var(--color-secondary); border-radius: 8px;">
                                <span>📊</span>
                                <span>Compliance dashboards</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    };
    
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const featureType = this.getAttribute('data-feature');
            console.log('Feature card clicked:', featureType);
            
            const feature = featureDetails[featureType];
            
            if (feature && modalTitle && modalBody) {
                modalTitle.textContent = feature.title;
                modalBody.innerHTML = feature.content;
                modal.classList.remove('hidden');
                console.log('Modal opened for:', feature.title);
            } else {
                console.error('Feature not found or modal elements missing:', featureType);
            }
        });
    });
}

// Pricing calculator functionality
function initPricingCalculator() {
    const clinicSizeSelect = document.getElementById('clinic-size');
    const pricingModelSelect = document.getElementById('pricing-model');
    const testsPerMonthInput = document.getElementById('tests-per-month');
    const estimatedPrice = document.getElementById('estimated-price');
    const pricePeriod = document.getElementById('price-period');
    const costBreakdown = document.getElementById('cost-breakdown');
    const timeSaved = document.getElementById('time-saved');
    const annualSavings = document.getElementById('annual-savings');
    
    if (!clinicSizeSelect || !pricingModelSelect || !testsPerMonthInput) {
        console.error('Pricing calculator elements not found');
        return;
    }
    
    const pricingData = {
        'per-test': {
            'small': { min: 15, max: 25 },
            'medium': { min: 12, max: 20 },
            'large': { min: 8, max: 15 }
        },
        'monthly': {
            'small': 2500,
            'medium': 8500,
            'large': 25000
        },
        'annual': {
            'small': 25000,
            'medium': 90000,
            'large': 275000
        }
    };
    
    function calculatePricing() {
        const clinicSize = clinicSizeSelect.value;
        const pricingModel = pricingModelSelect.value;
        const testsPerMonth = parseInt(testsPerMonthInput.value) || 0;
        
        console.log('Calculating pricing:', { clinicSize, pricingModel, testsPerMonth });
        
        let price = 0;
        let period = '/month';
        let breakdown = '';
        
        if (pricingModel === 'per-test') {
            const priceRange = pricingData[pricingModel][clinicSize];
            const avgPrice = (priceRange.min + priceRange.max) / 2;
            price = Math.round(avgPrice * testsPerMonth);
            period = '/month';
            breakdown = `
                <div class="breakdown-item">
                    <span>Cost per test</span>
                    <span>₹${avgPrice}</span>
                </div>
                <div class="breakdown-item">
                    <span>Tests per month</span>
                    <span>${testsPerMonth}</span>
                </div>
            `;
        } else if (pricingModel === 'monthly') {
            price = pricingData[pricingModel][clinicSize];
            period = '/month';
            breakdown = `
                <div class="breakdown-item">
                    <span>Monthly subscription</span>
                    <span>₹${price.toLocaleString()}</span>
                </div>
                <div class="breakdown-item">
                    <span>Unlimited tests</span>
                    <span>✓ Included</span>
                </div>
            `;
        } else if (pricingModel === 'annual') {
            const annualPrice = pricingData[pricingModel][clinicSize];
            price = Math.round(annualPrice / 12);
            period = '/month';
            breakdown = `
                <div class="breakdown-item">
                    <span>Annual subscription</span>
                    <span>₹${annualPrice.toLocaleString()}</span>
                </div>
                <div class="breakdown-item">
                    <span>Monthly equivalent</span>
                    <span>₹${price.toLocaleString()}</span>
                </div>
                <div class="breakdown-item">
                    <span>Annual savings</span>
                    <span class="status status--success">15% discount</span>
                </div>
            `;
        }
        
        // Calculate estimated savings
        const baseCostPerTest = 45; // Average traditional cost per diagnostic
        const timeSavedPercent = 70;
        const monthlySavings = testsPerMonth * baseCostPerTest * 0.6; // 60% cost reduction
        const annualSavingsAmount = monthlySavings * 12;
        
        // Update UI
        if (estimatedPrice) estimatedPrice.textContent = `₹${price.toLocaleString()}`;
        if (pricePeriod) pricePeriod.textContent = period;
        if (costBreakdown) costBreakdown.innerHTML = breakdown;
        if (timeSaved) timeSaved.textContent = `${timeSavedPercent}%`;
        if (annualSavings) annualSavings.textContent = `₹${Math.round(annualSavingsAmount).toLocaleString()}`;
        
        console.log('Pricing updated:', price);
    }
    
    // Event listeners
    clinicSizeSelect.addEventListener('change', calculatePricing);
    pricingModelSelect.addEventListener('change', calculatePricing);
    testsPerMonthInput.addEventListener('input', calculatePricing);
    testsPerMonthInput.addEventListener('change', calculatePricing);
    
    // Initial calculation
    calculatePricing();
}

// Demo dashboard functionality
function initDemoFunctionality() {
    const caseTabs = document.querySelectorAll('.case-card');
    
    caseTabs.forEach(caseTab => {
        caseTab.addEventListener('click', function() {
            console.log('Case clicked:', this);
            
            // Remove active class from all cases
            caseTabs.forEach(tab => tab.classList.remove('active'));
            // Add active class to clicked case
            this.classList.add('active');
            
            // Handle buttons within the case
            const generateBtn = this.querySelector('.btn--primary');
            const viewBtn = this.querySelector('.btn--outline');
            
            if (generateBtn && !generateBtn.dataset.hasListener) {
                generateBtn.dataset.hasListener = 'true';
                generateBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    simulateReportGeneration(this);
                });
            }
            
            if (viewBtn && !viewBtn.dataset.hasListener) {
                viewBtn.dataset.hasListener = 'true';
                viewBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    showReportPreview();
                });
            }
        });
    });
}

function simulateReportGeneration(button) {
    const originalText = button.textContent;
    button.textContent = 'Generating...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'View Report';
        button.classList.remove('btn--primary');
        button.classList.add('btn--outline');
        button.disabled = false;
        
        // Update case status
        const caseHeader = button.closest('.case-card').querySelector('.status');
        if (caseHeader) {
            caseHeader.textContent = 'Complete';
            caseHeader.className = 'status status--success';
        }
        
        // Add new event listener for View Report
        button.removeEventListener('click', arguments.callee);
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            showReportPreview();
        });
    }, 2000);
}

function showReportPreview() {
    const modal = document.getElementById('feature-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalTitle || !modalBody) {
        console.error('Modal elements not found');
        return;
    }
    
    modalTitle.textContent = 'Diagnostic Report Preview';
    modalBody.innerHTML = `
        <div class="report-preview">
            <div style="border-bottom: 1px solid var(--color-border); padding-bottom: 16px; margin-bottom: 16px;">
                <h4>AI Diagnostic Report</h4>
                <p style="color: var(--color-text-secondary); margin: 0;">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h5>Patient Information</h5>
                <div style="background: var(--color-bg-1); padding: 16px; border-radius: 8px;">
                    <p><strong>Name:</strong> John D.</p>
                    <p><strong>Age:</strong> 45 years</p>
                    <p><strong>Gender:</strong> Male</p>
                    <p style="margin: 0;"><strong>Study ID:</strong> CXR-2024-001</p>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h5>AI Analysis Results</h5>
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <span>AI Confidence Score:</span>
                    <span class="status status--success">94.2%</span>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <h6>Key Findings:</h6>
                    <ul style="list-style: none; padding: 0;">
                        <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span style="color: green;">✅</span>
                            <span>No evidence of acute pneumonia</span>
                        </li>
                        <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span style="color: green;">✅</span>
                            <span>Normal cardiac silhouette</span>
                        </li>
                        <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span style="color: green;">✅</span>
                            <span>Clear lung fields bilaterally</span>
                        </li>
                        <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span style="color: green;">✅</span>
                            <span>No pleural effusion detected</span>
                        </li>
                    </ul>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <h6>Recommendations:</h6>
                    <ul>
                        <li>Continue routine monitoring</li>
                        <li>No immediate follow-up required</li>
                        <li>Consider annual screening chest X-ray</li>
                    </ul>
                </div>
            </div>
            
            <div style="border-top: 1px solid var(--color-border); padding-top: 16px;">
                <p style="font-style: italic; color: var(--color-text-secondary); font-size: 0.9em; margin-bottom: 16px;">This report was generated using AI-powered diagnostic tools. Please review in conjunction with clinical findings and patient history.</p>
                <div style="display: flex; gap: 12px;">
                    <button class="btn btn--primary">Download PDF</button>
                    <button class="btn btn--outline">Send to EMR</button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('feature-modal');
    if (!modal) {
        console.error('Modal not found');
        return;
    }
    
    const modalClose = document.querySelector('.modal-close');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    function closeModal() {
        modal.classList.add('hidden');
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// CTA button functionality
function initCTAButtons() {
    // Find all CTA buttons
    const ctaButtons = document.querySelectorAll('button');
    
    ctaButtons.forEach(button => {
        const buttonText = button.textContent.trim();
        if (buttonText.includes('Schedule Demo') || 
            buttonText.includes('Contact Sales') ||
            buttonText.includes('Start Free Trial') ||
            buttonText.includes('Watch Demo')) {
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('CTA button clicked:', buttonText);
                showContactModal();
            });
        }
    });
}

function showContactModal() {
    const modal = document.getElementById('feature-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalTitle || !modalBody) {
        console.error('Modal elements not found for contact form');
        return;
    }
    
    modalTitle.textContent = 'Schedule a Demo';
    modalBody.innerHTML = `
        <div class="contact-form">
            <p>Ready to see MedAI in action? Schedule a personalized demo with our team.</p>
            
            <form class="demo-form">
                <div class="form-group">
                    <label class="form-label">Name *</label>
                    <input type="text" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Email *</label>
                    <input type="email" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Organization *</label>
                    <input type="text" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Role *</label>
                    <select class="form-control" required>
                        <option value="">Select your role</option>
                        <option value="physician">Physician</option>
                        <option value="administrator">Administrator</option>
                        <option value="it-director">IT Director</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Clinic Size</label>
                    <select class="form-control">
                        <option value="">Select clinic size</option>
                        <option value="small">Small (1-5 providers)</option>
                        <option value="medium">Medium (6-20 providers)</option>
                        <option value="large">Large (20+ providers)</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Message</label>
                    <textarea class="form-control" rows="4" placeholder="Tell us about your diagnostic needs..."></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn--primary btn--full-width">Schedule Demo</button>
                </div>
            </form>
            
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--color-border);">
                <p><strong>Or contact us directly:</strong></p>
                <p>📧 sales@medai-platform.com</p>
                <p>📞 1-800-MEDAI-AI</p>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    
    // Handle form submission
    const form = modal.querySelector('.demo-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Demo form submitted');
            
            // Show success message
            modalTitle.textContent = 'Demo Scheduled!';
            modalBody.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 3em; margin-bottom: 16px;">✅</div>
                    <h4>Demo Scheduled!</h4>
                    <p>Thank you for your interest in MedAI. Our team will contact you within 24 hours to schedule your personalized demo.</p>
                    <p>In the meantime, feel free to explore our platform features and pricing calculator.</p>
                    <button class="btn btn--primary" onclick="document.getElementById('feature-modal').classList.add('hidden')">Close</button>
                </div>
            `;
        });
    }
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    // Add smooth scrolling to all internal links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}