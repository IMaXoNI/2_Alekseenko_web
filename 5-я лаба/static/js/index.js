
let blocks = [];         
let isEditing = false;   
let nextId = 1;          


function assemblePage() {
    const contentDiv = document.querySelector('#content');
    if (isEditing) {
        contentDiv.innerHTML = blocks.map(block => block.getEditHTML()).join('');
    } else {
        contentDiv.innerHTML = blocks.map(block => block.getViewHTML()).join('');
    }
}


function addBlock(type) {
    const newId = nextId++;
    let newBlock;
    if (type === 'heading') {
        newBlock = new HeadingBlock(newId, 1, "Новый заголовок");
    } else if (type === 'paragraph') {
        newBlock = new ParagraphBlock(newId, "Новый параграф");
    } else if (type === 'list') {
        newBlock = new ListBlock(newId, 'ul', ["Элемент 1", "Элемент 2"]);
    }
    blocks.push(newBlock);
    saveBlocks();
    assemblePage();
}


function updateBlock(id) {
    const block = blocks.find(b => b.id === id);
    if (block.type === 'heading') {
        const level = document.getElementById(`level-${id}`).value;
        const text = document.getElementById(`text-${id}`).value;
        block.level = parseInt(level);
        block.text = text;
    } else if (block.type === 'paragraph') {
        const text = document.getElementById(`text-${id}`).value;
        block.text = text;
    } else if (block.type === 'list') {
        const listType = document.getElementById(`listType-${id}`).value;
        const itemsText = document.getElementById(`items-${id}`).value;
        const items = itemsText.split('\n').map(item => item.trim());
        block.listType = listType;
        block.items = items;
    }
    saveBlocks();
    assemblePage();
}


function removeBlock(id) {
    const index = blocks.findIndex(b => b.id === id);
    if (index !== -1) {
        blocks.splice(index, 1);
        saveBlocks();
        assemblePage();
    }
}


function saveBlocks() {
    const blocksData = blocks.map(block => {
        if (block.type === 'heading') {
            return { id: block.id, type: 'heading', level: block.level, text: block.text };
        } else if (block.type === 'paragraph') {
            return { id: block.id, type: 'paragraph', text: block.text };
        } else if (block.type === 'list') {
            return { id: block.id, type: 'list', listType: block.listType, items: block.items };
        }
    });
    localStorage.setItem('blocks', JSON.stringify(blocksData));
}


function loadBlocks() {
    const blocksData = JSON.parse(localStorage.getItem('blocks'));
    if (blocksData) {
        blocks = blocksData.map(data => {
            if (data.type === 'heading') {
                return new HeadingBlock(data.id, data.level, data.text);
            } else if (data.type === 'paragraph') {
                return new ParagraphBlock(data.id, data.text);
            } else if (data.type === 'list') {
                return new ListBlock(data.id, data.listType, data.items);
            }
        });
        nextId = Math.max(...blocks.map(b => b.id)) + 1;
    } else {
        blocks = [
            new HeadingBlock(1, 1, "Ваше имя"),
            new ParagraphBlock(2, "Краткая информация о себе."),
            new HeadingBlock(3, 2, "Навыки"),
            new ListBlock(4, 'ul', ["Навык 1", "Навык 2", "Навык 3"])
        ];
        nextId = 5;
    }
}

document.getElementById('toggleEdit').addEventListener('click', () => {
    isEditing = !isEditing;
    document.getElementById('addButtons').style.display = isEditing ? 'block' : 'none';
    assemblePage();
});

function init() {
    loadBlocks();
    assemblePage();
}

init();