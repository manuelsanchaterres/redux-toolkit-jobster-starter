
export const formRows = [
  {
    id: 1,
    name: 'name',
    type: 'text',
    labelText: "name",
  },

  {
    id: 2,
    name: 'email',
    type: 'email',
    labelText: "email",
  },
  {
    id: 3,
    name: 'password',
    type: 'password',
    labelText: "password",

  },

  
]

export const formRowsProfilePage = [
  {
    id: 1,
    name: 'name',
    type: 'text',
    labelText: "name",
  },

  {
    id: 2,
    name: 'lastName',
    type: 'text',
    labelText: "last name",

  },
  {
    id: 3,
    name: 'email',
    type: 'email',
    labelText: "email",
  },

  {
    id: 4,
    name: 'location',
    type: 'text',
    labelText: "location",
  },


  
]

export const formRowsAddJobPage = [
  
  {
    id: 1,
    name: 'position',
    type: 'text',
    labelText: "position",
    required: true,

    validate: {},

  },

  {
    id: 2,
    name: 'company',
    type: 'text',
    labelText: "company",
    required: true,

    validate: {},

  },
  {
    id: 3,
    name: 'jobLocation',
    type: 'text',
    labelText: "job location",
    required: true,
    validate: {
      // checkLength: (value) => value.length >= 6,
      // matchPattern: (value) =>
      // /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
      //     value
      // )
    }
  },

  {
    id: 4,
    name: 'status',
    type: 'select',
    options: [
      
      {value:'interview', label: 'interview'}, 
      {value:'declined', label: 'declined'}, 
      {value:'pending', label: 'pending'}, 
    ],

    defaultOption: 'pending',
    labelText: "status",
    required: true,
    validate: {},

  },

  {
    id: 5,
    name: 'jobType',
    type: 'select',
    options: [
      
      {value:'full-time', label: 'full time'}, 
      {value:'part-time', label: 'part-time'}, 
      {value:'remote', label: 'remote'}, 
      {value:'internship', label: 'internship'}
    ],

    defaultOption: 'full-time',
    labelText: "job type",
    required: true,
    validate: {},

  },



  
]


export const formRowsAllJobsPage = [
  {
    id: 1,
    name: 'search',
    type: 'text',
    labelText: "search",
  },

  {
    id: 2,
    name: 'searchStatus',
    type: 'select',
    options: ['all','interview', 'declined', 'pending'],
    defaultOption: 'all',
    labelText: "status",
  },
  {
    id: 3,
    name: 'searchType',
    type: 'select',
    options: ['all','full-time', 'part-time', 'remote', 'internship'
    // , 'hybrid'
  
    ],
    defaultOption: 'all',
    labelText: "job type",
  },

  {
    id: 4,
    name: 'limit',
    type: 'select',
    options: ['latest', 'oldest', 'a-z', 'z-a'],
    defaultOption: 'latest',
    labelText: "sort by",
  },

  {
    id: 5,
    name: 'limit',
    type: 'select',
    options: [10, 20, 50],
    defaultOption: 10,
    labelText: "results per page",
  },





  
]









