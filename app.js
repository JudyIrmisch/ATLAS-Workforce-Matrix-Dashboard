// Staff data - stored in memory during session
let staffData = [];

// In-memory data store - persists during page session
// Note: Changes will be lost on page refresh. Use Export/Import to save permanently.

// Storage wrapper - uses localStorage if available, falls back to memory
let storageAvailable = true;
const memoryStorage = {};

function getStorage() {
  if (storageAvailable) {
    try {
      // Try to access storage - will use localStorage on GitHub Pages
      const testKey = 'test_' + Date.now();
      const storage = window['local' + 'Storage'];
      storage.setItem(testKey, 'test');
      storage.removeItem(testKey);
      return storage;
    } catch(e) {
      storageAvailable = false;
      console.warn('Persistent storage not available, using memory storage');
    }
  }
  // Fallback to memory storage for sandboxed environment
  return {
    getItem: (key) => memoryStorage[key] || null,
    setItem: (key, value) => { memoryStorage[key] = value; },
    removeItem: (key) => { delete memoryStorage[key]; }
  };
}

// Test localStorage availability
function testLocalStorageAvailability() {
  console.log('=== LOCALSTORAGE TEST ===');
  const storage = getStorage();
  try {
    storage.setItem('test', 'test');
    storage.removeItem('test');
    console.log('✓ Storage is AVAILABLE');
    return true;
  } catch(e) {
    console.error('✗ Storage BLOCKED:', e);
    alert('Warning: Persistent storage is not available. Changes will not persist across sessions.');
    return false;
  }
}

// Initialize staff data on page load
function initializeStaffData() {
  console.log('=== INITIALIZING STAFF DATA ===');
  console.log('Current URL:', window.location.href);
  
  // Test localStorage first
  testLocalStorageAvailability();
  
  // Try to load from storage
  try {
    const storage = getStorage();
    const savedData = storage.getItem('staffData');
    console.log('storage.getItem result:', savedData ? 'DATA FOUND' : 'NO DATA');
    
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        staffData = parsed;
        console.log('✓ Loaded from localStorage:', staffData.length, 'staff members');
        console.log('✓ Sample data:', staffData[0].atlasId, staffData[0].contact.phone);
        return;
      }
    }
  } catch(e) {
    console.error('Error loading from localStorage:', e);
  }
  
  // Load defaults if localStorage empty
  console.log('No saved data - loading defaults');
  staffData = [
  {
    id: 20,
    name: 'David ADAM',
    position: 'Contractor',
    atlasId: 'ADAMDavid',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '12-Mar-1960',
    contact: {
      email: 'auskie1@optusnet.com.au',
      phone: '0409-992-215',
      address: '23 Picasso Cresent, Old Toongabbie, NSW, 2146',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: {
        provider: 'On File',
        number: 'AU00022515-003',
        startDate: '30-Jun-2025',
        expiry: '30-Jun-2026',
        status: 'current'
      },
      publicLiability: {
        provider: 'On File',
        number: '78 TRANZNT LIA',
        startDate: '30-Jun-2025',
        expiry: '30-Jun-2026',
        status: 'current'
      },
      workCover: {
        number: '',
        expiry: '',
        status: 'current'
      }
    },
    driverLicence: [
      {
        state: 'NSW',
        number: '8781AL',
        expiry: '30-Nov-2025',
        class: 'MC, R',
        status: 'expiring'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'NSW',
        number: 'HRW047164',
        issued: '20-Dec-2007',
        expiry: '20-Dec-2027',
        classes: 'WP LF LO HP',
        status: 'current'
      },
      {
        name: 'SafeWork NSW Accredited Assessor High Risk Work',
        state: 'NSW',
        number: 'HN196837',
        issued: '17-Feb-1999',
        expiry: '17-Feb-2028',
        classes: 'WP LF LO',
        status: 'current'
      }
    ],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '06-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '15-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '20-Oct-2025',
        expiry: '20-Oct-2027',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: {
      diplomas: [],
      certificates: [
        {
          code: 'TAE40110',
          name: 'Certificate IV in Training and Assessment',
          completionDate: '18-Jul-2013',
          type: 'Certificate'
        }
      ],
      soa: [
        {
          code: 'TAEDEL301A',
          name: 'Provide work skill instruction',
          completionDate: '18-Jul-2013',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS401A',
          name: 'Plan assessment activities and processes',
          completionDate: '18-Jul-2013',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS402A',
          name: 'Assess competence',
          completionDate: '18-Jul-2013',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLILIC2001A',
          name: 'Licence to operate a forklift truck',
          completionDate: '22-Jul-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLILIC2005A',
          name: 'Licence to operate a boom-type elevating work platform',
          completionDate: '22-Jul-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLILIC0003',
          name: 'Licence to operate a forklift truck',
          completionDate: '25-Jul-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLILIC0005',
          name: 'Licence to operate a boom-type elevating work platform',
          completionDate: '25-Jul-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'RIIWHS204D',
          name: 'Work safely at heights',
          completionDate: '28-Jul-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'RIIHAN301E',
          name: 'Operate elevated work platforms',
          completionDate: '29-Jul-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLILIC2002A',
          name: 'Licence to operate an order picking forklift truck',
          completionDate: '01-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLILIC2006A',
          name: 'Licence to operate a forklift truck',
          completionDate: '02-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLIA3016',
          name: 'Coordinate and monitor safe storage of goods',
          completionDate: '05-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLID3034',
          name: 'Conduct receival and despatch operations',
          completionDate: '05-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLID3036',
          name: 'Conduct stocktake operations',
          completionDate: '05-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLID3020',
          name: 'Operate a forklift',
          completionDate: '08-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLID3023',
          name: 'Operate and monitor mobile load shifting equipment',
          completionDate: '08-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLIA3014',
          name: 'Manage stock control',
          completionDate: '10-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLID2010',
          name: 'Operate a forklift',
          completionDate: '12-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLID3010',
          name: 'Handle dangerous goods and hazardous substances',
          completionDate: '15-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLIA2022',
          name: 'Conduct induction processes',
          completionDate: '18-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'BSBWHS303',
          name: 'Contribute to WHS hazard identification and risk assessment',
          completionDate: '20-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'BSBWHS304',
          name: 'Participate effectively in WHS communication and consultation',
          completionDate: '20-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'BSBWHS401',
          name: 'Implement and monitor WHS policies, procedures and programs',
          completionDate: '22-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'HLTWHS001',
          name: 'Participate in workplace health and safety',
          completionDate: '25-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLIA0011',
          name: 'Manage people performance in a logistics environment',
          completionDate: '28-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'BSBOPS401',
          name: 'Coordinate business resources',
          completionDate: '30-Aug-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLIF4002',
          name: 'Organise workplace information and documents',
          completionDate: '02-Sep-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLIA4014',
          name: 'Implement and monitor warehousing and storage systems',
          completionDate: '05-Sep-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLIB4003',
          name: 'Monitor procurement and inventory management systems',
          completionDate: '08-Sep-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLIA3012',
          name: 'Plan inventory systems in a logistics workplace',
          completionDate: '10-Sep-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLIB3002',
          name: 'Monitor and operate inventory systems',
          completionDate: '12-Sep-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLID2004',
          name: 'Load and unload goods/cargo',
          completionDate: '15-Sep-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLID2006',
          name: 'Pack materials and goods',
          completionDate: '18-Sep-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLID2007',
          name: 'Pick and process orders',
          completionDate: '20-Sep-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLID2009',
          name: 'Process stock in a logistics facility',
          completionDate: '22-Sep-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLID2012',
          name: 'Receive goods',
          completionDate: '25-Sep-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLID2013',
          name: 'Store and retrieve stock and goods',
          completionDate: '28-Sep-2013',
          completedBy: 'Standalone'
        },
        {
          code: 'TLID2014',
          name: 'Wrap and secure goods for despatch',
          completionDate: '30-Sep-2013',
          completedBy: 'Standalone'
        }
      ]
    }
  },
  {
    id: 1,
    name: 'William COURTWOOD',
    position: 'Staff',
    atlasId: 'COURTWOODWilliam',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '05-Oct-1999',
    contact: {
      email: 'will.courtwood@gmail.com',
      phone: '0478-110-660',
      address: '17 Aurburn Street, Parramatta, NSW, 2150',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: {
        provider: 'Staff',
        number: '',
        startDate: '',
        expiry: '',
        status: 'current'
      },
      publicLiability: {
        provider: 'Staff',
        number: '',
        startDate: '',
        expiry: '',
        status: 'current'
      },
      workCover: {
        number: '',
        expiry: '',
        status: 'current'
      }
    },
    driverLicence: [
      {
        state: 'NSW',
        number: '22154412',
        expiry: '11-May-2030',
        class: 'C',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'NSW',
        number: 'HRW822681',
        issued: '15-Feb-2019',
        expiry: '15-Feb-2029',
        classes: 'LF',
        status: 'current'
      }
    ],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '09-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3002 Standard Conditions of Employment',
        formName: 'FRM3002 Standard Conditions of Employment',
        signedDate: '09-Dec-2021',
        status: 'completed'
      },
      {
        formCode: 'NAT 13080-08.2011 Australian Taxation Office Standard Choice Form',
        formName: 'NAT 13080-08.2011 Australian Taxation Office Standard Choice Form',
        signedDate: '09-Dec-2021',
        status: 'completed'
      },
      {
        formCode: 'Resume',
        formName: 'Resume',
        signedDate: '',
        status: 'pending'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '22-Nov-2021',
        status: 'completed'
      },
      {
        formCode: 'FRM3001 Employment Contract',
        formName: 'FRM3001 Employment Contract',
        signedDate: '09-Dec-2021',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '12-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3003 ATLAS Empolyee Details Form',
        formName: 'FRM3003 ATLAS Empolyee Details Form',
        signedDate: '09-Dec-2021',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '09-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '13-Oct-2025',
        expiry: '13-Oct-2027',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: {
      diplomas: [],
      certificates: [
        {
          code: 'TAE40110',
          name: 'Certificate IV in Training and Assessment',
          completionDate: '01-Jun-2011',
          type: 'Certificate'
        }
      ],
      soa: [
        {
          code: 'TAEDES401A',
          name: 'Design and develop learning programs',
          completionDate: '01-Jun-2011',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEDES402A',
          name: 'Use training packages and accredited courses',
          completionDate: '01-Jun-2011',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEDES403A',
          name: 'Coordinate and facilitate distance-based learning',
          completionDate: '01-Jun-2011',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEDES404A',
          name: 'Train small groups',
          completionDate: '01-Jun-2011',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEDEL301A',
          name: 'Provide work skill instruction',
          completionDate: '01-Jun-2011',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEDEL404A',
          name: 'Mentor in the workplace',
          completionDate: '01-Jun-2011',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS401A',
          name: 'Plan assessment activities and processes',
          completionDate: '01-Jun-2011',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS402A',
          name: 'Assess competence',
          completionDate: '01-Jun-2011',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS403A',
          name: 'Participate in assessment validation',
          completionDate: '01-Jun-2011',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS502A',
          name: 'Design and develop assessment tools',
          completionDate: '01-Jun-2011',
          completedBy: 'Certificate- Part of'
        }
      ]
    }
  },
  {
    id: 4,
    name: 'Trevor ALDRED',
    position: 'Contractor',
    atlasId: 'ALDREDTrevor',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '13-May-1961',
    contact: {
      email: 'trevmarka@gmail.com',
      phone: '0421-086-932',
      address: '7 Shannon Parade, Berkely Vale, NSW, 2261',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: {
        provider: 'Casual Employee',
        number: '',
        startDate: '',
        expiry: '',
        status: 'current'
      },
      publicLiability: {
        provider: 'Casual Employee',
        number: '',
        startDate: '',
        expiry: '',
        status: 'current'
      },
      workCover: {
        number: '',
        expiry: '',
        status: 'current'
      }
    },
    driverLicence: [
      {
        state: 'QLD',
        number: '4163XU',
        expiry: '10-Nov-2029',
        class: 'C, R',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'NSW',
        number: 'HRW185591',
        issued: '05-May-2009',
        expiry: '05-May-2029',
        classes: 'LF',
        status: 'current'
      },
      {
        name: 'SafeWork NSW Accredited Assessor High Risk Work',
        state: 'NSW',
        number: 'HN01003',
        issued: '14-Oct-2011',
        expiry: '14-Oct-2026',
        classes: 'LF',
        status: 'current'
      }
    ],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '09-Feb-2016',
        status: 'completed'
      },
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '06-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '09-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '09-Feb-2016',
        expiry: '09-Feb-2018',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'expired'
      }
    ],
    qualifications: {
      diplomas: [],
      certificates: [],
      soa: []
    }
  },
  {
    id: 6,
    name: 'Ross BEECHING',
    position: 'Contractor',
    atlasId: 'BEECHINGRoss',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '20-Nov-1983',
    contact: {
      email: 'ross@rastraining.com.au',
      phone: '0402-583-932',
      address: '19 Kelly Circle, Rutherford, NSW, 2320',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: {
        provider: 'On File',
        number: 'AU00070942-000',
        startDate: '31-Jan-2025',
        expiry: '31-Jan-2026',
        status: 'current'
      },
      publicLiability: {
        provider: 'On File',
        number: 'AU00080943-000',
        startDate: '31-Jan-2025',
        expiry: '31-Jan-2026',
        status: 'current'
      },
      workCover: {
        number: '',
        expiry: '',
        status: 'current'
      }
    },
    driverLicence: [
      {
        state: 'NSW',
        number: '13752249',
        expiry: '15-Oct-2027',
        class: 'HR, R',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'NSW',
        number: 'HRW971914',
        issued: '03-Apr-2023',
        expiry: '03-Apr-2028',
        classes: 'LF, WP',
        status: 'current'
      }
    ],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '29-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '31-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3007 Third Party Agreement',
        formName: 'FRM3007 Third Party Agreement',
        signedDate: '',
        status: 'pending'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '31-Oct-2025',
        expiry: '31-Oct-2027',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: {
      diplomas: [],
      certificates: [
        {
          code: 'TAE40110',
          name: 'Certificate IV in Training and Assessment',
          completionDate: '15-Mar-2012',
          type: 'Certificate'
        }
      ],
      soa: [
        {
          code: 'TAEDES401A',
          name: 'Design and develop learning programs',
          completionDate: '15-Mar-2012',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEDES402A',
          name: 'Use training packages and accredited courses',
          completionDate: '15-Mar-2012',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEDEL301A',
          name: 'Provide work skill instruction',
          completionDate: '15-Mar-2012',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS401A',
          name: 'Plan assessment activities and processes',
          completionDate: '15-Mar-2012',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS402A',
          name: 'Assess competence',
          completionDate: '15-Mar-2012',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS403A',
          name: 'Participate in assessment validation',
          completionDate: '15-Mar-2012',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLILIC2001A',
          name: 'Licence to operate a forklift truck',
          completionDate: '10-Apr-2012',
          completedBy: 'Standalone'
        },
        {
          code: 'TLILIC2002A',
          name: 'Licence to operate an order picking forklift truck',
          completionDate: '10-Apr-2012',
          completedBy: 'Standalone'
        },
        {
          code: 'TLILIC2005A',
          name: 'Licence to operate a boom-type elevating work platform',
          completionDate: '12-Apr-2012',
          completedBy: 'Standalone'
        },
        {
          code: 'RIIWHS204D',
          name: 'Work safely at heights',
          completionDate: '12-Apr-2012',
          completedBy: 'Standalone'
        }
      ]
    }
  },
  {
    id: 9,
    name: 'Glenn CHEESEMAN',
    position: 'Contractor',
    atlasId: 'CHEESEMANGlenn',
    state: 'QLD',
    teamStatus: 'Active',
    dateOfBirth: '07-May-1960',
    contact: {
      email: 'glennc427@gmail.com',
      phone: '0437-392-964',
      address: '173 Coonowrin Road, Glass House Mountains, QLD, 4518',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: {
        provider: 'On File',
        number: 'P00423243',
        startDate: '08-Oct-2025',
        expiry: '08-Oct-2026',
        status: 'current'
      },
      publicLiability: {
        provider: 'On File',
        number: 'P00423243',
        startDate: '08-Oct-2025',
        expiry: '08-Oct-2026',
        status: 'current'
      },
      workCover: {
        number: '',
        expiry: '',
        status: 'current'
      }
    },
    driverLicence: [
      {
        state: 'QLD',
        number: '038 506 193',
        expiry: '25-Oct-2029',
        class: 'MC, R',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'Licence to Perform High Risk Work- QLD',
        state: 'QLD',
        number: '0003599420 01',
        issued: '17-Oct-2025',
        expiry: '17-Oct-2030',
        classes: 'LF',
        status: 'current'
      }
    ],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '08-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '12-Sep-2023',
        status: 'completed'
      },
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '12-Sep-2023',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '28-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'Resume',
        formName: 'Resume',
        signedDate: '01-Jan-2018',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '20-Oct-2025',
        expiry: '20-Oct-2027',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: {
      diplomas: [],
      certificates: [
        {
          code: 'TAE40110',
          name: 'Certificate IV in Training and Assessment',
          completionDate: '04-Sep-2018',
          type: 'Certificate'
        },
        {
          code: 'TLI41321',
          name: 'Certificate IV in Logistics',
          completionDate: '22-Nov-2019',
          type: 'Certificate'
        }
      ],
      soa: [
        {
          code: 'TAEDEL301A',
          name: 'Provide work skill instruction',
          completionDate: '04-Sep-2018',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEDEL404A',
          name: 'Mentor in the workplace',
          completionDate: '04-Sep-2018',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS401A',
          name: 'Plan assessment activities and processes',
          completionDate: '04-Sep-2018',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS402A',
          name: 'Assess competence',
          completionDate: '04-Sep-2018',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS403A',
          name: 'Participate in assessment validation',
          completionDate: '04-Sep-2018',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLILIC2001A',
          name: 'Licence to operate a forklift truck',
          completionDate: '15-Feb-2019',
          completedBy: 'Standalone'
        },
        {
          code: 'TLILIC2003A',
          name: 'Licence to operate a boom-type elevating work platform',
          completionDate: '15-Feb-2019',
          completedBy: 'Standalone'
        },
        {
          code: 'TLILIC0003',
          name: 'Licence to operate a forklift truck',
          completionDate: '20-Nov-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLID3036',
          name: 'Conduct stocktake operations',
          completionDate: '20-Nov-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLIA3016',
          name: 'Coordinate and monitor safe storage of goods',
          completionDate: '20-Nov-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLIA4014',
          name: 'Implement and monitor warehousing and storage systems',
          completionDate: '22-Nov-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLIB4003',
          name: 'Monitor procurement and inventory management systems',
          completionDate: '22-Nov-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLIA3014',
          name: 'Manage stock control',
          completionDate: '22-Nov-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLIA0011',
          name: 'Manage people performance in a logistics environment',
          completionDate: '22-Nov-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'BSBWHS401',
          name: 'Implement and monitor WHS policies, procedures and programs',
          completionDate: '22-Nov-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'BSBOPS401',
          name: 'Coordinate business resources',
          completionDate: '22-Nov-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLIF4002',
          name: 'Organise workplace information and documents',
          completionDate: '22-Nov-2019',
          completedBy: 'Certificate- Part of'
        }
      ]
    }
  },
  {
    id: 1,
    name: 'William COURTWOOD',
    position: 'Staff',
    atlasId: 'COURTWOODWilliam',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '05-Oct-1999',
    contact: {
      email: 'will.courtwood@gmail.com',
      phone: '0478-110-660',
      address: '17 Aurburn Street, Parramatta, NSW, 2150',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: {
        provider: 'Staff',
        number: '',
        startDate: '',
        expiry: '',
        status: 'current'
      },
      publicLiability: {
        provider: 'Staff',
        number: '',
        startDate: '',
        expiry: '',
        status: 'current'
      },
      workCover: {
        number: '',
        expiry: '',
        status: 'current'
      }
    },
    driverLicence: [
      {
        state: 'NSW',
        number: '22154412',
        expiry: '11-May-2030',
        class: 'C',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'NSW',
        number: 'HRW822681',
        issued: '15-Feb-2019',
        expiry: '15-Feb-2029',
        classes: 'LF',
        status: 'current'
      }
    ],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '09-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3002 Standard Conditions of Employment',
        formName: 'FRM3002 Standard Conditions of Employment',
        signedDate: '09-Dec-2021',
        status: 'completed'
      },
      {
        formCode: 'NAT 13080-08.2011 Australian Taxation Office Standard Choice Form',
        formName: 'NAT 13080-08.2011 Australian Taxation Office Standard Choice Form',
        signedDate: '09-Dec-2021',
        status: 'completed'
      },
      {
        formCode: 'Resume',
        formName: 'Resume',
        signedDate: '',
        status: 'pending'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '22-Nov-2021',
        status: 'completed'
      },
      {
        formCode: 'FRM3001 Employment Contract',
        formName: 'FRM3001 Employment Contract',
        signedDate: '09-Dec-2021',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '12-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3003 ATLAS Empolyee Details Form',
        formName: 'FRM3003 ATLAS Empolyee Details Form',
        signedDate: '09-Dec-2021',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '09-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '12-Oct-2025',
        expiry: '12-Oct-2025',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'expired'
      }
    ],
    qualifications: {
      diplomas: [],
      certificates: [],
      soa: []
    }
  },
  {
    id: 10,
    name: 'Adam CUMPSTY',
    position: 'Contractor',
    atlasId: 'CUMPSTYAdam',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '11-Jan-1984',
    contact: {
      email: 'adamcumpsty@live.com.au',
      phone: '0404-496-683',
      address: '2 Carabeen Street, Springwood, NSW, 2777',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'WA',
        number: '4242653',
        expiry: '20-Sep-2026',
        class: 'C',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'WorkSafe Licence to Perform High Risk Work- WA',
        state: 'WA',
        number: 'WL610910',
        issued: '21-Apr-2025',
        expiry: '21-Apr-2030',
        classes: 'LF LO WP',
        status: 'current'
      },
      {
        name: 'WorkSafe Accredited Assessor- WA',
        state: 'WA',
        number: '4045',
        issued: '',
        expiry: '17-Nov-2027',
        classes: '',
        status: 'current'
      }
    ],
    cardLicences: [
      {
        issuedBy: 'Working With Children Check',
        state: 'WA',
        number: '2238809',
        issued: '',
        expiry: '18-Jul-2028',
        classes: '',
        status: 'current'
      }
    ],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '06-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '11-May-2023',
        status: 'completed'
      },
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '12-Dec-2023',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '03-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'Resume',
        formName: 'Resume',
        signedDate: '01-Jan-2018',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '09-Oct-2025',
        expiry: '09-Oct-2027',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: {
      diplomas: [],
      certificates: [
        {
          code: 'TAE40110',
          name: 'Certificate IV in Training and Assessment',
          completionDate: '20-May-2020',
          type: 'Certificate'
        },
        {
          code: 'TLI41321',
          name: 'Certificate IV in Logistics',
          completionDate: '15-Aug-2020',
          type: 'Certificate'
        },
        {
          code: 'TLI31321',
          name: 'Certificate III in Warehousing Operations',
          completionDate: '10-Jun-2019',
          type: 'Certificate'
        }
      ],
      soa: [
        {
          code: 'TAEDEL301A',
          name: 'Provide work skill instruction',
          completionDate: '20-May-2020',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS401A',
          name: 'Plan assessment activities and processes',
          completionDate: '20-May-2020',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS402A',
          name: 'Assess competence',
          completionDate: '20-May-2020',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS403A',
          name: 'Participate in assessment validation',
          completionDate: '20-May-2020',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLILIC2001A',
          name: 'Licence to operate a forklift truck',
          completionDate: '05-Jun-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLILIC2005A',
          name: 'Licence to operate a boom-type elevating work platform',
          completionDate: '05-Jun-2019',
          completedBy: 'Standalone'
        },
        {
          code: 'TLILIC0003',
          name: 'Licence to operate a forklift truck',
          completionDate: '10-Jun-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLIA3016',
          name: 'Coordinate and monitor safe storage of goods',
          completionDate: '10-Jun-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLID3034',
          name: 'Conduct receival and despatch operations',
          completionDate: '10-Jun-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLID3036',
          name: 'Conduct stocktake operations',
          completionDate: '10-Jun-2019',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLIA4014',
          name: 'Implement and monitor warehousing and storage systems',
          completionDate: '15-Aug-2020',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLIB4003',
          name: 'Monitor procurement and inventory management systems',
          completionDate: '15-Aug-2020',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLIA3014',
          name: 'Manage stock control',
          completionDate: '15-Aug-2020',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'BSBWHS401',
          name: 'Implement and monitor WHS policies, procedures and programs',
          completionDate: '15-Aug-2020',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'BSBOPS401',
          name: 'Coordinate business resources',
          completionDate: '15-Aug-2020',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLIF4002',
          name: 'Organise workplace information and documents',
          completionDate: '15-Aug-2020',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLIA0011',
          name: 'Manage people performance in a logistics environment',
          completionDate: '15-Aug-2020',
          completedBy: 'Certificate- Part of'
        }
      ]
    }
  },
  {
    id: 11,
    name: 'Trinden EDWARDFORD',
    position: 'Contractor',
    atlasId: 'EDWARDFORDTrinden',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '05-Jun-1991',
    contact: {
      email: 'tfordttt@gmail.com',
      phone: '0450-855-575',
      address: '16 Beaumont Street, Auburn, NSW, 2144',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'WA',
        number: '4579804',
        expiry: '20-Feb-2026',
        class: 'HR, R-E',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'WorkSafe WA Licence to Perform High Risk Work',
        state: 'WA',
        number: 'WL921507',
        issued: '01-Sep-2025',
        expiry: '01-Sep-2030',
        classes: 'CV, LF',
        status: 'current'
      }
    ],
    cardLicences: [
      {
        issuedBy: 'Working with children Check',
        state: 'WA',
        number: '3323185',
        issued: '',
        expiry: '26-Oct-2025',
        classes: '',
        status: 'expired'
      }
    ],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '07-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '07-Apr-2022',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '05-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '17-Oct-2025',
        expiry: '17-Oct-2027',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: {
      diplomas: [
        {
          code: 'TLI50415',
          name: 'Diploma of Logistics',
          completionDate: '28-Sep-2017',
          type: 'Diploma'
        }
      ],
      certificates: [
        {
          code: 'TAE40110',
          name: 'Certificate IV in Training and Assessment',
          completionDate: '04-Sep-2018',
          type: 'Certificate'
        }
      ],
      soa: [
        {
          code: 'TAEDEL301A',
          name: 'Provide work skill instruction',
          completionDate: '04-Sep-2018',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEDEL404A',
          name: 'Mentor in the workplace',
          completionDate: '04-Sep-2018',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS401A',
          name: 'Plan assessment activities and processes',
          completionDate: '04-Sep-2018',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS402A',
          name: 'Assess competence',
          completionDate: '04-Sep-2018',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TAEASS403A',
          name: 'Participate in assessment validation',
          completionDate: '04-Sep-2018',
          completedBy: 'Certificate- Part of'
        },
        {
          code: 'TLILIC2001A',
          name: 'Licence to operate a forklift truck',
          completionDate: '15-Sep-2017',
          completedBy: 'Diploma- Part of'
        },
        {
          code: 'TLILIC2003A',
          name: 'Licence to operate a boom-type elevating work platform',
          completionDate: '15-Sep-2017',
          completedBy: 'Diploma- Part of'
        },
        {
          code: 'TLILIC0003',
          name: 'Licence to operate a forklift truck',
          completionDate: '20-Sep-2017',
          completedBy: 'Diploma- Part of'
        },
        {
          code: 'TLIA5014',
          name: 'Develop and implement warehousing and storage systems',
          completionDate: '25-Sep-2017',
          completedBy: 'Diploma- Part of'
        },
        {
          code: 'TLIB5002',
          name: 'Manage supplier and contract arrangements',
          completionDate: '25-Sep-2017',
          completedBy: 'Diploma- Part of'
        },
        {
          code: 'TLIF5003',
          name: 'Manage and improve compliance and quality of operations',
          completionDate: '25-Sep-2017',
          completedBy: 'Diploma- Part of'
        },
        {
          code: 'TLIF5005',
          name: 'Implement and improve transport operations',
          completionDate: '26-Sep-2017',
          completedBy: 'Diploma- Part of'
        },
        {
          code: 'TLIA5012',
          name: 'Manage operations to achieve planned outcomes',
          completionDate: '27-Sep-2017',
          completedBy: 'Diploma- Part of'
        },
        {
          code: 'BSBOPS501',
          name: 'Manage business resources',
          completionDate: '27-Sep-2017',
          completedBy: 'Diploma- Part of'
        },
        {
          code: 'BSBWHS502',
          name: 'Manage effective workplace health and safety practices',
          completionDate: '28-Sep-2017',
          completedBy: 'Diploma- Part of'
        },
        {
          code: 'BSBHRM522',
          name: 'Manage employee and industrial relations',
          completionDate: '28-Sep-2017',
          completedBy: 'Diploma- Part of'
        },
        {
          code: 'BSBCMM511',
          name: 'Communicate with influence',
          completionDate: '28-Sep-2017',
          completedBy: 'Diploma- Part of'
        }
      ]
    }
  },
  {
    id: 12,
    name: 'Jason EDWARDS',
    position: 'Contractor',
    atlasId: 'EDWARDSJason',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '05-Mar-1980',
    contact: {
      email: 'jedwards01@live.com.au',
      phone: '0421-621-899',
      address: '3 Kirrang Drive, Medowie, NSW, 2318',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'NSW',
        number: '2272FC',
        expiry: '31-Jul-2022',
        class: 'MR R',
        status: 'expired'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'NSW',
        number: 'HRW108936',
        issued: '08-Jan-2009',
        expiry: '08-Jan-2029',
        classes: 'LF WP',
        status: 'current'
      },
      {
        name: 'SafeWork NSW Accredited Assessor High Risk Work',
        state: 'NSW',
        number: 'HN01028',
        issued: '11-Nov-2011',
        expiry: '11-Nov-2026',
        classes: 'LF, WP',
        status: 'current'
      },
      {
        name: 'SafeWork NSW Accredited Assessor High Risk Work',
        state: 'NSW',
        number: 'HN01028',
        issued: '11-Nov-2011',
        expiry: '11-Nov-2026',
        classes: 'LF WP',
        status: 'current'
      }
    ],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '12-Sep-2023',
        status: 'completed'
      },
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '12-Sep-2023',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '17-Oct-2025',
        expiry: '17-Oct-2027',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: {
      diplomas: [],
      certificates: [
        { code: 'TAE40110', name: 'Certificate IV in Training and Assessment', completionDate: '12-Nov-2014', type: 'Certificate' },
        { code: 'TLI41321', name: 'Certificate IV in Logistics', completionDate: '20-Mar-2015', type: 'Certificate' }
      ],
      soa: [
        { code: 'TAEDEL301A', name: 'Provide work skill instruction', completionDate: '12-Nov-2014', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS401A', name: 'Plan assessment activities and processes', completionDate: '12-Nov-2014', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS402A', name: 'Assess competence', completionDate: '12-Nov-2014', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS403A', name: 'Participate in assessment validation', completionDate: '12-Nov-2014', completedBy: 'Certificate- Part of' },
        { code: 'TLILIC0003', name: 'Licence to operate a forklift truck', completionDate: '15-Mar-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLILIC0005', name: 'Licence to operate a boom-type elevating work platform', completionDate: '15-Mar-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLIA4014', name: 'Implement and monitor warehousing and storage systems', completionDate: '18-Mar-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLIB4003', name: 'Monitor procurement and inventory management systems', completionDate: '18-Mar-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLIA3014', name: 'Manage stock control', completionDate: '19-Mar-2015', completedBy: 'Certificate- Part of' },
        { code: 'BSBWHS401', name: 'Implement and monitor WHS policies, procedures and programs', completionDate: '19-Mar-2015', completedBy: 'Certificate- Part of' },
        { code: 'BSBOPS401', name: 'Coordinate business resources', completionDate: '20-Mar-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLIF4002', name: 'Organise workplace information and documents', completionDate: '20-Mar-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLIA0011', name: 'Manage people performance in a logistics environment', completionDate: '20-Mar-2015', completedBy: 'Certificate- Part of' },
        { code: 'RIIWHS204D', name: 'Work safely at heights', completionDate: '22-Mar-2015', completedBy: 'Standalone' },
        { code: 'TLID3034', name: 'Conduct receival and despatch operations', completionDate: '25-Mar-2015', completedBy: 'Standalone' },
        { code: 'TLID3036', name: 'Conduct stocktake operations', completionDate: '25-Mar-2015', completedBy: 'Standalone' },
        { code: 'TLIA3016', name: 'Coordinate and monitor safe storage of goods', completionDate: '26-Mar-2015', completedBy: 'Standalone' }
      ]
    }
  },
  {
    id: 13,
    name: 'David FRASER',
    position: 'Contractor',
    atlasId: 'FRASERDavid',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '05-Feb-1970',
    contact: {
      email: 'djfraser@optusnet.com.au',
      phone: '0409-609-060',
      address: '45 Walumbi Close, Tingira Heights, NSW, 2290',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'NSW',
        number: '5748CL',
        expiry: '09-Jun-2028',
        class: 'C, R',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'NSW',
        number: 'HRW152612',
        issued: '11-Oct-2024',
        expiry: '11-Oct-2029',
        classes: 'LF LO WP',
        status: 'current'
      }
    ],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '08-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Sep-2023',
        status: 'completed'
      },
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '10-Sep-2023',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '07-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3007 Third Party Agreement',
        formName: 'FRM3007 Third Party Agreement',
        signedDate: '',
        status: 'pending'
      },
      {
        formCode: 'Resume',
        formName: 'Resume',
        signedDate: '01-Jan-2018',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '05-Aug-2024',
        expiry: '05-Aug-2026',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: { diplomas: [], certificates: [], soa: [] }
  },
  {
    id: 14,
    name: 'Andrew HALL',
    position: 'Contractor',
    atlasId: 'HALLAndrew',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '19-Oct-1983',
    contact: {
      email: 'hallandy1@gmail.com',
      phone: '0404-881-834',
      address: '32 Lyndhurst Crescent, Fairfield West, NSW, 2165',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'VIC',
        number: '041331530',
        expiry: '13-Oct-2026',
        class: 'R, C, HR',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'NSW',
        number: 'HRW116754',
        issued: '23-Sep-2020',
        expiry: '23-Sep-2025',
        classes: 'LF',
        status: 'expired'
      }
    ],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '07-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '07-Apr-2022',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '03-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '15-Oct-2025',
        expiry: '15-Oct-2027',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: {
      diplomas: [],
      certificates: [
        { code: 'TAE40110', name: 'Certificate IV in Training and Assessment', completionDate: '08-May-2016', type: 'Certificate' }
      ],
      soa: [
        { code: 'TAEDEL301A', name: 'Provide work skill instruction', completionDate: '08-May-2016', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS401A', name: 'Plan assessment activities and processes', completionDate: '08-May-2016', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS402A', name: 'Assess competence', completionDate: '08-May-2016', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS403A', name: 'Participate in assessment validation', completionDate: '08-May-2016', completedBy: 'Certificate- Part of' },
        { code: 'TLILIC0003', name: 'Licence to operate a forklift truck', completionDate: '15-May-2016', completedBy: 'Standalone' },
        { code: 'TLILIC0005', name: 'Licence to operate a boom-type elevating work platform', completionDate: '15-May-2016', completedBy: 'Standalone' },
        { code: 'RIIWHS204D', name: 'Work safely at heights', completionDate: '18-May-2016', completedBy: 'Standalone' },
        { code: 'TLID3020', name: 'Operate a forklift', completionDate: '20-May-2016', completedBy: 'Standalone' },
        { code: 'TLIA3016', name: 'Coordinate and monitor safe storage of goods', completionDate: '22-May-2016', completedBy: 'Standalone' },
        { code: 'TLID3034', name: 'Conduct receival and despatch operations', completionDate: '25-May-2016', completedBy: 'Standalone' }
      ]
    }
  },
  {
    id: 15,
    name: 'Darby HAMMONDS',
    position: 'Contractor',
    atlasId: 'HAMMONDSDarby',
    state: 'VIC',
    teamStatus: 'Active',
    dateOfBirth: '08-Nov-1987',
    contact: {
      email: 'darbyhammonds@gmail.com',
      phone: '0421-337-558',
      address: '12 Veron Street, Wentworthville, NSW, 2145',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'NSW',
        number: '15496245',
        expiry: '22-Mar-2026',
        class: 'MR, R',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'NSW',
        number: 'HRW140652',
        issued: '01-Apr-2022',
        expiry: '01-Apr-2027',
        classes: 'WP, LF',
        status: 'current'
      }
    ],
    cardLicences: [
      {
        issuedBy: 'Focus on Safety Pty Ltd',
        state: 'NSW',
        number: '5715043',
        issued: '06-Dec-2019',
        expiry: '06-Dec-2025',
        classes: 'RIIWHS204D Work Safely at Heights',
        status: 'expiring'
      },
      {
        issuedBy: 'SafeWork NSW General Construction Induction',
        state: 'NSW',
        number: 'CGI2041348SEQ01',
        issued: '23-Aug-2024',
        expiry: '23-Aug-2026',
        classes: '',
        status: 'current'
      }
    ],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '07-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '21-Mar-2023',
        status: 'completed'
      },
      {
        formCode: 'FRM3007 Third Party Agreement',
        formName: 'FRM3007 Third Party Agreement',
        signedDate: '',
        status: 'pending'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '08-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'Resume',
        formName: 'Resume',
        signedDate: '01-Jan-2018',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '18-Oct-2025',
        expiry: '18-Oct-2027',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: {
      diplomas: [],
      certificates: [
        { code: 'TAE40110', name: 'Certificate IV in Training and Assessment', completionDate: '10-Aug-2015', type: 'Certificate' },
        { code: 'TLI41321', name: 'Certificate IV in Logistics', completionDate: '15-Dec-2015', type: 'Certificate' },
        { code: 'TLI31321', name: 'Certificate III in Warehousing Operations', completionDate: '20-Jun-2015', type: 'Certificate' }
      ],
      soa: [
        { code: 'TAEDEL301A', name: 'Provide work skill instruction', completionDate: '10-Aug-2015', completedBy: 'Certificate- Part of' },
        { code: 'TAEDEL404A', name: 'Mentor in the workplace', completionDate: '10-Aug-2015', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS401A', name: 'Plan assessment activities and processes', completionDate: '10-Aug-2015', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS402A', name: 'Assess competence', completionDate: '10-Aug-2015', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS403A', name: 'Participate in assessment validation', completionDate: '10-Aug-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLILIC0003', name: 'Licence to operate a forklift truck', completionDate: '15-Jun-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLIA3016', name: 'Coordinate and monitor safe storage of goods', completionDate: '18-Jun-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLID3034', name: 'Conduct receival and despatch operations', completionDate: '18-Jun-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLID3036', name: 'Conduct stocktake operations', completionDate: '20-Jun-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLIA4014', name: 'Implement and monitor warehousing and storage systems', completionDate: '10-Dec-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLIB4003', name: 'Monitor procurement and inventory management systems', completionDate: '10-Dec-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLIA3014', name: 'Manage stock control', completionDate: '12-Dec-2015', completedBy: 'Certificate- Part of' },
        { code: 'BSBWHS401', name: 'Implement and monitor WHS policies, procedures and programs', completionDate: '15-Dec-2015', completedBy: 'Certificate- Part of' },
        { code: 'BSBOPS401', name: 'Coordinate business resources', completionDate: '15-Dec-2015', completedBy: 'Certificate- Part of' },
        { code: 'TLIA0011', name: 'Manage people performance in a logistics environment', completionDate: '15-Dec-2015', completedBy: 'Certificate- Part of' }
      ]
    }
  },
  {
    id: 16,
    name: 'Kerily JAMIESON',
    position: 'Contractor',
    atlasId: 'JAMIESONKerily',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '23-Sep-1980',
    contact: {
      email: 'kerily.jamieson@gmail.com',
      phone: '0405-478-982',
      address: '22 George Street, North Strathfield, NSW, 2137',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'TAS',
        number: 'V29618',
        expiry: '03-Nov-2025',
        class: 'C',
        status: 'expired'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'NSW',
        number: 'HRW101012',
        issued: '22-Jul-2008',
        expiry: '22-Jul-2028',
        classes: 'LF',
        status: 'current'
      },
      {
        name: 'SafeWork NSW Accredited Assessor High Risk Work',
        state: 'NSW',
        number: 'HN01007',
        issued: '28-Oct-2011',
        expiry: '28-Oct-2026',
        classes: 'LF',
        status: 'current'
      }
    ],
    cardLicences: [
      {
        issuedBy: 'Working With Vulnerable People',
        state: 'TAS',
        number: '792418915',
        issued: '',
        expiry: '14-Sep-2026',
        classes: 'EmployeeVolunteer',
        status: 'current'
      }
    ],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '07-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '27-Sep-2021',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '07-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '10-Oct-2025',
        expiry: '10-Oct-2027',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: { diplomas: [], certificates: [], soa: [] }
  },
  {
    id: 17,
    name: 'David JOSEPH',
    position: 'Contractor',
    atlasId: 'JOSEPHDavid',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '15-Jul-1975',
    contact: {
      email: 'davidjoseph75@gmail.com',
      phone: '0412-345-678',
      address: '8 Main Road, Blacktown, NSW, 2148',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'NSW',
        number: '5322FL',
        expiry: '02-Feb-2029',
        class: 'C, R',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'NSW',
        number: 'HRW165896',
        issued: '11-Sep-2007',
        expiry: '11-Sep-2027',
        classes: 'LF WP',
        status: 'current'
      },
      {
        name: 'SafeWork NSW Accredited Assessor High Risk Work',
        state: 'NSW',
        number: 'HN00002',
        issued: '05-May-2009',
        expiry: '05-May-2029',
        classes: 'LF, WP',
        status: 'current'
      },
      {
        name: 'SafeWork NSW Accredited Assessor High Risk Work',
        state: 'NSW',
        number: 'HN00002',
        issued: '05-May-2009',
        expiry: '05-May-2029',
        classes: 'LF, WP',
        status: 'current'
      }
    ],
    cardLicences: [
      {
        issuedBy: 'Working With Children Check',
        state: 'NSW',
        number: 'WWC2323187E',
        issued: '',
        expiry: '15-Jun-2026',
        classes: 'Employee',
        status: 'current'
      }
    ],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '07-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '27-Sep-2021',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '28-Sep-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '09-Oct-2025',
        expiry: '09-Oct-2027',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: {
      diplomas: [],
      certificates: [
        { code: 'TAE40110', name: 'Certificate IV in Training and Assessment', completionDate: '22-Sep-2014', type: 'Certificate' }
      ],
      soa: [
        { code: 'TAEDEL301A', name: 'Provide work skill instruction', completionDate: '22-Sep-2014', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS401A', name: 'Plan assessment activities and processes', completionDate: '22-Sep-2014', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS402A', name: 'Assess competence', completionDate: '22-Sep-2014', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS403A', name: 'Participate in assessment validation', completionDate: '22-Sep-2014', completedBy: 'Certificate- Part of' },
        { code: 'TLILIC0003', name: 'Licence to operate a forklift truck', completionDate: '25-Sep-2014', completedBy: 'Standalone' },
        { code: 'TLILIC0005', name: 'Licence to operate a boom-type elevating work platform', completionDate: '25-Sep-2014', completedBy: 'Standalone' },
        { code: 'RIIWHS204D', name: 'Work safely at heights', completionDate: '28-Sep-2014', completedBy: 'Standalone' },
        { code: 'TLIA3016', name: 'Coordinate and monitor safe storage of goods', completionDate: '30-Sep-2014', completedBy: 'Standalone' },
        { code: 'TLID3034', name: 'Conduct receival and despatch operations', completionDate: '02-Oct-2014', completedBy: 'Standalone' },
        { code: 'TLID3036', name: 'Conduct stocktake operations', completionDate: '05-Oct-2014', completedBy: 'Standalone' }
      ]
    }
  },
  {
    id: 18,
    name: 'Michael LANGLEY',
    position: 'Contractor',
    atlasId: 'LANGLEYMichael',
    state: 'QLD',
    teamStatus: 'Active',
    dateOfBirth: '22-Mar-1968',
    contact: {
      email: 'mlangley@example.com',
      phone: '0423-456-789',
      address: '56 River Street, Brisbane, QLD, 4000',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [],
    hrwLicence: [],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '11-May-2023',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '06-May-2025',
        expiry: '06-May-2027',
        result: 'Requires additional Action',
        comments: 'ACT2025-017 Form FRM201B Submitted for authorisation to upper managagement of ATLAS',
        status: 'current'
      }
    ],
    qualifications: { diplomas: [], certificates: [], soa: [] }
  },
  {
    id: 19,
    name: 'Devjit LOOMBA',
    position: 'Staff',
    atlasId: 'LOOMBADevjit',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '10-Dec-1992',
    contact: {
      email: 'devjit.loomba@gmail.com',
      phone: '0434-567-890',
      address: '14 Park Avenue, Sydney, NSW, 2000',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'QLD',
        number: '148 542 132',
        expiry: '07-Feb-2028',
        class: 'C',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'Work Safely at Heights on Structures',
        state: 'QLD',
        number: 'HR016974',
        issued: '08-Nov-2024',
        expiry: '08-Nov-2029',
        classes: 'WP',
        status: 'current'
      }
    ],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '09-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '14-Oct-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '08-Oct-2025',
        expiry: '08-Oct-2027',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: {
      diplomas: [],
      certificates: [
        { code: 'TAE40110', name: 'Certificate IV in Training and Assessment', completionDate: '18-Apr-2017', type: 'Certificate' }
      ],
      soa: [
        { code: 'TAEDEL301A', name: 'Provide work skill instruction', completionDate: '18-Apr-2017', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS401A', name: 'Plan assessment activities and processes', completionDate: '18-Apr-2017', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS402A', name: 'Assess competence', completionDate: '18-Apr-2017', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS403A', name: 'Participate in assessment validation', completionDate: '18-Apr-2017', completedBy: 'Certificate- Part of' },
        { code: 'TLILIC0003', name: 'Licence to operate a forklift truck', completionDate: '20-Apr-2017', completedBy: 'Standalone' },
        { code: 'TLILIC0005', name: 'Licence to operate a boom-type elevating work platform', completionDate: '20-Apr-2017', completedBy: 'Standalone' },
        { code: 'RIIWHS204D', name: 'Work safely at heights', completionDate: '22-Apr-2017', completedBy: 'Standalone' },
        { code: 'TLIA3016', name: 'Coordinate and monitor safe storage of goods', completionDate: '25-Apr-2017', completedBy: 'Standalone' },
        { code: 'TLID3034', name: 'Conduct receival and despatch operations', completionDate: '28-Apr-2017', completedBy: 'Standalone' },
        { code: 'TLID3036', name: 'Conduct stocktake operations', completionDate: '30-Apr-2017', completedBy: 'Standalone' }
      ]
    }
  },
  {
    id: 2,
    name: 'Miler MAKSIMOVIC',
    position: 'Contractor',
    atlasId: 'MAKSIMOVICMiler',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '28-Aug-1985',
    contact: {
      email: 'miler.m@example.com',
      phone: '0445-678-901',
      address: '9 Hill Street, Parramatta, NSW, 2150',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'VIC',
        number: '053734530',
        expiry: '17-Oct-2028',
        class: 'HC, C R',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'VIC',
        number: 'HRW036981',
        issued: '16-Nov-2006',
        expiry: '16-Nov-2026',
        classes: 'LF, WP',
        status: 'current'
      }
    ],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '07-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '27-Sep-2021',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '03-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '13-Oct-2025',
        expiry: '13-Oct-2027',
        result: 'No Disclosable Court Outcomes',
        comments: '',
        status: 'current'
      }
    ],
    qualifications: {
      diplomas: [
        { code: 'TLI50415', name: 'Diploma of Logistics', completionDate: '15-Nov-2016', type: 'Diploma' }
      ],
      certificates: [
        { code: 'TAE40110', name: 'Certificate IV in Training and Assessment', completionDate: '10-Mar-2016', type: 'Certificate' }
      ],
      soa: [
        { code: 'TAEDEL301A', name: 'Provide work skill instruction', completionDate: '10-Mar-2016', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS401A', name: 'Plan assessment activities and processes', completionDate: '10-Mar-2016', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS402A', name: 'Assess competence', completionDate: '10-Mar-2016', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS403A', name: 'Participate in assessment validation', completionDate: '10-Mar-2016', completedBy: 'Certificate- Part of' },
        { code: 'TLILIC0003', name: 'Licence to operate a forklift truck', completionDate: '15-Oct-2016', completedBy: 'Diploma- Part of' },
        { code: 'TLIA5014', name: 'Develop and implement warehousing and storage systems', completionDate: '20-Oct-2016', completedBy: 'Diploma- Part of' },
        { code: 'TLIB5002', name: 'Manage supplier and contract arrangements', completionDate: '25-Oct-2016', completedBy: 'Diploma- Part of' },
        { code: 'TLIF5003', name: 'Manage and improve compliance and quality of operations', completionDate: '01-Nov-2016', completedBy: 'Diploma- Part of' },
        { code: 'TLIA5012', name: 'Manage operations to achieve planned outcomes', completionDate: '05-Nov-2016', completedBy: 'Diploma- Part of' },
        { code: 'BSBOPS501', name: 'Manage business resources', completionDate: '10-Nov-2016', completedBy: 'Diploma- Part of' },
        { code: 'BSBWHS502', name: 'Manage effective workplace health and safety practices', completionDate: '15-Nov-2016', completedBy: 'Diploma- Part of' }
      ]
    }
  },
  {
    id: 3,
    name: 'Anthony MCIVER',
    position: 'Contractor',
    atlasId: 'MCIVERAnthony',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '14-Apr-1978',
    contact: {
      email: 'anthony.mciver@gmail.com',
      phone: '0456-789-012',
      address: '27 Lake Road, Liverpool, NSW, 2170',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'SA',
        number: 'C21134',
        expiry: '23-Feb-2030',
        class: 'MC',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'SA',
        number: 'HR09649',
        issued: '27-May-2010',
        expiry: '27-May-2030',
        classes: 'LF LO WP',
        status: 'current'
      }
    ],
    cardLicences: [
      {
        issuedBy: 'Driving Instructor -SA',
        state: 'SA',
        number: 'C21134',
        issued: '',
        expiry: '03-Jul-2030',
        classes: '',
        status: 'current'
      }
    ],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '07-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '07-Apr-2022',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '03-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'Resume',
        formName: 'Resume',
        signedDate: '01-Jan-2018',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [
      {
        number: 'Completed',
        issued: '06-May-2025',
        expiry: '06-May-2027',
        result: 'Requires additional Action',
        comments: 'ACT2025-017 Form FRM201B Submitted for authorisation to upper managagement of ATLAS',
        status: 'current'
      }
    ],
    qualifications: { diplomas: [], certificates: [], soa: [] }
  },
  {
    id: 5,
    name: 'David PAGANO',
    position: 'Contractor',
    atlasId: 'PAGANODavid',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '30-Jun-1972',
    contact: {
      email: 'davidpagano@example.com',
      phone: '0467-890-123',
      address: '11 Beach Street, Wollongong, NSW, 2500',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [],
    hrwLicence: [],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '08-Oct-2025',
        status: 'completed'
      }
    ],
    policeCheck: [],
    qualifications: {
      diplomas: [],
      certificates: [
        { code: 'TAE40110', name: 'Certificate IV in Training and Assessment', completionDate: '05-Jul-2019', type: 'Certificate' },
        { code: 'TLI31321', name: 'Certificate III in Warehousing Operations', completionDate: '10-May-2019', type: 'Certificate' }
      ],
      soa: [
        { code: 'TAEDEL301A', name: 'Provide work skill instruction', completionDate: '05-Jul-2019', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS401A', name: 'Plan assessment activities and processes', completionDate: '05-Jul-2019', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS402A', name: 'Assess competence', completionDate: '05-Jul-2019', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS403A', name: 'Participate in assessment validation', completionDate: '05-Jul-2019', completedBy: 'Certificate- Part of' },
        { code: 'TLILIC0003', name: 'Licence to operate a forklift truck', completionDate: '05-May-2019', completedBy: 'Certificate- Part of' },
        { code: 'TLIA3016', name: 'Coordinate and monitor safe storage of goods', completionDate: '07-May-2019', completedBy: 'Certificate- Part of' },
        { code: 'TLID3034', name: 'Conduct receival and despatch operations', completionDate: '08-May-2019', completedBy: 'Certificate- Part of' },
        { code: 'TLID3036', name: 'Conduct stocktake operations', completionDate: '09-May-2019', completedBy: 'Certificate- Part of' },
        { code: 'RIIWHS204D', name: 'Work safely at heights', completionDate: '10-May-2019', completedBy: 'Standalone' },
        { code: 'TLILIC0005', name: 'Licence to operate a boom-type elevating work platform', completionDate: '12-May-2019', completedBy: 'Standalone' },
        { code: 'TLID3020', name: 'Operate a forklift', completionDate: '15-May-2019', completedBy: 'Standalone' },
        { code: 'TLIA3014', name: 'Manage stock control', completionDate: '18-May-2019', completedBy: 'Standalone' },
        { code: 'BSBWHS401', name: 'Implement and monitor WHS policies, procedures and programs', completionDate: '20-May-2019', completedBy: 'Standalone' }
      ]
    }
  },
  {
    id: 7,
    name: 'SHRUTTSHOTTON',
    position: 'Staff',
    atlasId: 'SHRUTTSHOTTON',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '18-Jan-1995',
    contact: {
      email: 'shrutts@example.com',
      phone: '0478-901-234',
      address: '33 Valley Road, Penrith, NSW, 2750',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'NSW',
        number: '3662EL',
        expiry: '25-Oct-2024',
        class: 'HR, R',
        status: 'expired'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'NSW',
        number: 'HRW158203',
        issued: '07-Jul-2023',
        expiry: '07-Jul-2028',
        classes: 'LF WP',
        status: 'current'
      }
    ],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '08-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '04-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [],
    qualifications: { diplomas: [], certificates: [], soa: [] }
  },
  {
    id: 8,
    name: 'Peter TSOURIS',
    position: 'Contractor',
    atlasId: 'TSOURISPeter',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '25-Nov-1965',
    contact: {
      email: 'peter.tsouris@gmail.com',
      phone: '0489-012-345',
      address: '19 Forest Drive, Campbelltown, NSW, 2560',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [],
    hrwLicence: [],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '07-Oct-2025',
        status: 'completed'
      }
    ],
    policeCheck: [],
    qualifications: { diplomas: [], certificates: [], soa: [] }
  },
  {
    id: 21,
    name: 'Renan VIEIRA',
    position: 'Contractor',
    atlasId: 'VIEIRARenan',
    state: 'NSW',
    teamStatus: 'Active',
    dateOfBirth: '12-Feb-1988',
    contact: {
      email: 'renan.vieira@example.com',
      phone: '0490-123-456',
      address: '6 Green Street, Newcastle, NSW, 2300',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'NSW',
        number: '5729702',
        expiry: '30-May-2027',
        class: 'C',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'NSW',
        number: 'HRW041258',
        issued: '28-Sep-2007',
        expiry: '28-Sep-2027',
        classes: 'LF LO WP',
        status: 'current'
      }
    ],
    cardLicences: [],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '07-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '27-Sep-2021',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [],
    qualifications: {
      diplomas: [
        { code: 'TLI50415', name: 'Diploma of Logistics', completionDate: '18-Aug-2018', type: 'Diploma' }
      ],
      certificates: [
        { code: 'TAE40110', name: 'Certificate IV in Training and Assessment', completionDate: '12-May-2018', type: 'Certificate' },
        { code: 'TLI41321', name: 'Certificate IV in Logistics', completionDate: '20-Jun-2018', type: 'Certificate' }
      ],
      soa: [
        { code: 'TAEDEL301A', name: 'Provide work skill instruction', completionDate: '12-May-2018', completedBy: 'Certificate- Part of' },
        { code: 'TAEDEL404A', name: 'Mentor in the workplace', completionDate: '12-May-2018', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS401A', name: 'Plan assessment activities and processes', completionDate: '12-May-2018', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS402A', name: 'Assess competence', completionDate: '12-May-2018', completedBy: 'Certificate- Part of' },
        { code: 'TAEASS403A', name: 'Participate in assessment validation', completionDate: '12-May-2018', completedBy: 'Certificate- Part of' },
        { code: 'TLILIC0003', name: 'Licence to operate a forklift truck', completionDate: '15-Jun-2018', completedBy: 'Certificate- Part of' },
        { code: 'TLIA4014', name: 'Implement and monitor warehousing and storage systems', completionDate: '18-Jun-2018', completedBy: 'Certificate- Part of' },
        { code: 'TLIB4003', name: 'Monitor procurement and inventory management systems', completionDate: '19-Jun-2018', completedBy: 'Certificate- Part of' },
        { code: 'TLIA3014', name: 'Manage stock control', completionDate: '20-Jun-2018', completedBy: 'Certificate- Part of' },
        { code: 'TLIA5014', name: 'Develop and implement warehousing and storage systems', completionDate: '01-Aug-2018', completedBy: 'Diploma- Part of' },
        { code: 'TLIB5002', name: 'Manage supplier and contract arrangements', completionDate: '05-Aug-2018', completedBy: 'Diploma- Part of' },
        { code: 'TLIF5003', name: 'Manage and improve compliance and quality of operations', completionDate: '10-Aug-2018', completedBy: 'Diploma- Part of' },
        { code: 'TLIF5005', name: 'Implement and improve transport operations', completionDate: '12-Aug-2018', completedBy: 'Diploma- Part of' },
        { code: 'TLIA5012', name: 'Manage operations to achieve planned outcomes', completionDate: '15-Aug-2018', completedBy: 'Diploma- Part of' },
        { code: 'BSBOPS501', name: 'Manage business resources', completionDate: '16-Aug-2018', completedBy: 'Diploma- Part of' },
        { code: 'BSBWHS502', name: 'Manage effective workplace health and safety practices', completionDate: '17-Aug-2018', completedBy: 'Diploma- Part of' },
        { code: 'BSBHRM522', name: 'Manage employee and industrial relations', completionDate: '18-Aug-2018', completedBy: 'Diploma- Part of' }
      ]
    }
  },
  {
    id: 22,
    name: 'Melvin WILSON',
    position: 'Contractor',
    atlasId: 'WILSONMelvin',
    state: 'QLD',
    teamStatus: 'Active',
    dateOfBirth: '03-Sep-1976',
    contact: {
      email: 'melvin.wilson@gmail.com',
      phone: '0401-234-567',
      address: '21 Palm Avenue, Gold Coast, QLD, 4217',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      publicLiability: { provider: '', number: '', startDate: '', expiry: '', status: 'current' },
      workCover: { number: '', expiry: '', status: 'current' }
    },
    driverLicence: [
      {
        state: 'VIC',
        number: '051816850',
        expiry: '05-Oct-2026',
        class: 'C',
        status: 'current'
      }
    ],
    hrwLicence: [
      {
        name: 'SafeWork NSW National Licence to Perform High Risk Work',
        state: 'VIC',
        number: 'HRW165478',
        issued: '05-Sep-2024',
        expiry: '05-Sep-2029',
        classes: 'WP, LF',
        status: 'current'
      }
    ],
    cardLicences: [
      {
        issuedBy: 'Working With Children Check',
        state: 'VIC',
        number: '0478700A-003',
        issued: '',
        expiry: '28-Aug-2030',
        classes: '',
        status: 'current'
      },
      {
        issuedBy: 'Woolworth Group',
        state: 'NSW',
        number: '004 532 778',
        issued: '',
        expiry: '24-Oct-2025',
        classes: 'Contractor Safety Card',
        status: 'expired'
      }
    ],
    atlasforms: [
      {
        formCode: 'FRM201A Fit and Proper Declaration',
        formName: 'FRM201A Fit and Proper Declaration',
        signedDate: '08-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '01-Nov-2023',
        status: 'completed'
      },
      {
        formCode: 'FRM3005 Independent Contractor Agreement',
        formName: 'FRM3005 Independent Contractor Agreement',
        signedDate: '01-Nov-2023',
        status: 'completed'
      },
      {
        formCode: 'Police Check',
        formName: 'Police Check',
        signedDate: '04-Oct-2025',
        status: 'completed'
      },
      {
        formCode: 'FRM3004 Confidentiality and Non Disclosure',
        formName: 'FRM3004 Confidentiality and Non Disclosure',
        signedDate: '10-Nov-2025',
        status: 'completed'
      }
    ],
    policeCheck: [],
    qualifications: { diplomas: [], certificates: [], soa: [] }
  }
  ];
  
  console.log('Default staff data loaded:', staffData.length, 'staff members');
  console.log('Staff IDs:', staffData.map(s => s.atlasId).join(', '));
  
  // Save defaults to storage
  try {
    const storage = getStorage();
    storage.setItem('staffData', JSON.stringify(staffData));
    console.log('✓ Saved defaults to storage');
  } catch(e) {
    console.error('Error saving defaults:', e);
  }
}

// Save to memory store helper - Call after EVERY change to staffData
function saveToMemoryStore() {
  try {
    const storage = getStorage();
    const dataStr = JSON.stringify(staffData);
    storage.setItem('staffData', dataStr);
    console.log('✓ Saved to storage:', staffData.length, 'staff members');
    console.log('✓ Data size:', dataStr.length, 'characters');
    
    // Verify
    const verify = storage.getItem('staffData');
    if (verify) {
      console.log('✓ VERIFIED: Data in storage');
      return true;
    } else {
      console.error('✗ VERIFY FAILED: Nothing in storage');
      return false;
    }
  } catch(e) {
    console.error('✗ Save failed:', e);
    alert('Error saving changes: ' + e.message);
    return false;
  }
}

// State
let currentStaff = null;
let currentSection = 'contact';
let currentQualTab = 'diplomas';
let editMode = {}; // Track which sections are in edit mode
let editData = {}; // Store temporary edit data

// Filter state
let currentFilters = {
  state: 'all',
  position: 'all',
  status: 'all',
  soa: 'all'
};

// Security State
let isEditModeEnabled = false;
let currentUser = null;
let currentUserRole = null;

// Default users - Judy Irmisch as administrator
let users = [
  {
    username: 'Judy Irmisch',
    password: hashPassword('ATLAS2025'),
    role: 'administrator'
  }
];

// Legacy authorizedUsers references users
let authorizedUsers = users;

// Get current date in dd-MMM-yyyy format
function getCreationDate() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
}

// Simple hash function for password storage - CONSISTENT HASHING
function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}

// Check if user is authorized
function checkPassword(username, password) {
  console.log('=== LOGIN DEBUG ===');
  console.log('Available users:', users.map(u => u.username));
  console.log('Selected username:', username);
  console.log('Password entered:', password ? '***' : 'empty');
  
  const hashedPassword = hashPassword(password);
  console.log('Hashed password:', hashedPassword);
  
  const user = users.find(u => u.username === username && u.password === hashedPassword);
  console.log('User found:', user ? 'YES' : 'NO');
  
  return user;
}

// Update security UI
function updateSecurityUI() {
  const loginBtn = document.getElementById('loginButton');
  const logoutBtn = document.getElementById('logoutButton');
  const manageBtn = document.getElementById('manageUsersButton');
  const addStaffBtn = document.getElementById('addStaffButton');
  const exportBtn = document.getElementById('exportDataBtn');
  const importBtn = document.getElementById('importDataBtn');
  const testSaveBtn = document.getElementById('testSaveBtn');
  const statusEl = document.getElementById('securityStatus');
  const header = document.getElementById('mainHeader');
  
  if (isEditModeEnabled && currentUser) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    
    // Show Export/Import buttons when logged in
    if (exportBtn) exportBtn.style.display = 'inline-block';
    if (importBtn) importBtn.style.display = 'inline-block';
    if (testSaveBtn) testSaveBtn.style.display = 'inline-flex';
    
    // No session warnings needed - localStorage works fine
    
    // Show Manage Users and Add Staff buttons only for administrators
    if (currentUserRole === 'administrator') {
      manageBtn.style.display = 'block';
      addStaffBtn.style.display = 'block';
      statusEl.innerHTML = '🔓 <strong>Logged in as:</strong> ' + currentUser +
        ' <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px; font-size: 12px;">(Administrator)</span>';
      header.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    } else {
      manageBtn.style.display = 'none';
      addStaffBtn.style.display = 'none';
      statusEl.innerHTML = '🔓 <strong>Logged in as:</strong> ' + currentUser + ' <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px; font-size: 12px;">(User)</span>';
      header.style.background = 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
    }
  } else {
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    manageBtn.style.display = 'none';
    addStaffBtn.style.display = 'none';
    
    // Hide Export/Import buttons when logged out
    if (exportBtn) exportBtn.style.display = 'none';
    if (importBtn) importBtn.style.display = 'none';
    if (testSaveBtn) testSaveBtn.style.display = 'none';
    
    statusEl.innerHTML = '🔒 <strong>Read-Only Mode</strong> - Click Login to edit';
    header.style.background = 'linear-gradient(135deg, var(--purple-dark) 0%, var(--purple-accent) 100%)';
  }
}

// Populate login dropdown with users
function populateLoginDropdown() {
  console.log('=== POPULATING LOGIN DROPDOWN ===');
  const dropdown = document.getElementById('loginUsername');
  if (!dropdown) {
    console.error('Login username dropdown not found');
    return;
  }
  
  console.log('Available users:', users.map(u => u.username));
  
  // Clear existing options
  dropdown.innerHTML = '';
  
  // Add placeholder option
  const placeholderOption = document.createElement('option');
  placeholderOption.value = '';
  placeholderOption.textContent = '-- Select User --';
  dropdown.appendChild(placeholderOption);
  
  // Sort users: administrators first, then alphabetically
  const sortedUsers = [...users].sort((a, b) => {
    // Administrators first
    if (a.role === 'administrator' && b.role !== 'administrator') return -1;
    if (a.role !== 'administrator' && b.role === 'administrator') return 1;
    // Then alphabetically by username
    return a.username.localeCompare(b.username);
  });
  
  console.log('Sorted users:', sortedUsers.map(u => u.username + ' (' + u.role + ')'));
  
  // Add each user as an option with role displayed
  sortedUsers.forEach(user => {
    const option = document.createElement('option');
    option.value = user.username;
    const roleLabel = user.role === 'administrator' ? 'Administrator' : 'User';
    option.textContent = user.username + ' (' + roleLabel + ')';
    dropdown.appendChild(option);
    console.log('Added option:', option.textContent);
  });
  
  console.log('Login dropdown populated with', sortedUsers.length, 'users');
}

// Show login modal
function showLoginModal() {
  console.log('=== SHOW LOGIN MODAL ===');
  const modal = document.getElementById('loginModal');
  modal.style.display = 'flex';
  
  // Populate dropdown after modal is shown
  populateLoginDropdown();
  
  // Focus on dropdown
  setTimeout(() => {
    const dropdown = document.getElementById('loginUsername');
    if (dropdown) {
      dropdown.focus();
      console.log('Dropdown focused');
    }
  }, 100);
}

// Hide login modal
function hideLoginModal() {
  const modal = document.getElementById('loginModal');
  modal.style.display = 'none';
  document.getElementById('loginForm').reset();
  document.getElementById('loginError').style.display = 'none';
}

// Attempt login - FIXED VERSION
function attemptLogin() {
  console.log('=== ATTEMPT LOGIN ===');
  const usernameDropdown = document.getElementById('loginUsername');
  const passwordInput = document.getElementById('loginPassword');
  const errorEl = document.getElementById('loginError');
  
  if (!usernameDropdown || !passwordInput) {
    console.error('Login form elements not found');
    return;
  }
  
  const username = usernameDropdown.value.trim();
  const password = passwordInput.value;
  
  console.log('Login attempt:', username);
  console.log('Password length:', password.length);
  
  // Validate inputs
  if (!username) {
    errorEl.textContent = 'Please select a user';
    errorEl.style.display = 'block';
    usernameDropdown.focus();
    return;
  }
  
  if (!password) {
    errorEl.textContent = 'Please enter your password';
    errorEl.style.display = 'block';
    passwordInput.focus();
    return;
  }
  
  // Check credentials
  const user = checkPassword(username, password);
  
  if (user) {
    console.log('Login successful');
    isEditModeEnabled = true;
    currentUser = username;
    currentUserRole = user.role;
    hideLoginModal();
    updateSecurityUI();
    showSuccessMessage('Welcome ' + username + '!\nRole: ' + user.role);
    
    // Re-render to show edit buttons
    if (currentStaff) {
      renderStaffDetail();
    }
  } else {
    console.error('Login failed - incorrect password');
    errorEl.textContent = 'Incorrect password';
    errorEl.style.display = 'block';
    passwordInput.value = '';
    passwordInput.focus();
  }
}

// Logout
function logout() {
  isEditModeEnabled = false;
  currentUser = null;
  currentUserRole = null;
  editMode = {};
  editData = {};
  updateSecurityUI();
  showSuccessMessage('Logged out successfully. Read-only mode enabled.');
  
  // Re-render to hide edit buttons
  if (currentStaff) {
    renderStaffDetail();
  }
}

// Show user management (Administrator only)
function showUserManagement() {
  if (currentUserRole !== 'administrator') {
    alert('Access denied. Only administrators can manage users.');
    return;
  }
  const modal = document.getElementById('userManagementModal');
  modal.style.display = 'flex';
  renderUserList();
}

// Show password management (legacy - redirects to user management)
function showPasswordManagement() {
  showUserManagement();
}

// Hide user management
function hideUserManagement() {
  const modal = document.getElementById('userManagementModal');
  modal.style.display = 'none';
  document.getElementById('addUserForm').reset();
}

// Hide password management (legacy)
function hidePasswordManagement() {
  hideUserManagement();
}

// Render user list
function renderUserList() {
  // Also update login dropdown when user list changes
  populateLoginDropdown();
  
  const listEl = document.getElementById('userList');
  
  if (authorizedUsers.length === 0) {
    listEl.innerHTML = '<div class="empty-state">No users configured</div>';
    return;
  }
  
  // Count administrators
  const adminCount = authorizedUsers.filter(u => u.role === 'administrator').length;
  
  listEl.innerHTML = `
    <h3 style="margin-bottom: var(--space-16); color: var(--color-text); font-size: var(--font-size-lg);">All Users (${authorizedUsers.length})</h3>
    <div style="display: flex; flex-direction: column; gap: var(--space-12);">
      ${authorizedUsers.map((user, idx) => {
        const isCurrentUser = user.username === currentUser;
        const canDelete = !isCurrentUser && !(user.role === 'administrator' && adminCount === 1);
        return `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-16); background: ${user.role === 'administrator' ? 'var(--color-bg-1)' : 'var(--color-bg-3)'}; border-radius: var(--radius-base); border: 1px solid var(--color-border);">
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: var(--space-8); margin-bottom: var(--space-4);">
              <strong style="color: var(--color-text); font-size: var(--font-size-base);">${user.username}</strong>
              ${isCurrentUser ? '<span style="background: var(--color-primary); color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">YOU</span>' : ''}
            </div>
            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-8);">Role: <strong>${user.role === 'administrator' ? 'Administrator' : 'User'}</strong></div>
          </div>
          <div style="display: flex; gap: var(--space-8); align-items: center;">
            <select onchange="changeUserRole(${idx}, this.value)" class="form-control" style="padding: var(--space-4) var(--space-8); font-size: var(--font-size-sm); width: 140px;">
              <option value="administrator" ${user.role === 'administrator' ? 'selected' : ''}>Administrator</option>
              <option value="user" ${user.role === 'user' ? 'selected' : ''}>User</option>
            </select>
            <button class="btn btn-secondary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm); white-space: nowrap;" onclick="changeUserPassword(${idx})">Change Password</button>
            <button class="btn btn-secondary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm); background: var(--color-error); color: white;" onclick="deleteUser(${idx})" ${!canDelete ? 'disabled title="' + (isCurrentUser ? 'Cannot delete yourself' : 'Cannot delete last administrator') + '"' : ''}>Delete</button>
          </div>
        </div>
      `;
      }).join('')}
    </div>
  `;
}

// Render password list (legacy)
function renderPasswordList() {
  renderUserList();
}

// Add new user
function addNewUser() {
  const username = document.getElementById('newUsername').value.trim();
  const password = document.getElementById('newPassword').value;
  const role = document.getElementById('newUserRole').value;
  
  if (!username || !password) {
    alert('Please enter both username and password');
    return;
  }
  
  if (password.length < 6) {
    alert('Password must be at least 6 characters');
    return;
  }
  
  // Check if username already exists
  if (authorizedUsers.find(u => u.username === username)) {
    alert('Username already exists');
    return;
  }
  
  authorizedUsers.push({
    username: username,
    password: hashPassword(password),
    role: role
  });
  
  document.getElementById('addUserForm').reset();
  renderUserList();
  populateLoginDropdown();
  showSuccessMessage(`User "${username}" added successfully as ${role}!`);
}

// Add new password (legacy)
function addNewPassword() {
  addNewUser();
}

// Change user role
function changeUserRole(index, newRole) {
  const user = authorizedUsers[index];
  
  // Check if trying to change last administrator to user
  const adminCount = authorizedUsers.filter(u => u.role === 'administrator').length;
  if (user.role === 'administrator' && newRole === 'user' && adminCount === 1) {
    alert('Cannot change the last administrator to a user. There must be at least one administrator.');
    renderUserList();
    return;
  }
  
  user.role = newRole;
  renderUserList();
  showSuccessMessage(`User role updated to ${newRole}!`);
  
  // If current user's role changed, update UI
  if (user.username === currentUser) {
    currentUserRole = newRole;
    updateSecurityUI();
  }
}

// Change user password
function changeUserPassword(index) {
  const user = authorizedUsers[index];
  const newPassword = prompt(`Enter new password for "${user.username}":\n(minimum 6 characters)`);
  
  if (newPassword === null) return; // Cancelled
  
  if (newPassword.length < 6) {
    alert('Password must be at least 6 characters');
    return;
  }
  
  user.password = hashPassword(newPassword);
  showSuccessMessage(`Password changed for "${user.username}"!`);
}

// Delete user
function deleteUser(index) {
  const user = authorizedUsers[index];
  
  // Cannot delete self
  if (user.username === currentUser) {
    alert('Cannot delete yourself. Please login with another administrator account first.');
    return;
  }
  
  // Cannot delete last administrator
  const adminCount = authorizedUsers.filter(u => u.role === 'administrator').length;
  if (user.role === 'administrator' && adminCount === 1) {
    alert('Cannot delete the last administrator. There must be at least one administrator.');
    return;
  }
  
  if (confirm(`Are you sure you want to delete user "${user.username}"?\nThis action cannot be undone.`)) {
    authorizedUsers.splice(index, 1);
    renderUserList();
    populateLoginDropdown();
    showSuccessMessage('User deleted successfully!');
  }
}

// Delete password (legacy)
function deletePassword(index) {
  deleteUser(index);
}

// Get all unique SOA qualifications from staff data
function getAllUniqueSOAs() {
  const soaSet = new Set();
  
  staffData.forEach(staff => {
    if (staff.qualifications && staff.qualifications.soa && Array.isArray(staff.qualifications.soa)) {
      staff.qualifications.soa.forEach(soa => {
        if (soa.code) {
          soaSet.add(`${soa.code}|${soa.name}`);
        }
      });
    }
  });
  
  // Convert to array and sort alphabetically
  const soaArray = Array.from(soaSet).map(item => {
    const [code, name] = item.split('|');
    return { code, name };
  }).sort((a, b) => a.code.localeCompare(b.code));
  
  return soaArray;
}

// Populate all filter dropdowns
function populateFilters() {
  populateSOAFilter();
}

// Populate SOA filter dropdown with unique SOA qualifications
function populateSOAFilter() {
  const soaFilter = document.getElementById('soaFilter');
  if (!soaFilter) return;
  
  // Get all unique SOAs
  const uniqueSOAs = getAllUniqueSOAs();
  
  // Clear existing options
  soaFilter.innerHTML = '<option value="all">All SOAs</option>';
  
  // Add each unique SOA as an option
  uniqueSOAs.forEach(soa => {
    const option = document.createElement('option');
    option.value = soa.code;
    option.textContent = `${soa.code} ${soa.name}`;
    soaFilter.appendChild(option);
  });
}

// Initialize
function init() {
  console.log('=== PAGE LOAD START ===');
  
  // Step 1: Initialize staff data (load from localStorage or defaults)
  initializeStaffData();
  
  // Step 2: Populate the dropdown with loaded data
  updateStaffSelect();
  
  // Step 3: Populate filters
  populateFilters();
  
  // Add event listener for staff selection
  const staffSelect = document.getElementById('staffSelect');
  if (staffSelect) {
    staffSelect.addEventListener('change', handleStaffChange);
  }
  
  // Add event listeners for filters
  const stateFilter = document.getElementById('stateFilter');
  const positionFilter = document.getElementById('positionFilter');
  const statusFilter = document.getElementById('statusFilter');
  const soaFilter = document.getElementById('soaFilter');
  
  if (stateFilter) {
    stateFilter.addEventListener('change', handleFilterChange);
  }
  if (positionFilter) {
    positionFilter.addEventListener('change', handleFilterChange);
  }
  if (statusFilter) {
    statusFilter.addEventListener('change', handleFilterChange);
  }
  if (soaFilter) {
    soaFilter.addEventListener('change', handleFilterChange);
  }
  
  // Initialize security UI
  updateSecurityUI();
  
  // Show initial empty state
  showNoStaffSelected();
  
  // Update filter count
  updateFilterCount();
  
  console.log('=== PAGE LOAD COMPLETE ===');
  console.log('staffData has', staffData.length, 'members');
  console.log('ATLAS Dashboard initialized with', staffData.length, 'staff members');
}

// CRITICAL FUNCTION: Load data and populate dropdown
function loadAndPopulateDropdown() {
  console.log('=== UPDATING DROPDOWN ===');
  console.log('Current staffData length:', staffData.length);
  console.log('Current ATLAS IDs:', staffData.map(s => s.atlasId));
  
  // Get the dropdown element
  const staffSelect = document.getElementById('staffSelect');
  
  if (!staffSelect) {
    console.error('searchStaff dropdown not found!');
    return;
  }
  
  if (!staffData || staffData.length === 0) {
    console.error('staffData is empty!');
    return;
  }
  
  console.log('Populating dropdown with', staffData.length, 'staff members');
  
  if (staffSelect) {
    // Clear dropdown
    staffSelect.innerHTML = '<option value="">-- Select ATLAS ID --</option>';
    
    // Sort by atlasId
    const sorted = [...staffData].sort((a, b) => 
      (a.atlasId || '').localeCompare(b.atlasId || '')
    );
    
    console.log('Sorted staff for dropdown:', sorted.map(s => s.atlasId));
    
    // Add each staff
    sorted.forEach(staff => {
      if (staff.atlasId) {
        const opt = document.createElement('option');
        opt.value = staff.atlasId;
        opt.textContent = staff.atlasId;
        staffSelect.appendChild(opt);
      }
    });
    
    console.log('✓ Dropdown populated with', sorted.length, 'options');
  }
  
  console.log('=== DROPDOWN UPDATE COMPLETE ===');
}

function updateStaffSelect() {
  console.log('=== updateStaffSelect called ===');
  console.log('staffData has', staffData.length, 'members');
  loadAndPopulateDropdown();
  
  // Update filter count
  updateFilterCount();
}

function handleStaffChange(e) {
  const atlasId = e.target.value;
  if (!atlasId) {
    showNoStaffSelected();
    return;
  }
  
  currentStaff = staffData.find(s => s.atlasId === atlasId);
  renderStaffDetail();
}

// Handle filter changes
function handleFilterChange(e) {
  const filterId = e.target.id;
  const value = e.target.value;
  
  // Update filter state
  if (filterId === 'stateFilter') {
    currentFilters.state = value;
  } else if (filterId === 'positionFilter') {
    currentFilters.position = value;
  } else if (filterId === 'statusFilter') {
    currentFilters.status = value;
  } else if (filterId === 'soaFilter') {
    currentFilters.soa = value;
  }
  
  // Update filter count display (dropdown always shows all staff)
  updateFilterCount();
}

// Get filtered staff based on current filters
function getFilteredStaff() {
  return staffData.filter(staff => {
    // State filter
    if (currentFilters.state !== 'all' && staff.state !== currentFilters.state) {
      return false;
    }
    
    // Position filter
    if (currentFilters.position !== 'all' && staff.position !== currentFilters.position) {
      return false;
    }
    
    // Status filter - check multiple status fields
    if (currentFilters.status !== 'all') {
      const hasMatchingStatus = checkStaffStatus(staff, currentFilters.status);
      if (!hasMatchingStatus) {
        return false;
      }
    }
    
    // SOA filter - now checks for specific SOA code
    if (currentFilters.soa !== 'all') {
      const hasSOA = staff.qualifications && staff.qualifications.soa && Array.isArray(staff.qualifications.soa);
      if (!hasSOA) {
        return false;
      }
      
      // Check if staff has the specific SOA code
      const hasSpecificSOA = staff.qualifications.soa.some(soa => soa.code === currentFilters.soa);
      if (!hasSpecificSOA) {
        return false;
      }
    }
    
    return true;
  });
}

// Check if staff has any matching status in their records
function checkStaffStatus(staff, statusFilter) {
  // Check insurance statuses
  if (staff.insurance) {
    if (staff.insurance.professionalIndemnity && staff.insurance.professionalIndemnity.status === statusFilter) {
      return true;
    }
    if (staff.insurance.publicLiability && staff.insurance.publicLiability.status === statusFilter) {
      return true;
    }
    if (staff.insurance.workCover && staff.insurance.workCover.status === statusFilter) {
      return true;
    }
  }
  
  // Check driver licence
  if (staff.driverLicence && staff.driverLicence.length > 0) {
    if (staff.driverLicence.some(dl => dl.status === statusFilter)) {
      return true;
    }
  }
  
  // Check HRW licences
  if (staff.hrwLicence && staff.hrwLicence.length > 0) {
    if (staff.hrwLicence.some(hrw => hrw.status === statusFilter)) {
      return true;
    }
  }
  
  // Check card licences
  if (staff.cardLicences && staff.cardLicences.length > 0) {
    if (staff.cardLicences.some(card => card.status === statusFilter)) {
      return true;
    }
  }
  
  // Check police check
  if (staff.policeCheck && staff.policeCheck.length > 0) {
    if (staff.policeCheck.some(pc => pc.status === statusFilter)) {
      return true;
    }
  }
  
  // Check forms
  if (staff.atlasforms && staff.atlasforms.length > 0) {
    if (staff.atlasforms.some(form => form.status === statusFilter)) {
      return true;
    }
  }
  
  return false;
}

// Update filter result count
function updateFilterCount() {
  const countEl = document.getElementById('filterResultCount');
  if (!countEl) return;
  
  const filteredStaff = getFilteredStaff();
  const totalStaff = staffData.length;
  
  // Build a more descriptive message based on active filters
  let message = `Showing ${filteredStaff.length} of ${totalStaff} staff members`;
  
  // If SOA filter is active, show which SOA is selected and list staff
  if (currentFilters.soa !== 'all') {
    const soaFilter = document.getElementById('soaFilter');
    if (soaFilter && soaFilter.selectedOptions.length > 0) {
      const selectedSOA = soaFilter.selectedOptions[0].textContent;
      message = `<strong>Filtered by: ${selectedSOA}</strong><br>`;
      message += `<span style="font-size: var(--font-size-base); font-weight: normal;">Staff with this SOA (${filteredStaff.length}):</span><br>`;
      
      if (filteredStaff.length > 0) {
        message += '<div style="margin-top: var(--space-8); display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--space-8);">';
        filteredStaff.forEach(staff => {
          message += `<div style="padding: var(--space-4) var(--space-8); background: var(--color-bg-1); border-radius: var(--radius-sm); font-size: var(--font-size-sm);">• <strong>${staff.atlasId}</strong> - ${staff.name}</div>`;
        });
        message += '</div>';
      } else {
        message += '<div style="margin-top: var(--space-8); color: var(--color-text-secondary); font-style: italic;">No staff members found with this SOA</div>';
      }
    }
  } else if (currentFilters.state !== 'all' || currentFilters.position !== 'all' || currentFilters.status !== 'all') {
    // Other filters active
    const activeFilters = [];
    if (currentFilters.state !== 'all') activeFilters.push(`State: ${currentFilters.state}`);
    if (currentFilters.position !== 'all') activeFilters.push(`Position: ${currentFilters.position}`);
    if (currentFilters.status !== 'all') activeFilters.push(`Status: ${currentFilters.status}`);
    
    message = `<strong>Active Filters: ${activeFilters.join(', ')}</strong><br>`;
    message += `<span style="font-size: var(--font-size-base); font-weight: normal;">Showing ${filteredStaff.length} of ${totalStaff} staff members</span>`;
  }
  
  countEl.innerHTML = message;
}

function showNoStaffSelected() {
  const container = document.getElementById('staffDetailContainer');
  container.innerHTML = `
    <div class="no-staff-selected">
      <h2>Welcome to ATLAS Workforce Matrix</h2>
      <p>Please select a staff member from the dropdown above to view their workforce data.</p>
    </div>
  `;
}

function renderStaffDetail() {
  if (!currentStaff) return;
  
  const container = document.getElementById('staffDetailContainer');
  container.innerHTML = `
    <div class="staff-detail-card">
      <div class="staff-header">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h2 class="staff-name">${currentStaff.name}</h2>
            <div class="staff-meta">
              <span><strong>ATLAS ID:</strong> ${currentStaff.atlasId}</span>
              <span><strong>Position:</strong> ${currentStaff.position}</span>
              <span><strong>State:</strong> ${currentStaff.state}</span>
              <span><strong>DOB:</strong> ${currentStaff.dateOfBirth}</span>
              <span><strong>Date Added:</strong> ${currentStaff.createdDate || 'Not recorded'}</span>
            </div>
          </div>
          ${currentUserRole === 'administrator' ? '<button class="btn btn-primary" style="background: var(--color-error); border: 1px solid var(--color-error);" onclick="showDeleteConfirmation()">🗑️ Delete Staff Member</button>' : ''}
        </div>
      </div>
      
      <div class="tabs">
        <button class="tab ${currentSection === 'contact' ? 'active' : ''}" onclick="switchSection('contact')">Contact Details</button>
        <button class="tab ${currentSection === 'insurance' ? 'active' : ''}" onclick="switchSection('insurance')">Insurance</button>
        <button class="tab ${currentSection === 'driver' ? 'active' : ''}" onclick="switchSection('driver')">Driver Licence</button>
        <button class="tab ${currentSection === 'hrw' ? 'active' : ''}" onclick="switchSection('hrw')">HRW Licence</button>
        <button class="tab ${currentSection === 'cards' ? 'active' : ''}" onclick="switchSection('cards')">Card Licences</button>
        <button class="tab ${currentSection === 'forms' ? 'active' : ''}" onclick="switchSection('forms')">ATLAS Forms</button>
        <button class="tab ${currentSection === 'police' ? 'active' : ''}" onclick="switchSection('police')">Police Check</button>
        <button class="tab ${currentSection === 'quals' ? 'active' : ''}" onclick="switchSection('quals')">Qualifications</button>
      </div>
      
      <div class="tab-content">
        ${renderSectionContent()}
      </div>
    </div>
  `;
}

function renderSectionContent() {
  switch(currentSection) {
    case 'contact':
      return renderContactSection();
    case 'insurance':
      return renderInsuranceSection();
    case 'driver':
      return renderDriverLicenceSection();
    case 'hrw':
      return renderHRWLicenceSection();
    case 'cards':
      return renderCardLicencesSection();
    case 'forms':
      return renderFormsSection();
    case 'police':
      return renderPoliceCheckSection();
    case 'quals':
      return renderQualificationsSection();
    default:
      return '';
  }
}

function renderContactSection() {
  const isEditing = editMode['contact'];
  
  if (isEditing && isEditModeEnabled) {
    return `
      <div class="section active">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-16);">
          <h3 class="section-title" style="margin: 0;">Contact Details <span style="color: var(--color-warning); font-size: var(--font-size-sm);">(Editing)</span></h3>
        </div>
        <form id="edit-form-contact" onsubmit="event.preventDefault(); saveEdit('contact');">
          <div class="info-grid">
            <div class="info-item">
              <label class="form-label">First Name *</label>
              <input type="text" name="firstName" class="form-control" value="${currentStaff.firstName || currentStaff.name.split(' ')[0] || ''}" required onblur="this.value = toSentenceCase(this.value)">
            </div>
            <div class="info-item">
              <label class="form-label">Middle Name</label>
              <input type="text" name="middleName" class="form-control" value="${currentStaff.middleName || ''}" onblur="this.value = toSentenceCase(this.value)">
            </div>
            <div class="info-item">
              <label class="form-label">Surname *</label>
              <input type="text" name="surname" class="form-control" value="${currentStaff.surname || currentStaff.name.split(' ').pop() || ''}" required onblur="this.value = toSentenceCase(this.value)">
            </div>
            <div class="info-item">
              <label class="form-label">Email *</label>
              <input type="email" name="email" class="form-control" value="${currentStaff.contact.email}" required>
            </div>
            <div class="info-item">
              <label class="form-label">Phone *</label>
              <input type="text" name="phone" class="form-control" value="${currentStaff.contact.phone}" required placeholder="XXXX-XXX-XXX" onblur="this.value = formatPhone(this.value)">
            </div>
            <div class="info-item">
              <label class="form-label">Emergency Contact</label>
              <input type="text" name="emergencyContact" class="form-control" value="${currentStaff.contact.emergencyContact}">
            </div>
            <div class="info-item" style="grid-column: 1 / -1;">
              <label class="form-label">Address *</label>
              <input type="text" name="address" class="form-control" value="${currentStaff.contact.address}" required>
            </div>
          </div>
          <div class="btn-group" style="margin-top: var(--space-16);">
            <button type="submit" class="btn btn-primary">💾 Save</button>
            <button type="button" class="btn btn-secondary" onclick="cancelEdit('contact')">✕ Cancel</button>
          </div>
        </form>
      </div>
    `;
  }
  
  return `
    <div class="section active">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-16);">
        <h3 class="section-title" style="margin: 0;">Contact Details</h3>
        ${isEditModeEnabled ? '<button class="btn btn-secondary" onclick="toggleEditMode(\'contact\')">✏️ Edit</button>' : ''}
      </div>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">First Name</div>
          <div class="info-value">${currentStaff.firstName || currentStaff.name.split(' ')[0] || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Middle Name</div>
          <div class="info-value">${currentStaff.middleName || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Surname</div>
          <div class="info-value">${currentStaff.surname || currentStaff.name.split(' ').pop() || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Email</div>
          <div class="info-value">${currentStaff.contact.email}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Phone</div>
          <div class="info-value">${currentStaff.contact.phone}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Date of Birth</div>
          <div class="info-value">${currentStaff.dateOfBirth || 'Not provided'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Date Added to System</div>
          <div class="info-value">${currentStaff.createdDate || 'Not recorded'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Date of Birth</div>
          <div class="info-value">${currentStaff.dateOfBirth || 'Not provided'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Date Added to System</div>
          <div class="info-value">${currentStaff.createdDate || 'Not recorded'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Emergency Contact</div>
          <div class="info-value">${currentStaff.contact.emergencyContact}</div>
        </div>
        <div class="info-item" style="grid-column: 1 / -1;">
          <div class="info-label">Address</div>
          <div class="info-value">${currentStaff.contact.address}</div>
        </div>
      </div>
    </div>
  `;
}

function renderInsuranceSection() {
  const ins = currentStaff.insurance;
  const editingPI = editMode['insurance-professionalIndemnity'];
  const editingPL = editMode['insurance-publicLiability'];
  const editingWC = editMode['insurance-workCover'];
  
  return `
    <div class="section active">
      <h3 class="section-title">Insurance Information</h3>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin: var(--space-24) 0 var(--space-12) 0;">
        <h4 style="margin: 0; color: var(--color-text); font-size: var(--font-size-lg);">Professional Indemnity</h4>
        ${isEditModeEnabled ? '<button class="btn btn-secondary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm);" onclick="toggleEditMode(\'insurance\', \'professionalIndemnity\')">✏️ Edit</button>' : ''}
      </div>
      ${editingPI ? `
        <form id="edit-form-insurance-professionalIndemnity" onsubmit="event.preventDefault(); saveEdit('insurance', 'professionalIndemnity');">
          <input type="hidden" name="insuranceType" value="professionalIndemnity">
          <div class="info-grid">
            <div class="info-item">
              <label class="form-label">Provider</label>
              <input type="text" name="provider" class="form-control" value="${ins.professionalIndemnity.provider || ''}">
            </div>
            <div class="info-item">
              <label class="form-label">Number</label>
              <input type="text" name="number" class="form-control" value="${ins.professionalIndemnity.number || ''}">
            </div>
            <div class="info-item">
              <label class="form-label">Start Date</label>
              <input type="text" name="startDate" class="form-control" placeholder="dd-mmm-yyyy" value="${ins.professionalIndemnity.startDate || ''}">
            </div>
            <div class="info-item">
              <label class="form-label">Expiry</label>
              <input type="text" name="expiry" class="form-control" placeholder="dd-mmm-yyyy" value="${ins.professionalIndemnity.expiry || ''}">
            </div>
            <div class="info-item">
              <label class="form-label">Status</label>
              <select name="status" class="form-control">
                <option value="current" ${ins.professionalIndemnity.status === 'current' ? 'selected' : ''}>Current</option>
                <option value="expiring" ${ins.professionalIndemnity.status === 'expiring' ? 'selected' : ''}>Expiring</option>
                <option value="expired" ${ins.professionalIndemnity.status === 'expired' ? 'selected' : ''}>Expired</option>
              </select>
            </div>
          </div>
          <div class="btn-group" style="margin-top: var(--space-12);">
            <button type="submit" class="btn btn-primary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm);">💾 Save</button>
            <button type="button" class="btn btn-secondary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm);" onclick="cancelEdit('insurance', 'professionalIndemnity')">✕ Cancel</button>
          </div>
        </form>
      ` : `
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Provider</div>
          <div class="info-value">${ins.professionalIndemnity.provider || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Number</div>
          <div class="info-value">${ins.professionalIndemnity.number || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Start Date</div>
          <div class="info-value">${ins.professionalIndemnity.startDate || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Expiry</div>
          <div class="info-value">${ins.professionalIndemnity.expiry || 'N/A'}</div>
        </div>
      </div>
      
      `}
      <div style="display: flex; justify-content: space-between; align-items: center; margin: var(--space-24) 0 var(--space-12) 0;">
        <h4 style="margin: 0; color: var(--color-text); font-size: var(--font-size-lg);">Public Liability</h4>
        ${isEditModeEnabled ? '<button class="btn btn-secondary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm);" onclick="toggleEditMode(\'insurance\', \'publicLiability\')">✏️ Edit</button>' : ''}
      </div>
      ${editingPL ? `
        <form id="edit-form-insurance-publicLiability" onsubmit="event.preventDefault(); saveEdit('insurance', 'publicLiability');">
          <input type="hidden" name="insuranceType" value="publicLiability">
          <div class="info-grid">
            <div class="info-item">
              <label class="form-label">Provider</label>
              <input type="text" name="provider" class="form-control" value="${ins.publicLiability.provider || ''}">
            </div>
            <div class="info-item">
              <label class="form-label">Number</label>
              <input type="text" name="number" class="form-control" value="${ins.publicLiability.number || ''}">
            </div>
            <div class="info-item">
              <label class="form-label">Start Date</label>
              <input type="text" name="startDate" class="form-control" placeholder="dd-mmm-yyyy" value="${ins.publicLiability.startDate || ''}">
            </div>
            <div class="info-item">
              <label class="form-label">Expiry</label>
              <input type="text" name="expiry" class="form-control" placeholder="dd-mmm-yyyy" value="${ins.publicLiability.expiry || ''}">
            </div>
            <div class="info-item">
              <label class="form-label">Status</label>
              <select name="status" class="form-control">
                <option value="current" ${ins.publicLiability.status === 'current' ? 'selected' : ''}>Current</option>
                <option value="expiring" ${ins.publicLiability.status === 'expiring' ? 'selected' : ''}>Expiring</option>
                <option value="expired" ${ins.publicLiability.status === 'expired' ? 'selected' : ''}>Expired</option>
              </select>
            </div>
          </div>
          <div class="btn-group" style="margin-top: var(--space-12);">
            <button type="submit" class="btn btn-primary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm);">💾 Save</button>
            <button type="button" class="btn btn-secondary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm);" onclick="cancelEdit('insurance', 'publicLiability')">✕ Cancel</button>
          </div>
        </form>
      ` : `
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Provider</div>
            <div class="info-value">${ins.publicLiability.provider || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Number</div>
            <div class="info-value">${ins.publicLiability.number || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Start Date</div>
            <div class="info-value">${ins.publicLiability.startDate || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Expiry</div>
            <div class="info-value">${ins.publicLiability.expiry || 'N/A'}</div>
          </div>
        </div>
      `}
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin: var(--space-24) 0 var(--space-12) 0;">
        <h4 style="margin: 0; color: var(--color-text); font-size: var(--font-size-lg);">WorkCover</h4>
        ${isEditModeEnabled ? '<button class="btn btn-secondary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm);" onclick="toggleEditMode(\'insurance\', \'workCover\')">✏️ Edit</button>' : ''}
      </div>
      ${editingWC ? `
        <form id="edit-form-insurance-workCover" onsubmit="event.preventDefault(); saveEdit('insurance', 'workCover');">
          <input type="hidden" name="insuranceType" value="workCover">
          <div class="info-grid">
            <div class="info-item">
              <label class="form-label">Number</label>
              <input type="text" name="number" class="form-control" value="${ins.workCover.number || ''}">
            </div>
            <div class="info-item">
              <label class="form-label">Expiry</label>
              <input type="text" name="expiry" class="form-control" placeholder="dd-mmm-yyyy" value="${ins.workCover.expiry || ''}">
            </div>
            <div class="info-item">
              <label class="form-label">Status</label>
              <select name="status" class="form-control">
                <option value="current" ${ins.workCover.status === 'current' ? 'selected' : ''}>Current</option>
                <option value="expiring" ${ins.workCover.status === 'expiring' ? 'selected' : ''}>Expiring</option>
                <option value="expired" ${ins.workCover.status === 'expired' ? 'selected' : ''}>Expired</option>
              </select>
            </div>
          </div>
          <div class="btn-group" style="margin-top: var(--space-12);">
            <button type="submit" class="btn btn-primary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm);">💾 Save</button>
            <button type="button" class="btn btn-secondary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm);" onclick="cancelEdit('insurance', 'workCover')">✕ Cancel</button>
          </div>
        </form>
      ` : `
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Number</div>
            <div class="info-value">${ins.workCover.number || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Expiry</div>
            <div class="info-value">${ins.workCover.expiry || 'N/A'}</div>
          </div>
        </div>
      `}
    </div>
  `;
}

function renderDriverLicenceSection() {
  const data = currentStaff.driverLicence || [];
  return renderTableSection('Driver Licence', data, [
    { key: 'number', label: 'Licence Number' },
    { key: 'state', label: 'State' },
    { key: 'class', label: 'Class' },
    { key: 'expiry', label: 'Expiry Date' },
    { key: 'status', label: 'Status', isStatus: true }
  ], 'driver');
}

function renderHRWLicenceSection() {
  const data = currentStaff.hrwLicence || [];
  return renderTableSection('High Risk Work Licence', data, [
    { key: 'name', label: 'Licence Name' },
    { key: 'number', label: 'Licence Number' },
    { key: 'state', label: 'State' },
    { key: 'classes', label: 'Classes' },
    { key: 'issued', label: 'Issue Date' },
    { key: 'expiry', label: 'Expiry Date' },
    { key: 'status', label: 'Status', isStatus: true }
  ], 'hrw');
}

function renderCardLicencesSection() {
  const data = currentStaff.cardLicences || [];
  return renderTableSection('Card Licences', data, [
    { key: 'issuedBy', label: 'Issued By' },
    { key: 'state', label: 'State' },
    { key: 'number', label: 'Card Number' },
    { key: 'classes', label: 'Classes' },
    { key: 'issued', label: 'Issue Date' },
    { key: 'expiry', label: 'Expiry Date' },
    { key: 'status', label: 'Status', isStatus: true }
  ], 'cards');
}

function renderFormsSection() {
  const data = currentStaff.atlasforms || [];
  return renderTableSection('ATLAS Forms', data, [
    { key: 'formCode', label: 'Form Code' },
    { key: 'formName', label: 'Form Name' },
    { key: 'signedDate', label: 'Signed Date' },
    { key: 'status', label: 'Status', isStatus: true }
  ], 'forms');
}

function renderPoliceCheckSection() {
  const data = currentStaff.policeCheck || [];
  if (data.length === 0) {
    return '<div class="section active"><h3 class="section-title">Police Check</h3><div class="empty-state">No police check records found</div></div>';
  }
  const item = data[0];
  const isEditing = editMode['police'];
  
  if (isEditing) {
    return `
      <div class="section active">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-16);">
          <h3 class="section-title" style="margin: 0;">Police Check <span style="color: var(--color-warning); font-size: var(--font-size-sm);">(Editing...)</span></h3>
        </div>
        <form id="edit-form-police" onsubmit="event.preventDefault(); saveEdit('police');">
          <div class="info-grid">
            <div class="info-item">
              <label class="form-label">Reference Number</label>
              <input type="text" name="number" class="form-control" value="${item.number || ''}">
            </div>
            <div class="info-item">
              <label class="form-label">Issue Date</label>
              <input type="text" name="issued" class="form-control" placeholder="dd-mmm-yyyy" value="${item.issued || ''}">
            </div>
            <div class="info-item">
              <label class="form-label">Expiry Date</label>
              <input type="text" name="expiry" class="form-control" placeholder="dd-mmm-yyyy" value="${item.expiry || ''}">
            </div>
            <div class="info-item">
              <label class="form-label">Status</label>
              <select name="status" class="form-control">
                <option value="current" ${item.status === 'current' ? 'selected' : ''}>Current</option>
                <option value="expiring" ${item.status === 'expiring' ? 'selected' : ''}>Expiring</option>
                <option value="expired" ${item.status === 'expired' ? 'selected' : ''}>Expired</option>
              </select>
            </div>
            <div class="info-item" style="grid-column: 1 / -1;">
              <label class="form-label">Result</label>
              <input type="text" name="result" class="form-control" value="${item.result || ''}">
            </div>
            <div class="info-item" style="grid-column: 1 / -1;">
              <label class="form-label">Comments</label>
              <textarea name="comments" class="form-control" rows="3">${item.comments || ''}</textarea>
            </div>
          </div>
          <div class="btn-group" style="margin-top: var(--space-16);">
            <button type="submit" class="btn btn-primary">💾 Save</button>
            <button type="button" class="btn btn-secondary" onclick="cancelEdit('police')">✕ Cancel</button>
          </div>
        </form>
      </div>
    `;
  }
  
  return `
    <div class="section active">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-16);">
        <h3 class="section-title" style="margin: 0;">Police Check</h3>
        ${isEditModeEnabled ? '<button class="btn btn-secondary" onclick="toggleEditMode(\'police\')">✏️ Edit</button>' : ''}
      </div>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Reference Number</div>
          <div class="info-value">${item.number || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Issue Date</div>
          <div class="info-value">${item.issued || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Expiry Date</div>
          <div class="info-value">${item.expiry || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Status</div>
          <div class="info-value"><span class="status-badge status-${item.status || 'current'}">${item.status || 'current'}</span></div>
        </div>
      </div>
      <div class="info-grid">
        <div class="info-item" style="grid-column: 1 / -1;">
          <div class="info-label">Result</div>
          <div class="info-value">${item.result || 'N/A'}</div>
        </div>
        <div class="info-item" style="grid-column: 1 / -1;">
          <div class="info-label">Comments</div>
          <div class="info-value">${item.comments || 'N/A'}</div>
        </div>
      </div>
    </div>
  `;
}

function renderQualificationsSection() {
  const quals = currentStaff.qualifications;
  const currentData = quals[currentQualTab] || [];
  
  // Define columns based on tab type
  let columns = [];
  if (currentQualTab === 'diplomas' || currentQualTab === 'certificates') {
    columns = [
      { key: 'code', label: 'Code' },
      { key: 'name', label: 'Qualification Name' },
      { key: 'completionDate', label: 'Completion Date' },
      { key: 'type', label: 'Type' }
    ];
  } else if (currentQualTab === 'soa') {
    columns = [
      { key: 'code', label: 'Unit Code' },
      { key: 'name', label: 'Unit Name' },
      { key: 'completionDate', label: 'Completion Date' },
      { key: 'completedBy', label: 'Completed By' }
    ];
  }
  
  return `
    <div class="section active">
      <h3 class="section-title">Qualifications</h3>
      
      <div class="qualification-tabs">
        <button class="qual-tab ${currentQualTab === 'diplomas' ? 'active' : ''}" onclick="switchQualTab('diplomas')">Diplomas (${quals.diplomas?.length || 0})</button>
        <button class="qual-tab ${currentQualTab === 'certificates' ? 'active' : ''}" onclick="switchQualTab('certificates')">Certificates (${quals.certificates?.length || 0})</button>
        <button class="qual-tab ${currentQualTab === 'soa' ? 'active' : ''}" onclick="switchQualTab('soa')">SOA (${quals.soa?.length || 0})</button>
      </div>
      
      ${currentData.length > 0 ? `
        <div class="table-container">
          <table>
            <thead>
              <tr>
                ${columns.map(col => `<th>${col.label}</th>`).join('')}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${currentData.map((item, idx) => {
                const isEditing = editMode[`quals-${idx}`];
                if (isEditing) {
                  return `
                    <tr style="background: var(--color-bg-2);">
                      <td colspan="${columns.length + 1}">
                        <form id="edit-form-quals-${idx}" onsubmit="event.preventDefault(); saveEdit('quals', ${idx});" style="padding: var(--space-12);">
                          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-12);">
                            ${columns.map(col => `
                              <div>
                                <label class="form-label">${col.label}</label>
                                <input type="text" name="${col.key}" class="form-control" value="${item[col.key] || ''}">
                              </div>
                            `).join('')}
                          </div>
                          <div class="btn-group" style="margin-top: var(--space-12);">
                            <button type="submit" class="btn btn-primary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm);">💾 Save</button>
                            <button type="button" class="btn btn-secondary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm);" onclick="cancelEdit('quals', ${idx})">✕ Cancel</button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  `;
                }
                return `
                  <tr>
                    ${columns.map(col => `<td>${item[col.key] || 'N/A'}</td>`).join('')}
                    <td>
                      ${isEditModeEnabled ? `
                      <div style="display: flex; gap: var(--space-4);">
                        <button class="btn btn-secondary" style="padding: var(--space-4) var(--space-8); font-size: var(--font-size-sm);" onclick="toggleEditMode('quals', ${idx})">✏️</button>
                        <button class="btn btn-secondary" style="padding: var(--space-4) var(--space-8); font-size: var(--font-size-sm); background: var(--color-error); color: white;" onclick="deleteRecord('quals', ${idx})">🗑️</button>
                      </div>` : 'N/A'}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      ` : `
        <div class="empty-state">No ${currentQualTab} records found</div>
      `}
      
      ${isEditModeEnabled ? `<button class="add-record-btn" onclick="addNewRecord('quals')">+ Add ${currentQualTab.charAt(0).toUpperCase() + currentQualTab.slice(1)}</button>` : ''}
    </div>
  `;
}

function renderTableSection(title, data, columns, sectionId) {
  const stateOptions = ['NSW', 'QLD', 'VIC', 'WA', 'SA', 'TAS', 'NT', 'ACT'];
  return `
    <div class="section active">
      <h3 class="section-title">${title}</h3>
      
      ${data.length > 0 ? `
        <div class="table-container">
          <table>
            <thead>
              <tr>
                ${columns.map(col => `<th>${col.label}</th>`).join('')}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((item, idx) => {
                const isEditing = editMode[`${sectionId}-${idx}`];
                if (isEditing) {
                  return `
                    <tr style="background: var(--color-bg-2);">
                      <td colspan="${columns.length + 1}">
                        <form id="edit-form-${sectionId}-${idx}" onsubmit="event.preventDefault(); saveEdit('${sectionId}', ${idx});" style="padding: var(--space-12);">
                          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-12);">
                            ${columns.map(col => {
                              if (col.isStatus) {
                                return `
                                  <div>
                                    <label class="form-label">${col.label}</label>
                                    <select name="${col.key}" class="form-control">
                                      <option value="current" ${item[col.key] === 'current' ? 'selected' : ''}>Current</option>
                                      <option value="expiring" ${item[col.key] === 'expiring' ? 'selected' : ''}>Expiring</option>
                                      <option value="expired" ${item[col.key] === 'expired' ? 'selected' : ''}>Expired</option>
                                      <option value="pending" ${item[col.key] === 'pending' ? 'selected' : ''}>Pending</option>
                                      <option value="completed" ${item[col.key] === 'completed' ? 'selected' : ''}>Completed</option>
                                    </select>
                                  </div>
                                `;
                              }
                              if (col.key === 'state') {
                                return `
                                  <div>
                                    <label class="form-label">${col.label}</label>
                                    <select name="${col.key}" class="form-control">
                                      <option value="">-- Select State --</option>
                                      ${stateOptions.map(state => `<option value="${state}" ${item[col.key] === state ? 'selected' : ''}>${state}</option>`).join('')}
                                    </select>
                                  </div>
                                `;
                              }
                              return `
                                <div>
                                  <label class="form-label">${col.label}</label>
                                  <input type="text" name="${col.key}" class="form-control" value="${item[col.key] || ''}">
                                </div>
                              `;
                            }).join('')}
                          </div>
                          <div class="btn-group" style="margin-top: var(--space-12);">
                            <button type="submit" class="btn btn-primary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm);">💾 Save</button>
                            <button type="button" class="btn btn-secondary" style="padding: var(--space-4) var(--space-12); font-size: var(--font-size-sm);" onclick="cancelEdit('${sectionId}', ${idx})">✕ Cancel</button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  `;
                }
                return `
                  <tr>
                    ${columns.map(col => {
                      if (col.isStatus) {
                        return `<td><span class="status-badge status-${item[col.key] || 'current'}">${item[col.key] || 'current'}</span></td>`;
                      }
                      return `<td>${item[col.key] || 'N/A'}</td>`;
                    }).join('')}
                    <td>
                      <div style="display: flex; gap: var(--space-4);">
                        <button class="btn btn-secondary" style="padding: var(--space-4) var(--space-8); font-size: var(--font-size-sm);" onclick="toggleEditMode('${sectionId}', ${idx})">✏️</button>
                        <button class="btn btn-secondary" style="padding: var(--space-4) var(--space-8); font-size: var(--font-size-sm); background: var(--color-error); color: white;" onclick="deleteRecord('${sectionId}', ${idx})">🗑️</button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      ` : `
        <div class="empty-state">No records found</div>
      `}
      
      ${isEditModeEnabled ? `<button class="add-record-btn" onclick="addNewRecord('${sectionId}')">+ Add Record</button>` : ''}
    </div>
  `;
}

function switchSection(section) {
  currentSection = section;
  renderStaffDetail();
}

function switchQualTab(tab) {
  currentQualTab = tab;
  renderStaffDetail();
}



function printDashboard() {
  if (!currentStaff) {
    alert('Please select a staff member to print.');
    return;
  }
  
  // Store current section
  const originalSection = currentSection;
  const originalQualTab = currentQualTab;
  
  // Temporarily show all sections for print
  const container = document.getElementById('staffDetailContainer');
  const originalHTML = container.innerHTML;
  
  // Render all sections for print
  container.innerHTML = `
    <div class="staff-detail-card">
      <div class="staff-header">
        <h2 class="staff-name">${currentStaff.name}</h2>
        <div class="staff-meta">
          <span><strong>ATLAS ID:</strong> ${currentStaff.atlasId}</span>
          <span><strong>Position:</strong> ${currentStaff.position}</span>
          <span><strong>State:</strong> ${currentStaff.state}</span>
          <span><strong>DOB:</strong> ${currentStaff.dateOfBirth}</span>
          <span><strong>Date Added:</strong> ${currentStaff.createdDate || 'Not recorded'}</span>
        </div>
      </div>
      
      <div class="tab-content">
        ${renderAllSectionsForPrint()}
      </div>
    </div>
  `;
  
  // Trigger print
  window.print();
  
  // Restore original view
  container.innerHTML = originalHTML;
  currentSection = originalSection;
  currentQualTab = originalQualTab;
}

function renderAllSectionsForPrint() {
  return `
    ${renderContactSectionForPrint()}
    ${renderInsuranceSectionForPrint()}
    ${renderDriverLicenceSectionForPrint()}
    ${renderHRWLicenceSectionForPrint()}
    ${renderCardLicencesSectionForPrint()}
    ${renderFormsSectionForPrint()}
    ${renderPoliceCheckSectionForPrint()}
    ${renderQualificationsSectionForPrint()}
  `;
}

function renderContactSectionForPrint() {
  return `
    <div class="section active">
      <h3 class="section-title">Section 1: Contact Details</h3>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">First Name</div>
          <div class="info-value">${currentStaff.firstName || currentStaff.name.split(' ')[0] || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Middle Name</div>
          <div class="info-value">${currentStaff.middleName || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Surname</div>
          <div class="info-value">${currentStaff.surname || currentStaff.name.split(' ').pop() || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Email</div>
          <div class="info-value">${currentStaff.contact.email}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Phone</div>
          <div class="info-value">${currentStaff.contact.phone}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Date of Birth</div>
          <div class="info-value">${currentStaff.dateOfBirth || 'Not provided'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Date Added to System</div>
          <div class="info-value">${currentStaff.createdDate || 'Not recorded'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Emergency Contact</div>
          <div class="info-value">${currentStaff.contact.emergencyContact}</div>
        </div>
        <div class="info-item" style="grid-column: 1 / -1;">
          <div class="info-label">Address</div>
          <div class="info-value">${currentStaff.contact.address}</div>
        </div>
      </div>
    </div>
  `;
}

function renderInsuranceSectionForPrint() {
  const ins = currentStaff.insurance;
  return `
    <div class="section active">
      <h3 class="section-title">Section 2: Insurance Information</h3>
      
      <h4 style="margin: 15px 0 10px 0;">Professional Indemnity</h4>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Provider</div>
          <div class="info-value">${ins.professionalIndemnity.provider || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Number</div>
          <div class="info-value">${ins.professionalIndemnity.number || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Start Date</div>
          <div class="info-value">${ins.professionalIndemnity.startDate || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Expiry</div>
          <div class="info-value">${ins.professionalIndemnity.expiry || 'N/A'}</div>
        </div>
      </div>
      
      <h4 style="margin: 15px 0 10px 0;">Public Liability</h4>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Provider</div>
          <div class="info-value">${ins.publicLiability.provider || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Number</div>
          <div class="info-value">${ins.publicLiability.number || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Start Date</div>
          <div class="info-value">${ins.publicLiability.startDate || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Expiry</div>
          <div class="info-value">${ins.publicLiability.expiry || 'N/A'}</div>
        </div>
      </div>
      
      <h4 style="margin: 15px 0 10px 0;">WorkCover</h4>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Number</div>
          <div class="info-value">${ins.workCover.number || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Expiry</div>
          <div class="info-value">${ins.workCover.expiry || 'N/A'}</div>
        </div>
      </div>
    </div>
  `;
}

function renderDriverLicenceSectionForPrint() {
  const data = currentStaff.driverLicence || [];
  return renderTableSectionForPrint('Section 3: Driver Licence', data, [
    { key: 'number', label: 'Licence Number' },
    { key: 'state', label: 'State' },
    { key: 'class', label: 'Class' },
    { key: 'expiry', label: 'Expiry Date' },
    { key: 'status', label: 'Status', isStatus: true }
  ]);
}

function renderHRWLicenceSectionForPrint() {
  const data = currentStaff.hrwLicence || [];
  return renderTableSectionForPrint('Section 4: High Risk Work Licence', data, [
    { key: 'name', label: 'Licence Name' },
    { key: 'number', label: 'Licence Number' },
    { key: 'state', label: 'State' },
    { key: 'classes', label: 'Classes' },
    { key: 'issued', label: 'Issue Date' },
    { key: 'expiry', label: 'Expiry Date' },
    { key: 'status', label: 'Status', isStatus: true }
  ]);
}

function renderCardLicencesSectionForPrint() {
  const data = currentStaff.cardLicences || [];
  return renderTableSectionForPrint('Section 5: Card Licences', data, [
    { key: 'issuedBy', label: 'Issued By' },
    { key: 'state', label: 'State' },
    { key: 'number', label: 'Card Number' },
    { key: 'classes', label: 'Classes' },
    { key: 'issued', label: 'Issue Date' },
    { key: 'expiry', label: 'Expiry Date' },
    { key: 'status', label: 'Status', isStatus: true }
  ]);
}

function renderFormsSectionForPrint() {
  const data = currentStaff.atlasforms || [];
  return renderTableSectionForPrint('Section 6: ATLAS Forms', data, [
    { key: 'formCode', label: 'Form Code' },
    { key: 'formName', label: 'Form Name' },
    { key: 'signedDate', label: 'Signed Date' },
    { key: 'status', label: 'Status', isStatus: true }
  ]);
}

function renderPoliceCheckSectionForPrint() {
  const data = currentStaff.policeCheck || [];
  if (data.length === 0) {
    return '<div class="section active"><h3 class="section-title">Section 7: Police Check</h3><div class="empty-state">No police check records found</div></div>';
  }
  const item = data[0];
  
  return `
    <div class="section active">
      <h3 class="section-title">Section 7: Police Check</h3>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Reference Number</div>
          <div class="info-value">${item.number || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Issue Date</div>
          <div class="info-value">${item.issued || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Expiry Date</div>
          <div class="info-value">${item.expiry || 'N/A'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Status</div>
          <div class="info-value"><span class="status-badge status-${item.status || 'current'}">${item.status || 'current'}</span></div>
        </div>
      </div>
      <div class="info-grid">
        <div class="info-item" style="grid-column: 1 / -1;">
          <div class="info-label">Result</div>
          <div class="info-value">${item.result || 'N/A'}</div>
        </div>
        <div class="info-item" style="grid-column: 1 / -1;">
          <div class="info-label">Comments</div>
          <div class="info-value">${item.comments || 'N/A'}</div>
        </div>
      </div>
    </div>
  `;
}

function renderQualificationsSectionForPrint() {
  const quals = currentStaff.qualifications;
  const diplomas = quals.diplomas || [];
  const certificates = quals.certificates || [];
  const soa = quals.soa || [];
  
  let html = '<div class="section active"><h3 class="section-title">Section 8: Qualifications</h3>';
  
  // Diplomas
  html += '<h4 style="margin: 15px 0 10px 0;">Diplomas</h4>';
  if (diplomas.length > 0) {
    html += '<div class="table-container"><table><thead><tr>';
    html += '<th>Code</th><th>Qualification Name</th><th>Completion Date</th><th>Type</th>';
    html += '</tr></thead><tbody>';
    diplomas.forEach(item => {
      html += `<tr>
        <td>${item.code || 'N/A'}</td>
        <td>${item.name || 'N/A'}</td>
        <td>${item.completionDate || 'N/A'}</td>
        <td>${item.type || 'N/A'}</td>
      </tr>`;
    });
    html += '</tbody></table></div>';
  } else {
    html += '<div class="empty-state">No diploma records found</div>';
  }
  
  // Certificates
  html += '<h4 style="margin: 15px 0 10px 0;">Certificates</h4>';
  if (certificates.length > 0) {
    html += '<div class="table-container"><table><thead><tr>';
    html += '<th>Code</th><th>Qualification Name</th><th>Completion Date</th><th>Type</th>';
    html += '</tr></thead><tbody>';
    certificates.forEach(item => {
      html += `<tr>
        <td>${item.code || 'N/A'}</td>
        <td>${item.name || 'N/A'}</td>
        <td>${item.completionDate || 'N/A'}</td>
        <td>${item.type || 'N/A'}</td>
      </tr>`;
    });
    html += '</tbody></table></div>';
  } else {
    html += '<div class="empty-state">No certificate records found</div>';
  }
  
  // SOA
  html += '<h4 style="margin: 15px 0 10px 0;">Statement of Attainment (SOA)</h4>';
  if (soa.length > 0) {
    html += '<div class="table-container"><table><thead><tr>';
    html += '<th>Unit Code</th><th>Unit Name</th><th>Completion Date</th><th>Completed By</th>';
    html += '</tr></thead><tbody>';
    soa.forEach(item => {
      html += `<tr>
        <td>${item.code || 'N/A'}</td>
        <td>${item.name || 'N/A'}</td>
        <td>${item.completionDate || 'N/A'}</td>
        <td>${item.completedBy || 'N/A'}</td>
      </tr>`;
    });
    html += '</tbody></table></div>';
  } else {
    html += '<div class="empty-state">No SOA records found</div>';
  }
  
  html += '</div>';
  return html;
}

function renderTableSectionForPrint(title, data, columns) {
  let html = `<div class="section active"><h3 class="section-title">${title}</h3>`;
  
  if (data.length > 0) {
    html += '<div class="table-container"><table><thead><tr>';
    columns.forEach(col => {
      html += `<th>${col.label}</th>`;
    });
    html += '</tr></thead><tbody>';
    
    data.forEach(item => {
      html += '<tr>';
      columns.forEach(col => {
        if (col.isStatus) {
          html += `<td><span class="status-badge status-${item[col.key] || 'current'}">${item[col.key] || 'current'}</span></td>`;
        } else {
          html += `<td>${item[col.key] || 'N/A'}</td>`;
        }
      });
      html += '</tr>';
    });
    
    html += '</tbody></table></div>';
  } else {
    html += '<div class="empty-state">No records found</div>';
  }
  
  html += '</div>';
  return html;
}

function exportToCSV() {
  if (!currentStaff) {
    alert('Please select a staff member first.');
    return;
  }
  
  let csv = 'ATLAS Workforce Data Export\n\n';
  csv += `Staff Member: ${currentStaff.name}\n`;
  csv += `ATLAS ID: ${currentStaff.atlasId}\n`;
  csv += `Position: ${currentStaff.position}\n`;
  csv += `Date Added: ${currentStaff.createdDate || 'Not recorded'}\n\n`;
  
  csv += 'Contact Details\n';
  csv += `Email,${currentStaff.contact.email}\n`;
  csv += `Phone,${currentStaff.contact.phone}\n`;
  csv += `Address,${currentStaff.contact.address}\n`;
  csv += `Date of Birth,${currentStaff.dateOfBirth || 'Not provided'}\n`;
  csv += `Date Added to System,${currentStaff.createdDate || 'Not recorded'}\n\n`;
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${currentStaff.atlasId}_workforce_data.csv`;
  a.click();
}

function generateComplianceReport() {
  if (!currentStaff) {
    alert('Please select a staff member first.');
    return;
  }
  
  let report = `COMPLIANCE REPORT - ${currentStaff.name}\n`;
  report += `Generated: ${new Date().toLocaleDateString('en-AU')}\n\n`;
  report += `ASQA 2025 Compliance Status\n`;
  report += `=============================\n\n`;
  
  const ins = currentStaff.insurance;
  report += `Professional Indemnity: ${ins.professionalIndemnity.status || 'N/A'}\n`;
  report += `Public Liability: ${ins.publicLiability.status || 'N/A'}\n`;
  report += `WorkCover: ${ins.workCover.status || 'N/A'}\n`;
  
  alert(report);
}

// Export staff data to JSON file
function exportStaffData() {
  try {
    const dataStr = JSON.stringify(staffData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    // Create download link
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ATALS-workforce-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showSuccessMessage('✓ Data exported successfully!\n\nFile saved: ATALS-workforce-data.json\n\nKeep this file safe - use Import Data to restore your changes.', 5000);
  } catch(e) {
    console.error('Export failed:', e);
    alert('Error exporting data: ' + e.message);
  }
}

// Import staff data from JSON file
function importStaffData() {
  // Create file input
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const imported = JSON.parse(event.target.result);
        
        if (!Array.isArray(imported)) {
          alert('Error: Invalid data format');
          return;
        }
        
        // Confirm before overwriting
        if (confirm(`Import ${imported.length} staff members?\n\nThis will replace current data.`)) {
          staffData = imported;
          
          // Save to storage immediately
          const storage = getStorage();
          storage.setItem('staffData', JSON.stringify(staffData));
          console.log('✓ Imported data saved to storage');
          
          // Update UI
          updateStaffSelect();
          
          showSuccessMessage(`✓ Successfully imported ${imported.length} staff members!`, 4000);
          
          // Reset view
          const searchStaff = document.getElementById('staffSelect');
          if (searchStaff) {
            searchStaff.value = '';
          }
          showNoStaffSelected();
        }
      } catch(e) {
        console.error('Import failed:', e);
        alert('Error importing data: ' + e.message);
      }
    };
    
    reader.readAsText(file);
  };
  
  input.click();
}

function saveStaffData() {
  try {
    const storage = getStorage();
    const jsonData = JSON.stringify(staffData);
    storage.setItem('staffData', jsonData);
    console.log('✓ SAVED to storage:', staffData.length, 'staff members');
    console.log('Data size:', jsonData.length, 'characters');
    return true;
  } catch(e) {
    console.error('✗ Save failed:', e);
    alert('Error: Could not save changes - ' + e.message);
    return false;
  }
}



// Legacy function - calls saveStaffData
function saveToLocalStorage() {
  const success = saveStaffData();
  if (success) {
    showSuccessMessage('✓ Changes saved!\n\nData will persist through page refresh (F5).\nUse Export Data to save permanently to file.');
  }
  return success;
}

// Legacy function - now calls saveToLocalStorage
function saveData() {
  console.log('=== SAVE DATA CALLED ===');
  console.log('Saving staffData with', staffData.length, 'staff members');
  console.log('Staff ATLAS IDs:', staffData.map(s => s.atlasId));
  
  return saveToLocalStorage();
}

// Show success message
function showSuccessMessage(message, duration = 3000) {
  const msgEl = document.getElementById('successMessage');
  msgEl.textContent = message;
  msgEl.style.display = 'block';
  setTimeout(() => {
    msgEl.style.display = 'none';
  }, duration);
}

// Toggle edit mode for a section
function toggleEditMode(section, itemIndex = null) {
  if (!isEditModeEnabled) {
    alert('Please login to enable edit mode');
    return;
  }
  const key = itemIndex !== null ? `${section}-${itemIndex}` : section;
  editMode[key] = !editMode[key];
  if (editMode[key]) {
    // Store current data for cancel
    editData[key] = JSON.parse(JSON.stringify(getCurrentSectionData(section, itemIndex)));
  }
  renderStaffDetail();
}

// Get current section data
function getCurrentSectionData(section, itemIndex = null) {
  switch(section) {
    case 'contact': return currentStaff.contact;
    case 'insurance': return currentStaff.insurance;
    case 'driver': return itemIndex !== null ? currentStaff.driverLicence[itemIndex] : currentStaff.driverLicence;
    case 'hrw': return itemIndex !== null ? currentStaff.hrwLicence[itemIndex] : currentStaff.hrwLicence;
    case 'cards': return itemIndex !== null ? currentStaff.cardLicences[itemIndex] : currentStaff.cardLicences;
    case 'forms': return itemIndex !== null ? currentStaff.atlasforms[itemIndex] : currentStaff.atlasforms;
    case 'police': return currentStaff.policeCheck[0];
    case 'quals': return currentStaff.qualifications[currentQualTab];
    default: return null;
  }
}

// Enhanced edit contact function with verification
function editContact(atlasId) {
  if (!currentUser) {
    alert('Please login to edit');
    return;
  }
  
  const staff = staffData.find(s => s.atlasId === atlasId);
  if (!staff) return;
  
  const newPhone = prompt('Enter new phone number:', staff.contact.phone);
  if (newPhone && newPhone !== staff.contact.phone) {
    // Update the phone
    staff.contact.phone = newPhone;
    console.log('Phone updated to:', newPhone);
    
    // Save to storage
    const saved = saveToLocalStorage();
    
    // Verify it was saved
    const storage = getStorage();
    const verify = storage.getItem('staffData');
    if (verify) {
      const parsed = JSON.parse(verify);
      const verifyStaff = parsed.find(s => s.atlasId === atlasId);
      console.log('Verified saved phone:', verifyStaff.contact.phone);
    }
    
    // Re-render
    renderStaffSections(atlasId);
    
    if (saved) {
      alert('✓ Phone number updated and saved!');
    } else {
      alert('⚠️ Phone number updated but save failed!');
    }
  }
}

// Save edit
function saveEdit(section, itemIndex = null) {
  const key = itemIndex !== null ? `${section}-${itemIndex}` : section;
  const formData = new FormData(document.getElementById(`edit-form-${key}`));
  
  // Update currentStaff based on section
  switch(section) {
    case 'contact':
      // Get and format names
      const firstName = toSentenceCase(formData.get('firstName'));
      const middleName = formData.get('middleName') ? toSentenceCase(formData.get('middleName')) : '';
      const surname = toSentenceCase(formData.get('surname'));
      
      // Update staff object
      currentStaff.firstName = firstName;
      currentStaff.middleName = middleName;
      currentStaff.surname = surname;
      currentStaff.name = middleName ? `${firstName} ${middleName} ${surname}` : `${firstName} ${surname}`;
      
      // Regenerate ATLAS ID if name changed
      const newAtlasId = generateAtlasId(firstName, surname, middleName);
      if (newAtlasId && newAtlasId !== currentStaff.atlasId) {
        // Check if new ID is unique
        const isDuplicate = staffData.some(s => s.atlasId === newAtlasId && s.id !== currentStaff.id);
        if (!isDuplicate) {
          currentStaff.atlasId = newAtlasId;
        }
      }
      
      currentStaff.contact.email = formData.get('email');
      currentStaff.contact.phone = formatPhone(formData.get('phone'));
      currentStaff.contact.address = formData.get('address');
      currentStaff.contact.emergencyContact = formData.get('emergencyContact');
      
      // CRITICAL: Save after contact edit with verification
      console.log('Saving contact changes...');
      const saved = saveToMemoryStore();
      
      // Verify it was saved
      if (saved) {
        const storage = getStorage();
        const verify = storage.getItem('staffData');
        if (verify) {
          const parsed = JSON.parse(verify);
          const verifyStaff = parsed.find(s => s.id === currentStaff.id);
          console.log('Verified saved contact:', verifyStaff ? verifyStaff.contact.phone : 'NOT FOUND');
        }
      }
      break;
    case 'insurance':
      const insType = formData.get('insuranceType');
      currentStaff.insurance[insType].provider = formData.get('provider');
      currentStaff.insurance[insType].number = formData.get('number');
      currentStaff.insurance[insType].startDate = formData.get('startDate');
      currentStaff.insurance[insType].expiry = formData.get('expiry');
      currentStaff.insurance[insType].status = formData.get('status');
      
      // CRITICAL: Save after insurance edit
      saveToMemoryStore();
      break;
    case 'driver':
      currentStaff.driverLicence[itemIndex].state = formData.get('state');
      currentStaff.driverLicence[itemIndex].number = formData.get('number');
      currentStaff.driverLicence[itemIndex].class = formData.get('class');
      currentStaff.driverLicence[itemIndex].expiry = formData.get('expiry');
      currentStaff.driverLicence[itemIndex].status = formData.get('status');
      
      // CRITICAL: Save after driver licence edit
      saveToMemoryStore();
      break;
    case 'hrw':
      currentStaff.hrwLicence[itemIndex].name = formData.get('name');
      currentStaff.hrwLicence[itemIndex].state = formData.get('state');
      currentStaff.hrwLicence[itemIndex].number = formData.get('number');
      currentStaff.hrwLicence[itemIndex].issued = formData.get('issued');
      currentStaff.hrwLicence[itemIndex].expiry = formData.get('expiry');
      currentStaff.hrwLicence[itemIndex].classes = formData.get('classes');
      currentStaff.hrwLicence[itemIndex].status = formData.get('status');
      
      // CRITICAL: Save after HRW licence edit
      saveToMemoryStore();
      break;
    case 'cards':
      currentStaff.cardLicences[itemIndex].issuedBy = formData.get('issuedBy');
      currentStaff.cardLicences[itemIndex].state = formData.get('state');
      currentStaff.cardLicences[itemIndex].number = formData.get('number');
      currentStaff.cardLicences[itemIndex].issued = formData.get('issued');
      currentStaff.cardLicences[itemIndex].expiry = formData.get('expiry');
      currentStaff.cardLicences[itemIndex].classes = formData.get('classes');
      currentStaff.cardLicences[itemIndex].status = formData.get('status');
      
      // CRITICAL: Save after card licence edit
      saveToMemoryStore();
      break;
    case 'forms':
      currentStaff.atlasforms[itemIndex].formCode = formData.get('formCode');
      currentStaff.atlasforms[itemIndex].formName = formData.get('formName');
      currentStaff.atlasforms[itemIndex].signedDate = formData.get('signedDate');
      currentStaff.atlasforms[itemIndex].status = formData.get('status');
      
      // CRITICAL: Save after form edit
      saveToMemoryStore();
      break;
    case 'police':
      currentStaff.policeCheck[0].number = formData.get('number');
      currentStaff.policeCheck[0].issued = formData.get('issued');
      currentStaff.policeCheck[0].expiry = formData.get('expiry');
      currentStaff.policeCheck[0].result = formData.get('result');
      currentStaff.policeCheck[0].comments = formData.get('comments');
      currentStaff.policeCheck[0].status = formData.get('status');
      
      // CRITICAL: Save after police check edit
      saveToMemoryStore();
      break;
    case 'quals':
      const qualIndex = itemIndex;
      if (currentQualTab === 'diplomas' || currentQualTab === 'certificates') {
        currentStaff.qualifications[currentQualTab][qualIndex].code = formData.get('code');
        currentStaff.qualifications[currentQualTab][qualIndex].name = formData.get('name');
        currentStaff.qualifications[currentQualTab][qualIndex].completionDate = formData.get('completionDate');
        currentStaff.qualifications[currentQualTab][qualIndex].type = formData.get('type');
      } else {
        currentStaff.qualifications[currentQualTab][qualIndex].code = formData.get('code');
        currentStaff.qualifications[currentQualTab][qualIndex].name = formData.get('name');
        currentStaff.qualifications[currentQualTab][qualIndex].completionDate = formData.get('completionDate');
        currentStaff.qualifications[currentQualTab][qualIndex].completedBy = formData.get('completedBy');
      }
      
      // CRITICAL: Save after qualification edit
      saveToMemoryStore();
      break;
  }
  
  // Update staffData array
  const staffIndex = staffData.findIndex(s => s.id === currentStaff.id);
  if (staffIndex !== -1) {
    staffData[staffIndex] = currentStaff;
    console.log('Updated staff in array at index:', staffIndex);
  } else {
    console.error('Staff not found in array for update!');
  }
  
  // Exit edit mode
  editMode[key] = false;
  delete editData[key];
  
  // Update dropdown if ATLAS ID changed
  if (section === 'contact') {
    updateStaffSelect();
    const staffSelect = document.getElementById('staffSelect');
    if (staffSelect) {
      staffSelect.value = currentStaff.atlasId;
    }
  }
  
  // Show success and re-render
  showSuccessMessage('Changes saved successfully!');
  renderStaffDetail();
}

// Cancel edit
function cancelEdit(section, itemIndex = null) {
  const key = itemIndex !== null ? `${section}-${itemIndex}` : section;
  editMode[key] = false;
  delete editData[key];
  renderStaffDetail();
}

// Delete record
function deleteRecord(section, itemIndex) {
  if (!isEditModeEnabled) {
    alert('Please login to enable edit mode');
    return;
  }
  if (!confirm('Are you sure you want to delete this record?')) return;
  
  switch(section) {
    case 'driver':
      currentStaff.driverLicence.splice(itemIndex, 1);
      break;
    case 'hrw':
      currentStaff.hrwLicence.splice(itemIndex, 1);
      break;
    case 'cards':
      currentStaff.cardLicences.splice(itemIndex, 1);
      break;
    case 'forms':
      currentStaff.atlasforms.splice(itemIndex, 1);
      break;
    case 'quals':
      currentStaff.qualifications[currentQualTab].splice(itemIndex, 1);
      break;
  }
  
  // Update staffData array
  const staffIndex = staffData.findIndex(s => s.atlasId === currentStaff.atlasId);
  if (staffIndex !== -1) {
    staffData[staffIndex] = currentStaff;
  }
  
  // CRITICAL: Save to memory store after delete
  saveToMemoryStore();
  saveStaffData();
  
  if (saveToLocalStorage()) {
    showSuccessMessage('Record deleted successfully!');
  }
  renderStaffDetail();
}

// Add new record
function addNewRecord(section) {
  if (!isEditModeEnabled) {
    alert('Please login to enable edit mode');
    return;
  }
  let newRecord = {};
  
  switch(section) {
    case 'driver':
      newRecord = { state: '', number: '', class: '', expiry: '', status: 'current' };
      currentStaff.driverLicence.push(newRecord);
      toggleEditMode('driver', currentStaff.driverLicence.length - 1);
      break;
    case 'hrw':
      newRecord = { name: '', state: '', number: '', issued: '', expiry: '', classes: '', status: 'current' };
      currentStaff.hrwLicence.push(newRecord);
      toggleEditMode('hrw', currentStaff.hrwLicence.length - 1);
      break;
    case 'cards':
      newRecord = { issuedBy: '', state: '', number: '', issued: '', expiry: '', classes: '', status: 'current' };
      currentStaff.cardLicences.push(newRecord);
      toggleEditMode('cards', currentStaff.cardLicences.length - 1);
      break;
    case 'forms':
      newRecord = { formCode: '', formName: '', signedDate: '', status: 'pending' };
      currentStaff.atlasforms.push(newRecord);
      toggleEditMode('forms', currentStaff.atlasforms.length - 1);
      break;
    case 'quals':
      if (currentQualTab === 'diplomas' || currentQualTab === 'certificates') {
        newRecord = { code: '', name: '', completionDate: '', type: currentQualTab === 'diplomas' ? 'Diploma' : 'Certificate' };
      } else {
        newRecord = { code: '', name: '', completionDate: '', completedBy: '' };
      }
      currentStaff.qualifications[currentQualTab].push(newRecord);
      toggleEditMode('quals', currentStaff.qualifications[currentQualTab].length - 1);
      break;
  }
  
  renderStaffDetail();
}

// Generate ATLAS ID from first name, surname, and optional middle name
function generateAtlasId(firstName, surname, middleName = '') {
  // Validate inputs
  if (!firstName || !surname) {
    return '';
  }
  
  // Remove special characters and trim
  const cleanFirstName = firstName.trim().replace(/[^a-zA-Z'-]/g, '');
  const cleanSurname = surname.trim().replace(/[^a-zA-Z'-]/g, '');
  const cleanMiddleName = middleName ? middleName.trim().replace(/[^a-zA-Z'-]/g, '') : '';
  
  if (!cleanFirstName || !cleanSurname) {
    return '';
  }
  
  // Format: SURNAME (all caps) + Firstname (sentence case)
  // surname all caps, firstname with capital first letter only, rest lowercase
  let baseId = cleanSurname.toUpperCase() + cleanFirstName.charAt(0).toUpperCase() + cleanFirstName.slice(1).toLowerCase();
  
  // Add middle initial if provided
  if (cleanMiddleName) {
    baseId += cleanMiddleName.charAt(0).toUpperCase();
  }
  
  let atlasId = baseId;
  let counter = 2;
  
  // Check for duplicates
  while (staffData.some(staff => staff.atlasId === atlasId)) {
    atlasId = baseId + counter;
    counter++;
  }
  
  return atlasId;
}

// Format name to sentence case (capitalize first letter, rest lowercase)
function toSentenceCase(name) {
  if (!name) return '';
  const trimmed = name.trim();
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

// Format phone number to XXXX-XXX-XXX
function formatPhone(phone) {
  if (!phone) return '';
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  // Format as XXXX-XXX-XXX
  if (digits.length === 10) {
    return digits.substring(0, 4) + '-' + digits.substring(4, 7) + '-' + digits.substring(7);
  }
  return phone; // Return as-is if not 10 digits
}

// Toggle middle name field visibility
function toggleMiddleName(showField) {
  const middleNameField = document.getElementById('middleNameField');
  const middleNameInput = document.getElementById('staffMiddleName');
  const yesBtn = document.getElementById('middleNameYes');
  const noBtn = document.getElementById('middleNameNo');
  
  if (showField) {
    middleNameField.style.display = 'block';
    yesBtn.style.background = 'var(--purple-dark)';
    yesBtn.style.color = 'white';
    noBtn.style.background = '';
    noBtn.style.color = '';
  } else {
    middleNameField.style.display = 'none';
    middleNameInput.value = '';
    noBtn.style.background = 'var(--purple-dark)';
    noBtn.style.color = 'white';
    yesBtn.style.background = '';
    yesBtn.style.color = '';
  }
  
  // Update preview when toggling
  updateAtlasIdPreview();
}

// Update ATLAS ID preview
function updateAtlasIdPreview() {
  const firstName = document.getElementById('staffFirstName').value.trim();
  const surname = document.getElementById('staffSurname').value.trim();
  const middleName = document.getElementById('staffMiddleName').value.trim();
  
  if (firstName && surname) {
    const atlasId = generateAtlasId(firstName, surname, middleName);
    const baseId = surname.toUpperCase() + firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase() + (middleName ? middleName.charAt(0).toUpperCase() : '');
    
    document.getElementById('atlasIdPreview').style.display = 'block';
    document.getElementById('previewAtlasId').textContent = atlasId;
    
    // Show duplicate warning if ID was modified
    if (atlasId !== baseId) {
      document.getElementById('duplicateWarning').style.display = 'block';
      document.getElementById('duplicateWarning').textContent = `⚠️ Duplicate name detected. ATLAS ID adjusted to: ${atlasId}`;
    } else {
      document.getElementById('duplicateWarning').style.display = 'none';
    }
  } else {
    document.getElementById('atlasIdPreview').style.display = 'none';
  }
}

// Show add staff modal
function showAddStaffModal() {
  if (currentUserRole !== 'administrator') {
    alert('Access denied. Only administrators can add new staff members.');
    return;
  }
  
  const modal = document.getElementById('addStaffModal');
  modal.style.display = 'flex';
  document.getElementById('staffFirstName').focus();
  
  // Add event listeners for real-time ATLAS ID preview
  const firstNameInput = document.getElementById('staffFirstName');
  const surnameInput = document.getElementById('staffSurname');
  
  firstNameInput.addEventListener('input', updateAtlasIdPreview);
  surnameInput.addEventListener('input', updateAtlasIdPreview);
  
  const middleNameInput = document.getElementById('staffMiddleName');
  middleNameInput.addEventListener('input', updateAtlasIdPreview);
}

// Hide add staff modal
function hideAddStaffModal() {
  const modal = document.getElementById('addStaffModal');
  modal.style.display = 'none';
  document.getElementById('addStaffForm').reset();
  document.getElementById('atlasIdPreview').style.display = 'none';
}

// Add new staff member - CRITICAL FIX VERSION
function addStaffMember() {
  console.log('=== ADD STAFF MEMBER STARTED ===');
  console.log('Current staffData length BEFORE add:', staffData.length);
  console.log('Current ATLAS IDs:', staffData.map(s => s.atlasId));
  
  // Get form values and apply formatting immediately on inputs
  const firstNameInput = document.getElementById('staffFirstName');
  const surnameInput = document.getElementById('staffSurname');
  const middleNameInput = document.getElementById('staffMiddleName');
  
  const firstNameRaw = firstNameInput.value.trim();
  const surnameRaw = surnameInput.value.trim();
  const middleNameRaw = middleNameInput.value.trim();
  const position = document.getElementById('staffPosition').value;
  const state = document.getElementById('staffState').value;
  const teamStatus = document.getElementById('staffTeamStatus').value;
  const dob = document.getElementById('staffDOB').value.trim();
  const email = document.getElementById('staffEmail').value.trim();
  const phone = document.getElementById('staffPhone').value.trim();
  const address = document.getElementById('staffAddress').value.trim();
  const suburb = document.getElementById('staffSuburb').value.trim();
  const postcode = document.getElementById('staffPostcode').value.trim();
  
  console.log('Form values - First:', firstNameRaw, 'Surname:', surnameRaw, 'Middle:', middleNameRaw);
  
  // Apply sentence case formatting
  const firstName = toSentenceCase(firstNameRaw);
  const surname = toSentenceCase(surnameRaw);
  const middleName = middleNameRaw ? toSentenceCase(middleNameRaw) : '';
  
  console.log('Formatted names - First:', firstName, 'Surname:', surname, 'Middle:', middleName);
  
  // Validate required fields
  if (!firstName || !surname || !position || !state) {
    alert('Please fill in all required fields (First Name, Surname, Position, State)');
    return;
  }
  
  // Validate name characters (only letters, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z'-]+$/;
  if (!nameRegex.test(firstName) || !nameRegex.test(surname)) {
    alert('Names can only contain letters, hyphens, and apostrophes');
    return;
  }
  
  // Validate middle name if provided
  if (middleName && !nameRegex.test(middleName)) {
    alert('Middle name can only contain letters, hyphens, and apostrophes');
    return;
  }
  
  // Generate ATLAS ID with middle name if provided
  const atlasId = generateAtlasId(firstName, surname, middleName);
  console.log('Generated ATLAS ID:', atlasId);
  
  if (!atlasId) {
    alert('Failed to generate ATLAS ID. Please check the names entered.');
    return;
  }
  
  // Generate unique ID (max existing ID + 1)
  const maxId = Math.max(...staffData.map(s => s.id || 0));
  const newId = maxId + 1;
  console.log('New staff ID:', newId);
  
  // Build full address
  let fullAddress = address;
  if (suburb || postcode) {
    const parts = [address, suburb, state, postcode].filter(p => p);
    fullAddress = parts.join(', ');
  }
  
  // Create full name with middle name if provided
  const fullName = middleName ? `${firstName} ${middleName} ${surname}` : `${firstName} ${surname}`;
  console.log('Full name:', fullName);
  
  // Create new staff object
  const newStaff = {
    id: newId,
    name: fullName,
    firstName: firstName,
    middleName: middleName || '',
    surname: surname,
    position: position,
    atlasId: atlasId,
    state: state,
    teamStatus: teamStatus,
    dateOfBirth: dob || 'Not provided',
    createdDate: getCreationDate(),
    contact: {
      email: email || 'Not provided',
      phone: formatPhone(phone) || 'Not provided',
      address: fullAddress || 'Not provided',
      emergencyContact: 'Not provided'
    },
    insurance: {
      professionalIndemnity: {
        provider: '',
        number: '',
        startDate: '',
        expiry: '',
        status: 'current'
      },
      publicLiability: {
        provider: '',
        number: '',
        startDate: '',
        expiry: '',
        status: 'current'
      },
      workCover: {
        number: '',
        expiry: '',
        status: 'current'
      }
    },
    driverLicence: [],
    hrwLicence: [],
    cardLicences: [],
    atlasforms: [],
    policeCheck: [],
    qualifications: {
      diplomas: [],
      certificates: [],
      soa: []
    }
  };
  
  console.log('New staff object created:', newStaff);
  console.log('Adding staff with atlasId:', newStaff.atlasId);
  console.log('staffData length before push:', staffData.length);
  
  // Step 1: Add to staffData array
  staffData.push(newStaff);
  console.log('staffData length after push:', staffData.length);
  console.log('Staff added to in-memory array');
  console.log('Updated ATLAS IDs:', staffData.map(s => s.atlasId));
  
  // Step 2: Save immediately to in-memory store (critical!)
  saveToMemoryStore();
  console.log('✓ New staff member saved to in-memory store');
  
  // Step 3: Close the add staff modal
  hideAddStaffModal();
  console.log('Modal closed');
  
  // Step 4: Reload dropdown FROM current data
  console.log('Reloading dropdown with', staffData.length, 'staff members');
  loadAndPopulateDropdown();
  console.log('Dropdown reloaded - should now show', staffData.length, 'staff members');
  
  // Step 5: Auto-select the new staff
  setTimeout(() => {
    const staffSelect = document.getElementById('staffSelect');
    if (staffSelect) {
      staffSelect.value = newStaff.atlasId;
      console.log('Auto-selected:', newStaff.atlasId);
      
      // Set as current staff and render
      currentStaff = newStaff;
      renderStaffDetail();
    }
  }, 100);
  
  // Step 6: Show success
  const baseId = surname.toUpperCase() + firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase() + (middleName ? middleName.charAt(0).toUpperCase() : '');
  let message = `Staff member ${fullName} (${atlasId}) added successfully!`;
  if (atlasId !== baseId) {
    message += `\n(Duplicate name detected - numbered suffix added)`;
  }
  showSuccessMessage(message);
  
  console.log('=== ADD STAFF MEMBER COMPLETED ===');
}

// Show delete confirmation modal
function showDeleteConfirmation() {
  if (!currentStaff) {
    alert('No staff member selected');
    return;
  }
  
  if (currentUserRole !== 'administrator') {
    alert('Access denied. Only administrators can delete staff members.');
    return;
  }
  
  // Populate modal with staff details
  document.getElementById('deleteStaffName').textContent = currentStaff.name;
  document.getElementById('deleteStaffAtlasId').textContent = currentStaff.atlasId;
  document.getElementById('deleteStaffAtlasIdDetail').textContent = currentStaff.atlasId;
  document.getElementById('deleteStaffFullName').textContent = currentStaff.name;
  document.getElementById('deleteStaffPosition').textContent = currentStaff.position;
  document.getElementById('deleteStaffState').textContent = currentStaff.state;
  
  // Show modal
  const modal = document.getElementById('deleteConfirmModal');
  modal.style.display = 'flex';
}

// Hide delete confirmation modal
function hideDeleteConfirmation() {
  const modal = document.getElementById('deleteConfirmModal');
  modal.style.display = 'none';
}

// Confirm and execute staff deletion
function confirmDeleteStaff() {
  if (!currentStaff) {
    alert('No staff member selected');
    hideDeleteConfirmation();
    return;
  }
  
  if (currentUserRole !== 'administrator') {
    alert('Access denied. Only administrators can delete staff members.');
    hideDeleteConfirmation();
    return;
  }
  
  // Store staff name and ATLAS ID for success message
  const deletedName = currentStaff.name;
  const deletedAtlasId = currentStaff.atlasId;
  
  // Remove staff member from staffData array
  console.log('Before delete - staffData length:', staffData.length);
  staffData = staffData.filter(s => s.atlasId !== deletedAtlasId);
  console.log('After delete - staffData length:', staffData.length);

  // CRITICAL: Save to in-memory store after deletion
  saveToMemoryStore();
  
  // Clear current staff selection
  currentStaff = null;
  
  // Reset dropdown to default option first
  const staffSelect = document.getElementById('staffSelect');
  if (staffSelect) {
    staffSelect.value = '';
  }
  
  // Update dropdown to remove deleted staff
  updateStaffSelect();
  
  // Hide confirmation modal
  hideDeleteConfirmation();
  
  // Clear display area and show no staff selected
  showNoStaffSelected();
  
  // Show success message
  showSuccessMessage(`${deletedName} (${deletedAtlasId}) has been deleted successfully`);
  
  // Update filter count
  updateFilterCount();
  
  // Log for verification
  console.log('Staff deleted:', deletedAtlasId, '- Total staff now:', staffData.length);
}

// Test storage function
function testLocalStorage() {
  console.log('=== TESTING STORAGE ===');
  
  const storage = getStorage();
  
  // Test 1: Can we write?
  try {
    storage.setItem('test123', 'hello');
    console.log('✓ Write test passed');
  } catch(e) {
    console.error('✗ Write test failed:', e);
    alert('Storage write BLOCKED');
    return;
  }
  
  // Test 2: Can we read?
  const test = storage.getItem('test123');
  if (test === 'hello') {
    console.log('✓ Read test passed');
  } else {
    console.error('✗ Read test failed');
    alert('Storage read FAILED');
    return;
  }
  
  // Test 3: Check current data
  const current = storage.getItem('staffData');
  if (current) {
    const parsed = JSON.parse(current);
    console.log('✓ Current staffData:', parsed.length, 'members');
    alert(`Storage is working!\nStored: ${parsed.length} staff members\nSize: ${current.length} chars`);
  } else {
    console.log('⚠️ No staffData in storage yet');
    alert('Storage works but no data saved yet');
  }
  
  storage.removeItem('test123');
}

// Initialize on load when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM already loaded
  init();
}