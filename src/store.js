import {configureStore} from '@reduxjs/toolkit';

import userSlice from './features/user/userSlice';
import jobSlice from './features/job/jobSlice';
import AllJobsSlice from './features/allJobs/AllJobsSlice';

export const store = configureStore({

    reducer: {

        user: userSlice,
        job: jobSlice,
        allJobs: AllJobsSlice,
    }

})