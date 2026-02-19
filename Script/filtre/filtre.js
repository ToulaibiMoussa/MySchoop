export function initFilters(allProducts, renderCallback) {
    const searchInput = document.querySelector('.search input');
    const checkboxes = document.querySelectorAll('.filtres input[type="checkbox"]');
    const priceRange = document.getElementById('myRange');
    const orderSelect = document.getElementById('orderSelect');
    const resetBtn = document.getElementById('resetFilters');

    function applyFilters() {
        let filtered = [...allProducts];

        // Search filter
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(p => p.id.toLowerCase().includes(searchTerm));
        }

        // Category filter
        const activeCategories = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.id);

        if (activeCategories.length > 0) {
            filtered = filtered.filter(p => activeCategories.includes(p.categories));
        }

        // Price filter
        const maxPrice = parseInt(priceRange.value);
        filtered = filtered.filter(p => {
            const price = typeof p.prix === 'number' ? p.prix : parseInt(p.prix);
            return price <= maxPrice;
        });

        // Sorting
        const order = orderSelect.value;
        if (order === 'priceAsc') {
            filtered.sort((a, b) => {
                const priceA = typeof a.prix === 'number' ? a.prix : parseInt(a.prix);
                const priceB = typeof b.prix === 'number' ? b.prix : parseInt(b.prix);
                return priceA - priceB;
            });
        } else if (order === 'priceDesc') {
            filtered.sort((a, b) => {
                const priceA = typeof a.prix === 'number' ? a.prix : parseInt(a.prix);
                const priceB = typeof b.prix === 'number' ? b.prix : parseInt(b.prix);
                return priceB - priceA;
            });
        } else if (order === 'nameAsc') {
            filtered.sort((a, b) => a.id.localeCompare(b.id));
        } else if (order === 'nameDesc') {
            filtered.sort((a, b) => b.id.localeCompare(a.id));
        }

        renderCallback(filtered);
    }

    // Event Listeners
    searchInput.addEventListener('input', applyFilters);
    checkboxes.forEach(cb => cb.addEventListener('change', applyFilters));
    priceRange.addEventListener('input', applyFilters);
    orderSelect.addEventListener('change', applyFilters);

    resetBtn.addEventListener('click', () => {
        searchInput.value = '';
        checkboxes.forEach(cb => cb.checked = false);
        priceRange.value = 250;
        document.getElementById('rangeValue').textContent = "250$";
        orderSelect.value = 'default';
        applyFilters();
    });
}
