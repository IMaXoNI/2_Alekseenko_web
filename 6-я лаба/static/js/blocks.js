class Block {
    constructor(id, type) {
        this.id = id;       
        this.type = type;   
    }

    getViewHTML() {
        throw new Error("Метод 'getViewHTML()' должен быть реализован.");
    }

    getEditHTML() {
        throw new Error("Метод 'getEditHTML()' должен быть реализован.");
    }
}

class HeadingBlock extends Block {
    constructor(id, level, text) {
        super(id, 'heading');
        this.level = level; 
        this.text = text;   
    }

    getViewHTML() {
        return `<h${this.level}>${this.text}</h${this.level}>`;
    }

    getEditHTML() {
        return `
            <div>
                <select id="level-${this.id}">
                    <option value="1" ${this.level === 1 ? 'selected' : ''}>H1</option>
                    <option value="2" ${this.level === 2 ? 'selected' : ''}>H2</option>
                    <option value="3" ${this.level === 3 ? 'selected' : ''}>H3</option>
                </select>
                <input type="text" id="text-${this.id}" value="${this.text}">
                <button onclick="updateBlock(${this.id})">Обновить</button>
                <button onclick="removeBlock(${this.id})">Удалить</button>
            </div>
        `;
    }
}

class ParagraphBlock extends Block {
    constructor(id, text) {
        super(id, 'paragraph');
        this.text = text; 
    }

    getViewHTML() {
        return `<p>${this.text}</p>`;
    }

    getEditHTML() {
        return `
            <div>
                <textarea id="text-${this.id}">${this.text}</textarea>
                <button onclick="updateBlock(${this.id})">Обновить</button>
                <button onclick="removeBlock(${this.id})">Удалить</button>
            </div>
        `;
    }
}

class ListBlock extends Block {
    constructor(id, listType, items) {
        super(id, 'list');
        this.listType = listType; 
        this.items = items; 
    }

    getViewHTML() {
        const listItems = this.items.map(item => `<li>${item}</li>`).join('');
        return `<${this.listType}>${listItems}</${this.listType}>`;
    }

    getEditHTML() {
        const itemsText = this.items.join('\n');
        return `
            <div>
                <select id="listType-${this.id}">
                    <option value="ul" ${this.listType === 'ul' ? 'selected' : ''}>Ненумерованный список</option>
                    <option value="ol" ${this.listType === 'ol' ? 'selected' : ''}>Нумерованный список</option>
                </select>
                <textarea id="items-${this.id}">${itemsText}</textarea>
                <button onclick="updateBlock(${this.id})">Обновить</button>
                <button onclick="removeBlock(${this.id})">Удалить</button>
            </div>
        `;
    }
}