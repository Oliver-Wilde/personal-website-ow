const homeContent = {
  eyebrow: '01 / Home / Oliver Wilde',

  headline: [
    'Computer science graduate.',
    'Interested in backend and systems work.',
  ],

  introduction:
    'I completed a First Class MComp in Computer Science at Newcastle University and will begin an MSc in Advanced Computer Science at Durham University in 2026.',

  actions: {
    work: {
      label: 'View selected work',
      href: '#work',
    },

    contact: {
      label: 'Contact and profiles',
      href: '#contact',
    },
  },

  cards: {
    education: {
      label: 'Education',
      title: 'First Class MComp',
      description: 'Computer Science at Newcastle University.',
    },

    next: {
      label: 'Next',
      title: 'Durham MSc',
      description: 'Advanced Computer Science, 2026?2027.',
    },

    interests: {
      label: 'Current interests',
      title: 'Backend and systems',
      description:
        'I am still deciding where to specialise, but I keep coming back to JVM software, databases, and performance.',
    },
  },

  selectedWork: {
    label: 'Selected work',
    title: 'Three projects I have worked on',
    description:
      "A Vulkan voxel engine, a storefront for my brother's art, and an iterated Prisoner's Dilemma project.",

    projects: {
      voxelEngine: {
        label: 'Vulkan Voxel Engine',
        href: '#work/voxel-engine',
      },

      stnlyStorefront: {
        label: 'STNLY Storefront',
        href: '#work/stnly-storefront',
      },

      ipd: {
        label: "Iterated Prisoner's Dilemma",
        href: '#work/ipd',
      },
    },

    contactLabel: 'Contact and profiles',
    contactHref: '#contact',
  },
};

export default homeContent;
