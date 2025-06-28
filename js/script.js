/**
 * JavaScript principal - Asistente Pre Organizador PEDD
 * Autor: Carlos
 * Fecha: Julio 2024
 */

// Configuración global
const PEDD_CONFIG = {
    version: '1.0.0',
    apiUrl: '', // Para futuras implementaciones
    debug: false,
    animations: {
        duration: 300,
        easing: 'ease-in-out'
    }
};

// Utilidades generales
const Utils = {
    /**
     * Debounce function para optimizar eventos
     */
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Formatear fecha a string legible
     */
    formatDate: function(date) {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },

    /**
     * Validar email
     */
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Mostrar notificación toast
     */
    showToast: function(message, type = 'info') {
        // Crear elemento toast
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        // Agregar al contenedor de toasts
        let toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'position-fixed top-0 end-0 p-3';
            toastContainer.style.zIndex = '1050';
            document.body.appendChild(toastContainer);
        }

        toastContainer.appendChild(toast);

        // Inicializar y mostrar toast
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();

        // Remover del DOM después de que se oculte
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    },

    /**
     * Animar elemento con contador
     */
    animateCounter: function(element, start, end, duration = 2000) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
};

// Gestión del formulario de evaluación PEDD
const PEDDForm = {
    currentStep: 1,
    totalSteps: 4,
    formData: {},

    init: function() {
        this.bindEvents();
        this.loadSavedData();
    },

    bindEvents: function() {
        // Eventos de navegación del formulario
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-step-next]')) {
                this.nextStep();
            }
            if (e.target.matches('[data-step-prev]')) {
                this.prevStep();
            }
            if (e.target.matches('[data-step-submit]')) {
                this.submitForm();
            }
        });

        // Auto-guardado de datos
        document.addEventListener('input', Utils.debounce((e) => {
            if (e.target.matches('.form-control, .form-select')) {
                this.saveFormData();
            }
        }, 500));
    },

    nextStep: function() {
        if (this.validateCurrentStep()) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.showStep(this.currentStep);
                this.updateProgressBar();
                this.saveFormData();
            }
        }
    },

    prevStep: function() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgressBar();
        }
    },

    showStep: function(step) {
        // Ocultar todos los pasos
        document.querySelectorAll('.form-step').forEach(stepEl => {
            stepEl.style.display = 'none';
        });

        // Mostrar paso actual
        const currentStepEl = document.querySelector(`[data-step="${step}"]`);
        if (currentStepEl) {
            currentStepEl.style.display = 'block';
            
            // Animación de entrada
            currentStepEl.style.opacity = '0';
            currentStepEl.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                currentStepEl.style.transition = 'all 0.3s ease-in-out';
                currentStepEl.style.opacity = '1';
                currentStepEl.style.transform = 'translateX(0)';
            }, 10);
        }
    },

    updateProgressBar: function() {
        const progress = (this.currentStep / this.totalSteps) * 100;
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
        }

        // Actualizar indicadores de pasos
        document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
            const stepNumber = index + 1;
            if (stepNumber < this.currentStep) {
                indicator.classList.add('completed');
                indicator.classList.remove('active');
            } else if (stepNumber === this.currentStep) {
                indicator.classList.add('active');
                indicator.classList.remove('completed');
            } else {
                indicator.classList.remove('active', 'completed');
            }
        });
    },

    validateCurrentStep: function() {
        const currentStepEl = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (!currentStepEl) return false;

        const requiredFields = currentStepEl.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
                
                // Validaciones específicas
                if (field.type === 'email' && !Utils.isValidEmail(field.value)) {
                    field.classList.add('is-invalid');
                    isValid = false;
                }
            }
        });

        if (!isValid) {
            Utils.showToast('Por favor, completa todos los campos requeridos.', 'warning');
        }

        return isValid;
    },

    saveFormData: function() {
        const formData = {};
        document.querySelectorAll('.form-control, .form-select').forEach(field => {
            if (field.name) {
                formData[field.name] = field.value;
            }
        });

        this.formData = formData;
        localStorage.setItem('pedd_form_data', JSON.stringify({
            data: formData,
            step: this.currentStep,
            timestamp: new Date().toISOString()
        }));
    },

    loadSavedData: function() {
        const savedData = localStorage.getItem('pedd_form_data');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                this.formData = parsed.data || {};
                this.currentStep = parsed.step || 1;

                // Restaurar valores en el formulario
                Object.keys(this.formData).forEach(fieldName => {
                    const field = document.querySelector(`[name="${fieldName}"]`);
                    if (field) {
                        field.value = this.formData[fieldName];
                    }
                });

                this.showStep(this.currentStep);
                this.updateProgressBar();

                Utils.showToast('Datos anteriores restaurados.', 'info');
            } catch (e) {
                console.error('Error al cargar datos guardados:', e);
            }
        }
    },

    submitForm: function() {
        if (this.validateCurrentStep()) {
            this.saveFormData();
            this.generatePDF();
        }
    },

    generatePDF: function() {
        Utils.showToast('Generando documento PDF...', 'info');
        
        // Simular generación de PDF
        setTimeout(() => {
            const pdfData = this.preparePDFData();
            this.downloadPDF(pdfData);
            Utils.showToast('¡Documento generado exitosamente!', 'success');
        }, 2000);
    },

    preparePDFData: function() {
        return {
            personalInfo: {
                nombre: this.formData.nombre || '',
                apellido: this.formData.apellido || '',
                email: this.formData.email || '',
                institucion: this.formData.institucion || ''
            },
            evaluationData: this.formData,
            generatedAt: new Date().toISOString()
        };
    },

    downloadPDF: function(data) {
        // Por ahora, simular descarga
        console.log('Datos para PDF:', data);
        
        // En una implementación real, aquí se generaría el PDF
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `autoevaluacion_pedd_${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    clearFormData: function() {
        localStorage.removeItem('pedd_form_data');
        this.formData = {};
        this.currentStep = 1;
        document.querySelectorAll('.form-control, .form-select').forEach(field => {
            field.value = '';
        });
        this.showStep(1);
        this.updateProgressBar();
        Utils.showToast('Formulario reiniciado.', 'info');
    }
};

// Gestión de animaciones y efectos visuales
const AnimationManager = {
    init: function() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupParallaxEffects();
    },

    setupScrollAnimations: function() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    // Animar contadores si los hay
                    const counters = entry.target.querySelectorAll('[data-counter]');
                    counters.forEach(counter => {
                        const target = parseInt(counter.dataset.counter);
                        Utils.animateCounter(counter, 0, target);
                    });
                }
            });
        }, observerOptions);

        // Observar elementos con clase animate-on-scroll
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    },

    setupCounterAnimations: function() {
        // Ya incluido en setupScrollAnimations
    },

    setupParallaxEffects: function() {
        window.addEventListener('scroll', Utils.debounce(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 10));
    }
};

// Gestión de la navegación
const Navigation = {
    init: function() {
        this.setupSmoothScroll();
        this.setupActiveNavigation();
        this.setupMobileMenu();
    },

    setupSmoothScroll: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Altura del navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    setupActiveNavigation: function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');

        window.addEventListener('scroll', Utils.debounce(() => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, 10));
    },

    setupMobileMenu: function() {
        // Cerrar menú móvil al hacer clic en un enlace
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }
};

// Gestión de archivos
const FileManager = {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'],

    init: function() {
        this.setupFileUpload();
    },

    setupFileUpload: function() {
        document.querySelectorAll('.file-upload').forEach(uploadArea => {
            const input = uploadArea.querySelector('input[type="file"]');
            
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('drag-over');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                this.handleFiles(files, uploadArea);
            });

            if (input) {
                input.addEventListener('change', (e) => {
                    this.handleFiles(e.target.files, uploadArea);
                });
            }
        });
    },

    handleFiles: function(files, uploadArea) {
        Array.from(files).forEach(file => {
            if (this.validateFile(file)) {
                this.processFile(file, uploadArea);
            }
        });
    },

    validateFile: function(file) {
        // Validar tamaño
        if (file.size > this.maxFileSize) {
            Utils.showToast(`El archivo ${file.name} es demasiado grande. Máximo 10MB.`, 'error');
            return false;
        }

        // Validar tipo
        const extension = file.name.split('.').pop().toLowerCase();
        if (!this.allowedTypes.includes(extension)) {
            Utils.showToast(`Tipo de archivo no permitido: ${extension}`, 'error');
            return false;
        }

        return true;
    },

    processFile: function(file, uploadArea) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <i class="fas fa-file"></i>
                <span class="file-name">${file.name}</span>
                <span class="file-size">(${this.formatFileSize(file.size)})</span>
            </div>
            <div class="file-progress">
                <div class="progress">
                    <div class="progress-bar" style="width: 0%"></div>
                </div>
            </div>
            <button type="button" class="btn btn-sm btn-outline-danger remove-file">
                <i class="fas fa-times"></i>
            </button>
        `;

        const fileList = uploadArea.querySelector('.file-list') || this.createFileList(uploadArea);
        fileList.appendChild(fileItem);

        // Simular upload
        this.simulateUpload(fileItem, file);

        // Evento para remover archivo
        fileItem.querySelector('.remove-file').addEventListener('click', () => {
            fileItem.remove();
        });
    },

    createFileList: function(uploadArea) {
        const fileList = document.createElement('div');
        fileList.className = 'file-list mt-3';
        uploadArea.appendChild(fileList);
        return fileList;
    },

    simulateUpload: function(fileItem, file) {
        const progressBar = fileItem.querySelector('.progress-bar');
        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                fileItem.classList.add('upload-complete');
                Utils.showToast(`Archivo ${file.name} subido exitosamente.`, 'success');
            }
            progressBar.style.width = `${progress}%`;
        }, 200);
    },

    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año en footer
    const yearElements = document.querySelectorAll('#current-year, #footer-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // Inicializar módulos
    Navigation.init();
    AnimationManager.init();
    PEDDForm.init();
    FileManager.init();

    // Log de inicialización
    if (PEDD_CONFIG.debug) {
        console.log('🎓 Asistente PEDD v' + PEDD_CONFIG.version + ' inicializado correctamente');
    }

    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        if (!localStorage.getItem('pedd_welcome_shown')) {
            Utils.showToast('¡Bienvenido al Asistente Pre Organizador PEDD!', 'success');
            localStorage.setItem('pedd_welcome_shown', 'true');
        }
    }, 1000);
});

// Función global para iniciar evaluación (llamada desde HTML)
function startEvaluation() {
    // Aquí se implementaría la lógica para mostrar el formulario de evaluación
    Utils.showToast('¡Funcionalidad en desarrollo! Pronto podrás comenzar tu autoevaluación.', 'info');
    
    // Por ahora, scroll a la sección de evaluación
    const evaluationSection = document.getElementById('evaluacion');
    if (evaluationSection) {
        evaluationSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Exportar para uso global
window.PEDD = {
    Utils,
    PEDDForm,
    AnimationManager,
    Navigation,
    FileManager,
    startEvaluation
};
