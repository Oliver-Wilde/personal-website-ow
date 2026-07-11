const projects = [
  {
    id: 'voxel-engine',
    title: 'Vulkan Voxel Engine',
    category: 'Systems and graphics',
    status: 'Flagship case study',
    period: 'MComp dissertation',
    role: 'Sole developer',
    repositoryUrl: 'https://github.com/Oliver-Wilde/VulkanProject',
    summary:
      'A performance-focused voxel renderer exploring resource management, chunk streaming, staging uploads, and explicit GPU architecture.',
    technologies: ['C++', 'Vulkan', 'GLSL', 'GPU profiling'],
    problem:
      'Build a technically substantial voxel renderer while keeping GPU resources, data uploads, chunk state, and frame behaviour understandable enough to investigate and improve.',
    approach:
      'The engine was developed around explicit ownership and transfer paths rather than hiding expensive GPU operations. World data, rendering resources, staging work, and diagnostic information were treated as separate engineering concerns.',
    decisions: [
      'Kept GPU resource ownership explicit so allocation and lifetime behaviour could be reasoned about.',
      'Used defined staging and upload paths to make transfer costs observable rather than accidental.',
      'Structured the project so chunk streaming and upload budgets could be investigated through benchmark-oriented telemetry.',
    ],
    outcome:
      'The project provides a working foundation for discussing graphics architecture, resource lifetime, performance investigation, and the trade-offs involved in explicit APIs.',
    evidence:
      'Source code, dissertation material, architecture notes, and performance investigation.',
  },
  {
    id: 'stnly-storefront',
    title: 'STNLY Storefront',
    category: 'Product engineering',
    status: 'Active production project',
    period: 'Independent project',
    role: 'Frontend and product engineer',
    repositoryUrl: 'https://github.com/Oliver-Wilde/headless-shopify-art-store',
    summary:
      'A custom headless commerce experience built around a real artist, production constraints, maintainable frontend architecture, and a distinctive interaction system.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Shopify',
      'Framer Motion',
    ],
    problem:
      'Create an art-led storefront that feels highly individual while preserving usable navigation, maintainable code, product data integrity, and a dependable checkout path.',
    approach:
      'Shopify remains responsible for commerce while the custom Next.js frontend owns presentation, interaction, and the broader brand experience. Visual experimentation is developed around stable content and commerce boundaries.',
    decisions: [
      'Used a headless architecture so the storefront could have a custom visual system without rebuilding commerce infrastructure.',
      'Kept Shopify and cart behaviour separate from visual experimentation to reduce regression risk.',
      'Applied interaction and motion incrementally after establishing repository health and production behaviour.',
    ],
    outcome:
      'The project demonstrates client-facing delivery, iterative design work, real product constraints, and the ability to balance visual ambition with maintainable implementation.',
    evidence:
      'Working repository, production build validation, responsive interface work, and documented implementation decisions.',
  },
  {
    id: 'ipd',
    title: "Iterated Prisoner's Dilemma Simulator",
    category: 'C++ simulation and game theory',
    status: 'Completed — 100/100',
    period: 'Fourth-year C++ coursework',
    role: 'Sole developer',
    summary:
      "A modular C++ simulator for evaluating strategies in the Iterated Prisoner's Dilemma across tournaments, configurable payoff matrices, action noise, and evolutionary experiments.",
    technologies: [
      'C++',
      'Object-oriented design',
      'CLI tooling',
      'Simulation',
      'CSV and JSON',
    ],
    problem:
      'Build a reusable experimental system capable of comparing repeated-game strategies across controlled scenarios rather than producing the result of one fixed tournament.',
    approach:
      'The simulator separates strategy behaviour, player state, match execution, tournament orchestration, configuration, experiment runners, and output generation. It supports baseline tournaments, noise sweeps, exploiter tests, evolutionary population updates, and Strategic Complexity Budget experiments.',
    decisions: [
      'Defined a common strategy interface and factory so strategies could be selected through command-line tokens without coupling them to match execution.',
      'Used configurable random seeds, saveable configurations, and text, CSV, and JSON outputs to make experiments reproducible and inspectable.',
      'Separated tournament, sweep, evolutionary, scoring-adjustment, and output responsibilities into dedicated components.',
    ],
    outcome:
      'The project received 100/100 in assessment. It demonstrates modular C++ design, command-line application development, simulation architecture, reproducible experimentation, and comparative analysis.',
    evidence:
      'Public source repository, submitted report, configuration files, example datasets, metadata, and text, CSV, and JSON results.',
    repositoryUrl:
      'https://github.com/Oliver-Wilde/Prisoners-Dilemma-Oliver-Wilde',
  },
  {
    id: 'financial-ledger',
    title: 'Financial Ledger',
    category: 'Backend and data integrity',
    status: 'Planned project',
    period: 'Portfolio project',
    role: 'Backend engineer',
    hidden: true,
    summary:
      'A planned Java backend centred on balanced postings, transaction boundaries, idempotency, immutable history, testing, and correctness under failure.',
    technologies: [
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'JUnit',
      'Docker',
    ],
    problem:
      'Demonstrate backend engineering through a domain where small correctness failures can invalidate the entire system.',
    approach:
      'The project will treat ledger rules, persistence, idempotency, transaction handling, validation, and failure recovery as first-class design requirements.',
    decisions: [
      'Model financial postings around explicit invariants rather than controller-level convenience.',
      'Use database transactions to make partial writes and rollback behaviour testable.',
      'Design idempotent operations so repeated requests do not create duplicate financial effects.',
    ],
    outcome:
      'This entry is deliberately marked as planned. It will become a full case study only when the implementation, tests, and evidence exist.',
    evidence:
      'Planned evidence: runnable repository, automated tests, architecture notes, database schema, and documented failure cases.',
  },
];

export default projects;