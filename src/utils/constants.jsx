
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
  },

  {
    id: 2,
    name: 'company',
    type: 'text',
    labelText: "company",

  },
  {
    id: 3,
    name: 'jobLocation',
    type: 'text',
    labelText: "job location",
  },

  {
    id: 4,
    name: 'status',
    type: 'select',
    options: ['interview', 'declined', 'pending'],
    defaultOption: 'pending',
    labelText: "status",
  },

  {
    id: 5,
    name: 'jobType',
    type: 'select',
    options: ['full-time', 'part-time', 'remote', 'internship'],
    defaultOption: 'full-time',
    labelText: "job type",
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
    defaultOption: 'pending',
    labelText: "status",
  },
  {
    id: 3,
    name: 'searchType',
    type: 'select',
    options: ['all','full-time', 'part-time', 'remote', 'internship', 'hybrid'],
    defaultOption: 'full-time',
    labelText: "job type",
  },

  {
    id: 4,
    name: 'sort',
    type: 'select',
    options: ['latest', 'oldest', 'a-z', 'z-a'],
    defaultOption: 'pending',
    labelText: "sort by",
  },




  
]







