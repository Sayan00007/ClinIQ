// MedAI Diagnostic Platform JavaScript - Robust Version
(function() {
    'use strict';
    
    console.log('MedAI Platform Starting...');
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
    
    function initApp() {
        console.log('DOM Ready - Initializing App');
        
        // Application state
        let currentUser = null;
        let currentView = 'dashboard';
        let diagnosticSession = {
            patient: null,
            symptoms: [],
            vitals: {},
            images: [],
            results: null
        };

        // Sample data
        const sampleData = {
            patients: [
                {
                    id: "P001",
                    name: "Sarah Johnson",
                    age: 34,
                    gender: "Female",
                    lastVisit: "2025-09-15",
                    conditions: ["Hypertension", "Diabetes Type 2"],
                    riskLevel: "Medium"
                },
                {
                    id: "P002", 
                    name: "Michael Chen",
                    age: 67,
                    gender: "Male",
                    lastVisit: "2025-09-18",
                    conditions: ["COPD", "Atrial Fibrillation"],
                    riskLevel: "High"
                },
                {
                    id: "P003",
                    name: "Emily Rodriguez", 
                    age: 28,
                    gender: "Female",
                    lastVisit: "2025-09-19",
                    conditions: ["Asthma"],
                    riskLevel: "Low"
                }
            ]
        };

        // Initialize login functionality FIRST
        initLogin();
        
        // Initialize other components
        initNavigation();
        initModal();
        initDashboard();
        initPatients();
        initDiagnostics();
        initReports();
        initSettings();
        
        console.log('MedAI Platform Loaded Successfully');

        // === LOGIN FUNCTIONALITY ===
        function initLogin() {
            console.log('Initializing login...');
            
            const loginForm = document.getElementById('login-form');
            const loginScreen = document.getElementById('login-screen');
            const mainApp = document.getElementById('main-app');
            const logoutBtn = document.getElementById('logout-btn');

            if (!loginForm) {
                console.error('Login form not found');
                return;
            }

            // Handle form submission
            loginForm.addEventListener('submit', handleLogin);
            
            // Handle logout
            if (logoutBtn) {
                logoutBtn.addEventListener('click', handleLogout);
            }

            function handleLogin(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Login form submitted');
                
                const clinicId = document.getElementById('clinic-id');
                const username = document.getElementById('username');
                const password = document.getElementById('password');

                if (!clinicId || !username || !password) {
                    console.error('Login fields not found');
                    return;
                }

                const clinicIdValue = clinicId.value.trim();
                const usernameValue = username.value.trim();
                const passwordValue = password.value.trim();

                console.log('Login values:', {
                    clinic: clinicIdValue,
                    user: usernameValue,
                    pass: passwordValue ? '***' : 'empty'
                });

                // Simple validation - just check if fields have content
                if (usernameValue.length > 0 && passwordValue.length > 0) {
                    console.log('Login validation passed');
                    
                    currentUser = {
                        clinicId: clinicIdValue,
                        username: usernameValue,
                        name: 'Dr. Smith'
                    };

                    // Hide login screen
                    if (loginScreen) {
                        loginScreen.classList.add('hidden');
                        console.log('Login screen hidden');
                    }
                    
                    // Show main app
                    if (mainApp) {
                        mainApp.classList.remove('hidden');
                        console.log('Main app shown');
                    }
                    
                    // Switch to dashboard
                    switchView('dashboard');
                    showNotification('Login successful! Welcome to MedAI', 'success');
                    
                } else {
                    console.log('Login validation failed');
                    showNotification('Please enter username and password', 'error');
                }
            }

            function handleLogout(e) {
                e.preventDefault();
                
                currentUser = null;
                diagnosticSession = {
                    patient: null,
                    symptoms: [],
                    vitals: {},
                    images: [],
                    results: null
                };
                
                if (mainApp) mainApp.classList.add('hidden');
                if (loginScreen) loginScreen.classList.remove('hidden');
                
                showNotification('Logged out successfully', 'success');
            }
        }

        // === NAVIGATION ===
        function initNavigation() {
            const navButtons = document.querySelectorAll('.nav-btn');
            
            navButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetView = this.getAttribute('data-view');
                    if (targetView) {
                        switchView(targetView);
                    }
                });
            });
        }

        function switchView(viewName) {
            console.log('Switching to view:', viewName);
            
            // Hide all views
            const allViews = document.querySelectorAll('.view-container');
            allViews.forEach(view => view.classList.add('hidden'));
            
            // Show target view
            const targetView = document.getElementById(viewName + '-view');
            if (targetView) {
                targetView.classList.remove('hidden');
            }
            
            // Update navigation buttons
            const navButtons = document.querySelectorAll('.nav-btn');
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            const activeButton = document.querySelector('[data-view="' + viewName + '"]');
            if (activeButton) {
                activeButton.classList.add('active');
            }
            
            currentView = viewName;
        }

        // === DASHBOARD ===
        function initDashboard() {
            // New Diagnostic button
            document.addEventListener('click', function(e) {
                if (e.target.closest('.dashboard-section .btn--primary')) {
                    e.preventDefault();
                    switchView('diagnostics');
                }
                
                // Case review buttons
                if (e.target.closest('.case-item .btn--primary')) {
                    e.preventDefault();
                    showCaseReview();
                }
                
                // View details buttons
                if (e.target.closest('.case-item .btn--outline')) {
                    e.preventDefault();
                    switchView('patients');
                }
            });
        }

        function showCaseReview() {
            const modal = document.getElementById('app-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body');

            if (modal && modalTitle && modalBody) {
                modalTitle.textContent = 'Case Review - Michael Chen';
                modalBody.innerHTML = `
                    <div class="case-review">
                        <div class="patient-summary">
                            <h4>Patient Information</h4>
                            <p><strong>Name:</strong> Michael Chen (P002)</p>
                            <p><strong>Age:</strong> 67 • <strong>Gender:</strong> Male</p>
                            <p><strong>Study:</strong> Brain MRI Analysis</p>
                        </div>
                        
                        <div class="ai-analysis">
                            <h4>AI Analysis Results</h4>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin: 16px 0;">
                                <span>AI Confidence Score:</span>
                                <span style="font-size: 24px; font-weight: bold; color: var(--color-success);">97.8%</span>
                            </div>
                            
                            <div class="findings">
                                <h5>Key Findings:</h5>
                                <ul>
                                    <li>✅ Normal brain structure</li>
                                    <li>✅ No signs of mass lesions</li>
                                    <li>✅ No evidence of stroke</li>
                                    <li>✅ Unremarkable findings</li>
                                </ul>
                            </div>
                            
                            <div class="recommendations">
                                <h5>Recommendations:</h5>
                                <ul>
                                    <li>Continue current medication regimen</li>
                                    <li>Regular follow-up in 6 months</li>
                                    <li>Monitor COPD symptoms</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div style="margin-top: 24px; display: flex; gap: 12px;">
                            <button class="btn btn--primary" onclick="approveCase()">Approve & Send to EMR</button>
                            <button class="btn btn--outline" onclick="generatePDFReport()">Generate PDF Report</button>
                        </div>
                    </div>
                `;

                modal.classList.remove('hidden');
            }
        }

        // === PATIENTS ===
        function initPatients() {
            document.addEventListener('click', function(e) {
                // Add patient button
                if (e.target.id === 'add-patient-btn') {
                    e.preventDefault();
                    showAddPatientModal();
                }
                
                // Patient card buttons
                const patientCard = e.target.closest('.patient-card');
                if (patientCard) {
                    if (e.target.closest('.btn--outline')) {
                        e.preventDefault();
                        const patientId = patientCard.getAttribute('data-patient-id');
                        showPatientProfile(patientId);
                    }
                    
                    if (e.target.closest('.btn--primary')) {
                        e.preventDefault();
                        const patientId = patientCard.getAttribute('data-patient-id');
                        startDiagnosticForPatient(patientId);
                    }
                }
            });

            // Patient search
            const patientSearch = document.getElementById('patient-search');
            if (patientSearch) {
                patientSearch.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    filterPatients(searchTerm);
                });
            }
        }

        function showAddPatientModal() {
            const modal = document.getElementById('app-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body');

            modalTitle.textContent = 'Add New Patient';
            modalBody.innerHTML = `
                <form class="add-patient-form">
                    <div class="form-group">
                        <label class="form-label">Full Name *</label>
                        <input type="text" class="form-control" required>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="form-group">
                            <label class="form-label">Age *</label>
                            <input type="number" class="form-control" min="1" max="120" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Gender *</label>
                            <select class="form-control" required>
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Medical History</label>
                        <textarea class="form-control" rows="4" placeholder="Enter known conditions, allergies, medications..."></textarea>
                    </div>
                    
                    <div style="margin-top: 24px; display: flex; gap: 12px;">
                        <button type="submit" class="btn btn--primary">Add Patient</button>
                        <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                    </div>
                    
                    <div style="margin-top: 16px; padding: 12px; background: var(--color-bg-1); border-radius: 8px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span>🔒</span>
                            <span style="font-size: 14px;">All patient data is encrypted and HIPAA compliant</span>
                        </div>
                    </div>
                </form>
            `;

            modal.classList.remove('hidden');

            const form = modal.querySelector('.add-patient-form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('Patient added successfully!', 'success');
                closeModal();
            });
        }

        function showPatientProfile(patientId) {
            const patient = sampleData.patients.find(p => p.id === patientId);
            if (!patient) return;

            const modal = document.getElementById('app-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body');

            modalTitle.textContent = 'Patient Profile - ' + patient.name;
            modalBody.innerHTML = `
                <div class="patient-profile">
                    <div class="profile-header" style="margin-bottom: 20px;">
                        <h3>${patient.name} (${patient.id})</h3>
                        <p><strong>Age:</strong> ${patient.age} • <strong>Gender:</strong> ${patient.gender}</p>
                        <p><strong>Last Visit:</strong> ${patient.lastVisit}</p>
                        <span class="status status--${patient.riskLevel.toLowerCase()}">${patient.riskLevel} Risk</span>
                    </div>
                    
                    <div class="medical-history" style="margin-bottom: 20px;">
                        <h4>Medical Conditions</h4>
                        <div class="conditions-list" style="display: flex; gap: 8px; flex-wrap: wrap;">
                            ${patient.conditions.map(condition => 
                                '<span class="status status--info">' + condition + '</span>'
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="recent-diagnostics" style="margin-bottom: 20px;">
                        <h4>Recent Diagnostics</h4>
                        <div class="diagnostic-history">
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: var(--color-bg-1); border-radius: 8px; margin-bottom: 8px;">
                                <span>2025-09-15 - Chest X-Ray</span>
                                <span class="status status--success">Normal</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: var(--color-bg-1); border-radius: 8px;">
                                <span>2025-08-22 - Blood Panel</span>
                                <span class="status status--warning">Follow-up Needed</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn--primary" onclick="startDiagnosticForPatient('${patient.id}')">New Diagnostic</button>
                        <button class="btn btn--outline">Edit Profile</button>
                    </div>
                </div>
            `;

            modal.classList.remove('hidden');
        }

        function filterPatients(searchTerm) {
            const patientCards = document.querySelectorAll('.patient-card');
            
            patientCards.forEach(card => {
                const patientName = card.querySelector('h3').textContent.toLowerCase();
                const patientInfo = card.querySelector('.patient-info').textContent.toLowerCase();
                
                if (patientName.includes(searchTerm) || patientInfo.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function startDiagnosticForPatient(patientId) {
            const patient = sampleData.patients.find(p => p.id === patientId);
            if (patient) {
                diagnosticSession.patient = patient;
                closeModal();
                switchView('diagnostics');
                
                // Pre-select the patient
                const patientSelect = document.getElementById('diagnostic-patient-select');
                if (patientSelect) {
                    patientSelect.value = patientId;
                }
            }
        }

        // === DIAGNOSTICS ===
        function initDiagnostics() {
            document.addEventListener('click', function(e) {
                // Step navigation buttons
                if (e.target.id === 'continue-to-symptoms') {
                    e.preventDefault();
                    const patientSelect = document.getElementById('diagnostic-patient-select');
                    if (patientSelect && patientSelect.value) {
                        showWorkflowStep('symptom-assessment');
                    } else {
                        showNotification('Please select a patient first', 'error');
                    }
                }
                
                if (e.target.id === 'back-to-patient') {
                    e.preventDefault();
                    showWorkflowStep('patient-selection');
                }
                
                if (e.target.id === 'continue-to-images') {
                    e.preventDefault();
                    collectSymptomData();
                    showWorkflowStep('image-upload');
                }
                
                if (e.target.id === 'back-to-symptoms') {
                    e.preventDefault();
                    showWorkflowStep('symptom-assessment');
                }
                
                if (e.target.id === 'analyze-case') {
                    e.preventDefault();
                    showWorkflowStep('analysis-results');
                    startAIAnalysis();
                }
                
                if (e.target.id === 'back-to-images') {
                    e.preventDefault();
                    showWorkflowStep('image-upload');
                }
                
                if (e.target.id === 'generate-report') {
                    e.preventDefault();
                    generateDiagnosticReport();
                }

                // Image upload
                if (e.target.id === 'browse-files') {
                    e.preventDefault();
                    const imageInput = document.getElementById('image-input');
                    if (imageInput) imageInput.click();
                }
            });

            // Image input change
            const imageInput = document.getElementById('image-input');
            if (imageInput) {
                imageInput.addEventListener('change', function(e) {
                    handleFiles(e.target.files);
                });
            }

            // Drag and drop
            const dropZone = document.getElementById('image-drop-zone');
            if (dropZone) {
                dropZone.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.classList.add('dragover');
                });

                dropZone.addEventListener('dragleave', function(e) {
                    e.preventDefault();
                    this.classList.remove('dragover');
                });

                dropZone.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.classList.remove('dragover');
                    handleFiles(e.dataTransfer.files);
                });
            }
        }

        function showWorkflowStep(stepId) {
            console.log('Showing workflow step:', stepId);
            
            const allSteps = document.querySelectorAll('.workflow-step');
            allSteps.forEach(step => step.classList.add('hidden'));
            
            const targetStep = document.getElementById(stepId);
            if (targetStep) {
                targetStep.classList.remove('hidden');
            }
        }

        function collectSymptomData() {
            const checkedSymptoms = document.querySelectorAll('.symptom-options input[type="checkbox"]:checked');
            
            diagnosticSession.symptoms = Array.from(checkedSymptoms).map(checkbox => ({
                name: checkbox.value,
                severity: checkbox.nextElementSibling ? checkbox.nextElementSibling.value : 1
            }));
            
            console.log('Collected symptoms:', diagnosticSession.symptoms);
        }

        function handleFiles(files) {
            const uploadedImagesContainer = document.getElementById('uploaded-images');
            
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const imagePreview = document.createElement('div');
                        imagePreview.className = 'image-preview';
                        imagePreview.innerHTML = `
                            <img src="${e.target.result}" alt="Medical image">
                            <button class="image-remove" onclick="removeImage(this)">×</button>
                        `;
                        
                        uploadedImagesContainer.appendChild(imagePreview);
                        console.log('Image uploaded:', file.name);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        function startAIAnalysis() {
            const loadingDiv = document.getElementById('analysis-loading');
            const completeDiv = document.getElementById('analysis-complete');
            
            if (loadingDiv) loadingDiv.classList.remove('hidden');
            if (completeDiv) completeDiv.classList.add('hidden');
            
            setTimeout(() => {
                if (loadingDiv) loadingDiv.classList.add('hidden');
                if (completeDiv) completeDiv.classList.remove('hidden');
                
                diagnosticSession.results = {
                    condition: "Pneumonia",
                    icd10: "J12.9",
                    confidence: 92,
                    treatment: "Antibiotic therapy, rest, hydration"
                };
                
                console.log('AI analysis complete');
            }, 3500);
        }

        function generateDiagnosticReport() {
            const modal = document.getElementById('app-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body');

            modalTitle.textContent = 'Diagnostic Report Generated';
            modalBody.innerHTML = `
                <div class="report-success">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <div style="font-size: 3em; margin-bottom: 16px;">✅</div>
                        <h3>Report Generated Successfully!</h3>
                        <p>The diagnostic report has been generated and is ready for review.</p>
                    </div>
                    
                    <div class="report-summary">
                        <h4>Report Summary</h4>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px;">
                            <div style="background: var(--color-bg-1); padding: 12px; border-radius: 8px;">
                                <strong>Patient:</strong> ${diagnosticSession.patient ? diagnosticSession.patient.name : 'Unknown'}
                            </div>
                            <div style="background: var(--color-bg-1); padding: 12px; border-radius: 8px;">
                                <strong>Diagnosis:</strong> ${diagnosticSession.results ? diagnosticSession.results.condition : 'Pneumonia'}
                            </div>
                            <div style="background: var(--color-bg-1); padding: 12px; border-radius: 8px;">
                                <strong>Confidence:</strong> ${diagnosticSession.results ? diagnosticSession.results.confidence : 92}%
                            </div>
                            <div style="background: var(--color-bg-1); padding: 12px; border-radius: 8px;">
                                <strong>ICD-10:</strong> ${diagnosticSession.results ? diagnosticSession.results.icd10 : 'J12.9'}
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 12px; justify-content: center;">
                        <button class="btn btn--primary" onclick="sendToEMR()">Send to EMR</button>
                        <button class="btn btn--outline" onclick="exportPDF()">Export PDF</button>
                    </div>
                </div>
            `;

            modal.classList.remove('hidden');
        }

        // === REPORTS ===
        function initReports() {
            document.addEventListener('click', function(e) {
                if (e.target.closest('#reports-view .btn--outline')) {
                    e.preventDefault();
                    viewFullReport();
                }
                
                if (e.target.closest('#reports-view .btn--primary')) {
                    e.preventDefault();
                    exportPDF();
                }
            });
        }

        function viewFullReport() {
            const modal = document.getElementById('app-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body');

            modalTitle.textContent = 'Full Diagnostic Report';
            modalBody.innerHTML = `
                <div class="full-report">
                    <div style="border-bottom: 1px solid var(--color-border); padding-bottom: 16px; margin-bottom: 20px;">
                        <h4>MedAI Diagnostic Report</h4>
                        <p style="color: var(--color-text-secondary);">Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                        <h5>Patient Information</h5>
                        <div style="background: var(--color-bg-1); padding: 16px; border-radius: 8px;">
                            <p><strong>Name:</strong> Sarah Johnson</p>
                            <p><strong>ID:</strong> P001</p>
                            <p><strong>Age:</strong> 34 • <strong>Gender:</strong> Female</p>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                        <h5>AI Analysis Results</h5>
                        <div style="background: var(--color-bg-5); padding: 16px; border-radius: 8px;">
                            <p><strong>Primary Diagnosis:</strong> Pneumonia (J12.9)</p>
                            <p><strong>AI Confidence:</strong> 94.2%</p>
                            <p><strong>Risk Level:</strong> Moderate</p>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <button class="btn btn--primary" onclick="closeModal()">Close Report</button>
                    </div>
                </div>
            `;

            modal.classList.remove('hidden');
        }

        // === SETTINGS ===
        function initSettings() {
            document.addEventListener('change', function(e) {
                if (e.target.closest('.toggle input')) {
                    const label = e.target.closest('.integration-toggle').querySelector('span').textContent;
                    showNotification(label + ' ' + (e.target.checked ? 'enabled' : 'disabled'), 'success');
                }
                
                if (e.target.type === 'range') {
                    const valueDisplay = e.target.nextElementSibling;
                    if (valueDisplay) {
                        valueDisplay.textContent = e.target.value + '%';
                    }
                }
            });

            document.addEventListener('click', function(e) {
                if (e.target.closest('.audit-controls .btn')) {
                    e.preventDefault();
                    const action = e.target.textContent;
                    showNotification(action + ' completed successfully!', 'success');
                }
            });
        }

        // === MODAL ===
        function initModal() {
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('modal-close') || 
                    e.target.classList.contains('modal-backdrop')) {
                    closeModal();
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        }

        function closeModal() {
            const modal = document.getElementById('app-modal');
            if (modal) {
                modal.classList.add('hidden');
            }
        }

        // === UTILITY FUNCTIONS ===
        function showNotification(message, type) {
            const notification = document.createElement('div');
            const bgColor = type === 'error' ? 'var(--color-error)' : 'var(--color-success)';
            
            notification.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: ${bgColor};
                color: white;
                padding: 16px 20px;
                border-radius: 8px;
                box-shadow: var(--shadow-lg);
                z-index: 2000;
                opacity: 0;
                transform: translateY(-20px);
                transition: all 0.3s ease;
                max-width: 300px;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateY(0)';
            }, 100);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }

        // === GLOBAL FUNCTIONS ===
        window.closeModal = closeModal;
        window.approveCase = function() {
            showNotification('Case approved and sent to EMR system!', 'success');
            closeModal();
        };
        window.generatePDFReport = function() {
            showNotification('PDF report generated and downloaded!', 'success');
        };
        window.sendToEMR = function() {
            showNotification('Report sent to EMR system successfully!', 'success');
            closeModal();
        };
        window.exportPDF = function() {
            showNotification('PDF report exported successfully!', 'success');
        };
        window.startDiagnosticForPatient = startDiagnosticForPatient;
        window.removeImage = function(button) {
            const imagePreview = button.parentElement;
            imagePreview.remove();
            console.log('Image removed');
        };
    }
})();