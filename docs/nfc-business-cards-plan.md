# NFC Business Cards - Plano Inicial HioTech

Este documento serve como referência interna para a proposta, validação e implementação do serviço de `NFC Business Cards` da HioTech.

Site institucional de referência: [https://hiotech.co/](https://hiotech.co/)

## Objetivo

Criar uma solução de cartões inteligentes com `NFC + QR Code + perfil digital`, posicionada como serviço corporativo da HioTech para clientes empresariais.

O objetivo não é vender apenas um cartão físico, mas sim uma solução com:

- cartão físico personalizado;
- landing page comercial do serviço;
- perfil digital individual por colaborador;
- atualização remota de dados;
- possibilidade de evolução para dashboard e analytics.

## Contexto Atual

- A HioTech já atua com desenvolvimento web, mobile, design, infraestrutura e soluções tecnológicas.
- O **website institucional** (`index.html`, `portfolio.html`, etc.) vive agora no **mesmo repositório** na raiz do projeto.
- O serviço NFC está em `nfc-business-cards/` (versão principal unificada).
- Existem atualmente `2 cartões NFC blank` disponíveis para testes.
- A ideia é validar primeiro com um piloto real e depois transformar em oferta comercial.

## Estratégia de Piloto

### Cartão 1

Usar para o perfil pessoal/profissional da HioTech.

Sugestão:

- perfil de `Helton Furau` ou outro representante principal;
- foco em demonstração comercial da solução;
- links para website, WhatsApp, email, LinkedIn e serviços.

### Cartão 2

Usar para um colaborador da empresa-alvo: **Cornelder de Moçambique**.

Objetivo:

- demonstrar como a solução funcionaria para um cliente corporativo real do setor portuário/logístico;
- apresentar branding personalizado (Cornelder amber/port);
- mostrar que a HioTech não vende apenas cartões, mas um sistema escalável para equipas.

**Nota:** o perfil `empresa-alvo-demo/` não está exposto na landing pública - serve apenas para apresentações comerciais e gravação NFC do cartão físico.

## Entregáveis Iniciais

Nesta fase inicial, o projeto tem:

1. `landing page` comercial do serviço (`nfc-business-cards/index.html`);
2. página de perfil HioTech (`nfc-business-cards/helton-furau/`);
3. página demo Cornelder (`nfc-business-cards/empresa-alvo-demo/`);
4. assets partilhados (`nfc-business-cards/assets/profiles.js`, `profile.js`);
5. versão legada simplificada em `site/` (mantida para referência);
6. documentação interna para futura expansão.

## Estrutura do Projeto

```text
smart-bcard/                     ← repositório (website HioTech + NFC)
├── index.html                   ← homepage hiotech.co
├── portfolio.html
├── contact-us.html
├── about-us.html
├── hiotrack/                    ← outro serviço (referência de integração)
├── docs/
│   └── nfc-business-cards-plan.md
├── nfc-business-cards/          ← versão principal do serviço NFC
│   ├── index.html
│   ├── helton-furau/
│   │   └── index.html
│   ├── empresa-alvo-demo/
│   │   └── index.html
│   └── assets/
│       ├── profiles.js
│       └── profile.js
└── site/                        ← legado / piloto HTML simples
    ├── index.html
    ├── helton-furau.html
    └── empresa-alvo-demo.html
```

## Publicação no Website HioTech

Como o website já está no mesmo repositório, a pasta `nfc-business-cards/` pode ser servida diretamente em:

- `https://hiotech.co/nfc-business-cards/` → `nfc-business-cards/index.html`
- `https://hiotech.co/nfc-business-cards/helton-furau/` → **Cartão 1 NFC**
- `https://hiotech.co/nfc-business-cards/empresa-alvo-demo/` → **Cartão 2 NFC**

Padrão semelhante ao `hiotrack/`, que já é um subdiretório de serviço no site principal.

A homepage (`index.html`) inclui um callout promocional lado a lado com o HIOTRACK, apontando para `nfc-business-cards/`.

### URLs para gravação NFC (sem hash)

Os cartões físicos devem ser gravados com URLs fixas, **não** com `#hash`:

| Cartão | URL NFC |
|---|---|
| HioTech (Helton) | `.../helton-furau/` |
| Cornelder demo | `.../empresa-alvo-demo/` |

O hash routing foi removido da versão principal porque alguns gravadores NFC e telemóveis tratam mal fragmentos de URL.

### QR Codes

Cada perfil e o simulador geram QR codes reais via biblioteca `qrcode.js`, apontando para as mesmas URLs fixas dos perfis.

## Conteúdo da Landing Page

A landing page deve comunicar:

- o problema dos cartões de papel;
- a proposta de valor da solução digital;
- os benefícios para empresas;
- a possibilidade de personalização;
- casos de uso para equipas comerciais, diretores e atendimento;
- chamada para ação para contacto com a HioTech.

## Conteúdo da Página Individual

Cada perfil digital deve incluir:

- nome;
- cargo;
- empresa;
- foto ou avatar;
- telefone;
- email;
- WhatsApp;
- website;
- LinkedIn;
- botão para guardar contacto;
- QR Code real com URL fixa do perfil;
- possibilidade futura de agendamento, catálogo e analytics.

## Como garantir retorno ao perfil depois do primeiro scan

Um dos princípios mais importantes deste produto é evitar que a experiência
termine no momento em que a pessoa salva o contacto.

Se o utilizador guardar apenas nome, telefone e email, pode perder acesso ao
resto do conteúdo no dia seguinte. Por isso, o perfil público deve continuar a
ser a peça principal da solução.

### Estratégia recomendada

- o botão `Guardar contacto` deve gerar um `vCard` com o campo `URL`;
- esse campo `URL` deve apontar para o perfil público individual;
- o perfil deve funcionar como hub digital com website, LinkedIn, WhatsApp e outros links;
- o cartão físico deve manter acesso rápido ao mesmo perfil por `NFC` e `QR Code`.

### Resultado esperado

Com essa abordagem:

- a pessoa salva o contacto no telefone;
- dentro do contacto salvo, existe um link para o perfil;
- no dia seguinte, ela pode voltar ao perfil sem depender de um novo encontro;
- qualquer atualização de links e informações passa a refletir-se no mesmo perfil público.

### Mensagem de produto

Transformar um contacto estático em relacionamento digital contínuo.

Em linguagem de posicionamento, esta pode ser a frase principal do serviço.

Em vez de entregar apenas um contacto estático, a HioTech oferece um ponto de
acesso contínuo e atualizável à presença digital do colaborador e da empresa.

## Proposta Comercial Inicial

Modelo sugerido:

### Setup

- criação/configuração da página;
- personalização visual;
- gravação do cartão NFC;
- geração de QR Code;
- entrega do cartão.

### Recorrência

- hospedagem;
- manutenção dos dados;
- atualização dos perfis;
- analytics;
- suporte.

## Próximos Passos

1. Fazer deploy do repositório (ou da pasta `nfc-business-cards/`) para `hiotech.co`.
2. Opcional: adicionar link/banner no `index.html` principal (como o HIOTRACK).
3. Gravar Cartão 1 com URL de `nfc-business-cards/helton-furau/`.
4. Gravar Cartão 2 com URL de `nfc-business-cards/empresa-alvo-demo/`.
5. Testar scan NFC e QR em Android e iPhone.
6. Personalizar nome real do colaborador Cornelder quando definido.
7. Evoluir para versão com dashboard e multiempresa.

## Observações Técnicas

- Nesta fase, o NFC pode conter apenas uma `URL`.
- Não é necessário gravar dados pessoais completos no chip.
- Isso facilita atualização futura sem trocar o cartão físico.
- HTML estático é suficiente para o piloto.
- Posteriormente, o projeto pode evoluir para `Next.js`, `Node.js` e banco de dados.

## Notas para Evolução

Futuras funcionalidades:

- dashboard administrativo;
- gestão multiempresa;
- estatísticas de acessos;
- captação de leads;
- exportação de vCard;
- integração com CRM;
- páginas em português e inglês;
- branding por empresa.
