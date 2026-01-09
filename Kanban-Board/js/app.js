
// Data structure based on README and Figma
const columns = [
    { id: 'todo', name: 'Todo', color: '#49C4E5', tasks: [
        { id: 1, title: 'Build UI for onboarding', desc: 'Create a smooth entry for new users.', subtasks: ['Design mockups', 'Build React components', 'Add animations'], status: 'Todo' },
        { id: 2, title: 'Build UI for search', desc: 'Allow users to search tasks.', subtasks: ['Logic for filter'], status: 'Todo' }
    ]},
    { id: 'doing', name: 'Doing', color: '#8471F2', tasks: [
        { id: 3, title: 'Design settings page', desc: 'Focus on dark mode toggle.', subtasks: ['Layout design', 'Color palette'], status: 'Doing' }
    ]},
    { id: 'done', name: 'Done', color: '#67E2AE', tasks: [
        { id: 4, title: 'Review competitor apps', desc: 'Market research.', subtasks: ['Check Trello', 'Check Asana'], status: 'Done' }
    ]}
];

function renderBoard() {
    const board = document.getElementById('board');
    board.innerHTML = columns.map(col => `
        <div class="w-[280px] shrink-0">
            <h3 class="flex items-center gap-3 text-[#828FA3] font-bold tracking-[2.4px] uppercase text-xs mb-6">
                <span class="w-4 h-4 rounded-full" style="background-color: ${col.color}"></span> ${col.name} (${col.tasks.length})
            </h3>
            <div id="${col.id}-list" class="column-height space-y-5">
                ${col.tasks.map(task => `
                    <div onclick="openTask(${task.id})" class="bg-white dark:bg-[#2B2C37] p-6 rounded-lg shadow-md cursor-pointer group hover:shadow-lg transition">
                        <h4 class="dark:text-white font-bold group-hover:text-[#635FC7] mb-2">${task.title}</h4>
                        <p class="text-[#828FA3] text-xs font-bold">${task.subtasks.length} subtasks</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('') + `<div class="w-[280px] shrink-0 pt-10"><div class="h-full bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA40] dark:from-[#2B2C3720] dark:to-[#2B2C3710] rounded-lg flex items-center justify-center text-[#828FA3] font-bold text-2xl hover:text-[#635FC7] cursor-pointer transition">+ New Column</div></div>`;

    // Re-init Sortable
    columns.forEach(col => {
        new Sortable(document.getElementById(`${col.id}-list`), { group: 'kanban', animation: 150 });
    });
}

function openTask(id) {
    const task = columns.flatMap(c => c.tasks).find(t => t.id === id);
    document.getElementById('modal-title').innerText = task.title;
    document.getElementById('modal-desc').innerText = task.desc;
    document.getElementById('subtask-count').innerText = `Subtasks (${task.subtasks.length})`;
    document.getElementById('subtask-list').innerHTML = task.subtasks.map(s => `
        <div class="flex items-center gap-3 bg-[#F4F7FD] dark:bg-[#20212C] p-3 rounded hover:bg-[#635FC740] cursor-pointer transition">
            <input type="checkbox" class="accent-[#635FC7]">
            <span class="text-xs font-bold dark:text-white opacity-70">${s}</span>
        </div>
    `).join('');
    document.getElementById('modal-status').value = task.status;
    document.getElementById('task-modal').classList.remove('hidden');
}

function closeModal() { document.getElementById('task-modal').classList.add('hidden'); }

renderBoard();