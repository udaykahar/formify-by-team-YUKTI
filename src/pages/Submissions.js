import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { getSubmissions } from "../db"

import SubmissionCard from "../components/SubmissionCard"
import { PieChart, Pie, Cell, Legend } from 'recharts';
const data = [
    {
      "title": "Enter your email",
      "type": "short-text",
      "value": "karan.kewat.cs.20@ggits.net"
    },
    {
      "type": "short-text",
      "value": "Karan Kewat",
      "title": "Your name"
    },
    {
      "type": "multioption-singleanswer",
      "value": [
        "6th"
      ],
      "title": "which semester are you from?"
    },
    {
      "value": [
        "Machine Learning",
        "Devops"
      ],
      "title": "which courses do you want to enroll for",
      "type": "multioption-multianswer"
    },
    {
        "value": [
          "Machine Learning",
        ],
        "title": "which courses do you want to enroll for",
        "type": "multioption-multianswer"
      }
]
const courses = data[3].value;

// Count the number of responses for each course option
const counts = {};
courses.forEach(course => {
  counts[course] = (counts[course] || 0) + 1;
});

// Calculate the percentages for each course option
const percentages = Object.values(counts).map(count => count / courses.length * 100);
const pieData = courses.map((course, index) => ({
    name: course,
    value: percentages[index]
  }));
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#4CAF50', '#FF9800'];


function Submissions(){
    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState('')
    const [submissions, setSubmissions] = useState([])

    const { id } = useParams()

    useEffect(() => {
        if(!localStorage.getItem('gfc-user')) return
        const fetchData = async () => {
            try{
                let sbmns = await getSubmissions({ formID: id })
                setSubmissions(sbmns)
                setLoading(false)
            }catch(e){
                setLoading(false)
                setMsg(e.message)
            }
        }
        fetchData()
    }, [id])

    return (
        <div>
            <h1 className="heading mb-1">Form Submissions</h1>
            <PieChart width={400} height={400}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <Legend />
            </PieChart>
            { loading ? <p className="text-center mt-1"><span className="spinner"></span></p>
            : msg ? <h3 className="msg mt-1">{msg}</h3>
            : submissions.length > 0 ? (
                <div className="cards-container submissions">
                    { submissions.map((subm, index) => <SubmissionCard key={index} submission={subm.submission} /> )}
                </div>
            ) : <h3 className="msg mt-1">No submissions yet</h3>}
        </div>
    )
}

export default Submissions