document.getElementById('gameButton').addEventListener('click', function() {
    let playerHP = 100;       
    let monsterHP = 100;      
    let playerAttack = 20;    
    let monsterAttack = 15;   
    let potions = 3;          

    alert(`Добро пожаловать в RPG игру!\nВы сражаетесь с монстром.\nВаше здоровье: ${playerHP} HP\nЗдоровье монстра: ${monsterHP} HP\nВаша цель — победить монстра!`);

    while (playerHP > 0 && monsterHP > 0) {
        let action = prompt('Что вы хотите сделать?\nВведите: "атаковать", "защищаться" или "использовать зелье"').toLowerCase().trim();

        if (action === 'атаковать') {
            monsterHP -= playerAttack;
            alert(`Вы атаковали монстра и нанесли ${playerAttack} урона.\nУ монстра осталось ${monsterHP} HP.`);
        } 
        else if (action === 'защищаться') {
            let reducedDamage = Math.ceil(monsterAttack / 2);
            playerHP -= reducedDamage;
            alert(`Вы защищаетесь! Монстр наносит ${reducedDamage} урона вместо ${monsterAttack}.\nУ вас осталось ${playerHP} HP.`);
        } 
        else if (action === 'использовать зелье') {
            if (potions > 0) {
                let usePotion = confirm(`У вас есть ${potions} зелий. Хотите использовать одно, чтобы восстановить 30 HP?`);
                if (usePotion) {
                    playerHP += 30;
                    potions -= 1;
                    alert(`Вы использовали зелье и восстановили 30 HP.\nУ вас теперь ${playerHP} HP и ${potions} зелий.`);
                } else {
                    alert('Вы решили не использовать зелье.');
                }
            } else {
                alert('У вас нет зелий!');
            }
        } 
        else {
            alert('Неверная команда! Используйте "атаковать", "защищаться" или "использовать зелье".');
            continue; 
        }

        if (monsterHP > 0) {
            playerHP -= monsterAttack;
            alert(`Монстр атакует вас и наносит ${monsterAttack} урона.\nУ вас осталось ${playerHP} HP.`);
        }
    }

    if (playerHP <= 0) {
        alert('Вы проиграли! Монстр победил.');
    } else {
        alert('Поздравляем! Вы победили монстра!');
    }
});