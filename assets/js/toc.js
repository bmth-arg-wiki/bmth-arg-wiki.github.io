document.addEventListener('DOMContentLoaded', function () {
    const tocList = document.getElementById('toc-list');
    const headings = document.querySelectorAll('h2, h3'); // Select h2 and h3 headings

    headings.forEach(heading => {
        const level = heading.tagName.toLowerCase() === 'h2' ? 2 : 3;
        let id = heading.id || heading.textContent.trim().replace(/\s+/g, '-').toLowerCase();
        if (!heading.id) {
            heading.id = id; // Add an ID to the heading if it doesn't have one
        }

        const listItem = document.createElement('li');
        listItem.classList.add(`toc-level-${level}`);

        const anchor = document.createElement('a');
        anchor.href = `#${id}`;
        anchor.textContent = heading.textContent.trim().slice(0, -2);

        listItem.appendChild(anchor);
        tocList.appendChild(listItem);
    });
});