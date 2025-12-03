// Centralized selectors for better maintainability and consistency
// Use data-testid attributes consistently across the application

export const selectors = {
  // Authentication selectors
  auth: {
    emailInput: '[data-testid="email-input"]',
    passwordInput: '[data-testid="password-input"]',
    confirmPasswordInput: '[data-testid="confirm-password-input"]',
    loginButton: '[data-testid="login-button"]',
    registerButton: '[data-testid="register-button"]',
    logoutButton: '[data-testid="logout-button"]',
    forgotPasswordLink: '[data-testid="forgot-password-link"]',
    rememberMeCheckbox: '[data-testid="remember-me-checkbox"]',
  },

  // Navigation and layout
  navigation: {
    mainMenu: '[data-testid="main-menu"]',
    userMenu: '[data-testid="user-menu"]',
    userAvatar: '[data-testid="user-avatar"]',
    sidebar: '[data-testid="sidebar"]',
    topBar: '[data-testid="top-bar"]',
    breadcrumb: '[data-testid="breadcrumb"]',
  },

  // Dashboard selectors
  dashboard: {
    dashboardContainer: '[data-testid="dashboard-container"]',
    welcomeMessage: '[data-testid="welcome-message"]',
    quickActions: '[data-testid="quick-actions"]',
    recentActivity: '[data-testid="recent-activity"]',
    statsOverview: '[data-testid="stats-overview"]',
  },

  // User management
  users: {
    userList: '[data-testid="user-list"]',
    userListItem: '[data-testid="user-list-item"]',
    createUserButton: '[data-testid="create-user-button"]',
    editUserButton: '[data-testid="edit-user-button"]',
    deleteUserButton: '[data-testid="delete-user-button"]',
    userSearch: '[data-testid="user-search"]',
    userFilter: '[data-testid="user-filter"]',
    userModal: '[data-testid="user-modal"]',
    userForm: '[data-testid="user-form"]',
  },

  // Forms and inputs
  forms: {
    submitButton: '[data-testid="submit-button"]',
    cancelButton: '[data-testid="cancel-button"]',
    saveButton: '[data-testid="save-button"]',
    deleteButton: '[data-testid="delete-button"]',
    editButton: '[data-testid="edit-button"]',
    clearButton: '[data-testid="clear-button"]',
    searchInput: '[data-testid="search-input"]',
    filterDropdown: '[data-testid="filter-dropdown"]',
  },

  // Tables and lists
  table: {
    container: '[data-testid="table-container"]',
    header: '[data-testid="table-header"]',
    row: '[data-testid="table-row"]',
    cell: '[data-testid="table-cell"]',
    pagination: '[data-testid="table-pagination"]',
    nextPageButton: '[data-testid="next-page-button"]',
    prevPageButton: '[data-testid="prev-page-button"]',
    sortButton: '[data-testid="sort-button"]',
  },

  // Loading and error states
  states: {
    loading: '[data-testid="loading"]',
    loadingSpinner: '[data-testid="loading-spinner"]',
    errorMessage: '[data-testid="error-message"]',
    successMessage: '[data-testid="success-message"]',
    warningMessage: '[data-testid="warning-message"]',
    emptyState: '[data-testid="empty-state"]',
  },

  // Modals and overlays
  modal: {
    container: '[data-testid="modal-container"]',
    overlay: '[data-testid="modal-overlay"]',
    closeButton: '[data-testid="modal-close-button"]',
    title: '[data-testid="modal-title"]',
    content: '[data-testid="modal-content"]',
    footer: '[data-testid="modal-footer"]',
  },

  // Common interactive elements
  interactive: {
    button: '[data-testid="button"]',
    link: '[data-testid="link"]',
    dropdown: '[data-testid="dropdown"]',
    tooltip: '[data-testid="tooltip"]',
    tabs: '[data-testid="tabs"]',
    tab: '[data-testid="tab"]',
    accordion: '[data-testid="accordion"]',
    carousel: '[data-testid="carousel"]',
  },

  // File upload/download
  file: {
    uploadInput: '[data-testid="file-upload-input"]',
    uploadButton: '[data-testid="file-upload-button"]',
    downloadLink: '[data-testid="file-download-link"]',
    filePreview: '[data-testid="file-preview"]',
    fileProgress: '[data-testid="file-progress"]',
  },

  // Charts and visualizations
  charts: {
    chartContainer: '[data-testid="chart-container"]',
    chartLegend: '[data-testid="chart-legend"]',
    chartTooltip: '[data-testid="chart-tooltip"]",
    chartExport: '[data-testid="chart-export"]',
  },

  // Notifications
  notifications: {
    container: '[data-testid="notifications-container"]',
    notification: '[data-testid="notification"]',
    notificationClose: '[data-testid="notification-close"]',
    toast: '[data-testid="toast"]',
  },

  // Search functionality
  search: {
    searchInput: '[data-testid="search-input"]',
    searchButton: '[data-testid="search-button"]',
    searchResults: '[data-testid="search-results"]',
    searchSuggestion: '[data-testid="search-suggestion"]',
    clearSearch: '[data-testid="clear-search"]',
  },

  // Date/time inputs
  datetime: {
    dateInput: '[data-testid="date-input"]',
    timeInput: '[data-testid="time-input"]',
    datetimeInput: '[data-testid="datetime-input"]',
    datepicker: '[data-testid="datepicker"]',
    calendar: '[data-testid="calendar"]',
  },

  // Status indicators
  status: {
    online: '[data-testid="status-online"]',
    offline: '[data-testid="status-offline"]',
    busy: '[data-testid="status-busy"]',
    away: '[data-testid="status-away"]',
    active: '[data-testid="status-active"]',
    inactive: '[data-testid="status-inactive"]',
    pending: '[data-testid="status-pending"]',
    completed: '[data-testid="status-completed"]',
  },
};

// Helper functions for dynamic selectors
export const getSelector = (category: keyof typeof selectors, name: string): string => {
  return selectors[category]?.[name as keyof typeof selectors[typeof category]] ||
         `[data-testid="${name}"]`;
};

// Helper for creating data-testid selectors
export const createTestIdSelector = (testId: string): string => {
  return `[data-testid="${testId}"]`;
};

// Helper for dynamic selectors with variables
export const createDynamicSelector = (base: string, value: string): string => {
  return `[data-testid="${base}-${value}"]`;
};

export default selectors;