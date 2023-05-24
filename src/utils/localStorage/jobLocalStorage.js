export const getJobFromLocalStorage = () => {

    const result = localStorage.getItem('job');
    const jobs = JSON.parse(result) || null

    return jobs

}

export const addJobtoLocalStorage = (newAllJobsArray) => {

    localStorage.setItem('jobs', JSON.stringify(newAllJobsArray))


}

export const removeJobFromLocalStorage = () => {

    localStorage.removeItem('job')

}




