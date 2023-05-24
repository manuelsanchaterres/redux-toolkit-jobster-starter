export const getJobsFromLocalStorage = () => {

    const result = localStorage.getItem('jobs');
    const jobs = JSON.parse(result) || null
    return jobs

}

export const addJobstoLocalStorage = (jobs) => {

    localStorage.setItem('jobs', JSON.stringify(jobs))

}

export const removeUserFromLocalStorage = () => {

    localStorage.removeItem('job')

}




