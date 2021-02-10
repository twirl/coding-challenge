export const index = {
    reports: () => `Reports`,
    items: {
        id: (id) => `ID: ${id}`,
        state: (state) => `State: ${state}`,
        details: () => `<a href="#">Details</a>`,
        type: (type) => `Type: ${type}`,
        message: (message) => `Message: ${message || '<strong>N/A</strong>'}`
    },
    blocked: () => `Blocked`,
    actions: {
        block: () => `Block`,
        resolve: () => `Resolve`
    }
};
