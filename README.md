# Simulador de Escalonamento por Sorteio (Lottery Scheduling)

Este projeto é uma implementação interativa do algoritmo Lottery Scheduling para visualizar como os processos são gerenciados em sistemas operacionais. O simulador permite que os usuários experimentem diferentes configurações e observem o comportamento do algoritmo em tempo real.

## 🚀 Funcionalidades

- **Simulação Interativa**: Visualize em tempo real como os processos são escalonados
- **Controle de Bilhetes**: Ajuste a quantidade de bilhetes para cada processo
- **Visualização de Resultados**: Acompanhe métricas como tempo de espera e tempo de execução
- **Gráfico de Gantt**: Visualize a linha do tempo de execução dos processos
- **Adição de Processos**: Crie novos processos durante a simulação
- **Explicações Interativas**: Aprenda sobre o funcionamento do algoritmo através de explicações detalhadas

## 🛠️ Tecnologias Utilizadas

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Lucide Icons
- Shadcn/ui

## 📦 Estrutura do Projeto

```
lottery-scheduling/
├── app/
│   ├── components/         # Componentes React reutilizáveis
│   ├── tipos.d.ts         # Definições de tipos TypeScript
│   ├── pagina-inicial.tsx # Página inicial
│   └── simulador/         # Página do simulador
├── components/
│   ├── ui/               # Componentes de interface do usuário
│   ├── controles-simulacao.tsx
│   ├── lista-processos.tsx
│   ├── grafico-gantt.tsx
│   ├── painel-logs.tsx
│   ├── visualizacao-sorteio.tsx
│   ├── visualizacao-sorteio-simples.tsx
│   ├── grafico-gantt-simples.tsx
│   ├── controles-simulacao-simples.tsx
│   ├── formulario-novo-processo.tsx
│   ├── explicacao-algoritmo.tsx
│   ├── explicacao-simples.tsx
│   ├── explicacao-processos.tsx
│   ├── explicacao-resultados.tsx
│   ├── explicacao-linha-tempo.tsx
│   ├── resultados-simples.tsx
│   ├── resultado-simples.tsx
│   ├── estatisticas.tsx
│   ├── ajuda-interativa.tsx
│   └── provedor-tema.tsx
├── public/                # Arquivos estáticos
└── package.json          # Dependências do projeto
```

### Componentes Principais

- `lista-processos.tsx`: Exibe a lista de processos e permite ajustar seus bilhetes
- `grafico-gantt.tsx`: Mostra a linha do tempo de execução dos processos
- `controles-simulacao.tsx`: Controles para iniciar, pausar e reiniciar a simulação
- `visualizacao-sorteio.tsx`: Visualiza o processo de sorteio de bilhetes
- `resultados-simples.tsx`: Exibe métricas e resultados da simulação
- `formulario-novo-processo.tsx`: Permite adicionar novos processos
- `ajuda-interativa.tsx`: Fornece explicações sobre diferentes aspectos da simulação

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/lottery-scheduling.git
cd lottery-scheduling
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse `http://localhost:3000` no seu navegador

## 📝 Como Usar o Simulador

1. **Iniciar a Simulação**:
   - Clique no botão "Iniciar Simulação" na página inicial
   - Use os controles para iniciar, pausar ou reiniciar a simulação

2. **Ajustar Processos**:
   - Use os controles deslizantes para ajustar a quantidade de bilhetes de cada processo
   - Processos com mais bilhetes têm maior probabilidade de serem escolhidos

3. **Adicionar Novos Processos**:
   - Use o formulário para criar novos processos
   - Defina o nome, tempo de CPU e tipo do processo (CPU ou I/O)

4. **Observar Resultados**:
   - Acompanhe o gráfico de Gantt para ver a linha do tempo
   - Verifique as métricas de desempenho na seção de resultados

## 🎯 Recursos do Simulador

### Análise de Desempenho
- Visualize métricas detalhadas de desempenho do algoritmo
- Acompanhe tempos de espera e execução
- Compare diferentes configurações

### Comparação de Algoritmos
- Compare o desempenho do Lottery Scheduling com outros algoritmos
- Observe as diferenças em diferentes cenários

### Distribuição de Recursos
- Analise como os recursos são distribuídos entre os processos
- Visualize a justiça do algoritmo

### Configurações Flexíveis
- Ajuste parâmetros como quantum e prioridades
- Experimente diferentes políticas de escalonamento

## 👥 Equipe

- Alexsander
- Kalleb

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request 