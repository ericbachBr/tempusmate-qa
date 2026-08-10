window.QA_DATA = {
  "meta": {
    "project": "TempusMate",
    "title": "QA, Stabilization & Release Readiness",
    "version": "2.0",
    "updatedAt": "2026-08-09",
    "releaseStatus": "E2E in progress",
    "releaseTone": "warning",
    "headline": "Core Employee Invoice flow validated through Save → Edit with complex overtime/rate scenarios.",
    "remainingValidation": [
      "Invoice Preview / PDF parity",
      "Expense module and Expense ↔ Invoice integration",
      "Quote/Service follow-up scenarios",
      "Cross-midnight and long-break edge cases"
    ]
  },
  "executive": {
    "automatedTests": 448,
    "automatedFailures": 0,
    "latestBuild": "Clean",
    "manualRunStatus": "PASS through Save/Edit",
    "poMessage": "A versão ainda está em estabilização ativa. Vários bugs de integridade financeira e identidade foram encontrados e corrigidos antes de liberar uma nova build para teste externo."
  },
  "masterItems": [
    {
      "id": "BUG-001",
      "type": "BUG",
      "area": "Invoice / Client",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Troca/reseleção de cliente reprecificava rows existentes",
      "detail": "Existing/imported employee rows recebiam novamente rate, overtime e regras do Client Profile, destruindo snapshots históricos.",
      "resolution": "Rows existentes passaram a ser snapshots protegidos; defaults do cliente só semeiam novas rows."
    },
    {
      "id": "BUG-002",
      "type": "BUG",
      "area": "Invoice / Import",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Import Shifts sem consciência do cliente da Invoice",
      "detail": "O seletor podia listar turnos de outros clientes.",
      "resolution": "Predicate de elegibilidade passou a respeitar profileId, nome manual exato e shifts realmente sem cliente."
    },
    {
      "id": "BUG-003",
      "type": "BUG",
      "area": "Invoice / Identity",
      "severity": "MEDIUM",
      "status": "resolved",
      "title": "Invoice manual 'Itau' não via shift do Profile Itau",
      "detail": "Nome manual equivalente ao Profile era excluído do filtro.",
      "resolution": "Match exato de nome é aceito somente para elegibilidade; não cria Profile identity."
    },
    {
      "id": "BUG-004",
      "type": "BUG",
      "area": "Invoice / Identity",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Profile selecionado + texto editado criava identidade híbrida",
      "detail": "Selecionar Santander e editar o texto para Itau misturava resultados.",
      "resolution": "Com profileId presente, Profile é a única autoridade de elegibilidade."
    },
    {
      "id": "BUG-005",
      "type": "BUG",
      "area": "Invoice / Client",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Era possível trocar cliente com shifts já preenchidos",
      "detail": "Permitiria misturar ITAU + Santander na mesma Invoice.",
      "resolution": "Troca é bloqueada quando existem employee rows protegidas."
    },
    {
      "id": "BUG-006",
      "type": "BUG",
      "area": "Invoice / Add Shift",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Nova row manual não recebia hourlyRate do cliente",
      "detail": "O caller de + Add Shift omitía effectiveHourlyRate.",
      "resolution": "Rate efetivo passou a ser encaminhado; estado é resetado/rederivado ao abrir/editar."
    },
    {
      "id": "BUG-007",
      "type": "BUG",
      "area": "Calendar / Shift",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Delete Shift confirmava mas não apagava",
      "detail": "deleteShiftFromHistory chamava saveState() inexistente e abortava antes da persistência/render.",
      "resolution": "Passou a usar saveHistoryToLocalStorage()."
    },
    {
      "id": "BUG-008",
      "type": "BUG",
      "area": "Invoice / Starter Row",
      "severity": "MEDIUM",
      "status": "resolved",
      "title": "Starter row vazia não recebia defaults do Client",
      "detail": "A row inicial existia antes da seleção do cliente e ficou sem rate/OT/regras após snapshot protection.",
      "resolution": "A única starter row realmente vazia é resemeada com os mesmos defaults de + Add Shift Row."
    },
    {
      "id": "BUG-009",
      "type": "BUG",
      "area": "UI / Duration",
      "severity": "MEDIUM",
      "status": "resolved",
      "title": "Horas decimais exibidas como duração",
      "detail": "Ex.: 2.50h era exibido diretamente em várias superfícies.",
      "resolution": "UI passou a usar formatHoursMinutes(); matemática/storage continuam em decimal."
    },
    {
      "id": "BUG-010",
      "type": "BUG",
      "area": "Invoice / Import",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Mesmo Shift podia ser importado várias vezes na mesma Invoice",
      "detail": "Reabrir Generate from Shifts mostrava novamente shifts já importados.",
      "resolution": "sourceShiftId é persistido por row/Invoice e o selector exclui apenas IDs já presentes na Invoice ativa."
    },
    {
      "id": "BUG-011",
      "type": "BUG",
      "area": "Quote / Client",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Detach de Client Profile deixava campos antigos na Quote",
      "detail": "Ao remover o profile, apenas o badge era limpo; dados derivados permaneciam.",
      "resolution": "Blank branch passou a limpar os 5 campos derivados."
    },
    {
      "id": "BUG-012",
      "type": "BUG",
      "area": "Quote / Identity",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Quote fazia relink por nome ao editar",
      "detail": "loadQuoteIntoForm usava comparação de nome e podia associar perfil errado.",
      "resolution": "Restore do dropdown passou a usar profileId exclusivamente."
    },
    {
      "id": "BUG-013",
      "type": "BUG",
      "area": "Quote / Identity",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Quote não persistia profileId",
      "detail": "Não havia como distinguir entrada manual de cliente derivado de Profile.",
      "resolution": "Quote passou a persistir profileId e snapshot de identidade."
    },
    {
      "id": "BUG-014",
      "type": "BUG",
      "area": "Quote / Client",
      "severity": "MEDIUM",
      "status": "resolved",
      "title": "Quote lia contactPerson em vez de contact do Profile",
      "detail": "Contact Person ficava vazio ao carregar Client Profile.",
      "resolution": "Boundary Profile → Quote usa client.contact; snapshot Quote continua contactPerson."
    },
    {
      "id": "BUG-015",
      "type": "BUG",
      "area": "Quote → Invoice",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Conversão não preservava identidade do cliente",
      "detail": "Invoice convertida perdia vínculo explícito do Profile depois que name fallback foi removido.",
      "resolution": "Quote → Invoice carrega profileId do snapshot."
    },
    {
      "id": "BUG-016",
      "type": "BUG",
      "area": "Quote → Invoice",
      "severity": "HIGH",
      "status": "resolved",
      "title": "B2B/VAT/country não existiam no snapshot da Quote",
      "detail": "Invoice convertida podia declarar Profile mas carregar defaults B2C/GB/vazio inconsistentes.",
      "resolution": "Quote captura isBusiness/vatNumber/country no Save e conversão usa apenas snapshot."
    },
    {
      "id": "BUG-017",
      "type": "BUG",
      "area": "Invoice / Totals",
      "severity": "HIGH",
      "status": "known",
      "title": "toggleInvoicePaid podia deixar calcFees desatualizado",
      "detail": "Finding histórico identificado durante auditoria anterior: mudar Paid podia congelar total calculado incorretamente.",
      "resolution": "Mantido no histórico como finding prévio; confirmar status atual antes de marcar como fechado."
    },
    {
      "id": "BUG-018",
      "type": "BUG",
      "area": "Invoice / Overtime",
      "severity": "HIGH",
      "status": "resolved",
      "title": "Troca de cliente não recalculava corretamente configuração de overtime",
      "detail": "Gap original do ciclo de estabilização; depois evoluiu para política de snapshot e defaults por cliente.",
      "resolution": "Regra consolidada: existentes preservam snapshot; novas rows recebem defaults do cliente atual."
    },
    {
      "id": "GAP-001",
      "type": "FEATURE / GAP",
      "area": "PDF",
      "severity": "MEDIUM",
      "status": "planned",
      "title": "Recibos no PDF",
      "detail": "Item original de estabilização: comprovantes/recibos não apareciam no PDF.",
      "resolution": "Pendência histórica / validar implementação atual."
    },
    {
      "id": "GAP-002",
      "type": "FEATURE / GAP",
      "area": "PDF",
      "severity": "MEDIUM",
      "status": "planned",
      "title": "Descrição financeira de extras no PDF",
      "detail": "Item original de estabilização: descrição de extras precisava aparecer no PDF.",
      "resolution": "Validar no bloco Preview/PDF."
    },
    {
      "id": "GAP-003",
      "type": "FEATURE / GAP",
      "area": "Client Profile",
      "severity": "MEDIUM",
      "status": "implemented",
      "title": "Hourly rate por cliente",
      "detail": "Cliente pode definir rate padrão para novas employee rows.",
      "resolution": "Implementado e validado no E2E atual."
    },
    {
      "id": "GAP-004",
      "type": "FEATURE / GAP",
      "area": "Overtime",
      "severity": "LOW",
      "status": "implemented",
      "title": "Remover overrides fixos 1.5x/2x/3x",
      "detail": "Simplificação para usar regras configuradas em vez de overrides soltos.",
      "resolution": "Integrado ao fluxo atual de regras."
    },
    {
      "id": "GAP-005",
      "type": "FEATURE / GAP",
      "area": "Invoice UI",
      "severity": "LOW",
      "status": "implemented",
      "title": "Live breakdown",
      "detail": "Necessidade de breakdown ao vivo durante edição de Invoice.",
      "resolution": "Presente no fluxo atual; ainda precisa cobertura runtime mais forte."
    },
    {
      "id": "GAP-006",
      "type": "FEATURE / GAP",
      "area": "Profile",
      "severity": "LOW",
      "status": "implemented",
      "title": "Load Profile / dados do usuário",
      "detail": "Fluxo de carregar dados do próprio usuário no formulário.",
      "resolution": "Implementado anteriormente."
    },
    {
      "id": "GAP-007",
      "type": "FEATURE / GAP",
      "area": "Invoice UI",
      "severity": "LOW",
      "status": "implemented",
      "title": "Redesign lista + modal",
      "detail": "Reorganização de UX de Invoice/rows.",
      "resolution": "Implementado em etapas; Home experiment foi mantido minimalista."
    },
    {
      "id": "DEBT-001",
      "type": "TECH DEBT",
      "area": "Overtime",
      "severity": "MEDIUM",
      "status": "deferred",
      "title": "rules: [] pode cair em State.defaultRules live",
      "detail": "Registro histórico sem regras explícitas ainda pode resolver defaults atuais.",
      "resolution": "Documentado como follow-up separado."
    },
    {
      "id": "DEBT-002",
      "type": "TECH DEBT",
      "area": "Tests",
      "severity": "HIGH",
      "status": "deferred",
      "title": "Testes regex/source-level demais",
      "detail": "Alguns testes verificam strings/código-fonte em vez de executar DOM/runtime real.",
      "resolution": "Manter como guarda temporária; aumentar JSDOM/E2E gradualmente."
    },
    {
      "id": "DEBT-003",
      "type": "TECH DEBT",
      "area": "Expenses",
      "severity": "MEDIUM",
      "status": "follow-up",
      "title": "Premissas antigas sobre clientId de Invoice",
      "detail": "Expense ainda contém lógica/comentários anteriores ao invoice.client.profileId.",
      "resolution": "Auditar quando entrar no bloco Expenses."
    },
    {
      "id": "DEBT-004",
      "type": "TECH DEBT",
      "area": "Agenda",
      "severity": "MEDIUM",
      "status": "follow-up",
      "title": "Edit de evento legado pode perder clientName",
      "detail": "Fallback por nome é read-only e seguro, mas edição de legado sem clientId pode apagar nome antigo.",
      "resolution": "Investigar no bloco Agenda."
    },
    {
      "id": "DEBT-005",
      "type": "TECH DEBT",
      "area": "Quote",
      "severity": "MEDIUM",
      "status": "deferred",
      "title": "Double conversion sem guarda state-side",
      "detail": "UI impede em parte, mas idempotência formal de Quote → Invoice segue como decisão futura.",
      "resolution": "Finding separado."
    },
    {
      "id": "DEBT-006",
      "type": "PRODUCT DECISION",
      "area": "Service Invoice",
      "severity": "LOW",
      "status": "open",
      "title": "Hourly rate de Client Profile em Service Invoice",
      "detail": "Hoje rate/OT do Profile é escopo de employee shift; service/Quote trabalha por quantidade/preço.",
      "resolution": "Aguardando regra de produto."
    }
  ],
  "latestRun": {
    "id": "RUN-2026-08-09-INVOICE-CRAZY",
    "title": "Employee Invoice Crazy E2E",
    "date": "2026-08-09",
    "status": "PASS through Save/Edit",
    "baseline": {
      "hours": "34h30",
      "amount": "£980.00"
    },
    "final": {
      "hours": "34h30",
      "amount": "£1,690.00"
    },
    "steps": [
      {
        "name": "Client Profile £20 + custom OT rules",
        "status": "pass"
      },
      {
        "name": "Shift A 06:00–10:00 = 4h00 / £90",
        "status": "pass"
      },
      {
        "name": "Shift B 16:00–23:00 = 7h00 / £200",
        "status": "pass"
      },
      {
        "name": "Shift C 06:00–23:00 + 60m break = 16h00 / £390",
        "status": "pass"
      },
      {
        "name": "Shift D 18:00–23:00 @ £30 = 5h00 / £240",
        "status": "pass"
      },
      {
        "name": "Shift E 06:00–09:00 + 30m break = 2h30 / £60",
        "status": "pass"
      },
      {
        "name": "Home aggregate = 34h30 / £980",
        "status": "pass"
      },
      {
        "name": "Starter row seeded from Client defaults",
        "status": "pass"
      },
      {
        "name": "Generate from Shifts shows exactly 5 eligible shifts",
        "status": "pass"
      },
      {
        "name": "Import preserves time/break/rate/OT/rules snapshots",
        "status": "pass"
      },
      {
        "name": "Duplicate protection hides already imported shifts",
        "status": "pass"
      },
      {
        "name": "Removing a row unlocks only that source shift",
        "status": "pass"
      },
      {
        "name": "Manual rate edit £20 → £40 recalculates Invoice £980 → £1,070",
        "status": "pass"
      },
      {
        "name": "Original standalone Shift remains unchanged",
        "status": "pass"
      },
      {
        "name": "Break edit to 30m recalculates £1,070 → £1,050",
        "status": "pass"
      },
      {
        "name": "Time edit to 06:00–23:00 recalculates to £1,690",
        "status": "pass"
      },
      {
        "name": "Save persists £1,690",
        "status": "pass"
      },
      {
        "name": "Save → Edit preserves 5 rows, rate £40, break, OT/rules and total",
        "status": "pass"
      },
      {
        "name": "sourceShiftId survives Save → Edit",
        "status": "pass"
      },
      {
        "name": "Preview / PDF parity",
        "status": "pending"
      },
      {
        "name": "Expenses inside Invoice",
        "status": "pending"
      }
    ]
  },
  "rules": [
    {
      "id": "R-01",
      "title": "Profile ID is authoritative",
      "text": "When profileId/clientId exists, Profile identity wins over editable text."
    },
    {
      "id": "R-02",
      "title": "Manual name is not Profile identity",
      "text": "Exact normalized name matching may be used only for approved eligibility/read-only legacy compatibility."
    },
    {
      "id": "R-03",
      "title": "One client per Employee Invoice",
      "text": "Protected employee rows must not be silently mixed across client identities."
    },
    {
      "id": "R-04",
      "title": "Historical snapshot wins",
      "text": "Imported/existing rows preserve rate, overtime and rules; current client defaults seed new rows only."
    },
    {
      "id": "R-05",
      "title": "Break maximizes employee pay",
      "text": "Break minutes are deducted from the lowest active multiplier bucket first."
    },
    {
      "id": "R-06",
      "title": "Decimal internally, formatted visually",
      "text": "Financial math keeps decimal hours; UI uses hours/minutes formatting."
    },
    {
      "id": "R-07",
      "title": "Duplicate protection is per Invoice",
      "text": "The same historical Shift may appear in multiple Invoices, but not twice in the same one."
    }
  ],
  "nextScenarios": [
    {
      "id": "NEXT-01",
      "area": "Invoice",
      "title": "Preview / PDF parity for £1,690 fixture",
      "status": "next"
    },
    {
      "id": "NEXT-02",
      "area": "Expenses",
      "title": "Expense standalone behavior",
      "status": "pending"
    },
    {
      "id": "NEXT-03",
      "area": "Invoice + Expenses",
      "title": "Expense linking and no double counting",
      "status": "pending"
    },
    {
      "id": "NEXT-04",
      "area": "Quotes",
      "title": "Quote → Invoice E2E with client snapshots",
      "status": "pending"
    },
    {
      "id": "NEXT-05",
      "area": "Calendar",
      "title": "Delete standalone Shift already imported into Invoice",
      "status": "pending"
    },
    {
      "id": "NEXT-06",
      "area": "Cross-midnight",
      "title": "21:00–06:00 with multiple OT bands and break",
      "status": "pending"
    },
    {
      "id": "NEXT-07",
      "area": "Long break",
      "title": "Break longer than complete 1x bucket",
      "status": "pending"
    },
    {
      "id": "NEXT-08",
      "area": "Agenda",
      "title": "Legacy clientName edit preservation",
      "status": "pending"
    }
  ]
};
