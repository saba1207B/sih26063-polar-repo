import {
  Expedition,
  Dataset,
  Publication,
  ResearchActivity,
  MediaAsset,
  EducationalContent,
  SourceRecord,
} from '@/types';

export const mockSourceRecords: SourceRecord[] = [
  {
    id: 'src-01',
    repository: 'NPDC/NCPOR',
    externalId: 'NPDC-ANT-2023-089',
    url: 'https://npdc.ncpor.res.in/datasets/ANT-2023-089',
    lastSynced: '2026-09-25T14:30:00Z',
    status: 'Healthy',
  },
  {
    id: 'src-02',
    repository: 'PANGAEA',
    externalId: 'doi:10.1594/PANGAEA.942182',
    url: 'https://doi.pangaea.de/10.1594/PANGAEA.942182',
    lastSynced: '2026-09-26T08:15:00Z',
    status: 'Healthy',
  },
  {
    id: 'src-03',
    repository: 'AADC',
    externalId: 'AADC-DATA-2024-V2',
    url: 'https://data.aad.gov.au/dataset/AADC-DATA-2024-V2',
    lastSynced: '2026-09-24T19:00:00Z',
    status: 'Healthy',
  },
  {
    id: 'src-04',
    repository: 'NPDC/NCPOR',
    externalId: 'NPDC-ARC-2022-104',
    url: 'https://npdc.ncpor.res.in/datasets/ARC-2022-104',
    lastSynced: '2026-09-20T11:45:00Z',
    status: 'Degraded',
  },
];

export const mockDatasets: Dataset[] = [
  {
    id: 'ds-01',
    title: 'Maitri Surface Ozone & UV Radiometer Time Series (2018–2023)',
    description:
      'High-resolution 10-minute continuous measurements of surface-level ozone concentrations, UV-A, and UV-B radiation collected at Maitri Station, Schirmacher Oasis, East Antarctica.',
    repository: 'NPDC/NCPOR',
    researchTopic: 'Atmospheric Chemistry & Ozone Layer',
    locationName: 'Maitri Station, Schirmacher Oasis',
    doi: '10.5281/zenodo.7891234',
    license: 'CC BY 4.0 International',
    status: 'Active',
    format: 'NetCDF / CSV',
    size: '1.4 GB',
    publicationDate: '2024-01-15',
    sourceRecordId: 'src-01',
    expeditionId: '38th-indian-antarctic-exped',
  },
  {
    id: 'ds-02',
    title: 'Prydz Bay Deep-Sea Water Column Physical & Chemical Hydrography',
    description:
      'CTD profiles (Conductivity, Temperature, Depth) combined with dissolved oxygen and nutrient concentrations across 42 oceanographic sampling stations in Prydz Bay and Southern Ocean polar ocean currents.',
    repository: 'PANGAEA',
    researchTopic: 'Ocean Circulation & Carbon Sink',
    locationName: 'Prydz Bay & Bharati Station Offshore',
    doi: '10.1594/PANGAEA.942182',
    license: 'CC BY-NC 4.0',
    status: 'Active',
    format: 'ASCII / CSV',
    size: '850 MB',
    publicationDate: '2023-11-20',
    sourceRecordId: 'src-02',
    expeditionId: '40th-indian-antarctic-exped',
  },
  {
    id: 'ds-03',
    title: 'IndARC Sub-surface Mooring Temperature & Salinity Array (Ny-Ålesund)',
    description:
      'Year-round oceanographic subsurface data from India’s first underwater moored observatory (IndARC) anchored in Kongsfjorden fjord, Arctic Ocean.',
    repository: 'NPDC/NCPOR',
    researchTopic: 'Arctic Ocean Dynamics & Fjord Physics',
    locationName: 'Kongsfjorden, Svalbard, Arctic',
    doi: '10.6084/m9.figshare.1290481',
    license: 'CC BY 4.0',
    status: 'Active',
    format: 'HDF5 / NetCDF',
    size: '3.2 GB',
    publicationDate: '2023-08-10',
    sourceRecordId: 'src-04',
    expeditionId: 'indian-arctic-expedition-2022',
  },
  {
    id: 'ds-04',
    title: 'Central Dronning Maud Land Ice Sheet Surface Mass Balance Cores',
    description:
      'Borehole stratigraphy, stable water isotopes (δ18O, δD), and density profile logs from 50m ice cores drilled along the traverse route between Bharati and Maitri.',
    repository: 'AADC',
    researchTopic: 'Glaciology & Mass Balance',
    locationName: 'Dronning Maud Land Traverse',
    doi: '10.4225/15/58203b019a',
    license: 'CC BY-SA 4.0',
    status: 'Updated',
    format: 'CSV / Excel',
    size: '420 MB',
    publicationDate: '2024-03-02',
    sourceRecordId: 'src-03',
    expeditionId: '38th-indian-antarctic-exped',
  },
];

export const mockPublications: Publication[] = [
  {
    id: 'pub-01',
    title: 'Decadal Drivers of Surface Ozone Anomalies over Schirmacher Oasis, East Antarctica',
    authors: ['Dr. Ramesh Kumar', 'Dr. Sunita Sharma', 'Dr. P. V. S. Raju'],
    year: 2024,
    abstract:
      'Analysis of continuous atmospheric monitoring records at Maitri Station reveals distinct seasonal cycles in surface tropospheric ozone. Stratospheric intrusion events during polar spring contribute significantly to episodic surface ozone spikes, correlated with stratospheric vortex breakdown dynamics.',
    repository: 'NPDC/NCPOR Digital Archive',
    doi: '10.1016/j.atmosenv.2024.120345',
    journal: 'Journal of Atmospheric Environment & Polar Science',
    relatedExpeditionId: '38th-indian-antarctic-exped',
    sourceRecordId: 'src-01',
  },
  {
    id: 'pub-02',
    title: 'Hydrographic Structure and Eddy Transport in Prydz Bay during Austral Summer',
    authors: ['Dr. Ananya Roy', 'Dr. M. V. Ramanamurthy', 'Dr. Thamban Meloth'],
    year: 2023,
    abstract:
      'We present high-resolution ocean hydrography collected during the 40th Indian Scientific Expedition to Antarctica. Observations demonstrate intense cross-shelf exchange driven by mesoscale cyclonic eddies carrying warm deep water onto the continental shelf near Larsemann Hills.',
    repository: 'PANGAEA Open Repository',
    doi: '10.1029/2023JC019842',
    journal: 'Journal of Geophysical Research: Oceans',
    relatedExpeditionId: '40th-indian-antarctic-exped',
    sourceRecordId: 'src-02',
  },
  {
    id: 'pub-03',
    title: 'Multi-year Subsurface Warming Trends in Arctic Fjord Systems: Insights from IndARC',
    authors: ['Dr. K. P. Krishnan', 'Dr. B. L. Redkar', 'Dr. Rasik Ravindra'],
    year: 2023,
    abstract:
      'Long-term continuous time series from the IndARC subsurface observatory in Kongsfjorden document shifting hydrographic regimes driven by Atlantic water advection into the Arctic fjord system, highlighting rapid ecosystem transformations.',
    repository: 'NPDC/NCPOR Polar Archive',
    doi: '10.1038/s41598-023-41092-x',
    journal: 'Scientific Reports (Nature Publishing Group)',
    relatedExpeditionId: 'indian-arctic-expedition-2022',
    sourceRecordId: 'src-04',
  },
];

export const mockResearchActivities: ResearchActivity[] = [
  {
    id: 'res-01',
    title: 'Long-term Tropospheric Chemistry & Solar Radiation Monitoring',
    description:
      'Continuous tracking of surface greenhouse gases, aerosol optical depth, and spectral UV irradiance at Maitri research station to quantify anthropogenic vs natural atmospheric forcing.',
    expeditionId: '38th-indian-antarctic-exped',
    leadResearcher: 'Dr. Sunita Sharma (NCPOR)',
    domain: 'Atmospheric Science',
    datasetIds: ['ds-01'],
    publicationIds: ['pub-01'],
    topics: ['Tropospheric Ozone', 'UV Radiation', 'Atmospheric Physics', 'Maitri Station'],
    status: 'Completed',
  },
  {
    id: 'res-02',
    title: 'Prydz Bay Oceanographic Survey & Phytoplankton Carbon Flux',
    description:
      'Multi-disciplinary ocean cruise measuring physical water properties, nutrient dynamics, and primary production rates across the Southern Ocean seasonal ice zone.',
    expeditionId: '40th-indian-antarctic-exped',
    leadResearcher: 'Dr. Ananya Roy (INCOIS / NCPOR)',
    domain: 'Oceanography',
    datasetIds: ['ds-02'],
    publicationIds: ['pub-02'],
    topics: ['Ocean Hydrography', 'Prydz Bay', 'Biogeochemistry', 'Southern Ocean'],
    status: 'Published',
  },
  {
    id: 'res-03',
    title: 'Arctic Moored Observatory Ocean Dynamics (IndARC Phase IV)',
    description:
      'Subsurface oceanographic array monitoring temperature, salinity, currents, and ocean noise in Kongsfjorden, Svalbard, to track Atlantic climate inflow.',
    expeditionId: 'indian-arctic-expedition-2022',
    leadResearcher: 'Dr. K. P. Krishnan (NCPOR)',
    domain: 'Oceanography',
    datasetIds: ['ds-03'],
    publicationIds: ['pub-03'],
    topics: ['IndARC', 'Arctic Ocean', 'Kongsfjorden', 'Fjord Hydrodynamics'],
    status: 'Ongoing',
  },
];

export const mockMediaAssets: MediaAsset[] = [
  {
    id: 'med-01',
    title: 'Maitri Research Station in Polar Daylight',
    type: 'image',
    url: '/images/polar-station.jpg',
    expeditionId: '38th-indian-antarctic-exped',
    locationName: 'Schirmacher Oasis, East Antarctica',
    license: 'CC BY 4.0 - NCPOR Media',
    source: 'National Polar Data Center Archive',
    credit: 'Photo courtesy of NCPOR / Expedition 38 Logistics Team',
  },
  {
    id: 'med-02',
    title: 'Bharati Station Coastline overlooking Pristine Polar Waters',
    type: 'image',
    url: '/images/polar-coastline.jpg',
    expeditionId: '40th-indian-antarctic-exped',
    locationName: 'Larsemann Hills, East Antarctica',
    license: 'CC BY-SA 4.0 - NPDC Public',
    source: 'National Polar Data Center Archive',
    credit: 'Photo by Dr. M. V. Ramanamurthy',
  },
  {
    id: 'med-03',
    title: 'Scientific Expedition Icebreaker Navigating Sea Ice',
    type: 'image',
    url: '/images/polar-expedition-vessel.jpg',
    expeditionId: '40th-indian-antarctic-exped',
    locationName: 'Prydz Bay & Southern Ocean',
    license: 'CC BY 4.0 - Indian Polar Programme',
    source: 'Indian Antarctic Programme Gallery',
    credit: 'Expedition Science Team / NCPOR',
  },
  {
    id: 'med-04',
    title: 'Glacial Ice Core Sample Physical Examination in Field Lab',
    type: 'image',
    url: '/images/polar-instruments.jpg',
    expeditionId: '38th-indian-antarctic-exped',
    locationName: 'Dronning Maud Land Traverse Lab',
    license: 'CC BY-NC 4.0',
    source: 'NCPOR Cryosphere & Ice Core Lab',
    credit: 'Glaciology Division / NCPOR',
  },
  {
    id: 'med-05',
    title: 'Atmospheric Physics & Weather Station Deployment on Snow',
    type: 'image',
    url: '/images/polar-scientists-fieldwork.jpg',
    expeditionId: '38th-indian-antarctic-exped',
    locationName: 'Schirmacher Oasis Glacier Margin',
    license: 'CC BY 4.0 - NCPOR Media',
    source: 'Atmospheric Science Division / NCPOR',
    credit: 'Atmospheric Research Team',
  },
  {
    id: 'med-06',
    title: 'Emperor Penguin Colony & Antarctic Coastal Ice Shelf Ecology',
    type: 'image',
    url: '/images/polar-wildlife-education.jpg',
    expeditionId: '40th-indian-antarctic-exped',
    locationName: 'Prydz Bay Coastal Ice Shelf',
    license: 'CC BY 4.0 - Open Educational Resource',
    source: 'Polar Biology & Outreach Archive',
    credit: 'Marine Ecology Research Team',
  },
  {
    id: 'med-07',
    title: 'Aerial Cryosphere Plateau Survey across Dronning Maud Land',
    type: 'image',
    url: '/images/polar-aerial.jpg',
    expeditionId: '38th-indian-antarctic-exped',
    locationName: 'Central Antarctic Ice Plateau',
    license: 'CC BY-SA 4.0 - NPDC Public',
    source: 'National Polar Data Center',
    credit: 'Airborne Radar Survey Team',
  },
  {
    id: 'med-08',
    title: 'Subglacial Ice Cave Formations & Deep Glaciological Ice Sheet Analysis',
    type: 'image',
    url: '/images/ice_cave_blue_4k.jpg',
    expeditionId: 'indian-arctic-expedition-2022',
    locationName: 'Subglacial Ice Cave System',
    license: 'CC BY 4.0 - NCPOR Digital Archive',
    source: 'Digital Science & Cryosphere Repository',
    credit: 'Polar Commons Glaciology Unit',
  },
];

export const mockExpeditions: Expedition[] = [
  {
    id: 'exp-01',
    slug: '38th-indian-antarctic-exped',
    title: '38th Indian Scientific Expedition to Antarctica (ISEA-38)',
    description:
      'Comprehensive scientific voyage focusing on ice core drilling, surface mass balance along Dronning Maud Land, atmospheric physics at Maitri Station, and environmental protection studies.',
    coverImage: '/images/polar-station.jpg',
    location: 'Maitri Station & Dronning Maud Land',
    year: '2018–2019',
    dates: 'December 2018 – April 2019',
    researchFocus: ['Glaciology', 'Atmospheric Physics', 'Environmental Monitoring'],
    leader: 'Dr. M. Javed Beg (NCPOR)',
    englishSummary:
      'The 38th Indian Scientific Expedition to Antarctica mobilized over 40 scientists, engineers, and support personnel to execute critical polar research. Key milestones included deep ice core retrieval up to 50 meters, setting up automated weather monitoring stations along the Dronning Maud Land ice sheet, and long-term tropospheric ozone measurement at Maitri station.',
    hindiSummary:
      '38वें भारतीय अंटार्कटिक वैज्ञानिक अभियान में 40 से अधिक वैज्ञानिकों और विशेषज्ञों ने भाग लिया। इस अभियान का मुख्य उद्देश्य ड्रोनिंग मौड लैंड बर्फ की चादर से 50 मीटर गहरे हिम कोर प्राप्त करना, मैत्री स्टेशन पर वायुमंडलीय ओजोन निगरानी और पर्यावरण संरक्षण से जुड़े अध्ययन करना था।',
    researchActivities: [mockResearchActivities[0]],
    datasets: [mockDatasets[0], mockDatasets[3]],
    publications: [mockPublications[0]],
    media: [mockMediaAssets[0], mockMediaAssets[3]],
    sources: [mockSourceRecords[0], mockSourceRecords[2]],
    mythVsMeasurement: [
      {
        myth: 'Antarctica is completely static and unchanging ice.',
        measurement:
          'Satellite radar and ground ice-core density measurements reveal dynamic ice sheet flow velocities ranging from 5m/year in inland plateaus to over 800m/year in coastal ice streams.',
        scientificContext:
          'Continuous mass-balance monitoring demonstrates significant seasonal spatial variations in snow accumulation vs ablation rates across Dronning Maud Land.',
      },
      {
        myth: 'Ozone depletion only occurs during winter months.',
        measurement:
          'Surface radiometer time series shows minimum ozone levels occurring during spring (September–October) due to photochemical destruction triggered by returning sunlight on polar stratospheric clouds.',
        scientificContext:
          'Observed springtime ozone hole formation is systematically tracked at Maitri station using ground spectrophotometers.',
      },
    ],
    relatedKnowledge: [
      'Glacial Ice Core Analysis Techniques',
      'Schirmacher Oasis Micro-climate Models',
      'Polar Atmospheric Ozone Dynamics',
    ],
  },
  {
    id: 'exp-02',
    slug: '40th-indian-antarctic-exped',
    title: '40th Indian Scientific Expedition to Antarctica (ISEA-40)',
    description:
      'Milestone expedition marking 40 years of Indian Antarctic research, featuring multi-disciplinary marine ecosystem surveys in Prydz Bay and structural health monitoring of Bharati Station.',
    coverImage: '/images/polar-expedition-vessel.jpg',
    location: 'Bharati Station & Prydz Bay',
    year: '2020–2021',
    dates: 'January 2021 – May 2021',
    researchFocus: ['Polar Oceanography', 'Marine Ecology', 'Geology'],
    leader: 'Dr. Atul Suresh Kulkarni (NCPOR)',
    englishSummary:
      'The 40th Expedition safely navigated global logistical challenges to deliver crucial oceanographic sampling across Prydz Bay. Oceanographers aboard ORV Sagar Nidhi conducted 42 deep hydrographic stations, mapping Antarctic bottom water generation and phytoplankton carbon sequestration rates.',
    hindiSummary:
      '40वें भारतीय अंटार्कटिक अभियान ने 40 वर्षों के भारतीय अनुसंधान का मील का पत्थर हासिल किया। प्रिड्ज़ खाड़ी में 42 गहरे महासागरीय स्टेशनों का सर्वेक्षण किया गया, जिससे दक्षिणी महासागर की धाराओं और समुद्री जीवन पर जलवायु परिवर्तन के प्रभाव का अध्ययन किया गया।',
    researchActivities: [mockResearchActivities[1]],
    datasets: [mockDatasets[1]],
    publications: [mockPublications[1]],
    media: [mockMediaAssets[1], mockMediaAssets[2]],
    sources: [mockSourceRecords[1]],
    mythVsMeasurement: [
      {
        myth: 'Southern Ocean water temperatures are uniform from surface to sea floor.',
        measurement:
          'CTD depth profiles indicate distinct thermal stratification: cold surface water (-1.8°C), underlain by modified Circumpolar Deep Water (+0.5°C) intruded onto the continental shelf.',
        scientificContext:
          'Warmer deep water intrusion near Bharati Station directly accelerates basal melting of adjacent floating ice tongues.',
      },
    ],
    relatedKnowledge: [
      'Prydz Bay Circulation Patterns',
      'Bharati Station Green Design Architecture',
      'Antarctic Krill Habitat Models',
    ],
  },
  {
    id: 'exp-03',
    slug: 'indian-arctic-expedition-2022',
    title: 'Indian Arctic Scientific Expedition 2022 (Arctic-2022)',
    description:
      'Year-round Arctic scientific observations based at Himadri Station in Ny-Ålesund, Svalbard, focusing on fjord hydrodynamics, atmospheric aerosol forcing, and microbial diversity.',
    coverImage: '/images/polar-scientists-fieldwork.jpg',
    location: 'Himadri Station, Ny-Ålesund, Svalbard',
    year: '2022',
    dates: 'June 2022 – October 2022',
    researchFocus: ['Arctic Fjord Dynamics', 'Microbiology', 'Atmospheric Physics'],
    leader: 'Dr. K. P. Krishnan (NCPOR)',
    englishSummary:
      'The 2022 Arctic Expedition centered on long-term data collection from the IndARC moored observatory system in Kongsfjorden. Researchers analyzed seawater exchange between warm Atlantic currents and cold Arctic glacier runoff, while microbiologists sampled glacier meltwater streams for cold-adapted bacteria.',
    hindiSummary:
      '2022 का भारतीय आर्कटिक अभियान स्पिट्सबर्गन (नार्वे) के हिमाद्री स्टेशन से संचालित किया गया। इसमें Kongsfjorden में स्थापित IndARC वेधशाला से पानी के तापमान और लवणता के डेटा का अध्ययन किया गया।',
    researchActivities: [mockResearchActivities[2]],
    datasets: [mockDatasets[2]],
    publications: [mockPublications[2]],
    media: [mockMediaAssets[2]],
    sources: [mockSourceRecords[3]],
    mythVsMeasurement: [
      {
        myth: 'Arctic fjords stay frozen solid throughout the summer season.',
        measurement:
          'IndARC sensors reveal that Kongsfjorden remains ice-free during summer with bottom water temperatures rising to +2.5°C due to warm Atlantic water intrusion.',
        scientificContext:
          'Atlanticization of Svalbard fjords is a major indicator of accelerating Arctic amplification.',
      },
    ],
    relatedKnowledge: [
      'IndARC Underwater Observatory Operations',
      'Himadri Research Station Facilities',
      'Kongsfjorden Glacier Melt Modeling',
    ],
  },
];

export const mockEducationalContent: EducationalContent[] = [
  {
    id: 'edu-01',
    title: 'Why Do We Study Antarctica?',
    description:
      'Discover how the icy continent holds 70% of Earth’s fresh water and acts as our planet’s master climate regulator.',
    targetAudience: 'Students',
    language: 'English',
    readingTime: '5 min read',
    category: 'Polar Basics',
    summaryHindi: 'अंटार्कटिका पृथ्वी का जलवायु नियंत्रक क्यों है? जानें अंटार्कटिक विज्ञान की बुनियादी बातें।',
    keyTakeaways: [
      'Antarctica holds nearly 70% of world fresh water ice.',
      'Indian research stations Maitri and Bharati operate year-round.',
      'Ice cores provide a window into 800,000 years of past climate history.',
    ],
  },
  {
    id: 'edu-02',
    title: 'How Ice Cores Tell Earth’s Ancient Weather Story',
    description:
      'A step-by-step educational guide for teachers explaining air bubbles trapped inside deep ice sheets.',
    targetAudience: 'Teachers',
    language: 'English',
    readingTime: '8 min read',
    category: 'Paleoclimatology',
    summaryHindi: 'बर्फ के टुकड़ों में दबे प्राचीन हवा के बुलबुले हमें लाखों साल पुराने मौसम की कहानी कैसे बताते हैं।',
    keyTakeaways: [
      'Air bubbles in ice act as microscopic ancient atmosphere samples.',
      'Isotope ratios in ice reveal past global surface temperatures.',
      'Interactive classroom experiments using ice layers and food dye.',
    ],
  },
  {
    id: 'edu-03',
    title: 'Life in Sub-Zero Waters: Antarctic Fish & Krill Adaptation',
    description:
      'Explore how antifreeze proteins enable fish to survive in seawater below freezing point (−1.8°C).',
    targetAudience: 'Everyone',
    language: 'English',
    readingTime: '6 min read',
    category: 'Polar Biology',
    summaryHindi: 'अंटार्कटिक की मछलियां माइनस तापमान में भी जमे बिना कैसे तैरती हैं? एंटीफ्रीज प्रोटीन का रहस्य।',
    keyTakeaways: [
      'Glycoprotein molecules bind to ice crystals preventing cell freezing.',
      'Antarctic krill form the foundation of the polar ocean marine food web.',
      'Deep ocean biological carbon pumps transport carbon to sea floor sediments.',
    ],
  },
];
