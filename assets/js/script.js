// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    this.applyTheme()
    this.setupEventListeners()
  }

  applyTheme() {
    document.documentElement.classList.toggle("dark", this.theme === "dark")
    this.updateThemeIcons()
  }

  updateThemeIcons() {
    const icons = document.querySelectorAll(".theme-icon")
    icons.forEach((icon) => {
      icon.setAttribute("data-lucide", this.theme === "dark" ? "sun" : "moon")
    })
    // Refresh lucide icons
    if (window.lucide) {
      window.lucide.createIcons()
    }
  }

  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark"
    localStorage.setItem("theme", this.theme)
    this.applyTheme()
  }

  setupEventListeners() {
    const themeToggles = document.querySelectorAll(".theme-toggle")
    themeToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => this.toggleTheme())
    })
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.activeSection = "inicio"
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.setupScrollSpy()
  }

  setupEventListeners() {
    // Desktop navigation
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const sectionId = link.getAttribute("data-section")
        this.scrollToSection(sectionId)
      })
    })

    // Mobile navigation
    const mobileNavLinks = document.querySelectorAll(".nav-link-mobile")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const sectionId = link.getAttribute("data-section")
        this.scrollToSection(sectionId)
        this.closeMobileMenu()
      })
    })

    // Mobile menu toggle
    const menuToggle = document.getElementById("menuToggle")
    const mobileNav = document.getElementById("mobileNav")
    const menuIcon = menuToggle.querySelector(".menu-icon")

    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.contains("active")
      if (isOpen) {
        this.closeMobileMenu()
      } else {
        this.openMobileMenu()
      }
    })
  }

  openMobileMenu() {
    const mobileNav = document.getElementById("mobileNav")
    const menuIcon = document.querySelector(".menu-icon")

    mobileNav.classList.add("active")
    menuIcon.setAttribute("data-lucide", "x")

    if (window.lucide) {
      window.lucide.createIcons()
    }
  }

  closeMobileMenu() {
    const mobileNav = document.getElementById("mobileNav")
    const menuIcon = document.querySelector(".menu-icon")

    mobileNav.classList.remove("active")
    menuIcon.setAttribute("data-lucide", "menu")

    if (window.lucide) {
      window.lucide.createIcons()
    }
  }

  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 64 // 4rem
      const elementPosition = element.offsetTop - headerHeight

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  setupScrollSpy() {
    const sections = ["inicio", "sobre-mi", "habilidades", "proyectos", "contacto"]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            this.setActiveSection(sectionId)
          }
        })
      },
      {
        rootMargin: "-20% 0px -70% 0px",
      },
    )

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })
  }

  setActiveSection(sectionId) {
    if (this.activeSection === sectionId) return

    this.activeSection = sectionId

    // Update desktop navigation
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      const linkSection = link.getAttribute("data-section")
      link.classList.toggle("active", linkSection === sectionId)
    })

    // Update mobile navigation
    const mobileNavLinks = document.querySelectorAll(".nav-link-mobile")
    mobileNavLinks.forEach((link) => {
      const linkSection = link.getAttribute("data-section")
      link.classList.toggle("active", linkSection === sectionId)
    })
  }
}

// Contact Form Management
class ContactFormManager {
  constructor() {
    this.init()
  }

  init() {
    const form = document.getElementById("contactForm")
    if (form) {
      form.addEventListener("submit", (e) => this.handleSubmit(e))
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert("¡El servicio de correo actualmente esta en desarrollo!")

    // Reset form
    e.target.reset()
  }
}

// Utility Functions
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 64
    const elementPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons()
  }

  // Initialize managers
  new ThemeManager()
  new NavigationManager()
  new ContactFormManager()

  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerHeight = 64
        const elementPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Set current year in footer
const yearSpan = document.getElementById('year');
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;