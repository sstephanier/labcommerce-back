 
 const imparOupar = process.argv[2]
 const escolhaNum = +process.argv[3]

 function getNumAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  const numeroAleatorio = getNumAleatorio(0, 10)

  const verificaNumero =  (numeroAleatorio, escolhaNum) => {

    const somaNumeros = escolhaNum + numeroAleatorio

    if (somaNumeros % 2 === 0) {
        return ("par")

    } else {
        return ("impar")
    }
  }

  
  const numeroVencedor =  (numeroAleatorio, escolhaNum) => {
    const resultado = verificaNumero (numeroAleatorio, escolhaNum)

    if (resultado === imparOupar) {
        console.log("Você GANHOU!")
    }else {
        console.log("Você PERDEU!")
    }
  }

  console.log(`Você jogou ${imparOupar} e o número ${},
  o número aleatório foi ${numeroAleatorio},
  a soma é ${ escolhaNum + numeroAleatorio }, um número ${verificaNumero (numeroAleatorio, escolhaNum), }
 `)
  