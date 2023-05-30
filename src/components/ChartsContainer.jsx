import {AreaChartComponent, BarChartComponent} from '../components'

import Wrapper from '../assets/wrappers/ChartsContainer';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const ChartsContainer = () => {

  const [barChart, setBarChart] = useState(true)

  const { monthlyApplications: data } = useSelector((store) => store.allJobs);

  return (

    <Wrapper>

      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>{barChart ? 'Change to Area Chart' : 'Change to Bar Chart'}</button>
      {barChart? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
      
    </Wrapper>

  )
}
export default ChartsContainer  