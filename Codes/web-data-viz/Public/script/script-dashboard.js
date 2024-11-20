 // Gráfico de Temperatura
 new Chart(document.getElementById('sensorTemperatura').getContext('2d'), {
    type: 'line',
    data: {
        labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        datasets: [
            {
                label: 'Em alerta', //Texto informativo
                borderColor: '#FFD700', //Cor da borda da caixinha
                backgroundColor: '#FFD700', //Cor da caixinha
                fill: false, //Não sei o que é isso, deixa padrão 
                data: [12, 12, 12, 12, 12, 12], // Valores estáticos, pode colocar qualquer um
            },
            {
                label: 'Em alerta', //Texto informativo
                borderColor: '#FFD700', //Cor da borda da caixinha
                backgroundColor: '#FFD700', //Cor da caixinha
                fill: false, //Não sei o que é isso, deixa padrão 
                data: [9, 9, 9, 9, 9, 9] // Valores estáticos, pode colocar qualquer um
            },

            {
                label: 'Média Ideal (°C)', // Aplica aqui agr, BEIJO TE AMO MEU DENGO, TAMBEM TE AMO
                borderColor: '#067502',
                backgroundColor: '#067502',
                data: [10.5, 10.5, 10.5, 10.5, 10.5, 10.5],
                fill: false,
                borderWidth: 2
            },
            {
                label: 'Mínima (°C)',
                borderColor: '#b02900',
                backgroundColor: '#b02900',
                data: [7, 7, 7, 7, 7, 7], // Linha de referência para a mínima
                fill: false,
                borderWidth: 2
            },

            {
                label: 'Máxima (°C)',
                borderColor: '#b02900',
                backgroundColor: '#b02900',
                data: [14, 14, 14, 14, 14, 14], // Linha de referência para a máxima
                fill: false,
                borderWidth: 2
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    boxWidth: 40,
                    color: 'black',
                    font: { size: 12 }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'black' // Cor dos rótulos do eixo X
                }
            },
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Temperatura (°C)',
                    color: 'white',
                    font: { size: 12 }
                },
                ticks: {
                    color: 'black' // Cor dos rótulos do eixo Y
                }
            }
        }
    }
});

// Gráfico de Umidade
var sensorUmidade = new Chart(document.getElementById('sensorUmidade').getContext('2d'), {
    type: 'line',
    data: {
        labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'], // Horários fixos
        datasets: [
            {
                label: 'Em alerta',
                borderColor: '#FFD700',
                backgroundColor: '#FFD700',
                fill: false,
                data: [80, 80, 80, 80, 80, 80] // Dados dinâmicos de umidade
            },

            {
                label: 'Em alerta',
                borderColor: '#FFD700',
                backgroundColor: '#FFD700',
                fill: false,
                data: [90, 90, 90, 90, 90, 90] // Dados dinâmicos de umidade
            },

            {
                label: 'Média Ideal (%)',
                borderColor: '#067502',
                backgroundColor: '#067502',
                data: [85, 85, 85, 85, 85, 85], // Linha de referência para a média
                fill: false,
                borderWidth: 2
            },
            {
                label: 'Mínima (%)',
                borderColor: '#b02900',
                backgroundColor: '#b02900',
                data: [75, 75, 75, 75, 75, 75], // Linha de referência para a mínima
                fill: false,
                borderWidth: 2
            },
            {
                label: 'Máxima (%)',
                borderColor: '#b02900',
                backgroundColor: '#b02900',
                data: [95, 95, 95, 95, 95, 95], // Linha de referência para a máxima
                fill: false,
                borderWidth: 2
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {

                    boxWidth: 40,
                    color: 'black',
                    font: { size: 12 }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'black' // Cor dos rótulos do eixo X
                }
            },
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: '',
                    color: 'black',
                    font: { size: 12 }
                },
                ticks: {
                    color: 'black' // Cor dos rótulos do eixo Y
                }
            }
        }
    }
});


// Função para obter dados dinamicamente e atualizar os gráficos
// var paginacao = {};
// var tempo = {};

// function obterDados(grafico, endpoint) {
//     fetch('http://localhost:3300/dadossensores/' + endpoint)
//         .then(response => response.json())
//         .then(valores => {
//             if (!paginacao[endpoint]) {
//                 paginacao[endpoint] = 0;
//             }
//             if (!tempo[endpoint]) {
//                 tempo[endpoint] = 0;
//             }

//             var ultimaPaginacao = paginacao[endpoint];
//             paginacao[endpoint] = valores.length;
//             valores = valores.slice(ultimaPaginacao);

//             valores.forEach((valor) => {
//                 // Limite de 10 pontos no gráfico para manter a visualização organizada
//                 if (grafico.data.labels.length === 10 && grafico.data.datasets[0].data.length === 10) {
//                     grafico.data.labels.shift();
//                     grafico.data.datasets[0].data.shift();
//                 }

//                 // Atualizando labels e dados dinamicamente
//                 grafico.data.labels.push(tempo[endpoint]++);
//                 grafico.data.datasets[0].data.push(parseFloat(valor));
//                 grafico.update();
//             });
//         })
//         .catch(error => console.error('Erro ao obter dados:', error));
// }

// // Atualizando os gráficos a cada 1 segundo
// setInterval(() => {
//     obterDados(sensorTemperatura, 'temperatura');
//     obterDados(sensorUmidade, 'umidade');
// }, 1000);