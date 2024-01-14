import { Bar } from "react-chartjs-2";
import { useAdmin } from "@/Context/AdminContext/AdminContext";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { useEffect } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BookingChart = ({initialData}) => {

    const {
        booking : {
             movies,
             initializeMovie,
        }
    } = useAdmin()

    useEffect(() => {
        initializeMovie(initialData);
    },[])
    
    const movieArray = Object.entries(movies)

    const labels = movieArray.map(([key, value]) => key)

    const data = movieArray.map(([key, value]) => (value.bought_seats / value.total_seats) * 100 )

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Booking Rate of the movie within a week',
          },
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          },
        },
      };


    return (
        <>
        <div
        className="bg-white rounded-lg px-4 py-2"
        >
            <Bar
            options={options}
            data={{
                labels,
                datasets : [
                    {
                        label : 'Movie Percentage',
                        data : data,
                        backgroundColor: 'rgba(2, 253, 209, 0.5)',
                        hoverBackgroundColor : 'cyan'
                    }
                ]
            }}
            />
        </div>
        </>
    )
}

export default BookingChart;