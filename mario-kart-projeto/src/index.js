const player1 = {
    nome: "Mário",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
};

const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0
};

const player3 = {
    nome: "Peach",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0
};

async function roolDice() {
    return Math.floor(Math.random() * 6) + 1; 
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch(true) {
        case random < 0.33:
            result = "Reta";
            break;
        
        case random < 0.66:
            result = "Curva";
            break;
        
        default:
            result = "Confronto";
            break;
        }
        
        return result;
    }
    
async function logRollResult(characterName, block, diceResult, atribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${atribute} = ${diceResult + atribute}`);
}

async function playRaceEngine(character1, character2) {
    for(i = 1; i <= 5; i++) {
        console.log(`🏁Rodada ${i}`);

        //Sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco sorteado: ${block}`);

        //Rolar os dados
        let diceResult1 = await roolDice();
        let diceResult2 = await roolDice();

        //Teste de habilidade
        let totalSkillTest1 = 0;
        let totalSkillTest2 = 0;
        
        //Usando estrutura condicional para calcular o resultado da rodada
        if(block === "Reta") {
            totalSkillTest1 = diceResult1 + character1.velocidade;
            totalSkillTest2 = diceResult2 + character2.velocidade;
            await logRollResult(
                character1.nome, 
                "velocidade", 
                diceResult1, 
                character1.velocidade
            );
            await logRollResult(
                character2.nome, 
                "velocidade", 
                diceResult2, 
                character2.velocidade
            );
        }
        else if(block === "Curva") {
            totalSkillTest1 = diceResult1 + character1.manobrabilidade;
            totalSkillTest2 = diceResult2 + character2.manobrabilidade;
            await logRollResult(
                character1.nome, 
                "manobrabilidade", 
                diceResult1, 
                character1.manobrabilidade
            );

            await logRollResult(
                character2.nome, 
                "manobrabilidade", 
                diceResult2, 
                character2.manobrabilidade
            );
        }
        else if(block === "Confronto") {
            let powerResult  = diceResult1 + character1.poder;
            let powerResult2 = diceResult2 + character2.poder;
            
            console.log(`${character1.nome} 🥊 Confrontou com ${character2.nome}`);

            await logRollResult(
                character1.nome, 
                "poder", 
                diceResult1, 
                character1.poder
            );
    
            await logRollResult(
                character2.nome, 
                "poder", 
                diceResult2, 
                character2.poder
            );

            //verificando se o poder é igual ou maior que 1
            if(powerResult > powerResult2 && character2.pontos > 0) {
                character2.pontos --;
                console.log(`${character1.nome} venceu o confronto! ${character2.nome} perdeu um ponto!🐢`);
            }
            else if(powerResult2 > powerResult && character1.pontos > 0) {
                character1.pontos --;
                console.log(`${character2.nome} venceu o confronto! ${character1.nome} perdeu um ponto!🐢`);
            }
            else if(powerResult2 === powerResult) {
                console.log(`Empate no confronto!`);
            }

        }

        //verificando o vencedor
        if(totalSkillTest1 > totalSkillTest2) {
            console.log(`${character1.nome} marcou um ponto!`);
            character1.pontos++;
        }
        else if(totalSkillTest2 > totalSkillTest1) {
            console.log(`${character2.nome} marcou um ponto!`);
            character2.pontos++;
        }


        console.log("---------------------------------------")
    }
}

async function declareWinner(character1, character2) {
    console.log(`🏆🏁 A corrida terminou! 🏁🏆 Resultado:`);
    console.log(`${character1.nome} fez ${character1.pontos} ponto(s)`);
    console.log(`${character2.nome} fez ${character2.pontos} ponto(s)`);

    console.log("---------------------------------------")
    if(character1.pontos > character2.pontos) {
        console.log(`\n🏆 ${character1.nome} é o grande vencedor! 🏆`);
    } else if(character2.pontos > character1.pontos) {
        console.log(`\n🏆 ${character2.nome} é o grande vencedor! 🏆`);
    } else {
        console.log(`\n🤝 Empate! Ambos os corredores são vencedores! 🤝`);
    }

}

(async function main() {
    console.log(
        `🏁🚨Corrida entre ${player1.nome} e ${player2.nome} começando... \n` 
    );
    
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();

